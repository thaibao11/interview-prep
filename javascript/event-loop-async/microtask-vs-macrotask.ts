/**
 * CAU 2 (Event loop & Bat dong bo): Promise microtask duoc xu ly truoc
 * hay sau setTimeout(fn, 0)? Vi sao?
 */

// ============================================================
// TRA LOI THANG: MICROTASK (Promise) LUON CHAY TRUOC macrotask (setTimeout)
// ============================================================

console.log("start");

setTimeout(() => console.log("setTimeout"), 0);

Promise.resolve().then(() => console.log("promise"));

console.log("end");

// KET QUA: start -> end -> promise -> setTimeout


// ============================================================
// VI SAO - NHAC LAI CO CHE EVENT LOOP (event-loop-mechanism.ts)
// ============================================================
// setTimeout(fn, 0) KHONG co nghia la "chay ngay lap tuc sau 0ms" - no
// chi co nghia la "dua fn vao MACROTASK QUEUE cang som cang tot". Con
// Promise.then dua callback vao MICROTASK QUEUE.
//
// Event loop LUON uu tien don sach TOAN BO microtask queue TRUOC KHI
// lay 1 macrotask MOI ra chay - do la QUY TAC CO DINH, khong phu thuoc
// thoi gian delay duoc khai bao.


// ============================================================
// VI DU PHUC TAP HON - microtask co the "DE" them microtask
// ============================================================
console.log("A");

setTimeout(() => console.log("B - macrotask"), 0);

Promise.resolve()
  .then(() => {
    console.log("C - microtask 1");
    return Promise.resolve();
  })
  .then(() => console.log("D - microtask 2 (de ra tu C)"));

console.log("E");

// KET QUA: A -> E -> C -> D -> B
// -> "D" (microtask MOI duoc "de" ra tu ben trong "C") VAN duoc chay
//    TRUOC "B" (macrotask), vi event loop CHI chuyen sang macrotask
//    SAU KHI microtask queue HOAN TOAN RONG - ke ca cac microtask MOI
//    PHAT SINH trong luc dang xu ly microtask khac


// ============================================================
// TOM TAT NGAN GON DE TRA LOI PHONG VAN
// ============================================================
// "Promise (microtask) luon chay truoc setTimeout (macrotask) du ca hai
// cung dang ky voi delay 0, vi event loop co quy tac CO DINH: sau khi
// call stack rong, no chay HET TOAN BO microtask queue (ke ca microtask
// moi phat sinh trong luc do) TRUOC KHI lay 1 macrotask tiep theo ra
// chay. setTimeout(fn, 0) chi nghia la 'dua fn vao macrotask queue cang
// som cang tot', khong dam bao chay truoc microtask nao ca."
