/**
 * CAU 2 (Prototype & OOP): class trong ES6 co phai la "syntactic sugar"
 * HOAN TOAN cho prototype khong?
 *
 * TRA LOI THANG: PHAN LON DUNG, nhung KHONG PHAI 100% - co vai KHAC
 * BIET THAT SU, khong chi la "cach viet khac".
 */

// ============================================================
// BUOC 0: PHAN GIONG NHAU - class BEN DUOI VAN LA HAM CONSTRUCTOR +
// PROTOTYPE
// ============================================================
class Animal {
  constructor(public name: string) {}
  speak() {
    return `${this.name} phat ra am thanh`;
  }
}

// VE CO BAN, TUONG DUONG voi cach viet PROTOTYPE THUAN (pre-ES6):
function AnimalOld(this: any, name: string) {
  this.name = name;
}
AnimalOld.prototype.speak = function (this: any) {
  return `${this.name} phat ra am thanh`;
};
// -> ca 2 CACH deu tao ra: 1 ham constructor, va method "speak" nam
//    tren "AnimalOld.prototype" (KHONG PHAI tren tung instance) - day
//    la PHAN "syntactic sugar" DUNG: class chi la CACH VIET GON HON
//    cho DUNG CO CHE prototype nay


// ============================================================
// KHAC BIET 1: class BODY LUON CHAY O STRICT MODE, DU FILE KHONG CO
// "use strict"
// ============================================================
class StrictExample {
  method() {
    // BEN TRONG class, LUON la strict mode (vd "this" trong ham thuong
    // se la undefined thay vi global object neu goi SAI CACH)
  }
}
// Ham constructor kieu CU (function AnimalOld...) KHONG TU DONG strict
// mode - PHAI TU THEM "use strict" thu cong neu muon


// ============================================================
// KHAC BIET 2: GOI class MA KHONG CO "new" SE LOI NGAY LAP TUC
// ============================================================
// class Animal { ... }
// const a = Animal("Meo"); // TypeError: Class constructor Animal
// cannot be invoked without 'new'

// Ham constructor kieu CU: GOI THIEU "new" VAN CHAY (khong loi ngay),
// nhung "this" se BI SAI (tro toi global object hoac undefined trong
// strict mode) - day la 1 LOAI BUG NGAM, RAT KHO PHAT HIEN:
function OldConstructor(this: any, name: string) {
  this.name = name; // neu goi thieu "new", "this" co the la global
  // object, VO TINH GAN "name" len BIEN TOAN CUC!
}
// OldConstructor("test"); // KHONG loi, nhung SAI Y DO, gay bug ngam
// -> class AN TOAN HON o diem nay, CHU DONG chan loi NGAY LUC GOI SAI


// ============================================================
// KHAC BIET 3: METHOD DUOC DINH NGHIA QUA class LA NON-ENUMERABLE
// (khong hien trong for...in/Object.keys), CACH CU LA ENUMERABLE
// ============================================================
class ModernClass {
  method() {}
}
console.log(Object.keys(ModernClass.prototype)); // [] - method KHONG
// XUAT HIEN (non-enumerable mac dinh)

function OldClass(this: any) {}
OldClass.prototype.method = function () {};
console.log(Object.keys(OldClass.prototype)); // ["method"] - XUAT HIEN
// (enumerable mac dinh khi gan truc tiep len prototype theo cach cu)


// ============================================================
// KHAC BIET 4: class KHONG DUOC HOISTING GIONG function DECLARATION
// ============================================================
// new Vehicle(); // ReferenceError: Cannot access 'Vehicle' before
// initialization (class BI "hoisted" NHUNG nam trong Temporal Dead
// Zone - giong let/const, KHAC voi function declaration THUONG duoc
// hoisted VA GOI DUOC TRUOC ca noi khai bao)
class Vehicle {}

// function GoiDuocTruoc() { return "OK"; } // Ham thuong CO THE GOI
// TRUOC ca dong khai bao, vi duoc hoisted DAY DU (khong TDZ)


// ============================================================
// TOM TAT NGAN GON DE TRA LOI PHONG VAN
// ============================================================
// "Phan lon dung - class ben duoi van la ham constructor + method nam
// tren prototype, giong het co che truoc ES6. Nhung KHONG PHAI 100% chi
// la 'cach viet khac' - co vai khac biet THAT SU: class body luon chay
// strict mode ngam dinh; goi class ma thieu 'new' se BAO LOI NGAY (con
// ham constructor kieu cu van chay nhung 'this' bi sai, gay bug ngam);
// method dinh nghia qua class la non-enumerable (khong hien trong
// Object.keys/for...in), con cach cu la enumerable; va class nam trong
// Temporal Dead Zone giong let/const, khong duoc hoisting day du nhu
// function declaration. Vi vay minh se noi 'gan nhu la syntactic sugar,
// nhung co them mot so rang buoc an toan hon o phia engine'."
