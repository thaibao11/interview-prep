/**
 * CAU 1 (Functional Programming): Pure function la gi? Tai sao quan
 * trong trong React?
 */

// ============================================================
// BUOC 0: DINH NGHIA - 2 DIEU KIEN
// ============================================================
// 1 ham la PURE FUNCTION khi thoa CA 2 dieu kien:
//   1. CUNG 1 DAU VAO LUON CHO CUNG 1 DAU RA (deterministic) - khong
//      phu thuoc bien ben ngoai co the thay doi, khong phu thuoc
//      Math.random(), Date.now()...
//   2. KHONG CO SIDE EFFECT - khong SUA DOI du lieu BEN NGOAI pham vi
//      cua no (khong mutate tham so dau vao, khong ghi file, khong goi
//      API, khong console.log lam thay doi trang thai he thong)

// KHONG PURE (vi pham dieu kien 2 - MUTATE tham so dau vao):
function addItemBad(cart: string[], item: string) {
  cart.push(item); // SUA DOI truc tiep mang "cart" duoc truyen vao -
  // ai giu tham chieu "cart" o ben ngoai CUNG BI ANH HUONG ngoai y muon
  return cart;
}

// PURE (tra ve MANG MOI, KHONG dong den "cart" goc):
function addItemGood(cart: string[], item: string) {
  return [...cart, item]; // tao mang MOI, "cart" ben ngoai VAN NGUYEN VEN
}

// KHONG PURE (vi pham dieu kien 1 - phu thuoc Date.now() ben ngoai):
function getGreetingBad() {
  const hour = new Date().getHours();
  return hour < 12 ? "Chao buoi sang" : "Chao buoi chieu";
  // GOI 2 LAN o 2 THOI DIEM KHAC NHAU co the ra 2 KET QUA KHAC NHAU
}


// ============================================================
// BUOC 1: TAI SAO QUAN TRONG TRONG REACT
// ============================================================
// 1. REACT COMPONENT (function component) PHAI LA PURE FUNCTION THEO
//    dung nghia tren: CUNG 1 props/state PHAI render ra CUNG 1 giao
//    dien. React co the GOI LAI component NHIEU LAN (vd trong Strict
//    Mode, hoac Concurrent Mode danh gia lai render) - neu component
//    KHONG PURE (vd tu y doi 1 bien global trong luc render), KET QUA
//    SE KHONG DU DOAN DUOC.
//
// 2. REDUCER (Redux/useReducer) BAT BUOC PHAI PURE: cung 1 (state,
//    action) PHAI LUON tra ve CUNG 1 state moi - day la dieu kien de
//    TIME-TRAVEL DEBUGGING (Redux DevTools) va CACHE/MEMOIZATION hoat
//    dong DUNG (vd React.memo/useMemo dua vao gia dinh ham la pure de
//    QUYET DINH co the BO QUA tinh lai hay khong)
//
// 3. IMMUTABILITY (KHONG mutate state truc tiep) CHINH LA HE QUA TRUC
//    TIEP cua pure function - day la ly do vi sao setState/dispatch
//    LUON yeu cau tra ve OBJECT/MANG MOI thay vi sua truc tiep: neu
//    MUTATE truc tiep, React KHONG THE phat hien duoc state DA THAY
//    DOI (vi so sanh tham chieu Object.is - state CU va MOI VAN CUNG 1
//    THAM CHIEU neu bi mutate truc tiep) -> COMPONENT SE KHONG RE-RENDER


// ============================================================
// TOM TAT NGAN GON DE TRA LOI PHONG VAN
// ============================================================
// "Pure function la ham cung dau vao luon cho cung dau ra, va khong co
// side effect (khong mutate tham so, khong phu thuoc/thay doi trang
// thai ben ngoai). No quan trong trong React vi component va reducer
// deu phai la pure function - React co the goi lai component nhieu lan
// va can dam bao ket qua nhat quan, con reducer pure la dieu kien de
// Redux DevTools time-travel va React.memo/useMemo hoat dong dung. Day
// cung la ly do vi sao React yeu cau immutability - neu mutate state
// truc tiep thay vi tra ve object/mang moi, React so sanh tham chieu se
// khong phat hien duoc thay doi va se KHONG re-render."
