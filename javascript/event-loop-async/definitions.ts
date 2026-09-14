/**
 * DOC FILE NAY TRUOC TIEN - dinh nghia TUNG THUAT NGU duoc nhac toi
 * trong 4 file con lai cua thu muc nay (event-loop-mechanism.ts,
 * microtask-vs-macrotask.ts, promise-combinators.ts,
 * async-await-error-handling.ts)
 */

// ============================================================
// 1. JS ENGINE - "BO NAO" thuc thi code JavaScript
// ============================================================
// La chuong trinh doc va CHAY code JS (vi du: V8 trong Chrome/Node/
// React Native Hermes cung la 1 JS engine). JS ENGINE LA SINGLE-
// THREADED - tai 1 thoi diem, no CHI CHAY DUOC 1 DONG LENH DUY NHAT,
// khong the chay 2 doan code JS CUNG LUC (khac voi cac ngon ngu da luong).


// ============================================================
// 2. CALL STACK (ngan xep loi goi) - noi CAC HAM DANG CHAY duoc xep chong
// ============================================================
// Moi lan 1 ham duoc GOI, no duoc "DAT LEN TREN CUNG" cua call stack.
// Khi ham do CHAY XONG (return), no duoc "GO RA" khoi call stack. Hoat
// dong theo kieu LIFO (Last In, First Out - vao sau ra truoc), GIONG 1
// CHONG DIA: dia nao dat len sau thi LAY RA TRUOC.
//
// function a() { b(); }
// function b() { c(); }
// function c() { console.log("xong"); }
// a();
// -> Call stack luc c() dang chay: [a, b, c] (a duoi cung, c tren cung)
// -> c() chay xong, go ra: [a, b]
// -> b() chay xong, go ra: [a]
// -> a() chay xong, go ra: [] (rong)


// ============================================================
// 3. HEAP - noi LUU TRU DU LIEU (object, mang, closure...)
// ============================================================
// Khac voi call stack (luu THU TU GOI HAM), heap la 1 VUNG BO NHO LON,
// KHONG CO THU TU CO DINH, noi cac OBJECT/MANG/HAM duoc CAP PHAT bo nho.
// Garbage Collector (xem ../memory-performance/v8-garbage-collector.ts)
// hoat dong TREN HEAP nay de don dep object khong con dung den.


// ============================================================
// 4. WEB API / NODE API (hoac "Native modules" trong RN) - noi XU LY
// CAC TAC VU BAT DONG BO THAT SU (KHONG PHAI JS engine tu xu ly)
// ============================================================
// setTimeout, fetch, doc file, lang nghe su kien click... KHONG PHAI
// do chinh JS engine (V8) xu ly - JS engine CHI "GIAO VIEC" nay cho MOI
// TRUONG BEN NGOAI (browser cung cap Web API, Node.js cung cap Node
// API, React Native cung cap Native module) DE XU LY SONG SONG, roi
// NHAN LAI KET QUA qua 1 CALLBACK khi xong - day la LY DO JS "TRONG NHU"
// lam duoc nhieu viec cung luc du ban than JS engine single-threaded.


// ============================================================
// 5. CALLBACK QUEUE / TASK QUEUE / MACROTASK QUEUE (3 TEN GOI cho CUNG
// 1 khai niem) - "HANG CHO" cho cac callback CUA setTimeout, I/O...
// ============================================================
// Khi Web API/Node API XU LY XONG 1 tac vu bat dong bo (vd het thoi
// gian dem cua setTimeout), no KHONG chay callback NGAY LAP TUC - ma
// DUA callback do vao HANG DOI NAY, CHO DEN LUOT duoc dua vao call stack.


// ============================================================
// 6. MICROTASK QUEUE - HANG CHO RIENG, UU TIEN CAO HON, danh cho
// Promise/async-await
// ============================================================
// Callback cua .then()/.catch()/.finally() (Promise), async/await, va
// queueMicrotask() KHONG vao Callback Queue thuong, ma vao 1 HANG DOI
// RIENG duoc UU TIEN CHAY TRUOC (xem microtask-vs-macrotask.ts de hieu
// CHINH XAC thu tu uu tien nay).


// ============================================================
// 7. EVENT LOOP - "NGUOI DIEU PHOI" lien tuc kiem tra va CHUYEN VIEC
// TU CAC HANG DOI VAO CALL STACK
// ============================================================
// La 1 VONG LAP CHAY MAI MAI (trong suot thoi gian chuong trinh con
// song), lien tuc kiem tra: "Call stack DA RONG CHUA? Neu roi, co
// MICROTASK nao dang cho khong - chay HET chung truoc. Sau do, co
// MACROTASK nao dang cho khong - lay 1 CAI ra chay". Chi tiet DAY DU o
// event-loop-mechanism.ts.


// ============================================================
// 8. PROMISE - 1 "GIAY HEN" dai dien cho GIA TRI SE CO trong tuong lai
// ============================================================
// La 1 OBJECT DAI DIEN cho ket qua CUA 1 TAC VU BAT DONG BO, co 3
// TRANG THAI: "pending" (dang cho), "fulfilled" (thanh cong, co gia
// tri), "rejected" (that bai, co ly do loi). .then() dang ky "lam gi
// khi thanh cong", .catch() dang ky "lam gi khi that bai".


// ============================================================
// 9. async/await - CU PHAP VIET PROMISE "GIONG CODE DONG BO" HON
// ============================================================
// "async" dat truoc 1 ham de bao HAM DO SE TRA VE 1 PROMISE. "await"
// dat truoc 1 promise de "TAM DUNG" (mot cach BAT DONG BO, khong chan
// JS thread) cho den khi promise do co ket qua, roi moi CHAY TIEP dong
// sau. Chi tiet o async-await-error-handling.ts.


// ============================================================
// SO DO TOM TAT CACH CAC KHAI NIEM LIEN KET VOI NHAU
// ============================================================
//
//  Code JS chay tren -> CALL STACK (JS Engine, single-threaded)
//       |
//       | goi 1 tac vu bat dong bo (setTimeout, fetch...)
//       v
//  Duoc giao cho -> WEB API / NODE API (xu ly BEN NGOAI JS engine)
//       |
//       | xu ly xong, dua callback vao 1 trong 2 hang doi:
//       v
//  MACROTASK QUEUE (setTimeout, I/O)   MICROTASK QUEUE (Promise, async/await)
//       |                                   |
//       +-------------------+---------------+
//                            |
//                    EVENT LOOP kiem tra CALL STACK co RONG khong,
//                    neu rong: chay HET microtask TRUOC, roi
//                    MOI lay 1 macrotask
