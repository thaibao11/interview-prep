/**
 * CAU 21 (React Native): Platform.select va file .ios.js/.android.js
 * dung khi nao.
 */

import { Platform, StyleSheet } from "react-native";

// ============================================================
// CACH 1: Platform.OS - re nhanh don gian (if/ternary)
// ============================================================
function getHeaderHeight() {
  return Platform.OS === "ios" ? 44 : 56; // iOS/Android co chieu cao header mac dinh khac nhau
}


// ============================================================
// CACH 2: Platform.select - GON HON khi co NHIEU GIA TRI can chon
// theo platform CUNG LUC (thay vi viet nhieu if/ternary rieng le)
// ============================================================
const styles = StyleSheet.create({
  shadow: Platform.select({
    ios: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
    },
    android: {
      elevation: 4, // Android dung "elevation" thay vi shadow* rieng le
    },
  }),
});
// -> Dung khi CA MOT NHOM thuoc tinh khac han giua 2 nen tang (nhu do
//    bong o tren: iOS dung shadow*, Android dung elevation) - Platform.select
//    gom lai GON HON la viet if rieng cho tung thuoc tinh


// ============================================================
// CACH 3: File .ios.tsx / .android.tsx - khi LOGIC/UI KHAC NHAU DANG KE
// (khong chi vai thuoc tinh style, ma ca cau truc component)
// ============================================================
// Header.ios.tsx      <- component rieng cho iOS (vd dung native back gesture)
// Header.android.tsx  <- component rieng cho Android (vd co nut back cung UI)
// import Header from "./Header"; // Metro bundler TU CHON dung file theo
//                                 // platform dang build, KHONG can if/else
//                                 // trong code, va code KHONG BUNDLE PHAN
//                                 // KHONG DUNG TOI (vd code .android.tsx
//                                 // KHONG bi dong goi vao ban build iOS)


// ============================================================
// KHI NAO CHON CACH NAO
// ============================================================
// - Chi khac 1-2 GIA TRI don gian (so, string)        -> Platform.OS
// - Khac 1 NHOM thuoc tinh style (vd shadow vs elevation) -> Platform.select
// - Khac CA CAU TRUC COMPONENT/LOGIC (khong chi style)  -> file .ios/.android
//   (giup TACH BACH code, tranh 1 component vua to vua chi chit if/else
//   Platform.OS o khap noi, va giam kich thuoc bundle vi phan khong
//   dung cho platform kia KHONG duoc dong goi vao)


// ============================================================
// TOM TAT NGAN GON DE TRA LOI PHONG VAN
// ============================================================
// "Platform.OS dung cho re nhanh don gian 1-2 gia tri. Platform.select
// gon hon khi can chon CA MOT NHOM thuoc tinh khac nhau giua 2 nen tang
// (vd shadow cua iOS vs elevation cua Android). File .ios.tsx/.android.tsx
// dung khi LOGIC hoac CAU TRUC COMPONENT khac nhau dang ke, khong chi la
// style - Metro bundler tu chon dung file theo platform dang build, giup
// tach bach code va giam kich thuoc bundle vi phan khong dung cho platform
// kia khong bi dong goi vao ban build do."
