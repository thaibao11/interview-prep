/**
 * CAU 13 (React Native): Autolinking hoat dong the nao,
 * va xu ly khac biet version/API giua iOS va Android cho cung 1 native module.
 */

// ============================================================
// PHAN A: AUTOLINKING
// ============================================================

// ------------------------------------------------------------
// BUOC 0: TRUOC KHI CO AUTOLINKING (RN < 0.60) - van de la gi
// ------------------------------------------------------------
// Moi lan cai 1 thu vien co native code, phai chay `react-native link`
// hoac TU TAY sua project native (them dong vao Xcode project, sua
// settings.gradle, sua MainApplication de dang ky ReactPackage). Rat de
// QUEN BUOC, de CONFLICT giua cac thu vien, va moi lan update thu vien
// co the phai lam lai.

// ------------------------------------------------------------
// BUOC 1: AUTOLINKING (RN >= 0.60) hoat dong the nao
// ------------------------------------------------------------
// React Native CLI TU DONG QUET node_modules de tim cac package co khai
// bao native code (qua file react-native.config.js hoac metadata trong
// package.json cua thu vien do), roi TU SINH RA cau hinh can thiet LUC BUILD:
//
//   iOS: file Podfile co san dong `use_native_modules!` - ham nay DOC
//        danh sach cac package can link, roi TU THEM pod tuong ung khi
//        chay `pod install`. Ban KHONG can tu tay sua Xcode project nua.
//
//   Android: Gradle plugin (@react-native/gradle-plugin) TU QUET
//        node_modules, TU THEM dong include vao settings.gradle, va TU
//        DANG KY ReactPackage cua thu vien do vao danh sach packages -
//        khong can tu tay sua MainApplication.kt nua.
//
// -> Tom lai: chi can `yarn add ten-thu-vien`, roi `pod install` (iOS) -
//    KHONG can them buoc thu cong nao khac, autolinking lo het phan con lai.

// ------------------------------------------------------------
// BUOC 2: TUY CHINH AUTOLINKING khi can (react-native.config.js o ROOT project)
// ------------------------------------------------------------
// module.exports = {
//   dependencies: {
//     "ten-thu-vien-nao-do": {
//       platforms: {
//         ios: null, // TAT autolink cho iOS (vd thu vien chi ho tro Android)
//       },
//     },
//   },
// };
// -> Dung khi 1 thu vien CHUA ho tro dung 1 nen tang, hoac ban muon TU
//    LINK THU CONG rieng cho 1 truong hop dac biet


// ============================================================
// PHAN B: XU LY KHAC BIET VERSION/API GIUA iOS VA ANDROID
// ============================================================

// ------------------------------------------------------------
// BUOC 3: VAN DE THUONG GAP
// ------------------------------------------------------------
// - 1 tinh nang co san o iOS nhung Android CHUA ho tro (hoac nguoc lai)
// - Hanh vi/API cua CUNG 1 thu vien LECH NHAU giua 2 nen tang du chung
//   1 interface JS (vd bien pham vi mac dinh khac nhau, callback tra ve
//   du lieu khac dinh dang)
// - Cap nhat version thu vien co the doi API ngam giua 2 nen tang khong
//   dong bo (vd ban Android moi ra truoc, iOS ra sau vai tuan)

// ------------------------------------------------------------
// BUOC 4: CACH XU LY
// ------------------------------------------------------------

// Cach 1 - PIN (ghim) version cu the cho thu vien native quan trong,
// KHONG dung ^ hoac ~ trong package.json, tranh CI tu update version
// giua chung lam lech native code:
//   "react-native-mmkv": "2.11.0"   (thay vi "^2.11.0")

// Cach 2 - Dung Platform.OS/Platform.select() de AN su khac biet SAU
// 1 LOP JS THONG NHAT (facade), team con lai chi goi 1 ham chung, khong
// can quan tam ben trong xu ly khac nhau the nao:
import { Platform } from "react-native";

function getBiometricType(): string {
  if (Platform.OS === "ios") {
    // return NativeBiometrics.getFaceIDOrTouchID();
    return "FaceID/TouchID";
  }
  // return NativeBiometrics.getFingerprintOrFace();
  return "Fingerprint/FaceUnlock";
}
// -> Noi goi ham nay o man hinh KHONG can biet iOS/Android khac nhau ra sao

// Cach 3 - Voi native module TU VIET: giu INTERFACE (spec TypeScript)
// GIONG HET NHAU giua 2 nen tang, chi IMPLEMENTATION (Swift/Kotlin) ben
// trong khac nhau - dam bao JS luon goi 1 API duy nhat, "hop dong" khong doi:
//   export interface Spec extends TurboModule {
//     getBiometricType(): Promise<string>; // JS chi biet co 1 ham nay,
//   }                                      // khong quan tam ben trong the nao

// Cach 4 - Neu logic JS wrapper can KHAC NHAU DANG KE giua 2 nen tang
// (khong chi 1-2 dong if), dung FILE THEO DUOI PLATFORM - Metro bundler
// TU CHON dung file khi build:
//   biometrics.ios.ts     <- logic rieng cho iOS
//   biometrics.android.ts <- logic rieng cho Android
//   import { getBiometricType } from "./biometrics"; // Metro tu chon dung file

// Cach 5 - TEST/QA RIENG cho tung nen tang: du code JS giong nhau, hanh
// vi THUC TE tren thiet bi that co the lech (vd 1 API OS moi chi co tren
// iOS 16+ hoac Android 13+), nen can test rieng tren CA 2 nen tang,
// khong the chi test 1 ben roi mac dinh ben kia cung hoat dong dung.


// ============================================================
// TOM TAT NGAN GON DE TRA LOI PHONG VAN
// ============================================================
// "Autolinking la co che tu RN 0.60 tro di: RN CLI tu quet node_modules
// tim cac package co native code, roi tu sinh cau hinh Podfile (iOS) va
// Gradle (Android) luc build, khong can chay react-native link hay tu
// tay sua Xcode/MainApplication nua. Co the tuy chinh qua file
// react-native.config.js neu can tat autolink cho 1 nen tang cu the.
//
// Ve khac biet version/API giua iOS va Android: minh ghim version cu
// the cho cac thu vien native quan trong de tranh CI tu update lech,
// dung Platform.OS/Platform.select de an su khac biet sau 1 lop JS
// thong nhat, giu interface (spec) giong het nhau giua 2 nen tang voi
// native module tu viet, dung file .ios.ts/.android.ts khi logic khac
// biet dang ke, va luon test rieng tren ca 2 nen tang vi hanh vi thuc
// te tren thiet bi co the lech du code JS giong nhau."
