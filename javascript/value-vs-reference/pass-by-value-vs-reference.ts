/**
 * Tham tri (pass by value) vs tham chieu (pass by reference) trong JS.
 */

// ============================================================
// BUOC 0: PRIMITIVE - TRUYEN THEO GIA TRI (COPY HOAN TOAN)
// ============================================================
// 7 kieu primitive: number, string, boolean, null, undefined, symbol,
// bigint. Khi GAN hoac TRUYEN VAO HAM, JS TAO 1 BAN SAO HOAN TOAN DOC
// LAP cua gia tri - SUA BAN SAO KHONG anh huong ban goc.

let a = 10;
let b = a; // b la 1 BAN SAO DOC LAP cua a, KHONG lien quan gi den a nua
b = 20;
console.log(a, b); // 10, 20 - "a" KHONG BI ANH HUONG

function tryToChange(x: number) {
  x = 999; // chi doi BAN SAO "x" ben trong ham, KHONG dong den bien goc
}
let num = 5;
tryToChange(num);
console.log(num); // van la 5


// ============================================================
// BUOC 1: OBJECT/ARRAY/FUNCTION - TRUYEN "THAM CHIEU" (chinh xac hon:
// TRUYEN GIA TRI CUA THAM CHIEU - "call by sharing")
// ============================================================
// Voi object/array, bien KHONG LUU TRUC TIEP du lieu - no LUU 1 THAM
// CHIEU (giong dia chi) TRO TOI noi du lieu that su nam trong HEAP. Khi
// GAN hoac TRUYEN VAO HAM, JS COPY THAM CHIEU DO (khong copy noi dung
// object) - CA 2 BIEN CUNG TRO TOI 1 OBJECT DUY NHAT trong bo nho.

const obj1 = { value: 10 };
const obj2 = obj1; // obj2 COPY THAM CHIEU, CA obj1 VA obj2 CUNG TRO TOI
// 1 OBJECT DUY NHAT trong heap
obj2.value = 20;
console.log(obj1.value); // 20 - obj1 CUNG BI ANH HUONG, vi CUNG 1 object

function mutateObject(o: { value: number }) {
  o.value = 999; // SUA THUOC TINH cua object ma "o" TRO TOI -> anh
  // huong ca object GOC ben ngoai ham
}
const myObj = { value: 5 };
mutateObject(myObj);
console.log(myObj.value); // 999 - BI THAY DOI


// ============================================================
// BUOC 2: DIEM DE NHAM - GAN LAI (reassign) THAM SO BEN TRONG HAM
// KHONG ANH HUONG BIEN GOC (khac voi MUTATE thuoc tinh o Buoc 1)
// ============================================================
function reassignObject(o: { value: number }) {
  o = { value: 999 }; // TAO 1 OBJECT HOAN TOAN MOI, gan cho BIEN CUC
  // BO "o" - CHI thay doi noi "o" (ban sao THAM CHIEU ben trong ham)
  // TRO TOI, KHONG anh huong toi bien goc ben ngoai (ma van tro toi
  // object CU)
}
const anotherObj = { value: 5 };
reassignObject(anotherObj);
console.log(anotherObj.value); // VAN LA 5 - KHONG BI ANH HUONG

// -> QUY TAC PHAN BIET: MUTATE thuoc tinh (o.value = ...) se ANH HUONG
//    ban goc (vi cung tro toi 1 object). GAN LAI toan bo bien (o = {...})
//    CHI doi noi bien cuc bo do tro toi, KHONG anh huong bien ben ngoai.


// ============================================================
// BUOC 3: VI SAO GOI CHINH XAC LA "PASS BY VALUE CUA THAM CHIEU"
// (khong phai "pass by reference" thuan tuy nhu C++/PHP)
// ============================================================
// Trong ngon ngu co "true pass by reference" (vd C++ voi &), ham CO
// THE GAN LAI HOAN TOAN bien BEN NGOAI (giong Buoc 2 se ANH HUONG duoc
// ban goc). Trong JS, Buoc 2 chung minh RANG GAN LAI KHONG anh huong
// ben ngoai - CHI CO THAM CHIEU (dia chi) LA duoc TRUYEN THEO GIA TRI
// (copy), CHU KHONG PHAI CHINH BIEN duoc truyen theo tham chieu that su.
// Vi vay, JavaScript CHINH XAC la "pass by value" cho MOI kieu du lieu -
// chi khac o CHO GIA TRI duoc copy la GI (voi primitive: du lieu that
// su; voi object: THAM CHIEU/dia chi toi du lieu).


// ============================================================
// TOM TAT NGAN GON DE TRA LOI PHONG VAN
// ============================================================
// "JavaScript truyen primitive theo gia tri - copy hoan toan doc lap,
// sua ban sao khong anh huong ban goc. Voi object/array, bien luu THAM
// CHIEU (dia chi) toi du lieu trong heap, va THAM CHIEU DO duoc COPY
// khi gan/truyen vao ham - nen 2 bien co the CUNG TRO TOI 1 OBJECT,
// MUTATE thuoc tinh qua bien nao cung anh huong ca 2. Nhung neu GAN LAI
// hoan toan bien (o = {...} moi) BEN TRONG ham, no CHI doi noi bien cuc
// bo do tro toi, KHONG anh huong bien ben ngoai - dieu nay chung minh
// JS thuc chat LUON la 'pass by value', chi khac la voi object, GIA TRI
// duoc truyen la THAM CHIEU chu khong phai du lieu that su."
