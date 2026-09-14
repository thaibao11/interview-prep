/**
 * CAU 4 (ES6+): Spread va rest operator khac nhau o ngu canh nao.
 *
 * Ca 2 DUNG CHUNG 1 KY HIEU "..." - KHAC NHAU O CHIEU DU LIEU DI
 * (spread = "MO RA/TACH RA", rest = "GOM LAI/THU THAP")
 */

// ============================================================
// SPREAD - "TACH" 1 cau truc THANH cac phan tu rieng le
// ============================================================

// 1. Spread trong MANG - tao mang moi tu (cac) mang cu, KHONG MUTATE
// mang goc (quan trong cho immutability - React/Redux hay dung)
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5]; // [1, 2, 3, 4, 5] - arr1 KHONG BI DOI

// 2. Spread trong OBJECT - copy/merge object, tao BAN SAO MOI
const user = { name: "An", age: 25 };
const updatedUser = { ...user, age: 26 }; // { name: "An", age: 26 } -
// user GOC KHONG BI DOI (shallow copy - chi copy nong 1 cap, object
// long nhau ben trong VAN CHUNG tham chieu)

// 3. Spread khi GOI HAM - "TACH" 1 mang thanh CAC THAM SO rieng le
function sum(a: number, b: number, c: number) {
  return a + b + c;
}
const nums = [1, 2, 3];
sum(...nums); // TUONG DUONG sum(1, 2, 3)


// ============================================================
// REST - "GOM" nhieu phan tu/thuoc tinh RIENG LE THANH 1 cau truc
// ============================================================

// 1. Rest trong THAM SO HAM - gom cac tham so THUA thanh 1 mang
function sumAll(...numbers: number[]) {
  // "numbers" la 1 MANG chua TAT CA tham so duoc truyen vao, du bao
  // nhieu cai
  return numbers.reduce((total, n) => total + n, 0);
}
sumAll(1, 2, 3, 4, 5); // numbers = [1, 2, 3, 4, 5]

// 2. Rest trong DESTRUCTURING mang - gom PHAN CON LAI thanh 1 mang
const [first, second, ...restOfArray] = [1, 2, 3, 4, 5];
// first = 1, second = 2, restOfArray = [3, 4, 5]

// 3. Rest trong DESTRUCTURING object - gom cac thuoc tinh CON LAI
// (RAT HAY DUNG de "loai bo 1 thuoc tinh" khoi object mot cach immutable)
const { password, ...userWithoutPassword } = { name: "An", age: 25, password: "123" };
// userWithoutPassword = { name: "An", age: 25 } - loai bo "password"
// MA KHONG CAN viet delete object.password (mutate truc tiep)


// ============================================================
// CACH PHAN BIET NGAY LAP TUC: NHIN VI TRI xuat hien "..."
// ============================================================
// - Xuat hien BEN PHAI dau "=" (trong 1 gia tri dang duoc TAO RA), hoac
//   trong LOI GOI HAM -> DO LA SPREAD (dang "TACH RA")
// - Xuat hien BEN TRAI dau "=" (trong khai bao bien/destructuring),
//   hoac trong DANH SACH THAM SO cua ham -> DO LA REST (dang "GOM LAI")


// ============================================================
// TOM TAT NGAN GON DE TRA LOI PHONG VAN
// ============================================================
// "Spread va rest dung chung ky hieu ba cham nhung nguoc chieu nhau:
// spread TACH 1 mang/object THANH cac phan tu rieng le - dung de copy/
// merge mang hoac object mot cach immutable, hoac truyen 1 mang lam
// nhieu tham so cho ham. Rest GOM nhieu gia tri rieng le THANH 1 cau
// truc - dung trong danh sach tham so ham de nhan so luong tham so bat
// ky, hoac trong destructuring de gom phan con lai (rat hay dung de
// loai bo 1 thuoc tinh khoi object mot cach immutable, thay vi dung
// delete). Cach phan biet nhanh: spread nam ben phai dau bang hoac
// trong loi goi ham, rest nam ben trai dau bang hoac trong danh sach
// tham so."
