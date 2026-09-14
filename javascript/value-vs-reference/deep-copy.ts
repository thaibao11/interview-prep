/**
 * Sao chep SAU (deep copy) - la gi, cach lam, uu nhuoc diem tung cach.
 */

// ============================================================
// BUOC 0: DEEP COPY LA GI - COPY DE QUY XUONG MOI CAP
// ============================================================
// Deep copy tao 1 BAN SAO HOAN TOAN DOC LAP O MOI CAP - ke ca cac
// object/mang long nhau BEN TRONG cung duoc TAO BAN SAO MOI (khong con
// giu THAM CHIEU chung voi ban goc o BAT KY CAP NAO). Sua ban sao O BAT
// KY CAP NAO cung KHONG anh huong ban goc.


// ============================================================
// CACH 1: JSON.parse(JSON.stringify(obj)) - PHO BIEN NHUNG NHIEU HAN CHE
// ============================================================
const original = {
  name: "An",
  address: { city: "Ha Noi" },
  createdAt: new Date(),
  greet: function () {
    return "hello";
  },
  score: undefined,
  bigNumber: BigInt(100),
};

const deepCopy1 = JSON.parse(JSON.stringify(original));
console.log(deepCopy1.address); // { city: "Ha Noi" } - COPY SAU THAT SU,
// sua deepCopy1.address.city KHONG anh huong original.address.city

// HAN CHE cua cach nay:
// - MAT HET FUNCTION: deepCopy1.greet la undefined (JSON KHONG the bieu
//   dien function)
// - MAT thuoc tinh co gia tri undefined: deepCopy1.score KHONG TON TAI
//   (JSON.stringify BO QUA cac key co value la undefined)
// - Date BI BIEN THANH STRING: deepCopy1.createdAt la 1 CHUOI ISO, KHONG
//   CON LA object Date (mat het cac method nhu .getFullYear())
// - LOI NGAY neu co BigInt (nhu vi du tren) - JSON.stringify KHONG THE
//   serialize BigInt, se NEM LOI
// - LOI/MAT DU LIEU voi CIRCULAR REFERENCE (object tu tham chieu chinh
//   no) - JSON.stringify se NEM LOI "Converting circular structure to JSON"


// ============================================================
// CACH 2: structuredClone() - GIAI PHAP HIEN DAI, CO SAN TRONG JS/RN
// MOI (KHUYEN DUNG)
// ============================================================
const deepCopy2 = structuredClone(original);
// structuredClone GIU DUOC Date (van la object Date that), giu duoc
// BigInt, XU LY DUOC circular reference (KHONG loi), CHI VAN KHONG
// COPY DUOC FUNCTION (nem loi "could not be cloned" neu object co
// chua function) - vi ban chat function KHONG PHAI "du lieu thuan" de
// clone


// ============================================================
// CACH 3: THU VIEN structuredClone-like (lodash.cloneDeep)
// ============================================================
// import cloneDeep from "lodash/cloneDeep";
// const deepCopy3 = cloneDeep(original);
// -> Xu ly duoc HAU HET truong hop (Date, RegExp, Map, Set, circular
//    reference), NHUNG VAN KHONG the "clone" mot function theo dung
//    nghia (function se duoc GIU NGUYEN THAM CHIEU, khong tao ban sao
//    moi - vi function KHONG CO "trang thai du lieu" de sao chep)


// ============================================================
// CACH 4: TU VIET DE QUY (chi de HIEU CO CHE, HIEM KHI can tu viet
// trong du an thuc te vi da co structuredClone/lodash)
// ============================================================
function deepCloneManual(value: any): any {
  if (value === null || typeof value !== "object") {
    return value; // primitive - tra ve TRUC TIEP (da la "gia tri", khong
    // can copy gi them)
  }
  if (Array.isArray(value)) {
    return value.map((item) => deepCloneManual(item)); // DE QUY xuong
    // tung phan tu cua mang
  }
  const result: any = {};
  for (const key in value) {
    result[key] = deepCloneManual(value[key]); // DE QUY xuong tung
    // thuoc tinh - DAY LA LY DO GOI LA "SAU": copy TIEP TUC o MOI CAP
    // long nhau, khong dung lai o cap 1 nhu shallow copy
  }
  return result;
}


// ============================================================
// BANG SO SANH NHANH
// ============================================================
//                      | Function | Date/RegExp | Circular ref | BigInt
// JSON stringify/parse  | MAT      | thanh string | LOI          | LOI
// structuredClone       | LOI      | GIU NGUYEN   | XU LY DUOC   | GIU NGUYEN
// lodash cloneDeep      | giu tham chieu (khong clone) | GIU NGUYEN | XU LY DUOC | GIU NGUYEN


// ============================================================
// TOM TAT NGAN GON DE TRA LOI PHONG VAN
// ============================================================
// "Deep copy tao ban sao doc lap o MOI CAP, ke ca object/mang long nhau
// ben trong, khac shallow copy chi copy cap 1. Cach pho bien nhat la
// JSON.parse(JSON.stringify()), nhung co nhieu han che: mat function,
// mat thuoc tinh undefined, Date bi bien thanh string, va loi neu co
// circular reference hoac BigInt. Giai phap hien dai va duoc khuyen
// dung la structuredClone() - co san trong JS moi, giu duoc Date/BigInt
// va xu ly duoc circular reference, chi khong clone duoc function. Neu
// can ho tro cu hon hoac nhieu kieu du lieu dac biet hon, dung
// lodash.cloneDeep."
