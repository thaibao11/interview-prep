/**
 * CAU 19 (React Native): StyleSheet.create mang lai loi ich gi
 * so voi inline style object.
 */

import React from "react";
import { View, StyleSheet } from "react-native";

// ============================================================
// CACH 1 (KHONG NEN VOI STYLE CO DINH): inline style object
// ============================================================
function BoxInline() {
  // { padding: 10, backgroundColor: "red" } la 1 OBJECT MOI duoc TAO RA
  // MOI LAN component nay render, du gia tri ben trong GIONG HET nhau
  return <View style={{ padding: 10, backgroundColor: "red" }} />;
}


// ============================================================
// CACH 2 (NEN): StyleSheet.create
// ============================================================
const styles = StyleSheet.create({
  box: { padding: 10, backgroundColor: "red" },
});

function BoxStyleSheet() {
  return <View style={styles.box} />; // CUNG 1 reference, khong tao moi moi lan render
}


// ============================================================
// LOI ICH CU THE
// ============================================================
// 1. HIEU NANG - tranh tao OBJECT MOI moi lan render:
//    Voi inline style, MOI LAN component render, JS engine phai TAO
//    MOI 1 object style -> tang ap luc garbage collector (Cau memory),
//    va neu style do duoc so sanh (vd trong React.memo) se LUON bi coi
//    la "khac nhau" vi khac tham chieu, GAY RE-RENDER THUA cho con.
//    StyleSheet.create TAO 1 LAN DUY NHAT luc module duoc load, sau do
//    CHI TRA VE THAM CHIEU CO SAN moi lan dung.
//
// 2. GUI QUA BRIDGE HIEU QUA HON (kien truc cu):
//    StyleSheet.create() thuc chat tra ve 1 SO ID (khong phai object
//    JS thuong), RN co the GUI ID DO qua bridge (kien truc cu) thay vi
//    gui ca object style day du moi lan - GIAM DU LIEU can serialize.
//    (Voi kien truc moi/Fabric, loi ich nay giam bot vi khong con phai
//    serialize JSON qua bridge nhu cu, nhung van con loi ich #1 o tren.)
//
// 3. TO CHUC CODE RO RANG HON: tach STYLE ra khoi JSX, de doc, de tim
//    kiem (grep ten class-like), giong nhu tach CSS ra khoi HTML, thay
//    vi nhet het style trong 1 dong JSX rat dai kho doc.
//
// 4. TYPE-CHECKING & LOI SOM: StyleSheet.create (voi TypeScript) BAO LOI
//    NGAY LUC BIEN DICH neu dung sai ten thuoc tinh CSS (vd go nham
//    "backgroundColour" thay vi "backgroundColor"), thay vi de sai lang
//    le luc runtime.


// ============================================================
// LUU Y: khi NAO VAN CAN inline style (khong phai luc nao StyleSheet
// cung "thang tuyet doi")
// ============================================================
// Khi GIA TRI STYLE PHU THUOC PROPS/STATE (dong, tinh toan luc runtime),
// BAT BUOC phai dung inline hoac mang [styles.x, { ... }]:
function DynamicBox({ isActive }: { isActive: boolean }) {
  return (
    <View style={[styles.box, isActive && { backgroundColor: "green" }]} />
  );
}
// -> Phan CO DINH (padding) van nen de trong StyleSheet.create (styles.box),
//    CHI PHAN THAY DOI THEO PROPS moi can inline object rieng


// ============================================================
// TOM TAT NGAN GON DE TRA LOI PHONG VAN
// ============================================================
// "StyleSheet.create tao style 1 lan duy nhat luc module load, tra ve
// cung 1 tham chieu moi lan dung, tranh tao object moi moi render nhu
// inline style - giam ap luc garbage collector va tranh gay re-render
// thua cho component da duoc React.memo. Voi kien truc cu, no con giup
// gui ID qua bridge thay vi ca object, giam du lieu serialize. Ngoai ra
// co loi ich to chuc code ro rang va bao loi som luc bien dich neu sai
// ten thuoc tinh. Van dung inline style khi gia tri style phu thuoc
// truc tiep vao props/state can tinh dong luc runtime."
