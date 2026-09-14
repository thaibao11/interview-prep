/**
 * CAU 2: Closure la gi?
 * Di tu don gian -> phuc tap, moi buoc chi them 1 y moi.
 */

// ============================================================
// BUOC 0: On lai - binh thuong bien chi song trong luc ham chay
// ============================================================
function normal() {
  let x = 10;
  console.log(x); // 10
}
normal();
// Sau khi normal() chay xong, bien x bien mat khoi bo nho.
// console.log(x); // Loi: x is not defined


// ============================================================
// BUOC 1: Ham long nhau (nested function) - ham con DOC duoc
// bien cua ham cha, MIEN LA con goi no o BEN TRONG ham cha
// ============================================================
function outer1() {
  let x = 10;

  function inner() {
    console.log(x); // inner "nhin thay" x cua outer1 -> 10
  }

  inner(); // goi luon o day, trong khi outer1 van dang chay
}
outer1();
// Cai nay CHUA phai diem dac biet cua closure, day chi la scope binh thuong
// (giong nhu vong lap if/for van doc duoc bien ben ngoai).


// ============================================================
// BUOC 2: DIEM MAU CHOT - TRA ham con ra ngoai, roi goi SAU
// Day moi thuc su la "closure"
// ============================================================
function outer2() {
  let x = 10;

  function inner() {
    console.log(x);
  }

  return inner; // KHONG goi inner() o day, ma TRA VE chinh no
}

const myInner = outer2(); // outer2() da CHAY XONG va "return" roi
myInner(); // nhung khi goi myInner o day, no VAN in ra 10

// -> Cau hoi: outer2() da chay xong tu lau, sao inner() van biet x = 10?
// -> Vi khi tao ra, inner "dinh kem" theo no 1 tham chieu toi scope cua outer2,
//    goi la CLOSURE. x khong bi don rac (garbage collect) vi inner con giu no.
//    Đây chính là dinh nghia: closure = ham + moi truong (bien) noi no duoc tao ra.


// ============================================================
// BUOC 3: Ham con khong chi DOC ma con SUA duoc bien cua ham cha,
// va gia tri duoc GIU NGUYEN qua nhieu lan goi (state duoc "nho")
// ============================================================
function outer3() {
  let x = 0; // bat dau tu 0

  function inner() {
    x = x + 1; // moi lan goi, tang x len 1 va NHO ket qua cho lan sau
    console.log(x);
  }

  return inner;
}

const increment = outer3();
increment(); // 1
increment(); // 2
increment(); // 3
// -> x KHONG bi reset ve 0 moi lan goi increment().
//    increment "mang theo" bien x rieng cua no, sua roi thi lan sau van con gia tri moi.


// ============================================================
// BUOC 4: Moi lan goi ham cha se tao ra 1 closure MOI, DOC LAP nhau
// ============================================================
const incrementA = outer3(); // lan goi outer3() nay tao ra 1 bien x rieng
const incrementB = outer3(); // lan goi nay tao ra 1 bien x KHAC, khong lien quan

incrementA(); // 1   (x cua A = 1)
incrementA(); // 2   (x cua A = 2)
incrementB(); // 1   (x cua B = 1, khong bi anh huong boi A)
// -> Giong nhu 2 "hop" rieng biet, moi hop co 1 bien x cua rieng no.


// ============================================================
// BUOC 5: AP DUNG THUC TE - dung closure de tao "private state"
// (bien ma ben ngoai KHONG THE dong truc tiep, chi thao tac qua ham duoc cho phep)
// ============================================================
function createCounter() {
  let count = 0; // "private" - khong co cach nao dong count tu ben ngoai

  return {
    increment: () => { count++; return count; },
    decrement: () => { count--; return count; },
    reset: () => { count = 0; },
    getValue: () => count,
  };
}

const counter = createCounter();
counter.increment();
counter.increment();
console.log(counter.getValue()); // 2
// console.log(counter.count); // undefined - khong the "dong" truc tiep, phai qua cac ham duoc expose


// ============================================================
// BUOC 6: BAI TAP AP DUNG - makeAdder
// Giong Buoc 4 (moi lan goi ham cha = 1 closure doc lap),
// chi khac la bien duoc "mang theo" la THAM SO, khong phai let
// ============================================================
function makeAdder(x: number) {
  return function (y: number) {
    return x + y; // ham nay "nho" x cua lan goi makeAdder tuong ung
  };
}

const add5 = makeAdder(5);   // ba lo rieng: x = 5
const add10 = makeAdder(10); // ba lo rieng KHAC: x = 10

console.log(add5(2));    // 7   (5 + 2, dung ba lo cua add5)
console.log(add10(2));   // 12  (10 + 2, dung ba lo cua add10)
console.log(add5(100));  // 105 (van la ba lo cu cua add5, x=5 khong doi)


// ============================================================
// TOM TAT NGAN GON DE TRA LOI PHONG VAN
// ============================================================
// "Closure la khi mot ham con giu duoc tham chieu toi bien cua ham cha,
//  ngay ca sau khi ham cha da chay xong. Nho vay minh dung closure de tao
//  private state - bien khong the truy cap truc tiep tu ben ngoai, chi
//  thao tac duoc thong qua cac ham duoc "expose" ra."
