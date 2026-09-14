/**
 * BO SUNG (muc Hooks): Lifecycle cua component - Class component (3 giai
 * doan) va cach no anh xa sang Function component + Hooks.
 */

// ============================================================
// BUOC 0: 3 GIAI DOAN LIFECYCLE CUA CLASS COMPONENT
// ============================================================
// 1. MOUNTING (component duoc TAO RA lan dau):
//      constructor -> render -> componentDidMount
// 2. UPDATING (state/props doi, component RENDER LAI):
//      render -> componentDidUpdate
// 3. UNMOUNTING (component bi GO KHOI man hinh):
//      componentWillUnmount

import React from "react";

class ProfileScreenClass extends React.Component<{ userId: string }> {
  constructor(props: { userId: string }) {
    super(props);
    this.state = { user: null };
  }

  componentDidMount() {
    // Chay 1 LAN DUY NHAT, NGAY SAU LAN RENDER DAU TIEN - noi PHO BIEN
    // NHAT de goi API, dang ky subscription
    // fetchUser(this.props.userId).then((user) => this.setState({ user }));
  }

  componentDidUpdate(prevProps: { userId: string }) {
    // Chay SAU MOI LAN RE-RENDER (tru lan dau). PHAI TU SO SANH prevProps
    // voi this.props DE BIET CO THUC SU CAN LAM GI KHONG, neu khong se
    // de bi goi lai logic KHONG CAN THIET moi lan RE-RENDER VI LY DO KHAC
    if (prevProps.userId !== this.props.userId) {
      // fetchUser(this.props.userId).then((user) => this.setState({ user }));
    }
  }

  componentWillUnmount() {
    // Chay NGAY TRUOC KHI component bi go khoi man hinh - noi don dep
    // subscription/timer (xem lai memory-leaks.tsx)
  }

  render() {
    return null;
  }
}


// ============================================================
// BUOC 0B: CONSTRUCTOR CHI TIET LAM GI (hay bi hoi rieng)
// ============================================================
// Constructor CHI CO DUNG 2 NHIEM VU, KHONG LAM GI KHAC:
//
// 1. KHOI TAO STATE BAN DAU: this.state = { ... }
// 2. BIND cac method CAN DUNG "this" (Cau 3 - JS/this.ts) NEU method do
//    se duoc TRUYEN DI lam callback (vd onPress={this.handleClick}) MA
//    KHONG viet duoi dang class field arrow function:
//
//      constructor(props) {
//        super(props); // BAT BUOC goi TRUOC KHI dung "this", vi
//                       // React.Component (class cha) can chay truoc
//                       // de KHOI TAO "this" (gan this.props...) - neu
//                       // quen goi super(props), dung "this" ngay sau
//                       // do se LOI (this chua ton tai)
//        this.state = { count: 0 };
//        this.handleClick = this.handleClick.bind(this); // vi khong
//        // dung arrow function class field, PHAI tu bind, neu khong
//        // "this" ben trong handleClick se bi MAT khi truyen lam callback
//        // (dung y het Cau 3 - JS/this.ts da hoc)
//      }
//
// LUU Y QUAN TRONG:
//   - Constructor la TUY CHON (optional) - neu KHONG can khoi tao state
//     phuc tap hay bind method nao (vd dung toan bo arrow function class
//     field), CO THE BO QUA HOAN TOAN constructor, React tu dung ham
//     mac dinh
//   - KHONG duoc goi setState() hay lam SIDE-EFFECT (goi API...) trong
//     constructor - do la viec cua componentDidMount. Constructor CHI
//     de KHOI TAO, khong de "lam viec"


// ============================================================
// BUOC 1: SU THAY DOI TU DUY KHI SANG HOOKS - QUAN TRONG NHAT
// ============================================================
// Class component bat ban nghi theo THOI DIEM (truoc mount, sau mount,
// truoc update...). useEffect KHONG bat ban nghi theo thoi diem nua, ma
// theo SU DONG BO (synchronization): "effect nay CAN DONG BO VOI NHUNG
// GIA TRI NAO (dependency array)", va React TU QUYET DINH KHI NAO chay
// lai dua tren cac gia tri do doi hay khong - KHONG con la 3 khai niem
// rieng biet (mount/update/unmount) nua, ma GOM VE 1 KHAI NIEM DUY NHAT.

import { useEffect, useState } from "react";

