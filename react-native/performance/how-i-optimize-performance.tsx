/**
 * CAU MO DAU KINH DIEN: "Ban toi uu hieu nang RN app nhu the nao?"
 *
 * Day la cau hoi RONG, neu tra loi lan man se mat diem du biet nhieu.
 * File nay la 1 KHUNG TRA LOI CO CAU TRUC, di tu TONG QUAT den CHI TIET,
 * moi y deu TRO LAI 1 file da hoc de dan chung cu the khi bi hoi sau.
 */

// ============================================================
// KHUNG TRA LOI - 6 NHOM (noi theo thu tu nay, KHONG can noi het chi
// tiet moi nhom, NEU BI HOI SAU thi dao vao dung file lien quan)
// ============================================================
//
// 1. DO TRUOC KHI TOI UU (measurement)
// 2. TOI UU RENDER (React/component)
// 3. TOI UU KIEN TRUC/THREAD (JSI, Hermes)
// 4. TOI UU TAI NGUYEN (anh, bo nho)
// 5. TOI UU KHOI DONG APP (startup time)
// 6. TOI UU NETWORK & BUNDLE SIZE


// ============================================================
// 1. DO TRUOC KHI TOI UU (measurement) - LUON NOI DAU TIEN
// ============================================================
// "Truoc khi sua bat cu thu gi, minh luon DO/PROFILE truoc de biet
// CHINH XAC nut that o dau, thay vi doan mo."
// Cong cu: React DevTools Profiler, Flipper (Layout Inspector, Network
// Inspector, Hermes Debugger), Xcode Instruments (iOS), Android Studio
// Profiler (CPU/Memory), va o production thi dung Sentry Performance/
// Firebase Performance Monitoring de theo doi hieu nang tren thiet bi
// THAT cua nguoi dung (khong chi may dev).
// (Chi tiet: performance/debug-rerender-with-flipper.tsx)


// ============================================================
// 2. TOI UU RENDER
// ============================================================
// - React.memo cho component con, useMemo/useCallback DUNG CHO (khong
//   lam dai dong voi tinh toan re)
// - Tach state xuong component con nho nhat, tranh cha re-render keo
//   theo ca cay
// - keyExtractor on dinh + toi uu FlatList (getItemLayout, windowSize...)
//   hoac chuyen FlashList voi list rat lon
// (Chi tiet: performance/flatlist-optimization.tsx, hooks/re-render-optimization.tsx,
//  hooks/use-memo-vs-use-callback.tsx)


// ============================================================
// 3. TOI UU KIEN TRUC/THREAD
// ============================================================
// - Dam bao Hermes dang bat (mac dinh tu RN 0.70) de giam thoi gian
//   khoi dong nho bytecode bien dich san
// - Animation/gesture DUNG Reanimated + Gesture Handler (chay tren UI
//   thread qua JSI/worklet) THAY VI Animated API khong bat useNativeDriver
//   hoac PanResponder cu (chay tren JS thread, de giat khi JS thread ban)
// - Voi tac vu nang, lien tuc (xu ly frame camera, cam bien tan so cao),
//   can nhac Native Module/TurboModule + JSI thay vi xu ly hoan toan tren JS
// (Chi tiet: architecture/bridge-architecture.ts, architecture/new-architecture.ts,
//  performance/hermes-vs-jsc.tsx, performance/bridge-cost-and-new-architecture.tsx)


// ============================================================
// 4. TOI UU TAI NGUYEN (anh + bo nho) - PHAN CHUA NOI SAU O CAC CAU TRUOC
// ============================================================
// --- Anh ---
// - RESIZE anh o KICH THUOC THUC TE SE HIEN THI (khong load anh 4000px
//   de hien trong 1 o 100px), backend/CDN nen ho tro tra ve nhieu size
// - Dung dinh dang HIEU QUA (WebP thay vi PNG/JPEG khi co the - nhe hon
//   dang ke voi chat luong tuong duong)
// - CACHE anh: dung react-native-fast-image (cache o disk, uu tien hon
//   Image mac dinh) de tranh tai lai anh da xem
// - LAZY LOAD anh ngoai vung nhin thay (vd trong FlatList, chi anh dang
//   hien thi moi thuc su tai)
//
// --- Memory leak ---
// - Luon CLEANUP trong useEffect: huy subscription, clearInterval/
//   clearTimeout, huy listener (return () => {...})
// - Tranh giu THAM CHIEU DEN COMPONENT DA UNMOUNT trong callback bat
//   dong bo (vd setState sau khi component da unmount - kiem tra bang
//   1 bien cleanup hoac AbortController voi fetch)
// - Kiem tra memory bang Xcode Instruments (Leaks/Allocations) hoac
//   Android Studio Profiler (Memory) dinh ky, dac biet sau khi vao/ra
//   1 man hinh NHIEU LAN LIEN TIEP (phat hien leak qua viec bo nho
//   KHONG GIAM VE MUC CU sau khi quay lai man hinh goc)


