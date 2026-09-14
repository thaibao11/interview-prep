/**
 * CAU 4 (Prototype & OOP): Object.freeze va Object.seal khac nhau ra sao.
 */

// ============================================================
// Object.seal - KHOA "CAU TRUC" (khong them/xoa thuoc tinh), NHUNG
// VAN CHO SUA GIA TRI thuoc tinh CO SAN
// ============================================================
const sealedConfig = Object.seal({ timeout: 5000, retries: 3 });

sealedConfig.timeout = 10000; // OK - VAN SUA DUOC GIA TRI cua thuoc
// tinh DA CO SAN
console.log(sealedConfig.timeout); // 10000

// sealedConfig.newField = "abc"; // KHONG CO TAC DUNG (silent fail o
// non-strict, LOI o strict mode) - KHONG THE THEM thuoc tinh MOI
// delete sealedConfig.retries; // KHONG CO TAC DUNG - KHONG THE XOA
// thuoc tinh DA CO


// ============================================================
// Object.freeze - KHOA CA "CAU TRUC" LAN "GIA TRI" - IMMUTABLE HOAN TOAN
// ============================================================
const frozenConfig = Object.freeze({ timeout: 5000, retries: 3 });

// frozenConfig.timeout = 10000; // KHONG CO TAC DUNG (silent fail o
// non-strict, LOI o strict mode) - KHONG THE SUA GIA TRI
console.log(frozenConfig.timeout); // VAN LA 5000, KHONG DOI

// frozenConfig.newField = "abc"; // KHONG THEM DUOC (giong seal)
// delete frozenConfig.retries; // KHONG XOA DUOC (giong seal)


// ============================================================
// BANG SO SANH TRUC TIEP
// ============================================================
//              | Them thuoc tinh moi | Xoa thuoc tinh | Sua GIA TRI thuoc tinh co san
// Object.seal   | KHONG duoc          | KHONG duoc     | VAN duoc
// Object.freeze | KHONG duoc          | KHONG duoc     | KHONG duoc
//
// -> freeze = seal + THEM rang buoc "khong sua duoc gia tri" -> freeze
//    la muc do "khoa" CHAT CHE HON seal


// ============================================================
// DIEM CHUNG QUAN TRONG - CA 2 DEU CHI LA SHALLOW (NONG), KHONG DE QUY
// XUONG OBJECT LONG NHAU
// ============================================================
const frozenUser = Object.freeze({
  name: "An",
  address: { city: "Ha Noi" }, // OBJECT LONG NHAU
});

frozenUser.address.city = "Da Nang"; // VAN SUA DUOC! vi freeze CHI ap
// dung cho CAP 1 (name, address) - BAN THAN "address" (object long
// nhau) KHONG bi freeze theo
console.log(frozenUser.address.city); // "Da Nang" - BI THAY DOI, DU
// frozenUser DA duoc Object.freeze()

// Muon freeze SAU (deep freeze), phai TU VIET DE QUY:
function deepFreeze<T extends object>(obj: T): Readonly<T> {
  Object.values(obj).forEach((value) => {
    if (value && typeof value === "object") {
      deepFreeze(value); // DE QUY xuong tung object long nhau
    }
  });
  return Object.freeze(obj);
}


// ============================================================
// KIEM TRA TRANG THAI - Object.isFrozen() / Object.isSealed()
// ============================================================
console.log(Object.isFrozen(frozenConfig)); // true
console.log(Object.isSealed(sealedConfig)); // true
console.log(Object.isSealed(frozenConfig)); // true - MOI object da
// FROZEN DEU DUOC COI LA SEALED (vi freeze la rang buoc CHAT CHE HON,
// BAO GOM CA dieu kien cua seal)


// ============================================================
// KHI NAO DUNG CAI NAO TRONG THUC TE
// ============================================================
// - Object.freeze: dung cho CONSTANT/CONFIG khong bao gio nen doi (vd
//   1 object chua cac ENUM/HANG SO trong app), hoac dam bao 1 object
//   duoc export ra KHONG BI module khac VO TINH MUTATE
// - Object.seal: IT DUNG HON trong thuc te, nhung huu ich khi muon GIU
//   CO DINH "HINH DANG" (shape) cua 1 object (khong cho them/bot
//   thuoc tinh - vd tranh go nham ten field) NHUNG VAN CAN CHO PHEP
//   CAP NHAT GIA TRI (vd 1 object state co schema co dinh nhung gia tri
//   thay doi lien tuc)


// ============================================================
// TOM TAT NGAN GON DE TRA LOI PHONG VAN
// ============================================================
// "Object.seal ngan khong cho them hoac xoa thuoc tinh, nhung VAN CHO
// PHEP sua gia tri cua thuoc tinh da co san. Object.freeze khoa CHAT
// CHE HON: ngoai viec khong cho them/xoa nhu seal, no CON khong cho sua
// gia tri thuoc tinh da co - immutable hoan toan o cap do do. Ca hai
// deu CHI LA SHALLOW (nong) - object long nhau ben trong VAN sua duoc
// binh thuong, muon khoa sau phai tu viet ham deep freeze de quy xuong
// tung cap. Trong thuc te minh dung freeze cho constant/config khong
// bao gio doi, con seal it dung hon, chi huu ich khi muon giu co dinh
// 'hinh dang' cua object nhung van cho phep cap nhat gia tri."
