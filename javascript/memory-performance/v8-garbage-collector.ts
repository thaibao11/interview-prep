/**
 * CAU 1 (Memory & Performance): Garbage collector trong V8 hoat dong
 * theo co che nao (generational GC).
 */

// ============================================================
// BUOC 0: GARBAGE COLLECTOR (GC) LAM GI
// ============================================================
// GC TU DONG TIM VA GIAI PHONG bo nho cua NHUNG GIA TRI KHONG CON DUOC
// THAM CHIEU TOI TU BAT KY DAU (khong ai "voi toi" duoc no nua) - JS
// KHONG can lap trinh vien tu tay free() bo nho nhu C/C++.


// ============================================================
// BUOC 1: GENERATIONAL GC - Y TUONG COT LOI
// ============================================================
// V8 CHIA BO NHO HEAP thanh 2 VUNG CHINH, dua tren QUAN SAT THUC TE:
// "PHAN LON OBJECT CHET RAT SOM (bien tam trong ham, object trung gian),
// CHI 1 SO IT object SONG LAU DAI (global state, cache, singleton)".
//
//   - YOUNG GENERATION (NEW SPACE): noi OBJECT MOI duoc tao ra. VUNG
//     NAY NHO, va duoc GC QUET RAT THUONG XUYEN (gọi la "Scavenge" -
//     nhanh, vi vung nho va PHAN LON object o day CHET NGAY)
//   - OLD GENERATION (OLD SPACE): object nao SONG SOT qua VAI LAN quet
//     o Young Generation se duoc "THANG CAP" (promote) len day. Vung
//     nay LON HON, duoc quet IT THUONG XUYEN HON (gọi la "Mark-Sweep-
//     Compact" - cham hon nhung it phai chay, vi object o day it CHET)


// ============================================================
// BUOC 2: VI SAO CHIA THANH 2 VUNG (thay vi quet CA HEAP MOI LAN)
// ============================================================
// Neu quet TOAN BO heap MOI LAN GC chay, se RAT CHAM (heap co the RAT
// LON) VA gay "STOP-THE-WORLD" keo dai (JS thread bi TAM DUNG hoan toan
// trong luc GC chay, UI/app bi DUNG HINH). Bang cach CHI QUET VUNG NHO
// (Young Generation) THUONG XUYEN, va CHI QUET VUNG LON (Old Generation)
// KHI THUC SU CAN (it hon nhieu) - V8 GIAM DUOC thoi gian "dung hinh"
// tong the, giu app MUOT hon.


// ============================================================
// BUOC 3: MARK-AND-SWEEP - THUAT TOAN CO BAN xac dinh "object CHET"
// ============================================================
// 1. Bat dau tu cac "GOC" (global object, bien dang trong scope hien
//    tai, call stack) - DANH DAU (mark) TAT CA object CO THE "DI TOI
//    DUOC" tu cac goc do (theo tham chieu)
// 2. BAT KY object nao KHONG duoc danh dau (khong "di toi duoc" tu goc
//    nao) duoc coi la RAC - GIAI PHONG (sweep) bo nho cua chung
//
// -> Day la ly do VI SAO CLOSURE (Cau 2 - closure.ts) co the gay
//    MEMORY LEAK NEU LAM DUNG: neu 1 closure van con duoc THAM CHIEU
//    TOI (vd luu trong 1 listener chua huy), TOAN BO bien no "GIU" qua
//    closure SE KHONG bi coi la rac, DU chung KHONG con dung den nua


// ============================================================
// TOM TAT NGAN GON DE TRA LOI PHONG VAN
// ============================================================
// "V8 chia heap thanh Young Generation (object moi tao, vung nho, quet
// rat thuong xuyen bang thuat toan Scavenge nhanh) va Old Generation
// (object song sot qua nhieu lan quet o Young duoc thang cap len day,
// vung lon hon, quet it thuong xuyen hon bang Mark-Sweep-Compact). Y
// tuong nen tang la da so object chet rat som, chi it object song lau
// dai, nen tach rieng 2 vung giup GC hieu qua hon, giam thoi gian 'dung
// hinh' (stop-the-world) so voi quet toan bo heap moi lan. Co che xac
// dinh 'object chet' la mark-and-sweep: danh dau moi object con di toi
// duoc tu cac goc (global, call stack), phan con lai la rac va duoc
// giai phong."
