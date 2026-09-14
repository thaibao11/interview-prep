/**
 * CAU 6 (React Native): JSI, Fabric, TurboModules giai quyet
 * van de cua Bridge nhu the nao.
 *
 * Cach nho: moi thanh phan moi = CAU TRA LOI cho DUNG 1 van de cua Bridge cu
 *   - JSI          -> thay the co che serialize JSON + hang doi bat dong bo
 *   - Fabric        -> renderer moi, dung JSI de render/do layout nhanh hon
 *   - TurboModules  -> thay the NativeModules cu, dung JSI + lazy load
 *   - Codegen       -> dam bao an toan kieu du lieu (type-safety) giua JS <-> Native
 */

// ============================================================
// BUOC 0: DINH NGHIA NHANH (thuoc long de tra loi mo dau cau hoi)
// ============================================================
// JSI (JavaScript Interface)
//   -> Mot lop interface cap thap viet bang C++, dong vai tro "cau noi"
//      cho phep JS engine (Hermes/JSC) GIU THAM CHIEU TRUC TIEP va GOI
//      THANG (ke ca DONG BO) toi object/ham phia Native - thay the hoan
//      toan co che serialize JSON qua Bridge.
//
// Fabric
//   -> Bo RENDERER MOI cua React Native, XAY TREN JSI. Chiu trach nhiem
//      tao, do dac (layout) va commit cay UI (Shadow Tree) sang native
//      view that - nhanh hon va co the UU TIEN cap nhat quan trong hon
//      renderer cu (Paper).
//
// TurboModules
//   -> Co che MOI de dinh nghia va goi NATIVE MODULE, XAY TREN JSI.
//      Ho tro LAZY-LOADING (chi khoi tao module khi JS thuc su goi toi
//      lan dau), thay vi load HET tat ca module ngay luc mo app nhu
//      NativeModules cu.
//
// Codegen (thanh phan di kem, dam bao an toan)
//   -> Cong cu TU DONG SINH code binding Native tu dinh nghia TypeScript/
//      Flow, dam bao kieu du lieu JS va Native luon khop nhau, bao loi
//      ngay luc BUILD thay vi luc app dang chay.
//
// -> Tom lai theo 1 cau: "JSI la nen tang giao tiep truc tiep thay Bridge;
//    Fabric dung JSI de RENDER UI; TurboModules dung JSI de GOI NATIVE
//    MODULE; Codegen dam bao AN TOAN KIEU DU LIEU cho ca hai."


// ============================================================
// BUOC 1: JSI (JavaScript Interface) - NEN TANG cot loi cua tat ca
// ============================================================
// Nhac lai van de cu: Bridge bat JS phai SERIALIZE moi yeu cau thanh JSON,
// gui qua HANG DOI, CHI GOI DUOC BAT DONG BO.
//
// JSI giai quyet TRUC TIEP van de nay:
//   JSI la 1 lop interface (C++) cho phep JS engine (Hermes/JSC) GIU THAM
//   CHIEU TRUC TIEP toi 1 object/ham native (goi la HostObject), va GOI
//   THANG len no - KHONG can bien thanh JSON, KHONG can qua hang doi.
//
//   -> Vi la tham chieu truc tiep, JS co the goi DONG BO neu can (giong
//      nhu goi 1 ham JS binh thuong), thay vi luon phai cho callback.
//
// Vi du hinh dung (gia lap, khong phai code that):
//   // Kien truc CU (qua Bridge):
//   NativeModules.Storage.getItem("key", (result) => { ... }); // luon bat dong bo
//
//   // Kien truc MOI (qua JSI):
//   const result = global.__turboModuleProxy("Storage").getItemSync("key");
//   // co the goi DONG BO, vi JS dang cam THAM CHIEU TRUC TIEP toi object native,
//   // khong phai gui JSON qua hang doi roi cho


// ============================================================
// BUOC 2: FABRIC - renderer moi, dung JSI de render nhanh hon
// ============================================================
// Nhac lai van de cu: viec cap nhat cay native (Shadow Tree) cu phai
// vuot Bridge bat dong bo, gay do tre giua luc JS quyet dinh thay doi UI
// va luc nguoi dung THUC SU thay thay doi do tren man hinh.
//
// Fabric giai quyet:
//   - Dung JSI de JS va C++ core (noi tinh toan Shadow Tree/layout bang Yoga)
//     giao tiep TRUC TIEP, khong qua serialize JSON
//   - Cho phep uu tien mot so cap nhat quan trong chay DONG BO hon (vd:
//     go phim vao TextInput can phan hoi ngay, tranh cam giac "tre 1 nhip"
//     tung xay ra voi kien truc cu)
//   - Logic core (do layout, quan ly cay) viet chung bang C++, dung chung
//     cho ca iOS lan Android (thay vi phai duy tri 2 phien ban rieng)