function ProfileScreenHooks({ userId }: { userId: string }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // fetchUser(userId).then(setUser);
    // return () => { /* cleanup neu can */ };
  }, [userId]);
  // -> 1 KHOI DUY NHAT nay THAY THE CA componentDidMount VA
  //    componentDidUpdate: chay LAN DAU (giong mount), VA chay LAI moi
  //    khi userId DOI (giong update) - KHONG can tu so sanh prevProps
  //    thu cong nhu class

  return null;
}


// ============================================================
// BUOC 2: BANG ANH XA (chi de THAM KHAO NHANH, KHONG PHAI hoc thuoc doi 1)
// ============================================================
//  Class lifecycle              | Hook tuong duong
//  ------------------------------------------------------------
//  constructor (khoi tao state) | useState(initialValue)
//  componentDidMount            | useEffect(() => {...}, [])
//  componentDidUpdate           | useEffect(() => {...}, [deps])
//  componentWillUnmount         | useEffect(() => { return () => {...} }, [])
//  shouldComponentUpdate        | React.memo (bao ngoai component)
//  getDerivedStateFromProps     | Tinh TRUC TIEP trong than ham render,
//                                | khong can hook rieng (vd:
//                                | const fullName = firstName + " " + lastName)


// ============================================================
// BUOC 2B: CHI TIET CAC LIFECYCLE IT DUNG HON (nhung VAN TON TAI,
// hoi sau thuong se hoi toi nhung cai nay)
// ============================================================

// --- getDerivedStateFromProps(props, state) - static, chay TRUOC MOI
// LAN RENDER (ca luc mount LAN luc update) ---
class SyncedListClass extends React.Component<
  { items: string[] },
  { localItems: string[]; prevItems: string[] }
> {
  constructor(props: { items: string[] }) {
    super(props);
    this.state = { localItems: props.items, prevItems: props.items };
  }

  // Dung khi CAN DONG BO state TU props trong 1 SO TRUONG HOP DAC BIET:
  // vi du component vua co "localItems" (nguoi dung tu sua duoc), vua
  // can TU CAP NHAT lai khi props.items THAY DOI TU BEN NGOAI (vd cha
  // load lai danh sach moi). Tra ve OBJECT de merge vao state, hoac
  // null neu KHONG CAN DOI GI:
  static getDerivedStateFromProps(
    props: { items: string[] },
    state: { prevItems: string[] }
  ) {
    if (props.items !== state.prevItems) {
      return { localItems: props.items, prevItems: props.items };
    }
    return null; // khong doi gi
  }

  render() {
    return null;
  }
}
// LUU Y: day la method IT DUNG NHAT trong so cac lifecycle, vi da so
// truong hop tuong tu co the giai quyet DON GIAN HON bang cach TINH
// TRUC TIEP trong render, hoac dung "key" de RESET HOAN TOAN component
// khi can. Chi dung method nay khi THUC SU can giu 1 PHAN state RIENG
// (khong hoan toan phu thuoc props).


// --- shouldComponentUpdate(nextProps, nextState) - QUYET DINH co RENDER
// TIEP hay khong, dung de TOI UU HIEU NANG (tuong duong React.memo o
// function component, nhung chi tiet hon vi so sanh duoc CA state) ---
class ExpensiveRowClass extends React.Component<{ value: number }> {
  shouldComponentUpdate(nextProps: { value: number }) {
    // Chi RENDER LAI neu "value" THUC SU DOI - tra ve false se BO QUA
    // HOAN TOAN buoc render + reconciliation cho lan cap nhat nay
    return nextProps.value !== this.props.value;
  }

  render() {
    return null;
  }
}
// React.PureComponent lam SAN viec nay: TU DONG shallow-compare (so
// sanh nong) TOAN BO props va state, khong can tu viet shouldComponentUpdate
// class ExpensiveRowClass extends React.PureComponent<{ value: number }> { ... }


// --- getSnapshotBeforeUpdate(prevProps, prevState) - chay NGAY TRUOC
// KHI thay doi duoc AP DUNG THAT SU len giao dien (sau render, truoc
// commit) - dung de "CHUP" 1 GIA TRI TU GIAO DIEN CU truoc khi no mat ---
class ChatListClass extends React.Component<{ messages: string[] }> {
  listRef = React.createRef<any>();

