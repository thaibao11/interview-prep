/**
 * CAU 1 (TypeScript): interface va type khac nhau o diem nao? Khi nao
 * chon cai nao.
 */

// ============================================================
// BUOC 0: DIEM GIONG NHAU - PHAN LON TRUONG HOP DUNG DUOC CA 2
// ============================================================
interface UserInterface {
  name: string;
  age: number;
}

type UserType = {
  name: string;
  age: number;
};
// Voi OBJECT SHAPE don gian nhu tren, interface va type HOAT DONG Y
// HET NHAU - day la ly do nhieu nguoi thay "roi", nhung khac biet nam o
// NHUNG TINH NANG interface KHONG CO ma type LAM DUOC (va nguoc lai).


// ============================================================
// KHAC BIET 1: type LAM DUOC UNION/INTERSECTION, interface THI KHONG
// TRUC TIEP
// ============================================================
type Status = "loading" | "success" | "error"; // UNION TYPE - interface
// KHONG THE lam duoc dieu nay (interface CHI mo ta OBJECT SHAPE)

type ID = string | number; // union voi primitive
type Combined = UserType & { role: string }; // INTERSECTION - "&"


// ============================================================
// KHAC BIET 2: interface HO TRO "DECLARATION MERGING" (khai bao nhieu
// lan, TU DONG GOP LAI), type THI KHONG (khai bao trung se BAO LOI)
// ============================================================
interface Window {
  myCustomProperty: string;
}
interface Window {
  anotherProperty: number;
}
// -> Ca 2 khai bao TREN duoc TU DONG GOP thanh 1 interface Window duy
//    nhat co CA 2 thuoc tinh - RAT HUU ICH khi CAN MO RONG 1 type CO
//    SAN tu thu vien ngoai (vd mo rong interface cua 1 thu vien third-
//    party ma khong sua duoc code goc cua no)

// type NGUOC LAI - khai bao TRUNG TEN se LOI NGAY:
// type Config = { a: string };
// type Config = { b: number }; // Loi: Duplicate identifier 'Config'


// ============================================================
// KHAC BIET 3: interface CHI mo ta duoc OBJECT/CLASS SHAPE, type MO TA
// duoc BAT KY KIEU DU LIEU NAO (bao gom primitive, tuple, mapped type)
// ============================================================
type Point = [number, number]; // TUPLE - interface KHONG lam duoc
type Keys = keyof UserType; // "name" | "age" - mapped/lookup type
type Nullable<T> = T | null; // generic alias voi union - rat linh hoat


// ============================================================
// QUY TAC CHON NHANH
// ============================================================
// - Mo ta SHAPE cua OBJECT/CLASS (props cua component, response tu
//   API...) VA co the CAN MO RONG SAU NAY (declaration merging) -> interface
// - Can UNION, INTERSECTION, TUPLE, hoac cac PHEP BIEN DOI TYPE PHUC
//   TAP (mapped type, conditional type) -> type
//
// TRONG THUC TE (vd voi React/RN): PROPS CUA COMPONENT thuong dung
// interface (vi la object shape, va co the can extends sau nay); con
// STATE CO NHIEU TRANG THAI KHAC NHAU (loading/success/error) thuong
// dung type UNION (vi interface khong lam duoc union)

interface ButtonProps {
  label: string;
  onPress: () => void;
}

type RequestState =
  | { status: "loading" }
  | { status: "success"; data: string }
  | { status: "error"; message: string };
// -> DISCRIMINATED UNION nay CHI lam duoc bang "type", va la pattern
//    RAT PHO BIEN de mo ta trang thai 1 request API


// ============================================================
// TOM TAT NGAN GON DE TRA LOI PHONG VAN
// ============================================================
// "Voi object shape don gian, interface va type dung nhu nhau. Khac
// biet chinh: interface ho tro declaration merging (khai bao nhieu lan
// tu dong gop lai, huu ich khi mo rong type cua thu vien ngoai), con
// type lam duoc union/intersection/tuple va cac phep bien doi type phuc
// tap ma interface khong lam duoc. Quy tac minh thuong dung: props cua
// component dung interface vi la object shape va co the can extends,
// con trang thai co nhieu nhanh khac nhau (vd loading/success/error cua
// 1 request) dung type union, vi interface khong the lam discriminated
// union."
