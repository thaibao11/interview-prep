/**
 * CAU 14 (React Native): Khi nao Context API du dung,
 * khi nao can Redux/Zustand.
 */

// ============================================================
// BUOC 0: Context API giai quyet van de gi
// ============================================================
// Context giai quyet "prop drilling" (truyen props qua nhieu tang
// component trung gian khong lien quan chi de dua data xuong con sau).
// No KHONG PHAI la 1 "state management solution" day du - ban chat no
// chi la 1 CO CHE TRUYEN DU LIEU xuyen cay component.

// ============================================================
// BUOC 1: Context API DU DUNG khi
// ============================================================
// - State ÍT THAY DOI, hoac thay doi KHONG THUONG XUYEN: theme (sang/toi),
//   ngon ngu (i18n), thong tin user dang dang nhap (it doi trong session)
// - PHAM VI NHO: chi vai component con trong 1 khu vuc man hinh dung den,
//   khong phai state dung o RAT NHIEU noi khap app
// - Khong can DEBUG TOOLING phuc tap (time-travel, log moi action)

// ============================================================
// BUOC 2: CAN Redux/Zustand khi
// ============================================================
// - State THAY DOI THUONG XUYEN VA duoc nhieu component O NHIEU TANG
//   KHAC NHAU cung doc (vd: gio hang, danh sach thong bao chua doc,
//   trang thai socket real-time) - Context se lam TAT CA consumer
//   re-render moi lan value doi (xem file avoid-context-rerender.tsx),
//   gay hieu nang kem
// - Can DEV TOOLS de debug (Redux DevTools xem lai tung action, time-travel)
// - Can logic phuc tap: middleware (logging, xu ly side-effect voi
//   redux-saga/thunk), normalize data lon, cache theo tung phan
// - Can SELECTOR: chi component nao dung DUNG PHAN state do moi re-render,
//   thay vi ca cum consumer re-render khi BAT KY PHAN NAO cua context doi


// ============================================================
// TOM TAT NGAN GON DE TRA LOI PHONG VAN
// ============================================================
// "Context API phu hop voi state it doi, pham vi nho (theme, ngon ngu,
// user session) - vi no khong co selector, moi consumer re-render khi
// value doi. Voi state thay doi thuong xuyen va duoc nhieu noi dung
// (gio hang, thong bao real-time), minh dung Zustand hoac Redux Toolkit
// de co selector (chi re-render dung phan can), dev tools de debug, va
// xu ly duoc logic phuc tap (side-effect, cache)."
