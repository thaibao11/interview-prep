/**
 * DOC FILE NAY TRUOC KHI DOC bridge-architecture.ts va new-architecture.ts
 *
 * Day la "cau chuyen" tom tat toan bo Architecture theo 1 MACH NHAN-QUA
 * DUY NHAT - hoc theo mach nay DE NHO LAU HON la hoc thuoc tung doan roi.
 * Neu quen 1 vai thuat ngu, chi can nho DUNG MACH nay la TU SUY RA LAI DUOC.
 */

// ============================================================
// CAU CHUYEN: "RN co 2 THE GIOI, va chung noi chuyen VOI NHAU
// NGAY CANG TE HON theo thoi gian... cho den khi duoc SUA"
// ============================================================

// BUOC 1 - XUAT PHAT DIEM
// RN co JS THREAD (code React chay) va NATIVE/UI THREAD (view that) -
// 2 THE GIOI TACH BIET, KHONG chung bo nho, khac ngon ngu.

// BUOC 2 - VAN DE (BRIDGE)
// Ngay xua, de noi chuyen, chung dung BRIDGE: MOI THU phai bien thanh
// CHUOI JSON, XEP HANG, gui qua, roi ben kia doc lai. Bridge co 2 TAT
// XAU CHI MANG:
//   (a) CHI goi duoc BAT DONG BO (khong doc ket qua ngay lap tuc duoc)
//   (b) TON CHI PHI serialize/deserialize - cang gui NHIEU/LIEN TUC
//       (animation, gesture, list dai) cang TE

// BUOC 3 - GIAI PHAP GOC (JSI)
// Vi Bridge co 2 tat do, nguoi ta sinh ra JSI de giai quyet DUNG GOC:
// JS giu THANG THAM CHIEU toi object native, goi TRUC TIEP, ke ca
// DONG BO - KHONG CON phai dong goi JSON qua hang doi nua.

// BUOC 4 - 2 DUA CON CUA JSI
// Tu nen tang JSI do, sinh ra them 2 dua con:
//   - FABRIC        -> dung JSI de RENDER UI nhanh hon (thay renderer cu
//                      phai vuot Bridge)
//   - TURBOMODULES  -> dung JSI de GOI NATIVE MODULE, va tien the
//                      LAZY-LOAD (chi khoi tao khi thuc su dung, thay vi
//                      load het luc mo app)

// BUOC 5 - VAN DE MOI PHAT SINH, VA GIAI PHAP (CODEGEN)
// Nhung goi thang qua JSI thi mat luon cai "kiem tra ngam" ma JSON tung
// vo tinh mang lai - nen can CODEGEN: viet TRUOC 1 hop dong (spec) bang
// TypeScript, Codegen TU SINH code native KHOP voi hop dong do, sai la
// bao loi NGAY LUC BUILD (khong doi den runtime moi biet).


// ============================================================
// SO DO 1 DONG DE NHAM MAT HINH DUNG
// ============================================================
//
//   JS thread  <--- BRIDGE (JSON, bat dong bo, cham) --->  Native thread   [CU]
//
//   JS thread  <--- JSI (tham chieu truc tiep, co the dong bo) --->  Native thread   [MOI]
//                      |                              |
//                   FABRIC (render UI)          TURBOMODULES (goi module, lazy-load)
//                      |                              |
//                      +---- ca 2 deu duoc CODEGEN dam bao dung "hop dong" TypeScript


// ============================================================
// CACH TU KIEM TRA XEM DA NHO DUNG MACH CHUA
// ============================================================
// Tu hoi lai theo dung thu tu, KHONG CAN NHIN DAP AN:
//   1. RN co may "the gioi", la nhung gi?
//   2. The gioi do noi chuyen voi nhau qua co che nao (ngay xua)?
//   3. Co che do co MAY tat xau, la gi?
//   4. Giai phap GOC sua tat xau do ten la gi, sua the nao?
//   5. Tu giai phap goc do, sinh ra MAY thu moi, ten gi, moi thu lam viec gi?
//   6. Con 1 van de MOI phat sinh la gi, va ai giai quyet no?
//
// Neu tra loi duoc het 6 cau nay THEO DUNG THU TU, tuc la ban da nam
// vung CA MACH KIEN TRUC - con thuat ngu chi la "nhan" dan vao dung cho
// trong mach do thoi, khong can hoc thuoc rieng le.


// ============================================================
// TOM TAT 1 CAU (hoc thuoc cau nay la du de mo dau cau tra loi)
// ============================================================
// "RN co JS thread va Native thread tach biet; ngay xua chung noi
// chuyen qua Bridge (JSON, bat dong bo, cham voi du lieu lon/lien tuc);
// JSI sinh ra de cho JS goi thang, dong bo duoc; tu JSI sinh ra Fabric
// (render UI) va TurboModules (goi module, lazy-load); va Codegen dam
// bao kieu du lieu JS-Native luon khop nhau luc build."