  // Vi du KINH DIEN: giu nguyen VI TRI CUON khi co tin nhan MOI duoc
  // THEM VAO DAU danh sach (khong de danh sach "nhay" len dau, mat vi
  // tri nguoi dung dang xem):
  getSnapshotBeforeUpdate(prevProps: { messages: string[] }) {
    if (prevProps.messages.length < this.props.messages.length) {
      // "chup" lai chieu cao noi dung TRUOC KHI item moi duoc them vao
      // return this.listRef.current.scrollHeight;
    }
    return null;
  }

  // Gia tri "chup" duoc o tren duoc TRUYEN VAO DAY lam tham so thu 3:
  componentDidUpdate(prevProps: any, prevState: any, snapshot: any) {
    if (snapshot !== null) {
      // dieu chinh lai vi tri cuon dua tren snapshot, de nguoi dung
      // KHONG THAY danh sach bi "giat" len dau
    }
  }

  render() {
    return null;
  }
}


// ============================================================
// BUOC 3: BAY HAY GAP - useEffect([]) CHI GIONG MOUNT+UNMOUNT,
// KHONG TU DONG CO "UPDATE"
// ============================================================
function TrapExample({ userId }: { userId: string }) {
  useEffect(() => {
    // fetchUser(userId);
    // NEU dependency array la [] (rong), effect nay CHI CHAY 1 LAN LUC
    // MOUNT - GIONG componentDidMount, nhung SE KHONG CHAY LAI khi
    // userId DOI SAU DO (khac voi componentDidUpdate cua class, neu ban
    // quen dua userId vao mang dependency)
  }, []); // <- THIEU userId trong day la 1 BUG PHO BIEN (stale closure)
  return null;
}
// -> Muon GIONG HANH VI "componentDidMount + componentDidUpdate" gop
//    lai, PHAI DUA userId vao dependency array: useEffect(() => {...}, [userId])


// ============================================================
// BUOC 4: DIEM QUAN TRONG NHAT DE TRA LOI KHI BI HOI VAT - KHONG PHAI
// MOI THU CUA CLASS DEU CO HOOK TUONG DUONG
// ============================================================
// ERROR BOUNDARY (componentDidCatch + getDerivedStateFromError) KHONG
// CO HOOK TUONG DUONG - React (tinh den hien tai) CHUA co useErrorBoundary
// hay tuong tu. Muon BAT LOI trong cay con (tranh crash toan app), BAT
// BUOC van phai viet 1 CLASS COMPONENT rieng lam Error Boundary, du toan
// bo phan con lai cua app dung 100% function component + hooks:

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  // getDerivedStateFromError: static, chay TRUOC render, CHI de CAP
  // NHAT STATE ngay lap tuc (hien fallback UI cang som cang tot), KHONG
  // nen lam SIDE-EFFECT (log...) o day
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  // componentDidCatch: chay SAU KHI fallback UI da render, day moi la
  // noi PHU HOP de lam SIDE-EFFECT: gui loi ve service theo doi (Sentry,
  // Crashlytics...) - 2 method nay chia lam 2 VIEC RIENG BIET (cap nhat
  // UI ngay vs ghi log sau), khong phai trung lap nhau
  componentDidCatch(error: Error, info: { componentStack: string }) {
    // Sentry.captureException(error, { extra: info });
  }

  render() {
    if (this.state.hasError) {
      return null; // <FallbackUI />
    }
    return this.props.children;
  }
}


// ============================================================
// TOM TAT NGAN GON DE TRA LOI PHONG VAN
// ============================================================
// "Class component co 3 giai doan: Mounting (constructor -> render ->
// componentDidMount), Updating (render -> componentDidUpdate), va
// Unmounting (componentWillUnmount). Voi hooks, tu duy thay doi tu 'theo
// thoi diem' sang 'theo dong bo': useEffect voi dependency array gop
// chung componentDidMount va componentDidUpdate lai lam 1, chay lai moi
// khi dependency doi, va ham return trong no dong vai tro cleanup giong
// componentWillUnmount (va cung chay truoc moi lan effect chay lai, khong
// chi luc unmount). Bay hay gap la quen dua bien vao dependency array,
// khien effect khong chay lai khi bien do doi (stale closure). Diem quan
// trong nhat: Error Boundary (componentDidCatch) KHONG co hook tuong
// duong, van bat buoc phai dung class component cho phan nay du app da
// chuyen het sang function component."
