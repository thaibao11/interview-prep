/**
 * CAU 1 (Prototype & OOP): Prototype chain hoat dong ra sao khi truy
 * cap 1 thuoc tinh.
 */

// ============================================================
// BUOC 0: MOI OBJECT DEU CO 1 LIEN KET AN toi "OBJECT CHA" - [[Prototype]]
// ============================================================
// Moi object trong JS deu co 1 thuoc tinh NOI BO (khong thay truc tiep
// trong vong lap for...in) ten la [[Prototype]], TRO TOI 1 OBJECT KHAC
// (hoac null). Co the XEM (khong nen SUA truc tiep trong code production)
// qua Object.getPrototypeOf() hoac thuoc tinh __proto__ (cu, khong khuyen dung).

const animal = { canMove: true };
const dog = Object.create(animal); // dog.[[Prototype]] = animal
dog.bark = true;

console.log(Object.getPrototypeOf(dog) === animal); // true


// ============================================================
// BUOC 1: TRUY CAP THUOC TINH - CO CHE "DI LEN" CHAIN CHO DEN KHI TIM
// THAY HOAC GAP null
// ============================================================
// Khi doc "obj.prop":
//   1. JS TIM TRONG CHINH "obj" TRUOC (own property)
//   2. NEU KHONG THAY, DI LEN [[Prototype]] cua obj, TIM TIEP o do
//   3. LAP LAI buoc 2 cho DEN KHI TIM THAY, hoac DEN KHI GAP "null"
//      (diem cuoi cua chain - Object.prototype.[[Prototype]] la null)
//   4. Neu DEN "null" ma VAN khong thay -> tra ve undefined

console.log(dog.bark); // true - TIM THAY o CHINH dog (own property)
console.log(dog.canMove); // true - KHONG co o dog, DI LEN toi "animal"
// (prototype cua dog), TIM THAY o do
console.log(dog.fly); // undefined - DI HET CA CHAIN (dog -> animal ->
// Object.prototype -> null) VAN khong thay, tra ve undefined


// ============================================================
// BUOC 2: VI DU CHAIN DAI HON - MINH HOA "DI LEN NHIEU TANG"
// ============================================================
const a = { x: 1 };
const b = Object.create(a); // b.[[Prototype]] = a
const c = Object.create(b); // c.[[Prototype]] = b

console.log(c.x); // 1 - c KHONG co "x", di len b (KHONG co), di len TIEP
// toi a (CO "x") -> tim thay, dung lai o day
// Chain day du: c -> b -> a -> Object.prototype -> null


// ============================================================
// BUOC 3: "in" (kiem tra CA CHAIN) vs hasOwnProperty (CHI kiem tra OWN)
// ============================================================
console.log("canMove" in dog); // true - "in" DUYET CA CHAIN
console.log(dog.hasOwnProperty("canMove")); // false - "canMove" KHONG
// PHAI thuoc tinh RIENG cua dog, no thuoc ve "animal" (prototype)
console.log(dog.hasOwnProperty("bark")); // true - "bark" la thuoc tinh
// RIENG, gan TRUC TIEP tren dog


// ============================================================
// BUOC 4: GAN GIA TRI (SET) KHONG "DI LEN" CHAIN NHU DOC (READ)
// ============================================================
// Khi GAN "obj.prop = value", JS (mac dinh, TRU KHI co setter tren
// chain) LUON TAO/GHI DE thuoc tinh TREN CHINH "obj", KHONG DI LEN
// prototype de sua thuoc tinh o do:

dog.canMove = false; // TAO 1 THUOC TINH MOI "canMove" TREN CHINH dog
// (KHONG sua animal.canMove)
console.log(dog.canMove); // false (own property MOI, che khuat prototype)
console.log(animal.canMove); // true - "animal" (prototype) VAN KHONG DOI
// -> day goi la "SHADOWING" (che khuat): own property MOI tren dog CHE
//    KHUAT thuoc tinh CUNG TEN tren prototype, khi doc se UU TIEN own
//    property truoc


// ============================================================
// BUOC 5: HIEU NANG - CHAIN CANG DAI, TRUY CAP CANG CHAM (VE MAT LY THUYET)
// ============================================================
// Vi phai "DI LEN" nhieu tang de tim thuoc tinh KHONG CO SAN o own
// property, prototype chain CANG DAI thi VIEC TRA CUU thuoc tinh o
// TANG CAO (hoac khong ton tai) CANG CHAM HON VE MAT LY THUYET. Cac JS
// engine hien dai (V8) co TOI UU RIENG (hidden classes/shapes) de GIAM
// thieu chi phi nay, nhung VE NGUYEN LY, CHAIN DAI van co chi phi tra
// cuu cao hon CHAIN NGAN.


// ============================================================
// TOM TAT NGAN GON DE TRA LOI PHONG VAN
// ============================================================
// "Moi object co 1 lien ket noi bo [[Prototype]] tro toi 1 object khac.
// Khi doc 1 thuoc tinh, JS tim trong chinh object do TRUOC, neu khong
// co thi DI LEN theo [[Prototype]] tim tiep, lap lai cho den khi tim
// thay hoac gap null (diem cuoi chain) thi tra ve undefined. 'in' kiem
// tra ca chain, con hasOwnProperty chi kiem tra thuoc tinh rieng cua
// object do. Khi GAN gia tri, JS KHONG di len chain de sua thuoc tinh
// o prototype, ma LUON tao/ghi de thuoc tinh TREN CHINH object dang
// duoc gan - goi la 'shadowing', che khuat thuoc tinh cung ten tren
// prototype khi doc sau do."
