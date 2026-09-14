/**
 * CAU 1 (React Native): useEffect vs useLayoutEffect
 * Y giong React web, nhung KHONG duoc noi "DOM" - RN khong co DOM.
 */

// ============================================================
// BUOC 0: SUA THUAT NGU - RN khong co DOM
// ============================================================
// Tren WEB:
//   render -> React cap nhat DOM -> BROWSER VE (paint) man hinh
//   - useLayoutEffect: chay SYNC ngay sau khi DOM duoc cap nhat, TRUOC KHI browser paint
//   - useEffect: chay ASYNC, SAU KHI browser da paint xong
//
// Tren REACT NATIVE:
//   khong co "DOM", khong co "browser paint". Thay vao do:
//   render -> React tao/cap nhat CAY NATIVE (qua Fabric: Shadow Tree -> layout bang Yoga)
//            -> cac native view (UIView/ViewGroup that) duoc cap nhat tren man hinh
//   - useLayoutEffect: chay SYNC ngay sau khi cay native duoc TINH TOAN layout xong,
//     TRUOC KHI frame do duoc hien thi cho nguoi dung thay
//   - useEffect: chay ASYNC, SAU KHI frame da hien thi

// -> Ban giu nguyen y "cai nao chay truoc/sau khi len man hinh", chi sua tu "DOM"
//    thanh "cay native / native view" cho dung ngu canh RN.


// ============================================================
// BUOC 1: Vi du don gian - do KICH THUOC mot view sau khi render
// ============================================================
import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import { View, Text } from "react-native";

function BoxMeasureExample() {
  const boxRef = useRef<View>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    // Neu do kich thuoc o day: nguoi dung co the thay 1 khoanh khac (flicker)
    // truoc khi width duoc cap nhat, vi frame dau tien DA hien thi roi
  }, []);

  return (
    <View
      ref={boxRef}
      onLayout={(e) => setWidth(e.nativeEvent.layout.width)} // cach do layout PHO BIEN NHAT trong RN
    >
      <Text>Chieu rong: {width}</Text>
    </View>
  );
}


// ============================================================
// BUOC 2: Khi nao dung useLayoutEffect trong RN
// -> Khi can TINH TOAN/DIEU CHINH giao dien DUA TREN KICH THUOC vua do duoc,
//    va muon dieu do xay ra TRUOC KHI nguoi dung kip thay frame cu (tranh giat/flicker)
// Vi du: tooltip / popover can tu dinh vi de khong bi tran ra ngoai man hinh
// ============================================================
function TooltipExample({ visible }: { visible: boolean }) {
  const [tooltipTop, setTooltipTop] = useState(0);
  const targetRef = useRef<View>(null);

  useLayoutEffect(() => {
    if (visible && targetRef.current) {
      // dinh vi lai tooltip TRUOC KHI hien thi, tranh nguoi dung thay no
      // "nhay" tu vi tri sai sang vi tri dung
    }
  }, [visible]);

  return <View ref={targetRef} />;
}


// ============================================================
// BUOC 3: LUU Y QUAN TRONG - diem KHAC BIET voi web ma nhieu senior hay quen noi
// ============================================================
// Tren web, measure() (getBoundingClientRect) la SYNCHRONOUS -> useLayoutEffect
// doc duoc kich thuoc ngay lap tuc trong cung 1 lan chay.
//
// Tren RN, ref.measure() / onLayout la BAT DONG BO (callback, khong tra ve ngay):
//
//   targetRef.current?.measure((x, y, width, height, pageX, pageY) => {
//     // ket qua chi co O DAY, sau 1 nhip, khong the doc dong bo nhu web
//   });
//
// -> Vi vay loi ich "tranh flicker hoan toan" cua useLayoutEffect tren RN
//    KHONG manh nhu tren web, vi ban van phai cho callback do kich thuoc bat dong bo.
//    useLayoutEffect trong RN van huu ich (chay som hon useEffect, truoc khi commit
//    hien thi cho nguoi dung), nhung khong "than ky" bang web o phan do dac dong bo.


// ============================================================
// TOM TAT NGAN GON DE TRA LOI PHONG VAN
// ============================================================
// "useEffect chay bat dong bo SAU KHI frame da hien thi cho nguoi dung, con
//  useLayoutEffect chay dong bo NGAY SAU khi cay native duoc tinh layout xong
//  nhung TRUOC KHI frame do hien ra - RN khong co DOM/browser paint nhu web,
//  ma la Fabric/Shadow Tree cap nhat native view. Minh dung useLayoutEffect khi
//  can dieu chinh vi tri/kich thuoc UI dua tren layout vua do de tranh giat hinh,
//  vi du dinh vi lai tooltip. Luu y la measure() trong RN bat dong bo (khac web),
//  nen loi ich chinh cua useLayoutEffect o day la chay TRUOC useEffect, khong
//  phai doc layout dong bo tuc thi nhu web."
