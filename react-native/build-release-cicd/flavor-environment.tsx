/**
 * CAU 4 (Build, release & CI/CD): Xu ly flavor/environment
 * (dev/staging/prod) khac nhau trong 1 codebase RN ra sao.
 */

// ============================================================
// BUOC 0: VAN DE - moi MOI TRUONG can CAU HINH KHAC NHAU
// ============================================================
// - API endpoint khac nhau (dev-api / staging-api / api.production)
// - TEN APP + ICON khac nhau (vd ban dev co vien do de TESTER de phan
//   biet voi ban that tren cung 1 dien thoai)
// - BUNDLE ID/PACKAGE NAME khac nhau -> de CAI SONG SONG CA 3 BAN tren
//   CUNG 1 THIET BI (vd com.company.app.dev, .staging, .prod)


// ============================================================
// BUOC 1: Android - GRADLE PRODUCT FLAVORS
// ============================================================
// android/app/build.gradle:
//
// android {
//   flavorDimensions "env"
//   productFlavors {
//     dev {
//       dimension "env"
//       applicationIdSuffix ".dev"       // -> com.company.app.dev
//       resValue "string", "app_name", "MyApp DEV"
//       buildConfigField "String", "API_URL", '"https://dev-api.example.com"'
//     }
//     staging {
//       dimension "env"
//       applicationIdSuffix ".staging"
//       resValue "string", "app_name", "MyApp Staging"
//       buildConfigField "String", "API_URL", '"https://staging-api.example.com"'
//     }
//     prod {
//       dimension "env"
//       resValue "string", "app_name", "MyApp"
//       buildConfigField "String", "API_URL", '"https://api.example.com"'
//     }
//   }
// }
//
// Build lenh: `./gradlew assembleDevRelease` / `assembleStagingRelease` /
// `assembleProdRelease` - moi lenh ra 1 file APK/AAB RIENG, applicationId
// KHAC NHAU nen CAI SONG SONG duoc CA 3 tren CUNG 1 may


// ============================================================
// BUOC 2: iOS - SCHEMES + CONFIGURATIONS (hoac xcconfig files)
// ============================================================
// Trong Xcode: tao 3 SCHEME (Dev/Staging/Prod), moi scheme gan voi 1
// CONFIGURATION rieng, moi Configuration co the dung 1 file .xcconfig
// RIENG chua cac bien khac nhau (BUNDLE_ID, DISPLAY_NAME, API_URL...).
// Build tu command line qua Fastlane (Cau 2):
//   build_app(scheme: "MyApp-Staging", configuration: "Staging")


// ============================================================
// BUOC 3: TANG JS - doc BIEN MOI TRUONG vao code
// ============================================================
// Dung react-native-config (doc duoc bien tu file .env VAO CA JS LAN
// NATIVE code) hoac react-native-dotenv (chi doc duoc trong JS):
//
// .env.development / .env.staging / .env.production (moi file 1 bo bien)
//   API_URL=https://dev-api.example.com
//
// Trong code JS:
//   import Config from "react-native-config";
//   fetch(`${Config.API_URL}/products`);
//
// Chon DUNG FILE .env luc build bang bien moi truong ENVFILE:
//   ENVFILE=.env.staging ./gradlew assembleStagingRelease


// ============================================================
// BUOC 4: VOI DU AN DUNG EXPO
// ============================================================
// Dung app.config.js (THAY VI app.json TINH) de TRA VE CAU HINH KHAC
// NHAU dua theo bien moi truong APP_ENV:
//
// export default ({ config }) => ({
//   ...config,
//   name: process.env.APP_ENV === "production" ? "MyApp" : "MyApp (Dev)",
//   ios: { bundleIdentifier: `com.company.app.${process.env.APP_ENV}` },
// });
//
// Ket hop CAC "BUILD PROFILE" trong eas.json (development/preview/
// production) cua EAS Build de build DUNG MOI TRUONG TUONG UNG:
//   eas build --profile staging


// ============================================================
// TOM TAT NGAN GON DE TRA LOI PHONG VAN
// ============================================================
// "O tang native, minh dung Gradle Product Flavors cho Android (khai
// bao applicationIdSuffix, ten app, bien API rieng cho tung flavor) va
// nhieu Scheme/Configuration cho iOS - ket qua la moi environment co
// bundle ID/package name rieng nen cai song song duoc tren cung 1 may.
// O tang JS, minh dung react-native-config doc bien tu cac file .env
// rieng (.env.development/.env.staging/.env.production), chon dung file
// luc build qua bien ENVFILE, va tich hop vao Fastlane/CI de tu dong
// build dung moi truong theo branch hoac tham so truyen vao. Voi du an
// Expo thi dung app.config.js doc process.env ket hop build profile
// trong eas.json."
