/**
 * DU AN 2 TRONG CV: FWD Cube (04/2025 - 01/2026) - nen tang ho tro tu
 * van vien bao hiem, React Native Expo (Web + Mobile)
 *
 * Cung 1 cach dung nhu relyon-deep-dive.ts: liet ke chi tiet DE BI HOI
 * VAN, kem khung tra loi goi y - BAN TU DIEN chi tiet THAT vao.
 */

// ============================================================
// CHI TIET 1: "1 codebase cho iOS, Android VA Web" bang Expo
// ============================================================
// CAU HOI CO THE BI HOI:
//   - "Chia se code sang Web co gap kho khan gi? Nhung thu vien nao
//      KHONG chay duoc tren web (vd Reanimated, native gesture) va ban
//      xu ly the nao?"
//   - "expo-router hoat dong khac React Navigation thuong o diem nao?"
//   - "Flexbox/style co bi lech gi giua native va web khong?" (noi
//      thang toi Cau 18 - flexbox-rn-vs-web.tsx da hoc)
//
// KHUNG TRA LOI TOT NEN CO:
//   - expo-router la FILE-BASED ROUTING (giong Next.js - ten file/thu
//     muc TRONG app/ TU DONG thanh route), khac React Navigation phai
//     KHAI BAO THU CONG cay navigator (Cau 7 - navigation.tsx)
//   - Voi component/thu vien CHI CHAY NATIVE (vd 1 so tinh nang cua
//     Reanimated, BLE, camera native): dung Platform.OS === "web" de RE
//     NHANH, hoac file .web.tsx rieng (Cau 21 - platform-specific-code.tsx)
//     de cung cap BAN THAY THE tren web (vd component web dung CSS
//     animation thay Reanimated)
//   - CAN VI DU CU THE: 1 man hinh/tinh nang NAO trong FWD Cube ban da
//     phai VIET RIENG cho web vi khong the dung chung code voi mobile


// ============================================================
// CHI TIET 2: "offline-tolerant caching and resumable form state"
// ============================================================
// CAU HOI CO THE BI HOI:
//   - "Resumable form state nghia la gi - neu app bi kill giua chung
//      luc dang dien 1 form dai (vd ho so khach hang nhieu buoc), lam
//      sao khoi phuc lai dung cho dang dien do?"
//
// KHUNG TRA LOI TOT NEN CO:
//   - Luu DRAFT cua form vao AsyncStorage/MMKV SAU MOI BUOC (khong doi
//     den luc submit xong moi luu) - noi thang toi nguyen tac o Cau 9
//     (khong nhet du lieu lon vao params, ma luu vao local storage/
//     global state va chi truyen key)
//   - Luc mo lai app, KIEM TRA co draft chua hoan tat khong, hoi nguoi
//     dung co muon TIEP TUC hay bat dau lai
//   - "Offline-tolerant" o day GIONG voi Cau 2 muc Networking
//     (offline-first-design.tsx) - can chuan bi lien he: du lieu ghi
//     luc offline co can QUEUE de dong bo khi co mang lai khong, hay
//     chi can luu local roi submit thu cong sau


// ============================================================
// CHI TIET 3: SSO + token refresh + session timeout + biometric re-auth
// ============================================================
// CAU HOI CO THE BI HOI:
//   - "SSO dung chuan nao (OAuth2/OIDC)? Refresh token flow cu the ra sao?"
//   - "Session timeout duoc TINH nhu the nao o phia client - dua vao
//      thoi gian app o BACKGROUND hay thoi gian KHONG THAO TAC?"
//   - "Bat re-authenticate bang van tay/Face ID luc nao - moi lan mo
//      app, hay chi khi qua 1 khoang thoi gian nhat dinh?"
//
// KHUNG TRA LOI TOT NEN CO:
//   - Dung AppState (RN) lang nghe khi app chuyen background, LUU LAI
//     TIMESTAMP luc do; khi app active tro lai, SO SANH voi thoi gian
//     hien tai - neu VUOT QUA nguong (vd 5 phut), YEU CAU xac thuc lai
//     (biometric) TRUOC KHI cho vao lai app
//   - Refresh token: dung interceptor cua HTTP client (Cau 1 -
//     http-and-data-fetching-libraries.tsx) de TU DONG bat loi 401, goi
//     API refresh token, ROI GOI LAI request cu - neu refresh THAT BAI
//     (refresh token cung het han) moi dieu huong ve man Login
//   - Thu vien biometric pho bien: react-native-biometrics hoac
//     expo-local-authentication (voi du an Expo)


