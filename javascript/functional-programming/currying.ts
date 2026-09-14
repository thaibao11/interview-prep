/**
 * CAU 3 (Functional Programming): Currying la gi? Cho vi du ung dung
 * thuc te.
 */

// ============================================================
// BUOC 0: DINH NGHIA - BIEN 1 HAM NHIEU THAM SO thanh CHUOI HAM 1 THAM SO
// ============================================================
// Thay vi goi 1 ham voi TAT CA tham so CUNG LUC, currying cho phep goi
// LAN LUOT TUNG THAM SO MOT, MOI LAN goi TRA VE 1 HAM MOI (nho closure
// "GIU LAI" cac tham so DA truyen) cho DEN KHI DU THAM SO thi TRA VE
// KET QUA CUOI CUNG.

// Ham THUONG (khong curry):
function addNormal(a: number, b: number, c: number) {
  return a + b + c;
}
addNormal(1, 2, 3); // PHAI truyen DU 3 tham so CUNG LUC

// Ham DA CURRY (thu cong):
function addCurried(a: number) {
  return function (b: number) {
    return function (c: number) {
      return a + b + c; // "a" va "b" duoc GIU LAI qua CLOSURE
    };
  };
}
addCurried(1)(2)(3); // 6 - goi LAN LUOT tung tham so


// ============================================================
// UNG DUNG THUC TE #1: TAO HAM CHUYEN DUNG (specialized function) TU
// 1 HAM TONG QUAT
// ============================================================
function multiply(a: number) {
  return (b: number) => a * b;
}

const double = multiply(2); // "KHOA SAN" a = 2, tao ra 1 HAM MOI chuyen dung
const triple = multiply(3);

double(5); // 10
triple(5); // 15
// -> double/triple la CAC HAM TAI SU DUNG DUOC, khong can lap lai
//    "multiply(2, ...)" moi lan goi


// ============================================================
// UNG DUNG THUC TE #2: VALIDATION/FORM - tao ham validate CHUYEN DUNG
// ============================================================
function validateRange(min: number, max: number) {
  return (value: number) => value >= min && value <= max;
}

const isValidAge = validateRange(18, 60); // "khoa san" quy tac tuoi
const isValidScore = validateRange(0, 100); // "khoa san" quy tac diem so

isValidAge(25); // true
isValidScore(150); // false
// -> Moi RULE (validateRange) duoc DINH NGHIA 1 LAN, roi TAO RA nhieu
//    HAM VALIDATE cu the khac nhau ma KHONG PHAI viet lai logic so sanh


// ============================================================
// UNG DUNG THUC TE #3: REDUX MIDDLEWARE/HOC (Higher-Order Component)
// pattern hay dung trong React/RN - CHINH LA 1 DANG CURRYING
// ============================================================
// connect(mapStateToProps)(MyComponent) - day CHINH LA CURRYING:
//   connect NHAN mapStateToProps TRUOC, TRA VE 1 HAM MOI, HAM DO MOI
//   NHAN COMPONENT de TRA VE component DA "NOI" voi Redux store
// function connect(mapStateToProps: Function) {
//   return function (Component: any) {
//     return function (props: any) {
//       // ket hop state tu store + props goc, render Component
//     };
//   };
// }


// ============================================================
// TOM TAT NGAN GON DE TRA LOI PHONG VAN
// ============================================================
// "Currying la ky thuat bien 1 ham nhieu tham so thanh mot chuoi ham
// nhan 1 tham so, moi lan goi tra ve 1 ham moi nho closure giu lai cac
// tham so da truyen, cho den khi du tham so moi tra ve ket qua cuoi
// cung. Ung dung thuc te: tao cac ham chuyen dung tu 1 ham tong quat
// (vd validateRange(18, 60) tao ra 1 ham isValidAge tai su dung duoc),
// va day cung chinh la nguyen ly dung sau cac pattern quen thuoc nhu
// connect(mapStateToProps)(Component) trong Redux."