// ============================================================
// BUOC 3: TURBOMODULES - thay the NativeModules cu
// ============================================================
// Nhac lai van de cu: TAT CA native module (Camera, Bluetooth, Storage...)
// deu duoc KHOI TAO NGAY LUC APP MO LEN, DU CO DUNG HAY KHONG
// -> ton thoi gian startup, ton bo nho ngay tu dau.
//
// TurboModules giai quyet:
//   - LAZY LOADING: module native CHI duoc khoi tao khi JS THUC SU goi
//     toi lan dau tien, khong phai load san tat ca luc mo app
//   - Dung JSI de giu tham chieu truc tiep -> ho tro goi DONG BO khi can
//   - Ket qua: giam thoi gian khoi dong app (startup time), giam bo nho
//     lang phi cho nhung module khong dung den
//
// Vi du thuc te: mot thu vien nhu react-native-mmkv (luu tru key-value)
// viet bang TurboModule + JSI co the doc/ghi DONG BO, nhanh hon rat nhieu
// so voi AsyncStorage kieu cu (luon bat dong bo, phai qua Bridge)


// ============================================================
// BUOC 4: CODEGEN - dam bao AN TOAN KIEU DU LIEU (type-safety)
// ============================================================
// Van de moi phat sinh: khi JS goi thang native qua JSI (khong con serialize
// JSON o giua de "kiem tra ho" kieu du lieu mot cach tu nhien), lam sao dam
// bao kieu du lieu ben JS (TypeScript/Flow) va ben Native (Kotlin/Swift)
// luon khop nhau, tranh loi runtime kho debug?
//
// Codegen giai quyet:
//   - Ban dinh nghia interface cua native module bang TypeScript/Flow
//   - Codegen TU DONG SINH RA code Native (interface/binding tuong ung)
//     dua tren dinh nghia do, o thoi diem BUILD (compile-time)
//   - Neu kieu du lieu JS va Native lech nhau -> LOI NGAY LUC BUILD,
//     thay vi loi ngam am tham luc app dang chay


// ============================================================
// BUOC 5: AP DUNG THUC TE - config bat New Architecture
// (de tra loi khi interviewer hoi "du an em co dung kien truc moi khong")
// ============================================================
// Android - android/gradle.properties:
//   newArchEnabled=true
//
// iOS - ios/Podfile (truoc khi pod install):
//   ENV['RCT_NEW_ARCH_ENABLED'] = '1'
//
// Voi du an dung Expo - app.json:
//   { "expo": { "newArchEnabled": true } }
//
// Tu ban RN 0.76 tro di, New Architecture la MAC DINH cho du an moi.


// ============================================================
// BANG SO SANH NGAN GON
// ============================================================
//  Kien truc CU                    |  Kien truc MOI
//  --------------------------------|--------------------------------
//  Bridge: JSON + hang doi         |  JSI: tham chieu truc tiep
//  Chi goi bat dong bo             |  Ho tro goi dong bo khi can
//  NativeModules: load het luc mo  |  TurboModules: lazy load khi can
//  Shadow Tree qua bridge          |  Fabric: dung JSI, uu tien duoc
//  Khong kiem tra kieu chat che    |  Codegen: kiem tra kieu luc build


// ============================================================
// BUOC 6: TINH NANG THUC TE - de tra loi khi bi hoi "em ap dung
// vao tinh nang nao roi", KHONG chi noi ly thuyet suong
// ============================================================
// Tinh huong: luc app KHOI DONG, can biet nguoi dung DA DANG NHAP hay
// CHUA (co token luu san hay khong) de QUYET DINH hien man Home hay Login
// NGAY TU DAU - tranh bi "nhap nhay" man hinh sai roi lai chuyen man hinh.

// --- CACH CU: AsyncStorage (qua Bridge, LUON bat dong bo) ---
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

function AppOldWay() {
  const [initialRoute, setInitialRoute] = useState<"Login" | "Home" | null>(null);

  useEffect(() => {
    // PHAI cho bat dong bo - qua Bridge, serialize/deserialize JSON
    AsyncStorage.getItem("authToken").then((token) => {
      setInitialRoute(token ? "Home" : "Login");
    });
  }, []);

  // -> Trong luc cho ket qua (initialRoute === null), app PHAI hien 1 man
  //    hinh trung gian (loading/splash keo dai them) vi KHONG THE doc duoc
  //    token NGAY LAP TUC trong luc khoi tao state - do la ban chat bat
  //    dong bo cua Bridge
  if (initialRoute === null) return null; // hoac hien splash screen
  return null; // return <NavigationContainer initialRouteName={initialRoute} ... />
}

// --- CACH MOI: react-native-mmkv (TurboModule, dung JSI, DOC DUOC DONG BO) ---
import { MMKV } from "react-native-mmkv";
const storage = new MMKV();

function AppNewWay() {
  // Doc DONG BO NGAY TRONG LUC KHOI TAO STATE - vi MMKV dung JSI,
  // JS giu tham chieu truc tiep toi native, KHONG can cho callback/Promise
  const [initialRoute] = useState<"Login" | "Home">(
    storage.getString("authToken") ? "Home" : "Login"
  );
  // -> KHONG can man hinh trung gian cho ket qua nua, vi gia tri
  //    da co NGAY LAP TUC, cung nhip voi luc component duoc tao
  return null; // return <NavigationContainer initialRouteName={initialRoute} ... />
}

