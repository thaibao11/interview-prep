/**
 * CAU 1 (Build, release & CI/CD): CodePush/OTA update dung de lam gi,
 * va co gioi han gi (khong update duoc native code).
 */

// ============================================================
// BUOC 0: OTA UPDATE LA GI
// ============================================================
// OTA (Over-The-Air) update cho phep DAY BAN CAP NHAT JS bundle + assets
// THANG TOI THIET BI nguoi dung, KHONG CAN qua quy trinh REVIEW cua
// App Store/Play Store (co the mat vai NGAY den vai TUAN). Nguoi dung
// chi can MO APP LEN, app TU KIEM TRA co ban moi khong, TAI VE va AP
// DUNG (ngay lap tuc hoac o lan mo app tiep theo, tuy cau hinh).
//
// Cong cu pho bien: Microsoft AppCenter CodePush (dang duoc khuyen nghi
// chuyen di vi AppCenter se ngung hoat dong), react-native-update, hoac
// Expo EAS Update (voi du an dung Expo).


// ============================================================
// BUOC 1: GIOI HAN QUAN TRONG NHAT - CHI UPDATE DUOC JS + ASSETS
// ============================================================
// OTA CHI thay the duoc:
//   - Code JavaScript/TypeScript (logic, component, style)
//   - Assets di kem trong bundle (anh, font nho duoc bundle cung JS)
//
// OTA KHONG THE update:
//   - NATIVE CODE (them/sua Native Module, Swift/Kotlin code)
//   - THU VIEN NATIVE MOI (them 1 package co native code, vd them
//     react-native-camera lan dau - can pod install/gradle sync that su)
//   - CAU HINH NATIVE (them permission moi trong Info.plist/
//     AndroidManifest, doi App Icon, doi Bundle ID)
//   - NANG CAP PHIEN BAN REACT NATIVE
//
// -> Neu thay doi ROI VAO 1 TRONG CAC TRUONG HOP TREN, BAT BUOC phai
//    build lai ban NATIVE THAT va SUBMIT qua App Store/Play Store binh
//    thuong, KHONG THE dung OTA de "lach" qua buoc nay.


// ============================================================
// BUOC 2: RUI RO CAN LUU Y
// ============================================================
// - Apple co dieu khoan HAN CHE viec dung OTA de thay doi HANH VI COT
//   LOI cua app qua muc (vd bien app thanh 1 app HOAN TOAN KHAC so voi
//   ban da duoc review) - can can trong, khong lam dung OTA de "qua mat"
//   qua trinh review
// - Ban OTA phai TUONG THICH voi native runtime HIEN CO tren may nguoi
//   dung (vd ban Hermes bytecode, cau truc JS engine) - neu ban native
//   qua CU, mot so thay doi JS moi co the KHONG TUONG THICH


// ============================================================
// BUOC 3: DUNG KHI NAO
// ============================================================
// - Fix bug NHO, KHAN CAP tren production ma khong muon cho review store
//   (co the mat vai ngay, dac biet App Store)
// - Sua text, dieu chinh logic JS thuan, doi cau hinh feature flag
// - A/B test nhanh 1 thay doi UI/logic nho


// ============================================================
// TOM TAT NGAN GON DE TRA LOI PHONG VAN
// ============================================================
// "OTA/CodePush cho phep day cap nhat JS bundle va assets thang toi
// thiet bi nguoi dung ma khong can cho review cua App Store/Play Store,
// nguoi dung chi can mo app la nhan ban moi. Gioi han lon nhat la CHI
// update duoc phan JS/assets, KHONG update duoc native code, thu vien
// native moi, hay cau hinh native (permission, icon, bundle ID) - nhung
// thay doi do van phai build lai va submit qua store binh thuong. Minh
// dung OTA cho fix bug nho/khan cap va thay doi logic JS thuan, khong
// dung de thay the cho release chinh thuc khi co thay doi lien quan
// native."
