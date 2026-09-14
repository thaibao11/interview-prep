/**
 * CHI TIET: Memory leak trong React Native
 * - Bug thuong la gi, cach PHAT HIEN, cach FIX.
 */

// ============================================================
// BUOC 0: NGUYEN TAC GOC - vi sao memory leak xay ra
// ============================================================
// Memory leak xay ra khi 1 THU GI DO (listener, timer, closure) VAN GIU
// THAM CHIEU toi component/du lieu SAU KHI component do DA UNMOUNT, khien
// Garbage Collector KHONG THE DON DEP duoc no - bo nho bi chiem GIU MAI,
// du component do KHONG CON HIEN THI TREN MAN HINH NUA.
//
// QUY TAC VANG de tranh: "MOI side-effect co the SONG LAU HON component
// (subscription, timer, listener) DEU CAN 1 ham CLEANUP trong useEffect."


// ============================================================
// BUOC 1: 5 BUG PHO BIEN NHAT GAY MEMORY LEAK TRONG RN
// ============================================================

// --- BUG 1: Khong huy SUBSCRIPTION/LISTENER khi unmount ---
import { useEffect, useState } from "react";
import { AppState, Dimensions } from "react-native";

// SAI:
function ScreenBad1() {
  useEffect(() => {
    const sub = AppState.addEventListener("change", (state) => {
      console.log(state);
    });
    // KHONG return cleanup -> "sub" (va ham callback, cung toan bo bien
    // no dong goi) SONG MAI, du ScreenBad1 da unmount tu lau
  }, []);
  return null;
}

// DUNG:
function ScreenGood1() {
  useEffect(() => {
    const sub = AppState.addEventListener("change", (state) => {
      console.log(state);
    });
    return () => sub.remove(); // huy dang ky luc unmount
  }, []);
  return null;
}

// --- BUG 2: Khong clear setInterval/setTimeout ---
// SAI:
function ScreenBad2() {
  useEffect(() => {
    setInterval(() => {
      console.log("dang chay..."); // TIEP TUC CHAY MAI du component da unmount
    }, 1000);
  }, []);
  return null;
}
// DUNG:
function ScreenGood2() {
  useEffect(() => {
    const id = setInterval(() => console.log("dang chay..."), 1000);
    return () => clearInterval(id);
  }, []);
  return null;
}

// --- BUG 3: setState SAU KHI component DA UNMOUNT (async resolve tre) ---
// Tinh huong: goi API, nguoi dung THOAT MAN HINH TRUOC KHI ket qua ve,
// roi setState VAN duoc goi tren component da khong con.
// SAI:
function ScreenBad3() {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch("https://api.example.com/data")
      .then((res) => res.json())
      .then((json) => setData(json)); // co the chay SAU KHI unmount
  }, []);
  return null;
}
// DUNG (dung AbortController - CACH CHUAN NHAT, huy luon ca REQUEST
// dang cho, khong chi chan setState):
function ScreenGood3() {
  const [data, setData] = useState(null);
  useEffect(() => {
    const controller = new AbortController();
    fetch("https://api.example.com/data", { signal: controller.signal })
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => {
        if (err.name !== "AbortError") console.error(err);
      });
    return () => controller.abort(); // HUY request luon, khong chi tranh setState
  }, []);
  return null;
}

// --- BUG 4: Quen huy NAVIGATION LISTENER ---
// SAI:
function ScreenBad4({ navigation }: any) {
  useEffect(() => {
    navigation.addListener("focus", () => console.log("focused"));
    // KHONG luu lai ham unsubscribe -> listener nay TON TAI MAI, moi lan
    // MAN HINH NAY DUOC TAO LAI (vao/ra nhieu lan) se CONG DON THEM 1
    // LISTENER MOI, gay callback CHAY NHIEU LAN TRUNG NHAU
  }, []);
  return null;
}
// DUNG:
function ScreenGood4({ navigation }: any) {
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => console.log("focused"));
    return unsubscribe; // navigation.addListener TRA VE SAN ham huy dang ky
  }, [navigation]);
  return null;
}

// --- BUG 5: MANG/DANH SACH PHINH TO KHONG GIOI HAN (vd chat real-time) ---
// SAI: moi tin nhan moi tu WebSocket deu duoc PUSH THEM vao 1 mang,
// KHONG BAO GIO gioi han do dai -> sau vai gio dung app lien tuc (vd
// nhom chat rat dong), mang nay co the len toi HANG CHUC NGAN phan tu,
// CHIEM RAM LON DAN, cuoi cung co the OOM (out of memory) va bi he
// dieu hanh KILL APP (dac biet tren Android/iOS thiet bi tam trung):
//   setMessages((prev) => [...prev, newMessage]); // KHONG GIOI HAN
// DUNG: gioi han so luong GIU TRONG BO NHO/STATE (vd chi giu 200 tin
// gan nhat trong state de render), tin nhan CU HON van co the truy van
// lai TU DATABASE/DISK (SQLite, MMKV) khi nguoi dung cuon len xem lai,
// khong nhat thiet phai giu HET trong RAM:
//   setMessages((prev) => [...prev, newMessage].slice(-200));


