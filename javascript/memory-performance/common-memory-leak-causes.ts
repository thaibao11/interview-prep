/**
 * CAU 2 (Memory & Performance): Ke 3 nguyen nhan pho bien gay memory
 * leak trong JS/RN app.
 *
 * (Ban chi tiet, ap dung rieng cho RN voi vi du code SAI/DUNG day du,
 * xem ../../react-native/performance/memory-leaks.tsx - file nay noi
 * theo goc do JS TONG QUAT, ap dung ca web lan RN)
 */

// ============================================================
// NGUYEN NHAN 1: BIEN TOAN CUC (global) VO Y TAO RA
// ============================================================
function leakyFunction() {
  // QUEN khai bao "let/const/var" -> bien nay TU DONG thanh GLOBAL
  // (trong non-strict mode), TON TAI MAI MAI, khong bao gio duoc GC
  accidentalGlobal = "toi la global khong mong muon";
}
// FIX: LUON dung "use strict" (mac dinh trong module ES/TypeScript) de
// JS TU DONG BAO LOI khi gan gia tri cho bien CHUA khai bao


// ============================================================
// NGUYEN NHAN 2: CLOSURE GIU THAM CHIEU KHONG CAN THIET
// ============================================================
function setupHandler() {
  const hugeData = new Array(1000000).fill("du lieu lon"); // mang RAT LON

  return function handler() {
    console.log("chi can 1 dong log, khong dung den hugeData");
    // NHUNG vi "handler" duoc dinh nghia BEN TRONG setupHandler, no
    // GIU THAM CHIEU toi TOAN BO scope cua setupHandler QUA CLOSURE -
    // "hugeData" VAN BI GIU LAI trong bo nho CHUNG BAO LAU "handler"
    // con ton tai, DU handler KHONG HE dung den hugeData
  };
}
// FIX: neu ham tra ve KHONG can du lieu lon o scope cha, CAN THAN voi
// nhung gi dinh nghia CUNG SCOPE - hoac giai phong tham chieu (gan null)
// khi khong con can nua


// ============================================================
// NGUYEN NHAN 3: TIMER/LISTENER/SUBSCRIPTION KHONG DUOC HUY
// ============================================================
function startPolling() {
  const bigCache: string[] = [];

  setInterval(() => {
    bigCache.push("du lieu moi"); // MANG NAY LON DAN THEO THOI GIAN,
    // KHONG BAO GIO duoc GC vi setInterval CHAY MAI MAI (khong ai
    // clearInterval), va callback nay GIU THAM CHIEU toi "bigCache" QUA
    // CLOSURE
  }, 1000);
}
// FIX: LUON luu ID cua setInterval/setTimeout/addEventListener va HUY
// no khi KHONG CON CAN (vd trong cleanup cua useEffect - xem
// ../../react-native/performance/memory-leaks.tsx de xem chi tiet ap
// dung trong RN component)


// ============================================================
// (THAM KHAO) 2 NGUYEN NHAN DAC THU CUA RN, DA HOC CHI TIET O FILE
// memory-leaks.tsx - chi nhac lai TEN de lien he neu can:
//   - setState SAU KHI component da unmount (fetch/promise tra ve tre)
//   - Mang/danh sach state phinh to KHONG GIOI HAN (vd tin nhan chat
//     lien tuc push vao mang, khong gioi han do dai)
// ============================================================


// ============================================================
// TOM TAT NGAN GON DE TRA LOI PHONG VAN
// ============================================================
// "3 nguyen nhan pho bien: (1) tao bien global ngoai y muon do quen
// khai bao let/const (strict mode giup phat hien loi nay), (2) closure
// giu tham chieu toi du lieu lon KHONG CAN THIET tu scope cha, khien du
// lieu do khong duoc GC du ham tra ve khong dung den, va (3) timer/
// listener/subscription khong duoc huy - callback cua chung tiep tuc
// giu tham chieu (qua closure) toi cac bien lien quan mai mai, du noi
// tao ra chung da khong con can nua. Voi RN cu the, con them 2 nguyen
// nhan: setState sau khi component unmount, va state/mang phinh to
// khong gioi han (vd tin nhan chat)."
