/**
 * CAU 2 (Expo vs React Native CLI): Prebuild/Continuous Native
 * Generation (CNG) hoat dong ra sao, khac gi voi tu quan ly ios/android
 * cua bare CLI.
 */

// ============================================================
// BUOC 0: VAN DE MA PREBUILD GIAI QUYET
// ============================================================
// Voi bare CLI: thu muc ios/ va android/ la CODE THAT, ban SUA TRUC
// TIEP (them dong vao Info.plist, sua build.gradle...). Van de: MOI THAY
// DOI THU CONG nay KHONG duoc "GHI LAI" o dau ca ngoai chinh 2 thu muc
// do - RAT KHO biet CHINH XAC nhung gi da bi sua qua thoi gian, va KHO
// AP DUNG LAI y het cac thay doi do neu can TAO LAI project tu dau.


// ============================================================
// BUOC 1: PREBUILD hoat dong THEO CO CHE nao
// ============================================================
// Thay vi luu THAY DOI NATIVE duoi dang "code da sua", Expo luu duoi
// dang KHAI BAO (declarative) trong app.json/app.config.js + 1 danh
// sach "CONFIG PLUGIN". Khi chay:
//
//   npx expo prebuild
//
// Expo se:
//   1. XOA (hoac tao moi) thu muc ios/ va android/ TU DAU
//   2. Dung 1 TEMPLATE PROJECT GOC (giong het bare CLI moi tao)
//   3. LAN LUOT AP DUNG tung config plugin (cua Expo SDK, hoac cua thu
//      vien ban cai vao) de "BIEN DOI" template goc do - vi du 1 plugin
//      co the TU DONG them 1 dong permission vao AndroidManifest.xml,
//      hoac them 1 Associated Domain vao Info.plist
//   4. KET QUA cuoi cung la 2 thu muc ios/android GIONG HET nhu ban se
//      co neu TU TAY sua bare CLI - nhung LAN NAY duoc SINH RA TU MOT
//      NGUON KHAI BAO CO THE TAI TAO LAI (reproducible)
//
// -> Vi vay 2 thu muc nay THUONG duoc .gitignore (khong commit vao git),
//    vi chung la "OUTPUT", khong phai "SOURCE OF TRUTH" - source of
//    truth la app.json + danh sach config plugin


// ============================================================
// BUOC 2: CONFIG PLUGIN LA GI (co che ben trong)
// ============================================================
// 1 config plugin la 1 HAM JAVASCRIPT nhan vao cau hinh HIEN TAI va TRA
// VE cau hinh DA DUOC BIEN DOI - dung cac "mods" (modifiers) co san cua
// Expo de can thiep vao dung file native can sua (AndroidManifest.xml,
// Info.plist, build.gradle, Podfile...) MOT CACH CO CAU TRUC, thay vi
// tim-và-thay the chuoi ky tu tho so.
//
// Vi du don gian (minh hoa y tuong):
// const withCustomPermission = (config) => {
//   return withAndroidManifest(config, (config) => {
//     // them 1 permission vao AndroidManifest.xml MOT CACH CO CAU TRUC
//     config.modResults.manifest["uses-permission"].push({
//       $: { "android:name": "android.permission.CAMERA" },
//     });
//     return config;
//   });
// };
//
// Hau het thu vien native pho bien (vd react-native-vision-camera) da
// TU VIET SAN 1 config plugin nhu vay va export no ra - ban chi can
// khai bao ten thu vien do trong mang "plugins" cua app.json la Prebuild
// TU DONG ap dung, KHONG can tu sua file native tay.


// ============================================================
// BUOC 3: DIEM KHAC BIET/GOTCHA QUAN TRONG NHAT can biet
// ============================================================
// Neu ban LO TAY sua truc tiep vao thu muc ios/android DA DUOC SINH RA
// (thay vi sua qua config plugin), thay doi do se BI XOA MAT o LAN
// PREBUILD TIEP THEO (vi Prebuild XOA VA TAO LAI 2 thu muc nay tu dau
// moi lan chay) - day la BAY PHO BIEN NHAT khi moi chuyen tu bare CLI
// sang Expo Prebuild: quen rang "sua tay = mat khi prebuild lai".
//
// Neu THUC SU can 1 thay doi RAT DAC THU chua co config plugin nao lam
// san, co the viet "CONFIG PLUGIN CUC BO" (local plugin) rieng cho du
// an de dam bao thay doi do LUON duoc AP DUNG LAI moi lan prebuild,
// thay vi sua tay va quen mat sau nay.


// ============================================================
// BUOC 4: SO SANH TRUC TIEP VOI BARE CLI
// ============================================================
//                    | Bare CLI                  | Expo Prebuild/CNG
// -----------------------------------------------------------------
// Noi luu "SU THAT"  | Chinh code trong ios/     | app.json + config plugins
//                    | android/                  |
// Sua doi native     | Sua TRUC TIEP file native | Khai bao qua config
//                    |                           | plugin (hoac viet local plugin)
// Tai tao lai project| Kho (phai copy tay/       | De: chay lai `npx expo
//                    | nho het thay doi da lam)  | prebuild` la ra y het
// Rui ro             | It rui ro "mat thay doi"  | De MAT thay doi neu SUA
//                    | (code native la vinh vien)| TAY thay vi qua plugin


// ============================================================
// TOM TAT NGAN GON DE TRA LOI PHONG VAN
// ============================================================
// "Prebuild la co che sinh TU DONG thu muc ios/android tu app.json va
// danh sach config plugin, thay vi ban tu tay duy tri 2 thu muc do nhu
// bare CLI. Moi config plugin la 1 ham JS bien doi cau hinh native mot
// cach co cau truc (vd tu dong them permission vao AndroidManifest),
// va hau het thu vien native pho bien da co san config plugin rieng.
// Loi ich la co the TAI TAO LAI project native tu dau bat cu luc nao chi
// bang 1 lenh `npx expo prebuild`. Diem can luu y nhat la neu sua TRUC
// TIEP vao thu muc ios/android da duoc sinh ra thay vi qua config
// plugin, thay doi do se bi MAT o lan prebuild tiep theo - day la bay
// pho bien nhat khi moi lam quen voi mo hinh nay."