// ============================================================
// BUOC 2: CACH PHAT HIEN memory leak
// ============================================================
// TRIEU CHUNG de nhan biet: RAM app TANG DAN THEO THOI GIAN dac biet
// sau khi VAO/RA MOT MAN HINH NHIEU LAN LIEN TIEP, va KHONG GIAM VE
// MUC CU sau khi thoat man hinh do (khac voi tang RAM BINH THUONG luc
// dang o trong man hinh, roi TU GIAM lai sau khi thoat).
//
// QUY TRINH KIEM TRA THUC TE:
//   1. Mo Xcode Instruments (chon template "Leaks" hoac "Allocations")
//      hoac Android Studio Profiler (tab Memory)
//   2. VAO ROI RA man hinh nghi ngo BI LEAK LAP DI LAP LAI KHOANG 5-10 LAN
//   3. Bam nut FORCE GARBAGE COLLECTION (co san trong ca 2 cong cu)
//   4. Quan sat DUONG BIEU DO RAM: neu KHONG PHAI leak, RAM se TANG rui
//      GIAM VE GAN MUC BAN DAU sau moi lan force GC. NEU LA LEAK, RAM
//      se TANG DAN THEO TUNG LAN vao/ra, KHONG BAO GIO GIAM VE MUC CU
//   5. Voi Android Studio Profiler: co the CHUP HEAP DUMP, TIM TEN CLASS
//      cua component nghi ngo (vd "ChatScreen"), xem SO LUONG INSTANCE
//      con song - neu SO NAY TANG DAN THEO SO LAN vao/ra (khong ve 0
//      hoac 1 sau khi thoat), CHUNG TO INSTANCE CU KHONG DUOC GC, tuc
//      la CO GI DO dang giu tham chieu no (chinh la memory leak)
//
// CACH KIEM TRA NHANH, DON GIAN (khong can mo Instruments):
//   Them console.log trong CA effect va CLEANUP cua no, vao/ra man hinh
//   vai lan, dem SO LAN log "mount" va SO LAN log "cleanup" - neu 2 SO
//   NAY LECH NHAU (vd mount 5 lan nhung cleanup chi 3 lan), CO NGHIA LA
//   1 SO LAN cleanup KHONG DUOC GOI DUNG, day la DAU HIEU RO RANG cua leak


// ============================================================
// BUOC 3: NGUYEN TAC FIX CHUNG
// ============================================================
// MOI effect co "tao ra" mot thu gi do co the TON TAI LAU DAI (listener,
// subscription, timer, request) THI PHAI return 1 ham "don dep" tuong
// ung trong CUNG effect do:
//
//   useEffect(() => {
//     const thing = createSomething();
//     return () => thing.cleanup(); // <- KHONG DUOC QUEN DONG NAY
//   }, []);
//
// Voi state/mang co the PHINH TO KHONG GIOI HAN, GIOI HAN KICH THUOC
// GIU TRONG STATE/RAM, day phan cu hon xuong luu tru ben (disk/DB).


// ============================================================
// TOM TAT NGAN GON DE TRA LOI PHONG VAN
// ============================================================
// "Memory leak trong RN thuong den tu: quen huy subscription/listener
// (AppState, navigation.addListener, event emitter), quen clear
// setInterval/setTimeout, setState sau khi component da unmount tu 1
// promise/fetch tra ve tre, hoac 1 mang trong state phinh to khong gioi
// han (vd tin nhan chat). Cach phat hien: dung Xcode Instruments (Leaks/
// Allocations) hoac Android Studio Memory Profiler, vao/ra man hinh nghi
// ngo nhieu lan, force GC, xem RAM co giam ve muc cu hay tang dan mai -
// hoac don gian hon la dem so lan mount/cleanup qua console.log xem co
// khop nhau khong. Cach fix theo 1 nguyen tac chung: moi effect tao ra
// thu gi co the song lau hon component deu phai return ham cleanup
// tuong ung, va voi du lieu co the phinh to thi gioi han kich thuoc giu
// trong state/RAM, day phan cu hon xuong luu tru duoi disk."
