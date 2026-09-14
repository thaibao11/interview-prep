/**
 * Sao chep NONG (shallow copy) - la gi, cach lam, gioi han.
 */

// ============================================================
// BUOC 0: VI SAO CAN "COPY" - noi tiep pass-by-value-vs-reference.ts
// ============================================================
// Vi object duoc gan/truyen QUA THAM CHIEU (file truoc da hoc), muon
// TAO 1 BAN SAO THAT SU DOC LAP (sua ban sao KHONG anh huong ban goc -
// dieu RAT QUAN TRONG cho IMMUTABILITY trong React/Redux), PHAI CHU
// DONG "COPY" object, khong the chi GAN "=" (gan chi copy tham chieu).


// ============================================================
// BUOC 1: SHALLOW COPY LA GI - CHI COPY "LOP NGOAI CUNG"
// ============================================================
// Shallow copy tao 1 OBJECT/MANG MOI, nhung CHI COPY CAC THUOC TINH O
// CAP 1 (top-level). NEU 1 thuoc tinh o cap 1 LAI LA 1 OBJECT/MANG
// KHAC (long nhau), GIA TRI DUOC COPY o day VAN LA THAM CHIEU (khong
// phai noi dung) - CA BAN GOC VA BAN SAO VAN CUNG TRO TOI OBJECT LONG
// NHAU DO.

const original = {
  name: "An",
  address: { city: "Ha Noi", zip: "100000" }, // OBJECT LONG NHAU
};

// 3 CACH LAM SHALLOW COPY PHO BIEN:
const copy1 = { ...original }; // spread operator
const copy2 = Object.assign({}, original); // Object.assign
const arrCopy = [...[1, 2, 3]]; // spread cho mang - slice()/concat()
// cua mang cung la shallow copy

copy1.name = "Binh"; // OK, CHI ANH HUONG copy1, KHONG anh huong original
console.log(original.name); // "An" - KHONG DOI

copy1.address.city = "Da Nang"; // NGUY HIEM! "address" o day VAN LA
// THAM CHIEU TOI CUNG 1 OBJECT voi original.address (shallow copy KHONG
// COPY SAU xuong cap 2)
console.log(original.address.city); // "Da Nang" - BI ANH HUONG THEO,
// DU minh chi sua "copy1"!


// ============================================================
// BUOC 2: LIEN HE THUC TE - LOI RAT HAY GAP TRONG REACT/REDUX
// ============================================================
// setUser((prev) => ({ ...prev, address: { ...prev.address, city: "HN" } }))
// -> PHAI shallow copy CA prev LAN prev.address (2 CAP) neu muon SUA
//    "city" ma KHONG mutate object address goc. Neu chi lam
//    { ...prev, address: prev.address } roi SUA truc tiep
//    result.address.city = "HN" o BEN NGOAI -> se VO TINH mutate luon
//    prev.address (vi CHI la shallow copy cap 1)


// ============================================================
// TOM TAT NGAN GON DE TRA LOI PHONG VAN
// ============================================================
// "Shallow copy tao object/mang moi nhung chi copy cac thuoc tinh o
// cap 1 - neu 1 thuoc tinh la object/mang long nhau, gia tri duoc copy
// van la THAM CHIEU, nen sua object long nhau qua ban sao VAN anh huong
// ban goc. Cach lam pho bien: spread operator (...), Object.assign(),
// hoac slice()/concat() cho mang. Day la loi rat hay gap trong React/
// Redux khi update state co cau truc long nhau nhieu cap - phai spread
// dung TUNG CAP can thay doi, khong chi spread cap ngoai cung."
