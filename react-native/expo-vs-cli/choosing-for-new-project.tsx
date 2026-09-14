/**
 * CAU 3 (Expo vs React Native CLI): 1 du an MOI nen chon Expo hay CLI,
 * dua tren tieu chi nao.
 *
 * (Cau hoi rieng ve nhung TRUONG HOP BAT BUOC phai dung bare CLI, xem
 * file when-bare-cli-required.tsx)
 */

// ============================================================
// BUOC 0: RANH GIOI DA MO HON TRUOC RAT NHIEU
// ============================================================
// Vi Expo hien dai (Prebuild + Dev Client, xem prebuild-cng.tsx) DUNG
// DUOC MOI native module nhu bare CLI, cau hoi "chon cai nao" KHONG con
// la "can native code hay khong" NUA, ma la SO SANH VE QUY TRINH LAM
// VIEC va MUC DO KIEM SOAT ban muon co NGAY TU DAU du an.


// ============================================================
// BUOC 1: TIEU CHI NGHIENG VE EXPO
// ============================================================
// 1. CAN RA MAT NHANH (MVP, startup, prototype) - Expo giup setup ban
//    dau NHANH HON RAT NHIEU (khong can cai Xcode/Android Studio de bat
//    dau code, chay thu ngay qua Expo Go)
// 2. TEAM CHU YEU LA JS/RN DEV, KHONG CO/IT nhan su native chuyen sau
//    thuong truc - Expo giam ganh nang phai tu quan ly toan bo build
//    pipeline native
// 3. MUON CO SAN CI/CD + OTA MA KHONG PHAI TU XAY: EAS Build/Submit/
//    Update giai quyet gon trong 1 he sinh thai, khong phai tu ghep
//    Fastlane + CodePush rieng le
// 4. Nhu cau native KHONG QUA DAC THU - da so SDK pho bien (camera,
//    push notification, location, in-app purchase...) DEU CO SAN qua
//    Expo SDK hoac config plugin cua community


// ============================================================
// BUOC 2: KHUNG QUYET DINH NHANH (tu hoi 4 cau khi bat dau du an moi)
// ============================================================
//   1. Co can build/CI HOAN TOAN ON-PREMISE (khong dung dich vu cloud
//      ben ngoai) khong?           -> CO: nghieng ve bare CLI
//   2. Co dinh nhung RN vao 1 app native da co san (brownfield) khong?
//                                  -> CO: nghieng ve bare CLI
//   3. Team co san nhan su native manh, muon toan quyen can thiep sau
//      vao Xcode/Gradle tu ngay dau khong?  -> CO: nghieng ve bare CLI
//   4. Neu CA 3 CAU TREN deu "KHONG" -> MAC DINH nen chon EXPO, vi loi
//      ich ve toc do phat trien + he sinh thai EAS thuong LON HON chi
//      phi phai hoc them mo hinh Prebuild


// ============================================================
// BUOC 3: LUU Y - KHONG PHAI QUYET DINH "MOT DI KHONG TRO LAI"
// ============================================================
// Du an Expo CO THE prebuild/eject sang quan ly native THU CONG bat cu
// luc nao neu sau nay can kiem soat sau hon; nguoc lai du an bare CLI
// CO THE cai them cac package Expo (qua `npx install-expo-modules`) de
// tan dung mot so SDK/API tien loi cua Expo MA KHONG can chuyen toan bo
// sang mo hinh Expo. Quyet dinh nay IT RUI RO HON nhieu nguoi nghi.


// ============================================================
// TOM TAT NGAN GON DE TRA LOI PHONG VAN
// ============================================================
// "Voi du an moi, minh mac dinh nghieng ve Expo vi toc do phat trien
// nhanh hon va he sinh thai EAS (build, submit, OTA) co san, tru khi
// gap 1 trong 3 tieu chi day nguoc lai: can build/CI hoan toan
// on-premise, dinh nhung RN vao 1 app native da co san (brownfield),
// hoac team co san nhan su native manh muon toan quyen can thiep tu dau.
// Va day khong phai quyet dinh mot chieu - du an Expo van prebuild/eject
// duoc khi can, con bare CLI van cai them duoc Expo module khi muon tan
// dung mot so SDK tien loi."
