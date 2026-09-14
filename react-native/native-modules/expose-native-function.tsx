/**
 * CAU 12 (React Native): Cac buoc co ban de expose 1 ham native sang JS
 * (iOS - Swift, Android - Kotlin)
 */

// ============================================================
// BUOC 0: QUY TRINH CHUNG (giong nhau ve Y TUONG tren ca 2 nen tang)
// ============================================================
// 1. Viet 1 class native, danh dau day la "Native Module" theo dung
//    interface/protocol ma React Native quy dinh
// 2. Danh dau (annotate) cac ham CU THE muon expose sang JS
// 3. DANG KY module do vao he thong (Package) de RN biet ma nap len
//    luc app khoi dong
// 4. Ben JS, goi qua NativeModules.TenModule.tenHam(...)
// -> Luu y: sau khi them/sua native module, PHAI BUILD LAI APP (khong
//    hot reload duoc phan native code)


// ============================================================
// BUOC 1: iOS (Swift) - can THEM 1 FILE OBJECTIVE-C CAU NOI
// ============================================================
// Ly do can file .m rieng: Swift KHONG tu dong "lo" metadata ham cho
// Objective-C runtime (ma RN bridge dua vao runtime nay de tim module/ham),
// nen can 1 file .m dung macro cua RN de "khai bao ho".

// --- File 1: CalendarModule.swift (logic that) ---
// @objc(CalendarModule)
// class CalendarModule: NSObject {
//   @objc
//   func createCalendarEvent(_ name: String, location: String) {
//     print("Tao su kien \(name) tai \(location)")
//   }
// }

// --- File 2: CalendarModule.m (file cau noi, BAT BUOC voi Swift) ---
// #import <React/RCTBridgeModule.h>
//
// @interface RCT_EXTERN_MODULE(CalendarModule, NSObject)
// RCT_EXTERN_METHOD(createCalendarEvent:(NSString *)name location:(NSString *)location)
// @end


// ============================================================
// BUOC 2: Android (Kotlin) - can 1 MODULE + 1 PACKAGE + DANG KY o MainApplication
// ============================================================

// --- File 1: CalendarModule.kt (logic that) ---
// class CalendarModule(reactContext: ReactApplicationContext) :
//     ReactContextBaseJavaModule(reactContext) {
//
//   override fun getName() = "CalendarModule" // ten dung de goi tu JS
//
//   @ReactMethod
//   fun createCalendarEvent(name: String, location: String) {
//     Log.d("CalendarModule", "Tao su kien $name tai $location")
//   }
// }

// --- File 2: CalendarPackage.kt (goi module vao he thong RN) ---
// class CalendarPackage : ReactPackage {
//   override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule> {
//     return listOf(CalendarModule(reactContext))
//   }
//   override fun createViewManagers(reactContext: ReactApplicationContext) = emptyList<ViewManager<*, *>>()
// }

// --- File 3: MainApplication.kt (DANG KY package) ---
// override fun getPackages(): List<ReactPackage> {
//   return PackageList(this).packages.apply {
//     add(CalendarPackage()) // <- them dong nay
//   }
// }


// ============================================================
// BUOC 3: GOI TU JS (sau khi da lam Buoc 1 hoac Buoc 2 va build lai app)
// ============================================================
import { NativeModules } from "react-native";
const { CalendarModule } = NativeModules;

CalendarModule.createCalendarEvent("Hop team", "Van phong");
// -> Day la loi goi BAT DONG BO, KHONG co ket qua tra ve (fire-and-forget)


// ============================================================
// BUOC 4: MUON NHAN KET QUA TRA VE - dung Promise
// ============================================================
// iOS:
//   @objc
//   func getDeviceName(_ resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
//     resolve(UIDevice.current.name)
//   }
//   // File .m: RCT_EXTERN_METHOD(getDeviceName:(RCTPromiseResolveBlock)resolve
//   //                                    reject:(RCTPromiseRejectBlock)reject)
//
// Android:
//   @ReactMethod
//   fun getDeviceName(promise: Promise) {
//     promise.resolve(Build.MODEL)
//   }

async function example() {
  const deviceName = await NativeModules.CalendarModule.getDeviceName();
  console.log(deviceName);
}


