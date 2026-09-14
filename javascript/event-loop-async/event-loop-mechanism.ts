/**
 * CAU 1 (Event loop & Bat dong bo): Mo ta event loop - call stack,
 * task queue, microtask queue hoat dong ra sao.
 */

// ============================================================
// BUOC 0: 3 THANH PHAN CHINH
// ============================================================
// - CALL STACK: noi cac ham DANG CHAY duoc xep chong len nhau (LIFO -
//   vao sau ra truoc). JS la SINGLE-THREADED, nen chi CHAY 1 THU tren
//   call stack tai 1 thoi diem.
// - MACROTASK QUEUE (task queue): noi cac callback cua setTimeout,
//   setInterval, I/O, UI event... CHO DEN LUOT duoc dua vao call stack
// - MICROTASK QUEUE: noi cac callback cua Promise (.then/.catch/.finally),
//   queueMicrotask, async/await CHO DEN LUOT


// ============================================================
// BUOC 1: EVENT LOOP hoat dong THEO VONG LAP nao
// ============================================================
// Event loop LIEN TUC lap lai:
//   1. Chay HET code dong bo hien tai tren call stack
//   2. Khi call stack RONG -> chay HET TOAN BO microtask queue (moi
//      microtask co the "de" them microtask moi vao, VAN CHAY HET
//      TRUOC KHI qua buoc 3)
//   3. Chay 1 (CHI 1) macrotask tu task queue
//   4. Quay lai buoc 2 (chay het microtask MOI PHAT SINH tu macrotask do)
//   5. Lap lai
//
// -> DIEM MAU CHOT: MICROTASK QUEUE LUON duoc "DON SACH" HOAN TOAN
//    TRUOC KHI chay macrotask TIEP THEO, VA truoc khi trinh duyet/RN
//    "ve lai man hinh" (render)


// ============================================================
// BUOC 2: VI DU MINH HOA
// ============================================================
console.log("1 - dong bo");

setTimeout(() => console.log("2 - macrotask (setTimeout)"), 0);

Promise.resolve().then(() => console.log("3 - microtask (Promise)"));

console.log("4 - dong bo");

// KET QUA IN RA THEO THU TU:
// 1 - dong bo
// 4 - dong bo
// 3 - microtask (Promise)
// 2 - macrotask (setTimeout)
//
// GIAI THICH: code DONG BO (1, 4) chay het TRUOC TIEN vi dang co san
// tren call stack. Sau khi call stack RONG, microtask (3) duoc uu tien
// chay TRUOC macrotask (2), DU CA HAI DEU DUOC DANG KY VOI "0ms delay".


// ============================================================
// TOM TAT NGAN GON DE TRA LOI PHONG VAN
// ============================================================
// "JS la single-threaded, chay tren call stack. Khi gap tac vu bat
// dong bo, no duoc dua ra ngoai (Web API/Node API xu ly), roi callback
// duoc xep vao microtask queue (Promise, async/await) hoac macrotask
// queue (setTimeout, I/O). Event loop lien tuc kiem tra: khi call stack
// rong, no CHAY HET TOAN BO microtask queue TRUOC, roi MOI chay 1
// macrotask tiep theo, roi lap lai. Vi vay microtask (Promise) LUON
// duoc uu tien hon macrotask (setTimeout) du cung dang ky voi delay 0ms."
