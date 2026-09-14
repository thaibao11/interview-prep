/**
 * DOC FILE NAY TRUOC KHI DOC 3 FILE CON LAI TRONG THU MUC NAY
 * (native-modules.tsx, expose-native-function.tsx, autolinking.tsx)
 *
 * Cau chuyen tom tat CA 3 CAU HOI thanh 1 MACH DUY NHAT:
 * "Khi nao can mo 1 canh cua sang THE GIOI NATIVE, mo cua the nao,
 *  va ai don dep so ho khau ho ban?"
 */

// ============================================================
// BUOC 1 - KHI NAO CAN MO CUA (Cau 11)
// ============================================================
// Ban KHONG tu nhien di xay 1 canh cua rieng - chi lam khi 1 trong 5
// tinh huong nay xay ra (nho theo 1 cau: "KHONG CO SAN, HANG NGOAI,
// CAN NHANH, DO CU TAI CHE, MAT TIEN RIENG"):
//
//   1. KHONG CO SAN  - RN/community chua ho tro API he dieu hanh do
//   2. HANG NGOAI     - SDK ben thu 3 CHI CO ban native (vd VNPay/Momo
//                       o VN, khong co goi npm bao san)
//   3. CAN NHANH      - tac vu qua nang (xu ly video, ma hoa) can toc
//                       do cua native code
//   4. DO CU TAI CHE  - cong ty da co san code native tu truoc, muon
//                       dung lai thay vi viet lai bang JS
//   5. MAT TIEN RIENG - can 1 CUSTOM NATIVE UI COMPONENT ma JS khong
//                       dap ung du (khong chi la ham logic, ma la 1 VIEW THAT)
//
// Neu KHONG roi vao 5 tinh huong tren -> DUNG THU VIEN CO SAN, dung
// tu xay cua rieng (ton chi phi bao tri ca 2 nen tang ve sau).


// ============================================================
// BUOC 2 - MO CUA THE NAO (Cau 12) - 2 O KHOA KHAC KIEU
// ============================================================
// iOS:
//   Ban viet 1 class Swift, NHUNG Swift "noi tieng khac" voi Bridge cua
//   RN (Bridge dua vao Objective-C RUNTIME de tim module/ham). Vi vay
//   CAN THEM 1 "PHIEN DICH VIEN" - 1 file .m (Objective-C) dung macro
//   RCT_EXTERN_MODULE/RCT_EXTERN_METHOD de "khai bao ho" cho Bridge hieu.
//
// Android:
//   Ban viet 1 class ke thua ReactContextBaseJavaModule, danh dau ham
//   bang @ReactMethod, roi phai "DANG KY HO KHAU": goi class do vao 1
//   ReactPackage, roi DIEN VAO "SO HO KHAU CHUNG" - MainApplication.
//
// -> Ca 2 nen tang deu theo dung 1 Y TUONG: viet logic -> DANH DAU ham
//    can lo -> DANG KY vao he thong de RN biet ma nap len.
//
// (Voi kien truc moi TurboModule - Cau 12 phan mo rong - them 1 buoc o
// DAU: viet TRUOC 1 "hop dong" (spec TypeScript), CODEGEN tu sinh giay
// to (interface Native) dung theo hop dong do, roi class Swift/Kotlin
// phai dien DUNG THEO GIAY TO da sinh, khong tu do dat ten ham nhu truoc.)


// ============================================================
// BUOC 3 - AI DON DEP SO HO KHAU HO BAN (Cau 13, phan Autolinking)
// ============================================================
// Ngay xua (RN < 0.60): MOI LAN cai 1 thu vien co native code, BAN PHAI
// TU TAY dien so ho khau (chay react-native link, hoac tu sua Xcode
// project/settings.gradle/MainApplication) - de QUEN, de SAI.
//
// Tu RN 0.60: AUTOLINKING la 1 "NHAN VIEN" tu dong quet node_modules,
// TU DIEN HO so ho khau (Podfile goi use_native_modules! cho iOS, Gradle
// plugin tu sua settings.gradle + tu dang ky ReactPackage cho Android)
// NGAY LUC BUILD - ban chi can `yarn add` roi `pod install`, KHONG can
// tu tay sua gi nua.


// ============================================================
// BUOC 4 - 2 NEN TANG DOI KHI "CAI NHAU" (Cau 13, phan version khac biet)
// ============================================================
// Vi iOS va Android la 2 he dieu hanh khac nhau, thu vien/API co the
// LECH nhau giua 2 ben (tinh nang co o iOS nhung Android chua co, hoac
// nguoc lai). Cach "hoa giai":
//   - GHIM version thu vien native quan trong (khong dung ^/~)
//   - Platform.OS/Platform.select DE CHE GIAU su khac biet do sau 1 lop
//     JS THONG NHAT, ben ngoai chi goi 1 ham duy nhat
//   - Giu INTERFACE (hop dong) GIONG HET NHAU giua 2 nen tang voi module
//     tu viet, chi IMPLEMENTATION ben trong khac nhau
//   - TEST RIENG tren ca 2 nen tang, vi hanh vi that co the lech du code
//     JS giong nhau


// ============================================================
// CACH TU KIEM TRA XEM DA NHO DUNG MACH CHUA
// ============================================================
// Tu hoi lai THEO DUNG THU TU, khong nhin dap an:
//   1. Ke ten 5 tinh huong can tu viet Native Module (khong can dung
//      tu, chi can dung Y)?
//   2. Vi sao Swift can THEM 1 FILE .m rieng ma Kotlin thi KHONG can
//      buoc tuong tu?
//   3. Android can DANG KY qua MAY BUOC (module -> package -> ...)?
//   4. Autolinking RA DOI DE THAY THE VIEC GI ban tung phai TU LAM TAY?
//   5. Neu 1 thu vien co API LECH giua iOS/Android, ban co MAY CACH de
//      xu ly, la nhung cach nao?
//
// Tra loi duoc ca 5 cau THEO MACH nay la coi nhu nam vung, con so lieu/
// ten class cu the (RCT_EXTERN_MODULE, ReactContextBaseJavaModule...)
// chi la "chi tiet dien vao" khi CAN, khong phai thu phai thuoc long dau tien.


// ============================================================
// TOM TAT 1 CAU (hoc thuoc cau nay la du de mo dau cau tra loi)
// ============================================================
// "Minh viet Native Module khi RN chua ho tro san, can tich hop SDK
// native cua ben thu 3, can hieu nang cao, tai su dung code cu, hoac
// can custom native UI; cach expose la viet class native roi dang ky
// vao he thong RN (iOS can them file cau noi Objective-C vi Swift khong
// tu lo cho Bridge, Android dang ky qua ReactPackage); tu RN 0.60,
// Autolinking tu lam ho phan dang ky do thay vi minh tu tay sua Xcode/
// Gradle; va voi khac biet version/API giua 2 nen tang, minh dung
// Platform.select de che giau su khac biet sau 1 lop JS thong nhat."