// ============================================================
// 5. TOI UU KHOI DONG APP (startup time)
// ============================================================
// - Hermes bytecode (da noi o muc 3)
// - LAZY LOAD man hinh/module KHONG CAN NGAY luc mo app (vd dùng
//   React.lazy/dynamic import cho cac man hinh it dung, hoac tri hoan
//   khoi tao SDK ben thu 3 khong quan trong ngay tu dau)
// - Giam cong viec chay TRONG LUC APP DANG KHOI TAO (vd goi API/doc
//   storage nang ngay luc app mo - nen lam SAU KHI man hinh dau tien da
//   hien, dung InteractionManager.runAfterInteractions de day cong viec
//   khong khan cap ra SAU khi animation/transition dau tien xong)
// - Splash screen giu hien THEO DUNG THOI GIAN CAN (khong an qua som
//   khi du lieu chua san sang, khong giu qua lau gay cam giac app cham)


// ============================================================
// 6. TOI UU NETWORK & BUNDLE SIZE
// ============================================================
// --- Network ---
// - Cache voi React Query/SWR, tranh goi lai API khong can thiet
// - PHAN TRANG (pagination)/infinite scroll thay vi tai het du lieu 1 lan
// - Nen du lieu (gzip o server), batch nhieu request nho thanh it request hon
//
// --- Bundle size ---
// - Bat Hermes (giam kich thuoc so voi JSC trong nhieu truong hop)
// - Go thu vien KHONG DUNG DEN (kiem tra bang cong cu phan tich bundle),
//   tranh import CA THU VIEN LON chi de dung 1 ham nho (vd import
//   truc tiep 1 ham tu lodash-es thay vi ca "lodash")
// - Android: bat ProGuard/R8 de minify + go code khong dung (dead code
//   elimination) cho ban release
// - Tach code theo man hinh/luong (code splitting) neu framework ho tro,
//   giam kich thuoc bundle JS PHAI PARSE ngay luc dau


// ============================================================
// MAU CAU TRA LOI HOAN CHINH (doc thu, khoang 45-60 giay khi noi that)
// ============================================================
// "Voi minh, toi uu hieu nang luon bat dau bang viec DO truoc - dung
// React DevTools Profiler va Flipper de biet chinh xac cho nao dang co
// van de, thay vi doan mo. Sau do minh chia theo tung nhom: ve phia
// RENDER, minh dam bao React.memo, tach state hop ly, va toi uu ky
// FlatList vi day la nguon lag pho bien nhat trong app danh sach. Ve
// phia KIEN TRUC, minh dam bao Hermes duoc bat de giam startup time,
// va moi animation/gesture deu dung Reanimated thay vi chay tren JS
// thread de tranh giat khi app dang ban viec khac. Ve TAI NGUYEN, minh
// chu y toi uu anh (resize dung kich thuoc, cache bang FastImage) va
// don dep cleanup trong useEffect de tranh memory leak. Cuoi cung la
// startup time va bundle size - lazy load nhung phan khong can ngay,
// va kiem soat kich thuoc bundle bang cach go thu vien thua va bat
// ProGuard cho Android. Minh co the di sau vao bat ky nhom nao neu anh/
// chi muon nghe chi tiet hon."
//
// -> Cau cuoi RAT QUAN TRONG: chu dong MOI interviewer HOI SAU vao 1
//    nhom cu the, thay vi noi het moi thu mot luc - vua the hien tu tin,
//    vua kiem soat duoc huong cau hoi tiep theo se ve chu de nao.
