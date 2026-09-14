/**
 * CAU 20 (React Native): Xu ly responsive cho nhieu kich thuoc
 * man hinh / tablet.
 */

import { Dimensions, PixelRatio, useWindowDimensions, View, StyleSheet } from "react-native";

// ============================================================
// CACH 1: useWindowDimensions - hook, TU RE-RENDER khi xoay man hinh
// ============================================================
// KHAC voi Dimensions.get("window") (chi doc 1 lan, KHONG tu cap nhat
// khi xoay ngang/doc man hinh), useWindowDimensions la HOOK nen component
// TU RE-RENDER voi gia tri MOI moi khi kich thuoc man hinh doi (xoay
// man hinh, hoac tren web/tablet khi resize cua so):
function ResponsiveGrid() {
  const { width } = useWindowDimensions();
  const numColumns = width > 768 ? 4 : width > 480 ? 3 : 2; // tablet: 4, man vua: 3, dt nho: 2

  return <View style={{ flexDirection: "row", flexWrap: "wrap" }} />;
}


// ============================================================
// CACH 2: Dung % thay vi gia tri co dinh khi co the
// ============================================================
const styles = StyleSheet.create({
  halfWidth: { width: "50%" }, // luon chiem 50% cha, tu thich ung moi kich thuoc
});


// ============================================================
// CACH 3: Breakpoint tu dinh nghia (giong CSS media query, RN KHONG
// CO SAN media query nen phai tu viet ham helper)
// ============================================================
const BREAKPOINTS = { phone: 0, tablet: 768, desktop: 1024 };

function getDeviceType(width: number): "phone" | "tablet" | "desktop" {
  if (width >= BREAKPOINTS.desktop) return "desktop";
  if (width >= BREAKPOINTS.tablet) return "tablet";
  return "phone";
}

function AdaptiveLayout() {
  const { width } = useWindowDimensions();
  const deviceType = getDeviceType(width);

  // deviceType === "tablet" -> vd hien 2 cot (master-detail) thay vi 1 cot
  return null;
}


// ============================================================
// CACH 4: Scale theo mat do diem anh + kich thuoc man hinh (font,
// khoang cach) - tranh chu QUA NHO tren man hinh lon hoac QUA TO tren
// man hinh nho
// ============================================================
const { width: SCREEN_WIDTH } = Dimensions.get("window");
const BASE_WIDTH = 375; // kich thuoc thiet ke goc (vd thiet ke tren iPhone chuan)

function scaleFont(size: number) {
  const scale = SCREEN_WIDTH / BASE_WIDTH;
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}
// -> Dung: fontSize: scaleFont(16) thay vi fontSize: 16 co dinh
// (Thu vien pho bien lam san viec nay: react-native-size-matters,
// react-native-responsive-screen)


// ============================================================
// CACH 5: layout RIENG HAN cho tablet (khong chi la scale, ma DOI
// CACH BO CUC - vd master-detail 2 cot thay vi list don cot)
// ============================================================
function ProductScreen() {
  const { width } = useWindowDimensions();
  const isTablet = width >= BREAKPOINTS.tablet;

  if (isTablet) {
    // return <MasterDetailLayout />; // hien danh sach + chi tiet CANH NHAU
  }
  // return <ListOnlyLayout />; // dien thoai: chi hien danh sach, bam vao moi sang chi tiet
  return null;
}


// ============================================================
// TOM TAT NGAN GON DE TRA LOI PHONG VAN
// ============================================================
// "Minh dung useWindowDimensions thay vi Dimensions.get de tu re-render
// khi xoay man hinh, ket hop % cho kich thuoc linh hoat, va tu dinh
// nghia breakpoint (vd 768px cho tablet) vi RN khong co media query san
// nhu CSS. Voi font/khoang cach, scale theo ty le man hinh so voi kich
// thuoc thiet ke goc (hoac dung thu vien nhu react-native-size-matters).
// Quan trong nhat: voi tablet khong chi 'phong to' UI dien thoai, ma
// nen DOI HAN bo cuc khi can - vi du man danh sach tren dien thoai
// chuyen thanh layout master-detail 2 cot tren tablet."
