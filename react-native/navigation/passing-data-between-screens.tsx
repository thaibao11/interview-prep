/**
 * CAU 9 (React Native): Truyen du lieu LON giua 2 man hinh
 * ma khong nhet truc tiep vao navigation params.
 */

// ============================================================
// BUOC 0: TAI SAO khong nen nhet du lieu lon vao params
// ============================================================
// 1. React Navigation KHUYEN CAO params chi nen chua DU LIEU TOI THIEU
//    (id, string, so, boolean) - KHONG NEN chua object phuc tap, anh
//    base64, function, hay instance cua class.
// 2. Neu du an co BAT TINH NANG LUU/KHOI PHUC navigation state (vd luu
//    vao AsyncStorage de mo lai app dung dung man hinh cu) - du lieu
//    trong params SE BI SERIALIZE THANH JSON. Anh base64 lon hoac object
//    khong the serialize duoc (function, class instance) se GAY LOI hoac
//    LAM CHAM qua trinh luu/khoi phuc.
// 3. Du lieu trong params VAN TON TAI TRONG BO NHO SUOT THOI GIAN man
//    hinh do CON NAM TRONG STACK (chua bi pop ra) - neu la du lieu lon
//    (anh, danh sach dai), no chiem bo nho LAU HON CAN THIET.
// 4. Neu dung DEEP LINKING (Cau 8), params thuc chat anh xa tu QUERY
//    STRING cua URL - KHONG THE nhet 1 object/anh lon vao URL duoc,
//    URL chi hop ly voi du lieu don gian nhu id, string ngan.


// ============================================================
// BUOC 1: CACH 1 - Chi truyen ID, man dich TU LOAD lai du lieu
// (giong het cach URL web hoat dong: /product/123, khong phai
//  /product/{...toan bo du lieu san pham...})
// ============================================================
// KHONG NEN:
// navigation.navigate("ProductDetail", { product: hugeProductObject });

// NEN:
// navigation.navigate("ProductDetail", { productId: "123" });
// -> Man ProductDetail tu goi API hoac doc tu cache (React Query/SWR)
//    bang productId de lay du lieu day du


// ============================================================
// BUOC 2: CACH 2 - Luu vao GLOBAL STATE (Redux/Zustand/Context),
// chi truyen ID/KEY qua params de man dich tu doc tu store
// ============================================================
// Phu hop khi du lieu KHONG DEN TU API (vd: du lieu nguoi dung vua nhap
// o 1 form nhieu buoc - wizard), nen khong the "goi lai API" o man dich.

// import { useProductStore } from "./store"; // vi du dung Zustand
//
// // Man nguon:
// function ScreenA() {
//   const setDraftForm = useProductStore((s) => s.setDraftForm);
//   const onNext = () => {
//     setDraftForm(hugeFormData); // luu vao store TOAN CUC
//     navigation.navigate("ScreenB"); // KHONG truyen hugeFormData qua params
//   };
// }
//
// // Man dich:
// function ScreenB() {
//   const draftForm = useProductStore((s) => s.draftForm); // doc lai tu store
// }


// ============================================================
// BUOC 3: CACH 3 - Neu du lieu tu API, dung REACT QUERY/SWR CACHE
// thay vi truyen qua params
// ============================================================
// import { useQuery } from "@tanstack/react-query";
//
// function ScreenA() {
//   const { data } = useQuery(["product", "123"], fetchProduct);
//   // navigation.navigate("ProductDetail", { productId: "123" }); // chi truyen id
// }
//
// function ScreenB({ route }: any) {
//   const { productId } = route.params;
//   // CUNG KEY ["product", productId] -> React Query TRA VE NGAY tu cache,
//   // KHONG can goi lai API, ma cung KHONG can truyen object qua params
//   const { data } = useQuery(["product", productId], fetchProduct);
// }


// ============================================================
// BUOC 4: VI DU THUC TE - chup anh xong chuyen sang man Preview
// (rat hay gap: KHONG BAO GIO truyen anh base64 qua params)
// ============================================================
// KHONG NEN:
// navigation.navigate("PhotoPreview", { photoBase64: hugeBase64String });
// -> string base64 cua 1 tam anh co the vai MB, nhet vao params se lam
//    NANG TOAN BO navigation state, va CHAC CHAN loi neu co bat state
//    persistence

// NEN: Camera/ImagePicker tra ve 1 FILE PATH (uri) tren thiet bi, chi
// truyen CAI URI DO (1 string ngan) qua params:
// navigation.navigate("PhotoPreview", { photoUri: result.assets[0].uri });
// -> Man PhotoPreview dung <Image source={{ uri: photoUri }} /> de doc
//    truc tiep tu file, KHONG can qua params du lieu nang


// ============================================================
// TOM TAT NGAN GON DE TRA LOI PHONG VAN
// ============================================================
// "Params nen chi chua du lieu toi thieu (id, string ngan), vi params co
// the bi serialize khi luu/khoi phuc navigation state, ton bo nho suot
// luc man hinh con trong stack, va khong the nhet du lieu lon vao URL
// khi dung deep linking. Cach xu ly: (1) chi truyen ID roi man dich tu
// goi API/doc cache lay du lieu day du, (2) voi du lieu khong tu API
// (vd form nhieu buoc) thi luu vao global state (Redux/Zustand), chi
// truyen key qua params, (3) voi du lieu tu API thi dung chung React
// Query cache key giua 2 man de khong can goi lai API ma cung khong
// can truyen qua params. Vi du thuc te: chup anh xong chi truyen file
// uri qua params, khong bao gio truyen ca chuoi base64 cua anh."
