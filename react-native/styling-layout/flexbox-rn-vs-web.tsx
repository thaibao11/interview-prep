/**
 * CAU 18 (React Native): Flexbox trong RN khac CSS Flexbox web o diem nao.
 */

// ============================================================
// KHAC BIET LON NHAT: flexDirection MAC DINH
// ============================================================
// Web: flexDirection mac dinh la "row" (cac phan tu xep NGANG)
// RN:  flexDirection mac dinh la "column" (cac phan tu xep DOC)
// -> Ly do: RN thiet ke huong toi layout MAN HINH DI DONG, thuong xep
//    cac khoi THEO CHIEU DOC la chinh (header tren, content giua, footer
//    duoi), nen dat "column" lam mac dinh hop ly hon cho da so man hinh app.

import { View, Text, StyleSheet } from "react-native";

function FlexDirectionDemo() {
  return (
    <View style={styles.columnByDefault}>
      {/* Khong can ghi flexDirection: "column", RN da mac dinh nhu vay */}
      <Text>Muc 1</Text>
      <Text>Muc 2</Text>
    </View>
  );
}


// ============================================================
// KHAC BIET KHAC
// ============================================================
// 1. RN KHONG CO don vi "px", "%", "em"... theo nghia CSS web - moi con
//    so (vd width: 100) mac dinh la DENSITY-INDEPENDENT PIXEL (dp), tu
//    quy doi theo mat do diem anh cua tung thiet bi. "%" van dung duoc
//    (theo % cua parent) nhung KHONG CO vw/vh nhu web.
//
// 2. RN KHONG HO TRO day du moi thuoc tinh CSS - vi du KHONG co "float",
//    KHONG co pseudo-class (:hover, :nth-child), KHONG co CSS Grid
//    (chi co Flexbox), gap giua cac phan tu (property "gap") chi duoc
//    ho tro tu cac ban RN kha moi (truoc do phai tu them margin thu cong).
//
// 3. "display: flex" la MAC DINH DUY NHAT trong RN - MOI View deu la
//    flex container ngam dinh, khong the doi sang "display: block"/"grid"
//    nhu web (vi RN khong co khai niem block-level element nhu HTML).
//
// 4. flex: 1 trong RN nghia la "chiem het khong gian con lai" (giong
//    flex-grow: 1 tren web), CHU KHONG PHAI shorthand cho flex-grow/
//    flex-shrink/flex-basis day du nhu web mac dinh.

const styles = StyleSheet.create({
  columnByDefault: {
    flex: 1,
    // flexDirection: "column" -> KHONG CAN VIET, day la mac dinh cua RN
  },
});


// ============================================================
// TOM TAT NGAN GON DE TRA LOI PHONG VAN
// ============================================================
// "Khac biet lon nhat la flexDirection mac dinh: web la row, RN la
// column, vi RN huong toi layout man hinh di dong xep doc la chinh.
// Ngoai ra RN dung dp thay vi px/em/vw/vh, khong ho tro CSS Grid/float/
// pseudo-class, moi View deu la flex container mac dinh (khong co
// display: block), va gap property chi co tu cac ban RN gan day."
