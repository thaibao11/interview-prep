/**
 * CAU 2 (React Native): useMemo vs useCallback
 * Va cac truong hop dung PHAN TAC DUNG (lam cham hon thay vi nhanh hon)
 */

// ============================================================
// BUOC 0: On dinh nghia
// ============================================================
// useMemo(fn, deps)     -> cache GIA TRI ma fn() tra ve
// useCallback(fn, deps) -> cache CHINH FUNCTION fn do (giu nguyen tham chieu)
//
// Thuc chat: useCallback(fn, deps) === useMemo(() => fn, deps)
// -> useCallback CHI LA 1 TRUONG HOP DAC BIET cua useMemo, dung khi thu can cache
//    la mot function thay vi mot gia tri thuong.


// ============================================================
// BUOC 1: PHAN TAC DUNG #1 - memo hoa 1 phep tinh QUA RE
// ============================================================
import React, { useMemo, useCallback, useState } from "react";
import { View, Text, Pressable } from "react-native";

// KHONG NEN:
function PriceBad({ price, quantity }: { price: number; quantity: number }) {
  const total = useMemo(() => price * quantity, [price, quantity]);
  // Phep nhan 2 so cuc re. Nhung useMemo phai:
  //   1. Luu lai mang deps cu [price, quantity]
  //   2. Moi lan render, so sanh tung phan tu deps cu vs moi (Object.is)
  //   3. Neu deps giong nhau, tra ve gia tri cu; neu khac, chay lai fn va luu ket qua moi
  // -> Chi phi "quan ly cache" nay TON HON chinh phep nhan ban dang co "tiet kiem"
  return <Text>{total}</Text>;
}

// NEN:
function PriceGood({ price, quantity }: { price: number; quantity: number }) {
  const total = price * quantity; // tinh truc tiep, khong can memo
  return <Text>{total}</Text>;
}
// -> Quy tac: chi memo hoa nhung phep tinh THUC SU NANG (loc/sap xep mang lon,
//    tinh toan phuc tap), khong memo hoa nhung phep tinh don gian nhu cong/nhan/nhan chuoi.


// ============================================================
// BUOC 2: PHAN TAC DUNG #2 - useCallback nhung CHILD khong dung React.memo
// ============================================================
// ChildButton KHONG duoc boc React.memo -> no se re-render MOI KHI Parent re-render,
// BAT KE prop onPress co giu nguyen tham chieu hay khong.
function ChildButton({ onPress }: { onPress: () => void }) {
  console.log("ChildButton render");
  return <Pressable onPress={onPress}><Text>Bam vao day</Text></Pressable>;
}

function ParentBad() {
  const [count, setCount] = useState(0);
  const [unrelated, setUnrelated] = useState(0);

  const handlePress = useCallback(() => {
    setCount((c) => c + 1);
  }, []); // gia tri onPress luon giu nguyen tham chieu giua cac lan render

  return (
    <View>
      <ChildButton onPress={handlePress} />
      {/* Nhung vi ChildButton KHONG co React.memo, no van re-render moi khi
          ParentBad re-render (vd khi bam nut ben duoi doi unrelated) -> useCallback
          o day HOAN TOAN VO NGHIA, chi ton chi phi tao closure + luu deps */}
      <Pressable onPress={() => setUnrelated((u) => u + 1)}>
        <Text>Doi state khong lien quan</Text>
      </Pressable>
    </View>
  );
}

// NEN: chi useCallback CO Y NGHIA khi Child duoc boc React.memo
const ChildButtonMemo = React.memo(ChildButton);

function ParentGood() {
  const [count, setCount] = useState(0);
  const [unrelated, setUnrelated] = useState(0);

  const handlePress = useCallback(() => {
    setCount((c) => c + 1);
  }, []);

  return (
    <View>
      <ChildButtonMemo onPress={handlePress} />
      {/* Gio ChildButtonMemo se KHONG re-render khi unrelated doi,
          vi onPress giu nguyen tham chieu VA component da duoc React.memo */}
      <Pressable onPress={() => setUnrelated((u) => u + 1)}>
        <Text>Doi state khong lien quan</Text>
      </Pressable>
    </View>
  );
}


// ============================================================
// BUOC 3: PHAN TAC DUNG #3 - deps la object/array TAO MOI moi lan render
// ============================================================
function FilterListBad({ items }: { items: string[] }) {
  const options = { caseSensitive: false }; // TAO MOI moi lan render -> tham chieu luon khac

  const filtered = useMemo(() => {
    return items.filter((i) => (options.caseSensitive ? i === "x" : true));
  }, [items, options]); // options doi tham chieu MOI LAN -> useMemo KHONG BAO GIO "trung cache"
  // -> Ket qua: fn ben trong LUON chay lai (giong nhu khong co useMemo),
  //    nhung van phai tra them chi phi so sanh deps -> chi co hai, khong co loi

  return null;
}


// ============================================================
// TOM TAT NGAN GON DE TRA LOI PHONG VAN
// ============================================================
// "useMemo cache GIA TRI, useCallback cache FUNCTION (thuc chat la 1 dang dac
//  biet cua useMemo). Ca hai deu co chi phi rieng (luu + so sanh deps moi
//  render), nen dung sai cho nhung tinh toan/ham don gian, hoac dung useCallback
//  cho mot child KHONG duoc React.memo, se lam code CHAM HON thay vi nhanh hon.
//  Minh chi memo hoa khi: (1) phep tinh thuc su nang, hoac (2) can giu on dinh
//  tham chieu de mot child da React.memo khong bi re-render thua."
