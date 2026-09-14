/**
 * CAU 2 (Build, release & CI/CD): Fastlane giup gi trong pipeline
 * build & release iOS/Android.
 */

// ============================================================
// BUOC 0: VAN DE - build & release THU CONG rat DE SAI
// ============================================================
// Cac buoc build/release LAP DI LAP LAI moi lan release: tang version/
// build number, build app (archive), KY app (code signing), upload len
// TestFlight/App Store Connect (iOS) hoac Play Console (Android), chup
// screenshot... Lam TAY de QUEN BUOC, de SAI PROFILE, va KHONG TAI LAP
// duoc GIONG NHAU giua cac may (loi kieu "may toi chay duoc, may kia
// khong hieu sao loi").


// ============================================================
// BUOC 1: FASTLANE giai quyet the nao
// ============================================================
// Fastlane la CONG CU TU DONG HOA, cho phep viet cac "LANE" (kich ban)
// trong 1 file Fastfile (Ruby DSL), moi lane GOI 1 CHUOI cac "action"
// co san (hoac tu viet custom) de LAM THAY toan bo cac buoc thu cong o tren.

// vi du: fastlane/Fastfile
// platform :ios do
//   lane :beta do
//     increment_build_number         # tu dong tang build number
//     build_app(scheme: "MyApp")     # build + archive
//     upload_to_testflight           # upload thang len TestFlight
//   end
// end
//
// platform :android do
//   lane :beta do
//     gradle(task: "bundleRelease")           # build AAB
//     upload_to_play_store(track: "internal")  # upload len Internal testing
//   end
// end

// Chay: `fastlane ios beta` hoac `fastlane android beta`
// -> 1 LENH DUY NHAT thay the CA CHUOI thao tac thu cong


// ============================================================
// BUOC 2: LOI ICH CHINH
// ============================================================
// 1. TAI LAP DUOC (reproducible): may nao chay Fastlane cung ra KET QUA
//    GIONG NHAU, khong phu thuoc "cau hinh rieng cua tung may dev"
// 2. TICH HOP CI/CD: GitHub Actions/Bitrise/CircleCI co the TU DONG
//    chay `fastlane ios release` MOI KHI co code merge vao 1 BRANCH
//    NHAT DINH (vd branch "release"), khong can dev tu tay build/upload
// 3. GIAM SAI SOT CON NGUOI: khong con canh "QUEN tang version", "NHAM
//    profile", "quen chon dung scheme"
// 4. Fastlane match: DONG BO certificate + provisioning profile (Cau 3)
//    qua 1 git repo RIENG DUOC MA HOA, CA TEAM dung CHUNG 1 bo, tranh
//    moi nguoi tu tao certificate rieng gay xung dot/qua nhieu profile


// ============================================================
// BUOC 3: VI DU PIPELINE THUC TE
// ============================================================
// Moi lan merge code vao branch "release":
//   1. CI (vd GitHub Actions) tu dong duoc kich hoat
//   2. Chay `fastlane ios release` + `fastlane android release`
//   3. Fastlane tu dong: tang version, build, ky app (dung match lay
//      dung certificate/profile), upload len TestFlight/Internal testing
//   4. (Tuy chon) Fastlane gui THONG BAO ve Slack bao "Build #123 da
//      san sang test" kem link tai
// -> Dev KHONG CAN TU TAY lam BAT KY buoc nao trong chuoi tren


// ============================================================
// TOM TAT NGAN GON DE TRA LOI PHONG VAN
// ============================================================
// "Fastlane tu dong hoa toan bo cac buoc build & release lap di lap lai
// va de sai sot khi lam tay: tang version, build, ky app, va upload len
// TestFlight/Play Console, tat ca qua cac 'lane' dinh nghia trong
// Fastfile. Loi ich chinh la tai lap duoc giua cac may, tich hop duoc
// vao CI/CD de tu dong build/release moi khi merge vao 1 branch nhat
// dinh, va Fastlane match giup ca team dung chung 1 bo certificate/
// provisioning profile thay vi moi nguoi tu tao rieng gay xung dot."
