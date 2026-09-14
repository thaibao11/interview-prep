/**
 * CAU 24 (React Native): Cach phat hien va xu ly 1 man hinh bi
 * re-render/lag bang Flipper hoac React DevTools Profiler.
 */

// ============================================================
// BUOC 0: QUY TRINH CHUNG - DO TRUOC, DOAN SAU
// ============================================================
// Nguyen tac quan trong nhat: KHONG toi uu theo cam tinh ("chac la do
// component nay"). Luon DO/PROFILE TRUOC de biet CHINH XAC component
// nao re-render qua nhieu hoac ham nao chay lau, roi MOI sua.


// ============================================================
// BUOC 1: React DevTools Profiler - phat hien RE-RENDER THUA
// ============================================================
// Cach dung:
//   1. Mo React DevTools (ket noi voi app RN qua Flipper hoac ung dung
//      React DevTools standalone), chuyen sang tab "Profiler"
//   2. Bam nut RECORD, thao tac tren app (vd cuon danh sach, go phim...)
//   3. Dung ghi, xem BIEU DO FLAME GRAPH: moi thanh la 1 component,
//      MAU SAC va DO RONG the hien THOI GIAN render va SO LAN re-render
//   4. Bat "Highlight updates when components render" - RN se PHAT SANG
//      VIEN MAU quanh component NGAY LUC no re-render tren man hinh
//      that -> nhin THAY BANG MAT component nao dang re-render lien tuc
//      MOT CACH KHONG CAN THIET (vd 1 component o cuoi man hinh sang
//      lien tuc dù ban chi go phim o 1 o input dau man hinh)
//
// Sau khi PHAT HIEN component nao re-render thua -> quay lai cac ky
// thuat da hoc: React.memo, tach state xuong thap hon, children-as-props,
// tach Context nho hon (Cau 3, Cau 17)


// ============================================================
// BUOC 2: Flipper - xem SAU HON o TANG NATIVE (khong chi JS)
// ============================================================
// Flipper la cong cu debug CHINH THUC cua RN, ngoai React DevTools
// (tich hop san), con co cac plugin huu ich:
//   - Layout Inspector: xem CAY VIEW NATIVE THAT (khong chi cay JSX),
//     kiem tra co bi LONG QUA NHIEU LOP VIEW KHONG CAN THIET hay khong
//     (moi lop View long nhau deu ton chi phi layout/render native)
//   - Network Inspector: xem cac request API co bi GOI LAP LAI KHONG
//     CAN THIET khong (vd useEffect thieu dependency gay goi API lien tuc)
//   - Hermes Debugger: dat breakpoint, xem call stack ngay tren Hermes
//   - React DevTools tich hop san trong Flipper (khong can mo rieng)


// ============================================================
// BUOC 3: XU LY khi PHAT HIEN nguyen nhan cu the
// ============================================================
// Vi du cac tinh huong THUONG GAP khi profile xong:
//
// - "Component A re-render MOI KHI GO PHIM o input, du A khong lien
//    quan gi den input" -> A dang nam CHUNG CAY voi state cua input,
//    ap dung Cau 3 (tach state xuong component nho nhat/children-as-props)
//
// - "Man hinh CHAM luc CUON danh sach" -> mo Profiler xem renderItem cua
//    FlatList co dang lam viec NANG (vd tinh toan phuc tap moi item)
//    khong -> ap dung Cau 22 (React.memo cho item, getItemLayout, giam
//    windowSize/maxToRenderPerBatch)
//
// - "Animation/gesture GIAT dung luc dang goi API" -> kiem tra animation
//    co dang chay tren JS THREAD (Animated khong bat useNativeDriver,
//    hoac PanResponder cu) hay khong -> chuyen sang Reanimated/Gesture
//    Handler (chay tren UI thread qua JSI, Cau 6)
//
// - "1 man hinh render CHAM ngay lan dau mo" -> kiem tra co dang tinh
//    toan NANG NGAY TRONG THAN COMPONENT (khong bang useMemo) hay
//    khong, hoac co dang import/khoi tao qua nhieu thu vien NANG ngay
//    luc module load (anh huong ca STARTUP TIME cua app, Cau 6/23)


// ============================================================
// TOM TAT NGAN GON DE TRA LOI PHONG VAN
// ============================================================
// "Minh dung React DevTools Profiler de ghi lai 1 phien thao tac, xem
// flame graph biet component nao re-render nhieu/lau, va bat tinh nang
// highlight updates de nhin thay bang mat component nao dang re-render
// khong can thiet ngay tren man hinh that. Flipper cho minh xem sau hon
// o tang native (Layout Inspector xem cay view that, Network Inspector
// xem API co bi goi lap lai khong). Sau khi xac dinh duoc nguyen nhan cu
// the, minh moi ap dung dung ky thuat tuong ung: React.memo/tach state
// cho re-render thua, toi uu FlatList cho danh sach cham, chuyen sang
// Reanimated cho animation giat luc JS thread ban."
