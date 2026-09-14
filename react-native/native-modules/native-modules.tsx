/**
 * CAU 11 (React Native): Khi nao can tu viet Native Module,
 * thay vi dung thu vien JS thuan co san.
 */

// ============================================================
// BUOC 0: On lai Native Module la gi
// ============================================================
// Native Module la 1 "cau noi" cho phep code JS GOI DUOC code Native that
// (Swift/Objective-C ben iOS, Kotlin/Java ben Android) - dung khi RN core
// va cac thu vien JS co san KHONG DAP UNG DUOC yeu cau.


// ============================================================
// BUOC 1: 5 LY DO THUONG GAP CAN TU VIET NATIVE MODULE
// ============================================================

// LY DO 1 - Can API he dieu hanh MA RN CORE KHONG CO SAN, VA CHUA CO
// THU VIEN COMMUNITY nao lam:
//   Vi du: doc du lieu tu 1 cam bien phan cung dac thu, tich hop mot
//   tinh nang moi vua ra mat cua iOS/Android ma chua ai viet wrapper RN,
//   truy cap 1 API he thong rat sau (vd NFC voi giao thuc dac biet).

// LY DO 2 - Can DUNG LAI SDK NATIVE CO SAN CUA BEN THU 3 (chi co ban
// Swift/Kotlin, KHONG co ban JS):
//   Vi du RAT THUC TE o Viet Nam: tich hop SDK thanh toan cua ngan hang/
//   vi dien tu (VNPay, Momo, ZaloPay) - nhieu SDK chi phat hanh duoi
//   dang thu vien native (.framework cho iOS, .aar cho Android), KHONG
//   co goi npm nao bao boc san -> BAT BUOC phai tu viet native module
//   de "boc" SDK do lai va expose ham sang JS cho app dung.

// LY DO 3 - Can HIEU NANG CAO cho tac vu NANG (truoc khi co JSI/worklet,
// hoac tac vu qua nang ke ca voi worklet):
//   Vi du: xu ly/nen mot video dai truoc khi upload, ma tran hoa/giai ma
//   du lieu voi thuat toan phuc tap - chay bang code native (C++/Swift/
//   Kotlin) NHANH HON NHIEU so voi chay logic tuong tu bang JS.

// LY DO 4 - CONG TY DA CO SAN CODE NATIVE TU TRUOC (app native cu):
//   Vi du: cong ty co san 1 module xu ly nghiep vu phuc tap viet bang
//   Kotlin tu thoi app con la native Android, khi chuyen sang RN muon
//   TAI SU DUNG logic do thay vi viet lai toan bo bang JS (tranh risk
//   viet lai sai nghiep vu, tiet kiem thoi gian).

// LY DO 5 - Can CUSTOM NATIVE UI COMPONENT (khong chi la ham logic, ma
// la MOT VIEW THAT):
//   Vi du: nhung custom native view do RN core khong co san va thu vien
//   JS khong dap ung du tuy bien (vd 1 loai bieu do phuc tap chi co SDK
//   native, hoac 1 video player tuy bien co ho tro DRM rieng cua he thong).


// ============================================================
// BUOC 2: KHI NAO KHONG CAN (tranh viet native module thua)
// ============================================================
// - Da co thu vien community on dinh, duoc maintain tot, dap ung du yeu
//   cau (vd: can luu tru bao mat -> dung react-native-keychain co san,
//   KHONG can tu viet lai tu dau)
// - Van de co the giai bang JS thuan + Reanimated/Gesture Handler (voi
//   kien truc moi, rat nhieu bai toan hieu nang truoc day PHAI viet
//   native gio co the giai bang worklet chay tren UI thread)
// - LUU Y: tu viet native module ĐỒNG NGHĨA phai TU MAINTAIN CA 2 BAN
//   (iOS + Android), tu cap nhat khi RN/OS ra ban moi - CHI PHI BAO TRI
//   lau dai LON HON nhieu so voi dung thu vien co san, nen chi lam khi
//   THUC SU CAN THIET (khong co lua chon khac)


// ============================================================
// TOM TAT NGAN GON DE TRA LOI PHONG VAN
// ============================================================
// "Minh se viet Native Module khi: (1) can API he dieu hanh ma RN/thu
// vien community chua ho tro, (2) can tich hop 1 SDK native cua ben thu
// 3 CHI CO ban Swift/Kotlin (vi du SDK thanh toan VNPay/Momo o VN), (3)
// can hieu nang cao cho tac vu rat nang (xu ly video, ma hoa phuc tap),
// (4) tai su dung code native cong ty da co san tu truoc, hoac (5) can
// mot custom native UI component ma JS khong dap ung du. Ngoai nhung
// truong hop do, minh uu tien dung thu vien community co san, vi tu
// viet native module keo theo chi phi maintain ca 2 nen tang lau dai."
