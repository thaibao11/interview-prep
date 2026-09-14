/**
 * CAU 2 (ES6+): Su khac nhau giua CommonJS (require) va ES Modules
 * (import/export).
 */

// ============================================================
// COMMONJS (require/module.exports) - he thong module CU cua Node.js
// ============================================================
// math.js
// function add(a, b) { return a + b; }
// module.exports = { add };
//
// app.js
// const { add } = require("./math");
//
// DAC DIEM:
//   - DONG BO (synchronous): require() DOC VA CHAY file NGAY LAP TUC,
//     CHAN (block) code phia sau cho den khi module load xong
//   - Import DUOC O BAT KY DAU trong code (ke ca trong if/function), vi
//     require() la 1 HAM BINH THUONG, khong bi rang buoc vi tri
//   - Gia tri export la 1 OBJECT DUOC COPY tai thoi diem require (voi
//     gia tri PRIMITIVE) - thay doi SAU DO o module goc KHONG tu dong
//     phan anh sang noi da require


// ============================================================
// ES MODULES (import/export) - CHUAN CHINH THUC cua JavaScript
// ============================================================
// math.js
// export function add(a, b) { return a + b; }
//
// app.js
// import { add } from "./math";
//
// DAC DIEM:
//   - Duoc thiet ke ho tro BAT DONG BO (import() dong - dynamic import -
//     tra ve Promise), phu hop voi trinh duyet CAN TAI FILE QUA MANG
//   - import PHAI o TOP-LEVEL cua file (khong duoc dat trong if/function)
//     - day la GIOI HAN CO CHU DICH de CONG CU CO THE PHAN TICH TINH
//     (static analysis) cay phu thuoc TRUOC KHI CHAY code, cho phep
//     TREE-SHAKING (loai bo code KHONG DUNG DEN khoi bundle cuoi)
//   - Export la LIVE BINDING (tham chieu song) - neu gia tri o module
//     goc THAY DOI SAU DO, noi import cung THAY DOI THEO (khac CommonJS)


// ============================================================
// SO SANH TRUC QUAN VE TREE-SHAKING - LY DO QUAN TRONG NHAT NEN BIET
// ============================================================
// Voi CommonJS, bundler (Webpack/Metro) KHO XAC DINH CHINH XAC phan
// nao cua 1 module THUC SU duoc dung (vi require co the goi DONG,
// dieu kien) -> KHO loai bo code thua, bundle CUOI CO THE NANG HON
//
// Voi ES Modules, vi cau truc import/export CO DINH VA TINH (khong
// doi luc chay), bundler PHAN TICH DUOC CHINH XAC CAY PHU THUOC, LOAI
// BO duoc HAM/BIEN KHONG DUNG DEN -> BUNDLE NHE HON - day la LY DO
// CHINH cac thu vien/framework hien dai (bao gom RN) DEU KHUYEN DUNG
// ES Modules thay vi CommonJS


// ============================================================
// TOM TAT NGAN GON DE TRA LOI PHONG VAN
// ============================================================
// "CommonJS (require/module.exports) la he thong module cu cua Node.js,
// hoat dong dong bo, cho phep require o bat ky dau trong code, va export
// la gia tri duoc copy tai thoi diem require. ES Modules (import/export)
// la chuan chinh thuc cua JS, ho tro import dong bat dong bo, BAT BUOC
// import o top-level de bundler phan tich tinh duoc cay phu thuoc, va
// export la live binding (thay doi o module goc phan anh sang noi
// import). Ly do quan trong nhat de chon ES Modules la TREE-SHAKING -
// bundler loai bo duoc code khong dung den, giup bundle nhe hon, dieu
// ma CommonJS kho lam duoc vi cau truc require dong/dieu kien."