// ============================================================
// CHI TIET 4: In-App Purchase + server-side receipt validation
// ============================================================
// CAU HOI CO THE BI HOI:
//   - "Vi sao PHAI validate receipt o SERVER, khong the chi tin client?"
//   - "Flow cu the tu luc user bam mua den luc duoc cap quyen la gi?"
//   - "Xu ly restore purchase (cai lai app/doi may) nhu the nao?"
//
// KHUNG TRA LOI TOT NEN CO:
//   - KHONG THE tin CLIENT bao "da mua thanh cong", vi client CO THE bi
//     GIA MAO/HACK de tu bao "da mua" ma KHONG THUC SU tra tien - PHAI
//     gui receipt (tu StoreKit/Google Billing) LEN SERVER, server GOI
//     API CHINH THUC cua Apple/Google de XAC MINH receipt do THAT SU
//     HOP LE, roi MOI cap quyen (unlock premium) cho user
//   - Flow: user mua qua StoreKit/Billing -> nhan duoc receipt/purchase
//     token -> gui len backend -> backend goi Apple/Google Server API
//     verify -> backend luu trang thai subscription -> app doc trang
//     thai TU BACKEND (khong tu quyet dinh o client)
//   - Restore: goi lai ham "restorePurchases" cua SDK, gui ket qua len
//     server de doi chieu lai


// ============================================================
// CHI TIET 5: Expo config plugin de bridge document-scanning/e-signature SDK
// ============================================================
// (DAY LA CHI TIET AP DUNG TRUC TIEP kien thuc vua hoc o
//  react-native/expo-vs-cli/prebuild-cng.tsx - CHUAN BI KY PHAN NAY)
//
// CAU HOI CO THE BI HOI:
//   - "SDK do CO SAN config plugin chua, hay ban TU VIET?"
//   - "Neu tu viet, cu the SUA nhung gi trong file native (permission,
//      framework link...)?"
//   - "Co gap loi gi khi PREBUILD LAI ma mat thay doi khong?" (day
//      chinh la "bay" da hoc trong prebuild-cng.tsx - neu ban TUNG sua
//      TAY vao ios/android roi bi mat luc prebuild lai, day la 1 CAU
//      CHUYEN THAT rat dang ke khi phong van)
//
// KHUNG TRA LOI TOT NEN CO:
//   - Neu SDK CHUA co config plugin: mo ta viec viet 1 local config
//     plugin dung "mods" cua Expo de THEM permission camera (usage
//     description trong Info.plist, permission trong AndroidManifest),
//     LINK framework/AAR can thiet
//   - NEU TUNG GAP loi "sua tay bi mat khi prebuild lai" - day la 1 CAU
//     CHUYEN THUC TE CUC HAY de ke, cho thay ban HIEU SAU co che nay
//     chu khong chi biet ly thuyet


// ============================================================
// CHI TIET 6: EAS Build/Submit/Update voi staging/production channel
// ============================================================
// CAU HOI CO THE BI HOI:
//   - "Channel trong EAS Update la gi, khac branch nhu the nao?"
//   - "Neu 1 ban OTA co loi sau khi release, ban ROLLBACK the nao?"
//
// KHUNG TRA LOI TOT NEN CO:
//   - Channel = 1 "kenh phan phoi" (vd staging, production), MOI build
//     duoc gan voi 1 CHANNEL; EAS Update publish OTA THEO CHANNEL, chi
//     nhung ban build da gan CHANNEL do moi nhan duoc ban cap nhat tuong
//     ung - giup TACH BIET RO RANG bane test/production, tranh gui
//     nham OTA staging cho user that
//   - Rollback: EAS Update ho tro PUBLISH LAI 1 UPDATE CU (hoac dung
//     lenh republish ve version truoc), hoac chi dinh lai channel tro
//     ve ban da biet la ON DINH


// ============================================================
// DIEM CAN LUU Y - MAU THUAN TIEM AN VOI PHAN SKILLS CUA CV
// ============================================================
// CV ghi "React Native CLI (primary)" trong phan Mobile Framework, NHUNG
// FWD Cube lai dung EXPO. NEU interviewer hoi: "CV ghi CLI la primary,
// sao du an nay lai dung Expo?" - day la CAU HOI KIEM TRA su NHAT QUAN,
// va CUNG LA CO HOI THE HIEN kien thuc Expo vs CLI (Cau da hoc o
// react-native/expo-vs-cli/choosing-for-new-project.tsx):
//
// CAU TRA LOI GOI Y (dua tren logic da hoc, ban dieu chinh cho DUNG
// LY DO THAT cua du an):
//   "Phan lon du an em lam dung bare CLI vi can custom native sau (vd
//    RELYON can Native Module cho background location/SOS trigger).
//    Rieng FWD Cube em chon Expo vi YEU CAU RIENG cua du an la SHARE
//    CODE SANG CA WEB (react-native-web + expo-router ho tro tot cho
//    nhu cau nay), va nhu cau native cua du an do (chu yeu la document-
//    scanning/e-signature SDK) van dap ung duoc qua Expo config plugin
//    ma khong can toan quyen native nhu bare CLI."
//
// -> CHUAN BI SAN cau tra loi nay TRUOC, vi day GAN NHU CHAC CHAN se bi
//    hoi neu interviewer doc CV ky (kiem tra tinh nhat quan la ky nang
//    RAT PHO BIEN cua interviewer senior).
