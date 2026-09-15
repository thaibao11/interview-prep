/**
 * DOC FILE NAY TRUOC TIEN - truoc ca 4 file kia trong thu muc nay.
 *
 * TOAN BO TypeScript essentials chi xoay quanh DUNG 1 VIEC:
 * "MO TA HINH DANG cua du lieu, DE BAO LOI SOM neu dung SAI hinh dang do."
 * 4 chu de con lai chi la 4 GIAI DOAN cua CUNG 1 QUY TRINH.
 */

// ============================================================
// CAU CHUYEN: "MO TA - TAI SU DUNG/BIEN DOI - THU HEP" (3 GIAI DOAN)
// ============================================================

// ------------------------------------------------------------
// GIAI DOAN 1: MO TA 1 "HINH DANG" DU LIEU - interface / type
// ------------------------------------------------------------
// Ban CAN NOI CHO TypeScript BIET "1 User TRONG TAY TOI CO NHUNG GI":
interface User {
  id: string;
  name: string;
}
// Hoac dung "type" - GIONG NHAU o truong hop nay, CHI KHAC khi can
// UNION (nhieu kha nang) hoac declaration merging (Cau
// interface-vs-type.ts giai thich chi tiet 2 diem khac nay)


// ------------------------------------------------------------
// GIAI DOAN 2: TAI SU DUNG/BIEN DOI hinh dang do CHO NHIEU NGU CANH
// KHAC NHAU - KHONG PHAI VIET LAI TU DAU MOI LAN
// ------------------------------------------------------------
// Cach 1 - GENERIC: THAM SO HOA hinh dang, dung 1 HAM/TYPE cho NHIEU
// KIEU DU LIEU khac nhau, ma van GIU duoc thong tin kieu chinh xac:
function firstItem<T>(arr: T[]): T {
  return arr[0];
}
// (Chi tiet: generics.ts)

// Cach 2 - UTILITY TYPE: BIEN DOI 1 hinh dang CO SAN (vd User o tren)
// THANH 1 hinh dang MOI, KHONG CAN dinh nghia lai tu dau:
type UserPreview = Pick<User, "id">; // "LAY 1 PHAN" hinh dang User
type UserDraft = Partial<User>; // "LAM MEM" hinh dang User (tuy chon het)
// (Chi tiet: utility-types.ts)


// ------------------------------------------------------------
// GIAI DOAN 3: THU HEP (narrow) 1 hinh dang RONG XUONG hinh dang CU
// THE HON, NGAY LUC DANG VIET LOGIC (khong phai luc dinh nghia type nua)
// ------------------------------------------------------------
// Neu 1 bien co the la NHIEU HINH DANG (union), TypeScript CAN BAN
// "CHUNG MINH" (bang if/typeof/instanceof...) DANG CAM HINH DANG NAO
// TRONG TAY TRUOC KHI CHO PHEP dung cac thuoc tinh RIENG cua hinh dang do:
function printId(id: string | number) {
  if (typeof id === "string") {
    id.toUpperCase(); // TypeScript TIN la string O DAY, vi vua "chung minh"
  }
}
// (Chi tiet: type-narrowing.ts)


// ============================================================
// SO DO 1 DONG DE NHAM MAT HINH DUNG CA 4 CHU DE LA 1 QUY TRINH
// ============================================================
//
//   MO TA hinh dang (interface/type)
//         |
//         v
//   TAI SU DUNG/BIEN DOI hinh dang do (generic = tham so hoa,
//                                       utility type = bien doi co san)
//         |
//         v
//   THU HEP hinh dang RONG (union) xuong CU THE luc dung THAT (narrowing)


// ============================================================
// CACH TU KIEM TRA XEM DA NHO DUNG MACH CHUA
// ============================================================
// Tu hoi lai THEO DUNG THU TU, khong nhin dap an:
//   1. TypeScript "lam 1 viec" gi la chinh - noi bang 1 cau?
//   2. Giai doan "MO TA" dung 2 cong cu nao, khac nhau O DIEM GI?
//   3. Giai doan "TAI SU DUNG/BIEN DOI" co 2 huong, moi huong giai
//      quyet van de gi khac nhau?
//   4. Giai doan "THU HEP" giai quyet van de gi - TAI SAO CAN NO (neu
//      khong co no thi bi loi gi)?
//
// Tra loi duoc ca 4 cau THEO DUNG MACH la nam vung duoc TOAN BO chu de -
// ten ham cu the (Pick, Omit, Record...) chi la "CHI TIET DIEN VAO" O
// GIAI DOAN 2, khong can hoc thuoc rieng le tung cai.


// ============================================================
// TOM TAT 1 CAU (hoc thuoc cau nay la du de mo dau cau tra loi)
// ============================================================
// "TypeScript xoay quanh viec mo ta hinh dang du lieu bang interface/
// type, roi tai su dung hoac bien doi hinh dang do cho nhieu ngu canh
// khac nhau bang generic (tham so hoa) hoac utility type (bien doi
// hinh dang co san nhu Pick/Omit/Partial), va cuoi cung la thu hep 1
// hinh dang rong (union) xuong cu the ngay luc viet logic bang
// typeof/instanceof/discriminated union, de TypeScript biet chinh xac
// dang cam hinh dang nao trong tay truoc khi cho phep dung thuoc tinh
// rieng cua no."
