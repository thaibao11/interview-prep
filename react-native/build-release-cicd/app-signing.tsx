/**
 * CAU 3 (Build, release & CI/CD): App signing/provisioning profile
 * khac nhau ra sao giua iOS va Android.
 */

// ============================================================
// BUOC 0: TAI SAO CAN KY (SIGN) APP
// ============================================================
// Ca 2 nen tang deu YEU CAU app phai duoc KY BANG 1 CHU KY SO truoc khi
// cai duoc len thiet bi/phan phoi qua store - de he dieu hanh XAC MINH
// app THUC SU den tu 1 NGUON XAC DINH (khong bi gia mao/sua doi), va de
// nhan biet CAC BAN CAP NHAT SAU co PHAI CUNG 1 NHA PHAT TRIEN hay khong.


// ============================================================
// BUOC 1: iOS - CERTIFICATE + PROVISIONING PROFILE (do APPLE CAP)
// ============================================================
// - CERTIFICATE (Development/Distribution): CAP BOI APPLE, gan voi tai
//   khoan Apple Developer, di kem 1 PRIVATE KEY. Co 2 loai chinh:
//   Development (chay tren thiet bi test qua Xcode) va Distribution
//   (dung de release len TestFlight/App Store)
// - PROVISIONING PROFILE: 1 FILE KET HOP giua Certificate + App ID +
//   (voi ban Development/Ad Hoc) DANH SACH DEVICE ID duoc phep cai +
//   Entitlements (quyen dac biet nhu Push Notification, Associated
//   Domains). Ban App Store distribution KHONG can gioi han device.
// - CA 2 DEU CO HAN SU DUNG (certificate thuong 1 NAM), PHAI RENEW dinh
//   ky, neu HET HAN se KHONG BUILD/CHAY duoc app cho den khi renew
//
// -> LOI THUONG GAP: "signing mismatch" khi build release do
//    provisioning profile KHONG KHOP voi Bundle ID hoac certificate
//    dang dung, hoac QUEN RENEW certificate da het han


// ============================================================
// BUOC 2: Android - KEYSTORE (TU TAO, khong do Google cap)
// ============================================================
// - KEYSTORE: 1 file (.jks/.keystore) chua PRIVATE KEY, DEV TU TAO
//   (bang lenh keytool), KHONG PHU THUOC vao Google cap phat nhu iOS
// - Voi PLAY APP SIGNING (mac dinh cho app moi tren Play Console): ban
//   ky app bang "UPLOAD KEY" cua rieng ban, roi GOOGLE TU KY LAI bang
//   1 "APP SIGNING KEY" RIENG cua Google truoc khi PHAN PHOI toi nguoi
//   dung - tang bao mat: neu MAT upload key, van co the YEU CAU Google
//   RESET (vi Google van giu app signing key that su); con neu app
//   signing key (Google giu) bi lo thi Google chiu trach nhiem xu ly


// ============================================================
// BUOC 3: SO SANH NGAN GON - DIEM KHAC BIET LON NHAT
// ============================================================
//              | iOS                          | Android
// -------------------------------------------------------------------
// Ai cap phat  | APPLE cap ca certificate     | TU TAO keystore, khong
//              | va provisioning profile      | can ben thu 3 cap (tru
//              | (phu thuoc Apple Developer   | Play App Signing la 1
//              | account)                     | lop bao ve THEM)
// Han su dung  | CO HAN (~1 nam), phai renew  | KHONG HET HAN (tu quan
//              |                              | ly, mat thi kho khoi phuc
//              |                              | neu KHONG dung Play App Signing)
// Rang buoc    | Provisioning profile con     | Khong co khai niem
// thiet bi     | rang buoc DANH SACH DEVICE   | "danh sach device duoc
//              | ID (ban Dev/Ad Hoc)          | phep" nhu iOS


// ============================================================
// BUOC 4: CONG CU HO TRO - Fastlane match (Cau 2)
// ============================================================
// Voi iOS, thay vi MOI DEV tu tao certificate/profile RIENG (de gay
// XUNG DOT, qua nhieu profile khong dong bo), Fastlane match LUU cac
// file nay (DA MA HOA) trong 1 GIT REPO RIENG, CA TEAM va CI DEU DUNG
// CHUNG 1 BO DUY NHAT, tu dong tai ve khi build.


// ============================================================
// TOM TAT NGAN GON DE TRA LOI PHONG VAN
// ============================================================
// "iOS dung certificate (do Apple cap, gan voi Apple Developer account)
// ket hop provisioning profile (gom certificate + App ID + danh sach
// device duoc phep voi ban Dev/Ad Hoc), ca 2 deu co han va can renew
// dinh ky. Android dung keystore tu tao, khong phu thuoc Google cap
// phat, tu RN gan day co them lop Play App Signing: minh ky bang upload
// key rieng, Google re-sign bang app signing key cua Google truoc khi
// phan phoi, giup an toan hon neu mat upload key. Diem khac biet lon
// nhat la iOS phu thuoc Apple cap phat va co han su dung, con Android tu
// chu hoan toan tru khi dung them Play App Signing. Team minh dung
// Fastlane match de dong bo certificate/profile chung cho ca team,
// tranh xung dot khi moi nguoi tu tao rieng."
