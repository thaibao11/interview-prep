/**
 * CAU 25 (React Native, chot muc Toi uu hieu nang): Vi sao gui du lieu
 * lon/lien tuc qua bridge cu anh huong hieu nang, va kien truc moi cai
 * thien nhu the nao.
 *
 * (Cau nay lien quan truc tiep toi noi dung da hoc o architecture/bridge-architecture.ts
 * va architecture/new-architecture.ts - file nay tom tat lai duoi goc do HIEU NANG)
 */

// ============================================================
// BUOC 0: NHAC LAI co che Bridge cu
// ============================================================
// Bridge la 1 hang doi tin nhan BAT DONG BO. Moi lan JS va Native trao
// doi du lieu, du lieu PHAI duoc SERIALIZE thanh CHUOI JSON, gui qua
// hang doi, roi Native DESERIALIZE lai thanh du lieu that.


// ============================================================
// BUOC 1: TAI SAO du lieu LON/LIEN TUC la van de LON HON BINH THUONG
// ============================================================
// - Du lieu LON (vd 1 danh sach hang ngan phan tu, 1 anh base64): chi
//   phi SERIALIZE/DESERIALIZE JSON TANG TUYEN TINH theo KICH THUOC du
//   lieu - cang nhieu du lieu, cang ton nhieu thoi gian CPU cho buoc
//   "dich" qua lai nay, CHUA KE toi viec TRUYEN du lieu that
//
// - Du lieu LIEN TUC/TAN SUAT CAO (vd scroll event, gesture, animation
//   MOI FRAME - 60 lan/giay): MOI LAN cap nhat deu phai lap lai TOAN BO
//   quy trinh serialize -> gui -> deserialize. Neu JS thread DANG BAN
//   xu ly viec khac CUNG LUC (vd goi API, tinh toan logic), CAC MESSAGE
//   NAY BI XEP HANG CHO, dan den CAP NHAT BI TRE - nguoi dùng thay UI
//   "khong theo kip" thao tac cua ho (giat, lag)
//
// - Ca 2 yeu to CONG DON: du lieu vua LON vua LIEN TUC (vd stream video
//   frame, du lieu cam bien tan so cao) la TRUONG HOP TE NHAT cho Bridge cu


// ============================================================
// BUOC 2: KIEN TRUC MOI (JSI) cai thien nhu the nao
// ============================================================
// JSI cho JS GIU THAM CHIEU TRUC TIEP toi object/ham Native, KHONG can
// serialize thanh JSON o giua nua:
//   - Voi du lieu LON: neu chi can DOC 1 PHAN du lieu (khong phai toan
//     bo), JS co the goi truc tiep va CHI LAY DUNG PHAN CAN, khong phai
//     serialize CA KHOI JSON lon nhu truoc
//   - Voi du lieu LIEN TUC/TAN SUAT CAO: logic co the chuyen HOAN TOAN
//     xuong chay o NATIVE THREAD/UI THREAD qua WORKLET (Reanimated,
//     Vision Camera Frame Processor - da noi o Cau 6), KHONG can "nhay"
//     ve JS thread o MOI FRAME nua - chi khi CO KET QUA CAN THIET (vd
//     tim thay 1 ma QR) moi gui 1 LUONG DU LIEU NHO ve JS qua runOnJS


// ============================================================
// BUOC 3: VI DU SO SANH TRUC QUAN (dua tren Cau 5, 6 da hoc)
// ============================================================
// Tinh nang "hien thi vi tri con tro theo thoi gian thuc luc keo tha":
//
// Bridge cu:  Ngon tay di chuyen (60 lan/giay)
//               -> JS tinh vi tri moi
//               -> serialize {x, y} thanh JSON
//               -> gui qua hang doi bridge
//               -> Native deserialize, cap nhat view that
//             MOI BUOC deu co CHI PHI, VA neu JS thread ban thi CA CHUOI
//             NAY bi tre theo
//
// JSI (Reanimated worklet):
//               Ngon tay di chuyen -> WORKLET chay TRUC TIEP tren UI
//               thread (qua JSI) -> cap nhat view NGAY, KHONG can di
//               qua JS thread, KHONG serialize JSON o giua
//             -> Muot 60fps ON DINH, KHONG phu thuoc JS thread co dang
//                ban xu ly logic khac hay khong


// ============================================================
// TOM TAT NGAN GON DE TRA LOI PHONG VAN
// ============================================================
// "Voi Bridge cu, moi lan trao doi du lieu deu phai serialize/deserialize
// JSON - du lieu cang lon thi chi phi nay cang cao, va du lieu cap nhat
// cang lien tuc (vd moi frame animation/gesture) thi cang de bi tre neu
// JS thread dang ban, vi cac message phai xep hang cho trong bridge.
// Kien truc moi dung JSI de JS giu tham chieu truc tiep toi native,
// khong con phai serialize JSON o giua, va quan trong hon la cho phep
// logic tan suat cao chay HOAN TOAN tren native/UI thread qua worklet
// (Reanimated, Frame Processor), chi gui ve JS phan ket qua that su can
// thiet - giai quyet dung goc re cua van de thay vi chi giam nhe chi phi
// nhu toi uu tren Bridge cu."