// -> Cach tra loi khi bi hoi: "Em ap dung cho tinh nang kiem tra trang thai
//    dang nhap luc khoi dong app. Truoc day dung AsyncStorage (qua Bridge,
//    bat dong bo) nen phai co 1 khoang cho + man hinh trung gian truoc khi
//    biet duoc dieu huong vao dau. Sau khi chuyen sang MMKV (TurboModule,
//    dung JSI) thi doc duoc token DONG BO ngay trong useState initial value,
//    bo han duoc khoang cho do, tranh nhap nhay man hinh."


// ============================================================
// BUOC 6B: TINH NANG THUC TE #2 - Camera / quet QR-Barcode
// (vi du KINH DIEN nhat de noi ve JSI, vi phai xu ly LIEN TUC, TAN SUAT CAO)
// ============================================================
// Tinh huong: app can QUET QR CODE lien tuc tu camera de tim ma hop le
// cang som cang tot (vd: app thanh toan, app check-in su kien).

// --- CACH CU: react-native-camera (qua Bridge) ---
// Camera chup TUNG FRAME, gui FRAME DO (base64 hoac path anh) qua Bridge
// sang JS de xu ly nhan dien -> MOI FRAME la 1 lan serialize/deserialize
// du lieu ANH (rat nang) -> cham, de bi GIAT, delay giua luc dua QR vao
// khung hinh va luc app THUC SU nhan ra ma.

// --- CACH MOI: react-native-vision-camera + Frame Processor (dung JSI) ---
// import { useFrameProcessor } from "react-native-vision-camera";
// import { scanCodes } from "vision-camera-code-scanner";
//
// const frameProcessor = useFrameProcessor((frame) => {
//   "worklet"; // <- day la WORKLET, chay TRUC TIEP tren native thread qua JSI
//   const codes = scanCodes(frame); // xu ly NGAY TREN FRAME GOC, khong serialize
//   if (codes.length > 0) {
//     runOnJS(handleCodeFound)(codes[0].value); // chi khi CO KET QUA moi "nhay" ve JS
//   }
// }, []);
//
// -> Frame Processor chay TRUC TIEP tren luong xu ly camera (qua JSI),
//    KHONG can gui tung frame anh qua Bridge. Chi khi tim thay ma QR hop
//    le, ket qua (1 chuoi text ngan) moi duoc gui ve JS - du lieu truyen
//    di NHE HON RAT NHIEU so voi gui ca frame anh.
// -> Day chinh la ly do vi sao cac app quet QR/nhan dien khuon mat hien
//    dai deu chuyen sang vision-camera thay vi react-native-camera cu.


// ============================================================
// BUOC 6C: TINH NANG THUC TE #3 - Vuot/keo (gesture) muot khi JS thread ban
// ============================================================
// Tinh huong: 1 man hinh Chat co thao tac VUOT DE TRA LOI TIN NHAN (swipe
// to reply), CUNG LUC app dang goi API tai them tin nhan cu (JS thread dang ban).

// --- CACH CU: PanResponder + Animated (khong bat native driver) ---
// Moi lan ngon tay di chuyen, JS phai TINH vi tri moi, SERIALIZE, GUI qua
// Bridge de cap nhat UI. Neu dung luc do JS thread dang ban xu ly response
// tu API -> cu chi VUOT BI KHUNG/GIAT, cam giac app "lag" ngay luc dang thao tac.

// --- CACH MOI: react-native-gesture-handler + react-native-reanimated ---
// import { Gesture, GestureDetector } from "react-native-gesture-handler";
// import { useAnimatedStyle, useSharedValue } from "react-native-reanimated";
//
// const translateX = useSharedValue(0);
// const panGesture = Gesture.Pan()
//   .onUpdate((e) => {
//     "worklet"; // chay TREN UI THREAD qua JSI, KHONG dung den JS thread
//     translateX.value = e.translationX;
//   });
// const animatedStyle = useAnimatedStyle(() => ({
//   transform: [{ translateX: translateX.value }],
// }));
//
// -> Toan bo logic theo doi ngon tay + cap nhat vi tri chay TREN UI THREAD
//    (qua JSI worklet), HOAN TOAN DOC LAP voi JS thread. Du JS thread dang
//    ban xu ly goi API tai tin nhan cu, cu chi vuot VAN MUOT 60fps binh
//    thuong, vi no khong can cho JS thread ranh de xu ly.


// ============================================================
// TOM TAT NGAN GON DE TRA LOI PHONG VAN
// ============================================================
// "JSI la nen tang: thay vi serialize JSON qua hang doi bat dong bo nhu
//  Bridge, JSI cho JS giu tham chieu truc tiep toi object native va goi
//  duoc dong bo. Fabric la renderer moi dung JSI de render/do layout
//  nhanh hon va co the uu tien cap nhat quan trong. TurboModules thay
//  NativeModules cu bang co che lazy-load qua JSI, giam thoi gian khoi
//  dong app. Codegen dam bao kieu du lieu JS va Native luon khop nhau,
//  bao loi ngay luc build thay vi luc app chay. Du an minh kiem tra/bat
//  bang newArchEnabled=true trong gradle.properties va Podfile."
