/**
 * DOC FILE NAY TRUOC TIEN - TRUOC KHI DOC 5 FILE CON LAI TRONG THU MUC NAY
 *
 * Nguon goc CHINH cua su "roi" trong Quan ly state: moi nguoi hay coi
 * Redux/Zustand VA React Query/RTK Query la 2 PHE PHAI CANH TRANH, phai
 * chon 1. THUC RA chung giai quyet 2 VAN DE HOAN TOAN KHAC NHAU, va
 * HOAN TOAN CO THE DUNG CHUNG trong 1 app.
 */

// ============================================================
// CAU CHUYEN: "CO 2 LOAI DU LIEU HOAN TOAN KHAC NHAU trong 1 app, va
// PHAN LON su roi ren den tu viec DUNG NHAM CONG CU giua 2 loai nay"
// ============================================================

// ------------------------------------------------------------
// LOAI 1 - CLIENT STATE ("do dac CUA RIENG BAN")
// ------------------------------------------------------------
// Du lieu duoc SINH RA va SO HUU BOI CHINH APP: theme, ngon ngu dang
// chon, gio hang, du lieu dang go trong 1 form, tab dang duoc chon,
// modal dang mo/dong. BAN TOAN QUYEN kiem soat, KHONG can dong bo voi
// ai khac ngoai chinh app cua ban.
//
// CONG CU (tang dan theo do phuc tap):
//   useState (cuc bo, 1 component)
//     -> Context API (chia se don gian, it doi, pham vi nho)
//       -> Zustand/Redux (chia se phuc tap, doi thuong xuyen, can
//          selector/devtools/middleware)
// (Chi tiet: context-vs-redux-zustand.tsx, avoid-context-rerender.tsx,
//  zustand-vs-mobx-vs-redux.tsx)


// ------------------------------------------------------------
// LOAI 2 - SERVER STATE ("do DI MUON TU THU VIEN - server moi la CHU
// SO HUU THAT SU")
// ------------------------------------------------------------
// Du lieu DEN TU SERVER (danh sach san pham, thong tin user, tin nhan).
// Ban CHI DANG "MUON TAM" 1 BAN SAO de hien thi - du lieu GOC luon co
// the bi NGUOI KHAC (hoac chinh server) THAY DOI bat cu luc nao MA BAN
// KHONG BIET NGAY. Vi vay can lien tuc:
//   - Kiem tra "sach co bi doi noi dung chua" (REFETCH/REVALIDATE)
//   - Tranh "muon trung" 2 lan cung luc cho CUNG 1 du lieu (DEDUPE request)
//   - Biet khi nao du lieu da "CU", can lay ban moi (CACHE INVALIDATION)
//   - Tu dong quan ly trang thai loading/error cho MOI LAN muon
//
// Day CHINH LA viec ma REACT QUERY / SWR / RTK QUERY duoc SINH RA DE LAM
// - va la viec ma REDUX/ZUSTAND/CONTEXT KHONG DUOC THIET KE DE LAM TOT
// (neu ban tu dung Redux/Zustand de luu data tu API, ban dang TU VIET
// LAI thu cong nhung gi cac thu vien tren da lam san rat tot: cache,
// dedupe, refetch, loading/error state...)


// ============================================================
// VI SAO NHIEU NGUOI THAY "ROI": HIEU NHAM Redux/Zustand VA React
// Query/RTK Query LA DOI THU, PHAI CHON 1
// ============================================================
// SAI: chung giai quyet 2 VAN DE KHAC NHAU (client state vs server
// state), va HOAN TOAN CO THE DUNG CHUNG trong CUNG 1 app - vi du:
//   - Zustand quan ly gio hang, theme, UI state (CLIENT STATE)
//   - React Query quan ly danh sach san pham, thong tin don hang tu
//     API (SERVER STATE)
// -> 2 thu vien nay KHONG CANH TRANH nhau, ma BO SUNG cho nhau, moi
//    thu vien lam DUNG VIEC no gioi nhat.


// ============================================================
// VAY RTK QUERY LA GI TRONG BUC TRANH NAY?
// ============================================================
// RTK Query CHINH LA "PHIEN BAN REACT QUERY duoc CAM SAN vao he sinh
// thai Redux" - no giai quyet CUNG 1 VAN DE (server state: cache,
// dedupe, refetch...) NHUNG tich hop THANG vao Redux store + Redux
// DevTools, thay vi la 1 thu vien DOC LAP nhu React Query.
// (Chi tiet so sanh: rtk-query-vs-react-query.tsx)


// ============================================================
// QUY TRINH TU HOI - AP DUNG MOI LAN THAY 1 "MIENG DU LIEU" MOI CAN
// QUAN LY, DE BIET DUNG CONG CU NAO
// ============================================================
//
//   Du lieu nay DEN TU DAU?
//     |
//     +-- TU SERVER (API tra ve)
//     |     -> DUNG React Query / RTK Query / SWR
//     |     -> KHONG tu tay luu vao Redux/Zustand/Context tru khi co
//     |        ly do DAC BIET (vd can them logic phuc tap ngoai pham
//     |        vi cache thong thuong)
//     |
//     +-- TU CHINH APP (client state thuan)
//           -> Hoi tiep: ÍT DOI/PHAM VI NHO hay DOI THUONG XUYEN/DUNG
//              NHIEU NOI?
//                -> ÍT DOI, PHAM VI NHO      => Context API
//                -> DOI THUONG XUYEN, NHIEU NOI => Zustand hoac Redux (RTK)


// ============================================================
// CACH TU KIEM TRA XEM DA NHO DUNG MACH CHUA
// ============================================================
// Tu hoi lai THEO DUNG THU TU, khong nhin dap an:
//   1. 2 LOAI du lieu can phan biet la gi, vi du moi loai?
//   2. Vi sao Redux/Zustand KHONG PHU HOP de tu quan ly du lieu tu API?
//   3. RTK Query VA React Query GIONG NHAU o diem nao, KHAC nhau o dau?
//   4. Neu 1 app DA dung Zustand cho client state, co CAN THEM Redux
//      chi de dung RTK Query khong? Tai sao?
//   5. Quy trinh tu hoi de CHON DUNG CONG CU cho 1 mieng du lieu moi la gi?


// ============================================================
// TOM TAT 1 CAU (hoc thuoc cau nay la du de mo dau cau tra loi)
// ============================================================
// "Minh chia state lam 2 loai: client state (du lieu app tu sinh ra va
// so huu, vd gio hang, theme) dung Context/Zustand/Redux tuy do phuc
// tap; va server state (du lieu tu API, khong thuc su thuoc ve client)
// dung React Query/RTK Query/SWR de duoc cache, dedupe, refetch tu
// dong - day la viec Redux/Zustand khong duoc thiet ke de lam tot. RTK
// Query va React Query giai quyet cung 1 van de nhung RTK Query gan lien
// voi he sinh thai Redux, con React Query doc lap, nhe hon neu app khong
// (hoac chua) dung Redux."
