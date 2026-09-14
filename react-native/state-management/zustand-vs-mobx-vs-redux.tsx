/**
 * CAU 16 (React Native): So sanh Zustand/MobX voi Redux
 * ve performance va do phuc tap.
 */

// ============================================================
// ZUSTAND
// ============================================================
// - CUC IT boilerplate: khong can Provider bao ngoai cay component,
//   khong can action type/action creator rieng
// - Component CHI RE-RENDER khi PHAN STATE no "select" thuc su doi -
//   selector duoc TICH HOP SAN ngay trong hook, khong can them thu vien
//   phu nhu reselect (khac voi useContext o Cau 17, luon re-render toan
//   bo khi value doi bat ke dung phan nao)
// - Do PHUC TAP: THAP - phu hop du an vua/nho, prototype nhanh, hoac
//   team muon it quy tac rang buoc

import { create } from "zustand";

const useCartStore = create<{
  items: { id: string; qty: number }[];
  addItem: (item: { id: string; qty: number }) => void;
}>((set) => ({
  items: [],
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
}));

function CartBadge() {
  // CHI re-render khi "items" doi, khong bi anh huong boi cac field
  // khac trong store neu co them (vd store co ca "filters", "sortOrder"...)
  const itemCount = useCartStore((s) => s.items.length);
  return null; // <Text>{itemCount}</Text>
}


// ============================================================
// MOBX
// ============================================================
// - Dung REACTIVE PROGRAMMING (observable/observer): MobX TU DONG THEO
//   DOI chinh xac PHAN STATE NAO duoc "doc" trong luc render, roi chi
//   re-render component do khi DUNG PHAN da doc do thay doi - khong can
//   khai bao selector thu cong nhu Zustand
// - Code THUONG NGAN GON hon (it boilerplate hon ca Zustand trong nhieu
//   truong hop), nhung "MA THUAT" hon: luong du lieu it TUONG MINH, kho
//   debug hon vi kho theo doi "ai doi state, luc nao, tu dau" so voi
//   Redux (khong co concept action/log ro rang nhu Redux DevTools)
// - Hieu nang: RAT TOT nho co che theo doi chi tiet (fine-grained
//   reactivity), nhung do PHUC TAP TIEM AN (decorator, class-based state
//   truoc day) co the gay kho hieu voi nguoi moi vao du an


// ============================================================
// REDUX (kem RTK)
// ============================================================
// - Boilerplate NHIEU HON Zustand du da giam nho RTK (van can slice,
//   store, Provider bao ngoai App)
// - DOI LAI rat TUONG MINH (predictable): moi thay doi deu qua 1 ACTION
//   ro rang, co the XEM LAI TOAN BO LICH SU thay doi qua Redux DevTools
//   (time-travel debugging) - RAT HUU ICH khi debug bug phuc tap lien
//   quan nhieu buoc thay doi state
// - Hieu nang: TOT NEU dung selector dung cach (useSelector + reselect
//   hoac RTK's createSelector de memo hoa), nhung DE VIET SAI (vd
//   useSelector tra ve 1 object moi moi lan -> gay re-render thua) neu
//   khong can than
// - Phu hop TEAM LON, du an PHUC TAP can kiem soat chat che luong du
//   lieu va lich su thay doi (vd audit, undo/redo)


// ============================================================
// BANG SO SANH NGAN GON
// ============================================================
//              | Boilerplate | De hoc | DevTools/debug      | Hieu nang
// Zustand      | Rat it      | De     | Co ban (khong log)  | Tot (co selector)
// MobX         | It          | Trung  | Kem tuong minh hon  | Rat tot (fine-grained)
// Redux + RTK  | Vua         | Trung  | Manh (time-travel)  | Tot neu dung selector dung


// ============================================================
// TOM TAT NGAN GON DE TRA LOI PHONG VAN
// ============================================================
// "Zustand it boilerplate nhat, co selector tich hop san nen hieu nang
// tot va de kiem soat re-render, phu hop du an vua/nho. MobX dung
// reactive programming, tu dong theo doi phan state duoc doc de re-render
// chinh xac, hieu nang rat tot nhung kem tuong minh hon, kho debug hon.
// Redux (voi RTK) co boilerplate nhieu hon nhung RAT TUONG MINH, co
// DevTools manh voi time-travel debugging, phu hop team lon/du an phuc
// tap can kiem soat chat che luong va lich su thay doi state - hieu nang
// tot neu dung selector/memoization dung cach."