// ============================================================
// BUOC 5: KIEN TRUC MOI (TurboModule) - CHI TIET CAC BUOC
// ============================================================
// KHAC BIET CON CHINH so voi Legacy (Buoc 1-4 o tren):
//   Legacy: JS goi ten ham BAT KY, khong ai kiem tra ten/kieu du lieu co
//   khop voi native hay khong CHO DEN KHI CHAY THU (loi runtime).
//   TurboModule: ban khai bao TRUOC 1 "SPEC" (hop dong) bang TypeScript,
//   CODEGEN doc spec do va TU SINH RA interface Native tuong ung LUC
//   BUILD - native code PHAI IMPLEMENT DUNG interface sinh ra, neu thieu
//   ham hoac sai kieu se BAO LOI NGAY LUC BUILD, khong doi den runtime.
//
// (Luu y: ten class/protocol cu the co the khac nhau chut it giua cac
// ban RN, phan duoi la quy trinh CHUAN, mang tinh minh hoa)

// --- Buoc 5.1: Dinh nghia SPEC bang TypeScript ---
// File: specs/NativeCalendarModule.ts
//
// import type { TurboModule } from "react-native";
// import { TurboModuleRegistry } from "react-native";
//
// export interface Spec extends TurboModule {
//   createCalendarEvent(name: string, location: string): void;
//   getDeviceName(): Promise<string>;
// }
//
// export default TurboModuleRegistry.getEnforcing<Spec>("CalendarModule");

// --- Buoc 5.2: Khai bao Codegen trong package.json ---
// "codegenConfig": {
//   "name": "AppSpecs",
//   "type": "modules",
//   "jsSrcsDir": "specs"
// }
// -> Luc chay `pod install` (iOS) hoac build Gradle (Android), Codegen
//    se QUET file spec nay va TU SINH RA header/interface Native tuong ung
//    (vd file NativeCalendarModuleSpec.h ben iOS, class truu tuong
//    NativeCalendarModuleSpec ben Android)

// --- Buoc 5.3: iOS - implement DUNG interface Codegen da sinh ra ---
// class CalendarModule: NSObject, NativeCalendarModuleSpec {
//   @objc
//   func createCalendarEvent(_ name: String, location: String) {
//     print("Tao su kien \(name) tai \(location)")
//   }
//
//   @objc
//   func getDeviceName(_ resolve: @escaping RCTPromiseResolveBlock,
//                       reject: @escaping RCTPromiseRejectBlock) {
//     resolve(UIDevice.current.name)
//   }
// }
// -> Van can 1 file dang .mm (Objective-C++) de dang ky module vao he
//    thong TurboModule cua RN, tuong tu vai tro file .m o Legacy nhung
//    dung API TurboModule thay vi RCT_EXTERN_MODULE

// --- Buoc 5.4: Android - ke thua class truu tuong Codegen da sinh ra ---
// class CalendarModule(reactContext: ReactApplicationContext) :
//     NativeCalendarModuleSpec(reactContext) { // <- ke thua class SINH RA,
//                                                //    khong phai tu dat ten nhu Legacy
//   override fun getName() = "CalendarModule"
//
//   override fun createCalendarEvent(name: String, location: String) {
//     Log.d("CalendarModule", "Tao su kien $name tai $location")
//   }
//
//   override fun getDeviceName(promise: Promise) {
//     promise.resolve(Build.MODEL)
//   }
// }
// -> Dang ky vao ReactPackage giong Buoc 2, chi khac la extends class do
//    Codegen sinh ra thay vi ReactContextBaseJavaModule truc tiep

// --- LOI ICH cua quy trinh nay ---
//   1. Dam bao kieu du lieu JS <-> Native LUON KHOP (Codegen kiem tra
//      luc BUILD, khong phai doi loi runtime moi biet)
//   2. Ho tro LAZY-LOADING (Cau 6) - module chi khoi tao khi JS goi lan dau
//   3. Ho tro goi DONG BO qua JSI khi can (Legacy CHI co bat dong bo)


// ============================================================
// TOM TAT NGAN GON DE TRA LOI PHONG VAN
// ============================================================
// "Tren iOS: viet class Swift danh dau @objc, roi PHAI THEM 1 file .m
// dung RCT_EXTERN_MODULE/RCT_EXTERN_METHOD de 'khai bao ho' cho
// Objective-C runtime, vi Swift khong tu lo metadata cho RN bridge doc
// duoc. Tren Android: viet class ke thua ReactContextBaseJavaModule,
// danh dau ham bang @ReactMethod, roi dang ky module do vao 1
// ReactPackage, va them package do vao MainApplication. Ca 2 nen tang
// deu can build lai app sau khi sua native code. Muon nhan ket qua tra
// ve thi dung Promise (resolve/reject) thay vi return truc tiep, vi
// goi qua bridge la bat dong bo. Voi TurboModule (kien truc moi), them
// buoc dinh nghia spec TypeScript de Codegen sinh binding, dam bao type-safety."
