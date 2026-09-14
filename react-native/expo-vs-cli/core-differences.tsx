/**
 * CAU 1 (Expo vs React Native CLI): Khac nhau nhu the nao.
 *
 * Day la cau hoi RAT HAY GAP o tam senior, vi nhieu nguoi con hieu
 * SAI/CU ve Expo (nghi Expo "khong lam duoc native code") - hieu dung
 * VA CAP NHAT se ghi diem ro ret.
 *
 * (Cau hoi rieng ve CO CHE Prebuild/CNG hoat dong CHI TIET the nao,
 * xem file prebuild-cng.tsx - file nay chi noi TONG QUAN de so sanh)
 */

// ============================================================
// BUOC 0: HIEU LAM PHO BIEN (VA DA CU) CAN SUA TRUOC TIEN
// ============================================================
// NHIEU NGUOI VAN NGHI: "Expo = khong dung duoc native module tuy y,
// chi dung duoc nhung gi Expo cho san". DIEU NAY DUNG VOI EXPO CACH DAY
// VAI NAM (Managed Workflow cu), NHUNG KHONG CON DUNG VOI EXPO HIEN TAI:
//
// Tu khi co PREBUILD (Continuous Native Generation - CNG) va EXPO
// DEV CLIENT, Expo hien dai CO THE dung BAT KY native module/thu vien
// nao (giong het bare RN CLI), chi khac O CACH QUAN LY code native:
// Expo TU SINH RA thu muc ios/ va android/ TU CAU HINH (app.json +
// config plugins) MOI LAN BUILD, thay vi ban tu tay quan ly 2 thu muc
// do nhu bare CLI.


// ============================================================
// BUOC 1: KIEN TRUC - AI QUAN LY THU MUC ios/ VA android/
// ============================================================
// React Native CLI (bare):
//   - Thu muc ios/ va android/ TON TAI SAN trong repo, ban TU TAY SUA
//     truc tiep (Xcode project, Gradle files) khi can custom
//   - Ban chiu HOAN TOAN TRACH NHIEM quan ly, nang cap cac file native nay
//
// Expo (voi Prebuild/CNG):
//   - Thu muc ios/ va android/ KHONG NAM SAN trong repo (thuong duoc
//     .gitignore) - chung duoc TU SINH RA moi lan chay `npx expo prebuild`
//     hoac luc `eas build`, DUA TREN app.json/app.config.js + cac
//     "CONFIG PLUGIN" (khai bao thay doi native CAN THIET mot cach
//     KHAI BAO, khong phai sua tay truc tiep)
//   - MUON custom native sau (them permission, them native module),
//     ban VIET 1 CONFIG PLUGIN hoac dung config plugin co san cua thu
//     vien, KHONG sua truc tiep file native


// ============================================================
// BUOC 2: DEV EXPERIENCE (trai nghiem phat trien)
// ============================================================
// Expo:
//   - `npx expo start`, quet QR bang app Expo Go de chay THU NGAY (voi
//     du an CHI dung Expo SDK APIs, khong co native module tuy chinh)
//   - Voi du an co native module rieng: dung EXPO DEV CLIENT (build 1
//     ban app "dev" rieng co san cac native module do), van giu duoc
//     trai nghiem Fast Refresh/dev menu nhu Expo Go
//   - EAS Build: build CLOUD (khong can cai Xcode/Android Studio tren
//     may de BUILD RA FILE, tuy VAN CAN de chay simulator/debug sau)
//   - EAS Update: OTA update (Cau 1 muc Build/CI-CD) tich hop san, setup
//     nhanh hon tu lam CodePush rieng
//
// React Native CLI:
//   - Can cai Xcode/Android Studio TU DAU de build/chay
//   - Tu setup CI/CD (Fastlane, GitHub Actions...) hoan toan tu tay
//   - Tu setup OTA update (react-native-update hoac tu lam)


// ============================================================
// BUOC 3: NANG CAP PHIEN BAN REACT NATIVE
// ============================================================
// - Bare CLI: nang cap RN THEO Y MUON, BAT KY LUC NAO, kiem soat toan
//   bo qua trinh (nhung PHAI TU XU LY moi breaking change lien quan
//   native o ca 2 nen tang)
// - Expo: nang cap theo "EXPO SDK VERSION" (moi Expo SDK version gan
//   voi 1 phien ban RN cu the) - THUONG cham hon 1 chut so voi RN moi
//   nhat, DOI LAI Expo da TEST SAN tinh tuong thich giua cac thu vien
//   trong he sinh thai Expo, giam rui ro "nang cap RN xong loi tùm lum"


// ============================================================
// TOM TAT NGAN GON DE TRA LOI PHONG VAN
// ============================================================
// "Ve ban chat, Expo hien dai KHONG con bi gioi han native module nhu
// truoc day - diem khac biet chinh la CACH QUAN LY code native: bare
// CLI ban tu tay giu va sua thu muc ios/android; Expo dung Prebuild de
// TU SINH 2 thu muc do tu app.json + config plugin, ban khai bao thay
// doi thay vi sua tay truc tiep. Ve trai nghiem, Expo co EAS Build (build
// cloud, khong can Xcode/Android Studio de build ra file) va EAS Update
// (OTA tich hop san), con bare CLI phai tu setup CI/CD va OTA rieng.
// Ve nang cap, bare CLI linh hoat nang RN bat ky luc nao nhung tu chiu
// rui ro breaking change; Expo nang theo SDK version, cham hon 1 chut
// nhung da duoc test tuong thich san."
