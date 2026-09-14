/**
 * CAU 3 (React Native): Vi sao component bi re-render, va cach tranh re-render thua
 */

// ============================================================
// BUOC 0: 4 NGUYEN NHAN gay re-render (khong chi co state doi)
// ============================================================
// 1. State cua CHINH component do doi (setState/useState)
// 2. Props truyen vao doi (component cha truyen prop moi)
// 3. COMPONENT CHA RE-RENDER -> MOI CON DEU RE-RENDER THEO MAC DINH,
//    ke ca khi props/state cua con KHONG HE DOI - day la nguyen nhan
//    re-render thua PHO BIEN NHAT trong thuc te
// 4. Context value doi -> TAT CA component dang useContext(ThisContext)
//    deu re-render, du chi dung 1 phan nho cua value


// ============================================================
// BUOC 1: PHAN BIET "re-render" vs "cap nhat native UI thuc su"
// ============================================================
// re-render = React CHAY LAI function component (JS thread) + reconciliation
//             (so sanh cay JSX moi vs cu)
// commit    = CHI KHI ket qua so sanh khac nhau, React moi day thay doi
//             xuong Fabric -> cap nhat that cay native (UIView/ViewGroup)
//
// -> Component re-render nhung tra ve JSX GIONG HET lan truoc thi VAN KHONG
//    dung gi den native UI. Nhung ban van TON CHI PHI chay lai function +
//    so sanh o JS thread - neu qua nhieu, co the choan JS thread, gay giat
//    gesture/animation (dac biet quan trong tren RN vi JS thread con phai
//    xu ly ca logic app lan mot phan tuong tac).


// ============================================================
// BUOC 2: CAC CACH TRANH RE-RENDER THUA
// ============================================================
import React, { useState, useMemo, memo, createContext, useContext } from "react";
import { View, Text, FlatList } from "react-native";

// --- Cach 1: React.memo - bo qua re-render neu props khong doi (shallow compare) ---
const ChildMemo = memo(function Child({ label }: { label: string }) {
  return <Text>{label}</Text>;
});

// --- Cach 2: Tach STATE xuong component con NHO NHAT co the (co lap state) ---
// KHONG NEN: state o Parent lam CA CAY con re-render moi lan go phim
function SearchScreenBad() {
  const [query, setQuery] = useState("");
  return (
    <View>
      {/* TextInput doi state -> ExpensiveList ben duoi CUNG bi re-render theo,
          du no khong lien quan gi den query */}
      <ExpensiveList />
    </View>
  );
}

// NEN: tach rieng state vao 1 component nho, ExpensiveList dung o ngoai KHONG bi anh huong
function SearchInput() {
  const [query, setQuery] = useState("");
  return <View>{/* TextInput o day, chi component nay re-render khi go phim */}</View>;
}
function SearchScreenGood() {
  return (
    <View>
      <SearchInput />
      <ExpensiveList /> {/* khong nam chung cay voi state -> khong bi keo theo re-render */}
    </View>
  );
}
function ExpensiveList() { return <View />; }

// --- Cach 3: "children as props" (composition) - tranh component cha re-render
// keo theo con NANG, ke ca khi con da duoc memo (vi memo van phai so sanh) ---
function Layout({ children }: { children: React.ReactNode }) {
  const [count, setCount] = useState(0);
  // Layout re-render khi count doi, nhung "children" la mot REACT ELEMENT
  // duoc tao TU BEN NGOAI (o component cha cua Layout), nen React BIET
  // no khong doi -> KHONG re-render lai ExpensiveTree ben trong children
  return <View>{children}</View>;
}
// Dung: <Layout><ExpensiveTree /></Layout>
// ExpensiveTree duoc tao 1 lan o ngoai, truyen vao nhu children -> khong bi
// re-render lai moi khi Layout tu re-render vi state noi bo cua no

// --- Cach 4: Tach Context THANH NHIEU CONTEXT NHO, hoac dung state co "selector" ---
// KHONG NEN: 1 context lon chua ca "user" lan "theme" -> doi theme lam
// ca component chi dung "user" cung re-render
type AppState = { user: string; theme: string };
const AppContextBad = createContext<AppState>({ user: "", theme: "light" });

// NEN: tach rieng, hoac dung thu vien co selector (Zustand/Redux+reselect)
// de component CHI re-render khi PHAN STATE no dung thuc su doi
const UserContext = createContext("");
const ThemeContext = createContext("light");

// --- Cach 5: Voi FlatList - key/keyExtractor dung, renderItem duoc memo ---
function ListExample({ data }: { data: { id: string; name: string }[] }) {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id} // KHONG dung index khi list co the them/xoa/sap xep lai
      renderItem={({ item }) => <ChildMemo label={item.name} />}
    />
  );
}
// Neu dung index lam key va list bi sap xep lai/xoa phan tu giua chung,
// React se GAN NHAM item cu vao vi tri moi -> re-render/re-mount SAI cho
// gan nhu toan bo cac item phia sau vi tri thay doi, thay vi chi 1 item


// ============================================================
// TOM TAT NGAN GON DE TRA LOI PHONG VAN
// ============================================================
// "Re-render xay ra khi: state doi, props doi, component cha re-render (keo
// theo TOAN BO con theo mac dinh), hoac context value doi. Re-render chi la
// React chay lai ham + so sanh o JS thread, chi khi ket qua khac moi thuc su
// cap nhat native UI qua Fabric. De tranh re-render thua: dung React.memo,
// tach state xuong component con nho nhat, dung pattern children-as-props
// de tranh keo theo cay con khi cha re-render, tach nho Context hoac dung
// state co selector, va voi FlatList thi dung keyExtractor on dinh (khong
// dung index khi list co the thay doi thu tu)."
