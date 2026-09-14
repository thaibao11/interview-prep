/**
 * CAU 17 (React Native): Cach tranh re-render toan cay component
 * khi dung Context API.
 */

// ============================================================
// BUOC 0: VAN DE GOC - Context KHONG CO SELECTOR
// ============================================================
// Khi 1 Context value doi (du chi 1 field nho ben trong doi), TAT CA
// component dang goi useContext(ThisContext) o BAT KY DAU trong cay deu
// RE-RENDER, KHONG QUAN TAM component do co dung den field vua doi hay
// khong. Day la diem YEU LON NHAT cua Context so voi Redux/Zustand (co
// selector rieng cho tung component).

import React, { createContext, useContext, useState, useMemo } from "react";

// KHONG NEN: 1 context "to" chua nhieu thu khong lien quan
type AppContextValue = { user: string; theme: "light" | "dark" };
const AppContextBad = createContext<AppContextValue | null>(null);
// -> Component chi dung "theme" VAN BI re-render khi "user" doi, vi ca
//    2 nam chung 1 object value cua context


// ============================================================
// CACH 1: TACH THANH NHIEU CONTEXT NHO, moi context 1 muc dich
// ============================================================
const UserContext = createContext<string>("");
const ThemeContext = createContext<"light" | "dark">("light");

function AppGood({ children }: { children: React.ReactNode }) {
  const [user] = useState("An");
  const [theme] = useState<"light" | "dark">("light");

  return (
    <UserContext.Provider value={user}>
      <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
    </UserContext.Provider>
  );
}
// -> Component chi useContext(ThemeContext) se KHONG re-render khi
//    "user" doi nua, vi no dung context KHAC, hoan toan doc lap


// ============================================================
// CACH 2: MEMO HOA value truyen vao Provider (tranh tao OBJECT MOI
// moi lan Provider re-render, dù noi dung KHONG doi)
// ============================================================
function AppBadMemo({ children }: { children: React.ReactNode }) {
  const [count, setCount] = useState(0);
  const user = "An";

  // MOI LAN AppBadMemo re-render (vd do count doi), 1 OBJECT MOI duoc
  // tao ra cho value -> MOI consumer cua UserContext RE-RENDER THEO,
  // DU "user" khong thay doi gia tri thuc su
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

function AppGoodMemo({ children }: { children: React.ReactNode }) {
  const [count, setCount] = useState(0);
  const [user] = useState({ name: "An" });

  const value = useMemo(() => user, [user]); // GIU NGUYEN tham chieu neu user khong doi
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}


// ============================================================
// CACH 3: TACH STATE va DISPATCH thanh 2 CONTEXT RIENG
// (pattern rat pho bien voi useReducer + Context)
// ============================================================
// Neu 1 component CHI CAN GOI HAM cap nhat (vd dispatch/setUser) ma
// KHONG CAN DOC gia tri hien tai, tach dispatch ra 1 context rieng -
// dispatch function TU REACT LUON GIU NGUYEN THAM CHIEU (setState tu
// useState/useReducer khong doi qua cac lan render), nen component chi
// dung dispatch SE KHONG BAO GIO re-render vi context nay:
const CountStateContext = createContext(0);
const CountDispatchContext = createContext<(action: "inc" | "dec") => void>(() => {});

function CounterProvider({ children }: { children: React.ReactNode }) {
  const [count, setCount] = useState(0);
  const dispatch = (action: "inc" | "dec") => {
    setCount((c) => (action === "inc" ? c + 1 : c - 1));
  };

  return (
    <CountStateContext.Provider value={count}>
      <CountDispatchContext.Provider value={dispatch}>{children}</CountDispatchContext.Provider>
    </CountStateContext.Provider>
  );
}
// -> 1 nut "+1" chi can useContext(CountDispatchContext) de goi dispatch,
//    KHONG can doc count -> KHONG re-render moi khi count doi


// ============================================================
// CACH 4: Neu state THAY DOI QUA THUONG XUYEN va duoc NHIEU NOI dung,
// CAN NHAC chuyen sang Zustand/Redux (co selector that su) thay vi co
// "vat lon" toi uu Context qua nhieu buoc nhu tren
// ============================================================
// Context phu hop nhat cho state ÍT DOI (Cau 14). Neu ban thay minh
// phai ap dung CA 3 cach tren cung luc ma van chua du muot, do la DAU
// HIEU nen chuyen sang thu vien co selector that su (Zustand/Redux).


// ============================================================
// TOM TAT NGAN GON DE TRA LOI PHONG VAN
// ============================================================
// "Context khong co selector, nen moi consumer re-render khi value doi,
// bat ke co dung phan vua doi hay khong. Cach giam thieu: (1) tach
// thanh nhieu context nho theo tung muc dich thay vi 1 context to gom
// nhieu thu, (2) useMemo gia tri truyen vao Provider de tranh tao object
// moi moi lan Provider re-render, (3) tach state va dispatch thanh 2
// context rieng - component chi can goi ham cap nhat se khong re-render
// theo state. Neu van khong du, do la dau hieu nen chuyen sang Zustand/
// Redux vi chung co selector that su, chi re-render dung component can."
