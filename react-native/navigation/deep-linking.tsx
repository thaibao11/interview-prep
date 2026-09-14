/**
 * CAU 8 (React Native): Deep linking hoat dong the nao trong React Navigation
 */

// ============================================================
// BUOC 0: Deep link la gi
// ============================================================
// Deep link la 1 URL DAC BIET, khi duoc mo (tu browser, tin nhan SMS,
// notification, QR code, app khac...), HE DIEU HANH se MO THANG APP cua
// ban (thay vi mo trinh duyet), va TRUYEN KEM du lieu (path + query) de
// app biet CAN DIEU HUONG TOI DAU - vi du mo thang vao ProductDetail cua
// san pham id=123, thay vi mo Home roi nguoi dung tu bam vao.


// ============================================================
// BUOC 1: 2 LOAI deep link pho bien
// ============================================================
// 1. Custom URL scheme:  myapp://product/123
//    - De config, nhung neu app CHUA CAI thi OS bao loi/khong lam gi ca
//      (khong co fallback), va scheme co the bi TRUNG voi app khac
//
// 2. Universal Links (iOS) / App Links (Android): https://myapp.com/product/123
//    - Dung DOMAIN THAT (https), can VERIFY quyen so huu domain:
//        iOS:     file .well-known/apple-app-site-association tren server
//        Android: file .well-known/assetlinks.json tren server
//    - Uu diem: neu CHUA cai app, TU DONG mo trinh duyet hien trang web
//      (fallback), khong bi app khac "cuop" link vi da verify domain

// --- CAU HINH CUSTOM URL SCHEME (myapp://) ---
// iOS - ios/[TenApp]/Info.plist, them CFBundleURLTypes:
//   <key>CFBundleURLTypes</key>
//   <array>
//     <dict>
//       <key>CFBundleURLSchemes</key>
//       <array><string>myapp</string></array>
//     </dict>
//   </array>
//
// Android - android/app/src/main/AndroidManifest.xml, them intent-filter
// vao Activity chinh (thuong la MainActivity):
//   <intent-filter>
//     <action android:name="android.intent.action.VIEW" />
//     <category android:name="android.intent.category.DEFAULT" />
//     <category android:name="android.intent.category.BROWSABLE" />
//     <data android:scheme="myapp" />
//   </intent-filter>
//
// Voi du an dung Expo (managed) - chi can khai bao trong app.json:
//   { "expo": { "scheme": "myapp" } }
//   Expo se TU SINH cau hinh native o tren khi build (prebuild/EAS Build)


// --- CAU HINH UNIVERSAL LINKS (iOS) / APP LINKS (Android) ---
// iOS:
//   1. Xcode -> chon Target -> tab "Signing & Capabilities" -> bam
//      "+ Capability" -> them "Associated Domains"
//   2. Them domain dang: applinks:myapp.com
//   3. TREN SERVER, host file (KHONG co duoi file, Content-Type: application/json)
//      tai: https://myapp.com/.well-known/apple-app-site-association
//      {
//        "applinks": {
//          "details": [{
//            "appID": "TEAMID.com.company.myapp",
//            "paths": ["/product/*", "/login"]
//          }]
//        }
//      }
//
// Android:
//   1. AndroidManifest.xml, intent-filter co "android:autoVerify=true":
//      <intent-filter android:autoVerify="true">
//        <action android:name="android.intent.action.VIEW" />
//        <category android:name="android.intent.category.DEFAULT" />
//        <category android:name="android.intent.category.BROWSABLE" />
//        <data android:scheme="https" android:host="myapp.com" />
//      </intent-filter>
//   2. TREN SERVER, host file tai:
//      https://myapp.com/.well-known/assetlinks.json
//      [{
//        "relation": ["delegate_permission/common.handle_all_urls"],
//        "target": {
//          "namespace": "android_app",
//          "package_name": "com.company.myapp",
//          "sha256_cert_fingerprints": ["AA:BB:CC:...(lay tu keystore ky app)"]
//        }
//      }]
//
// Voi du an Expo - khai bao trong app.json:
//   {
//     "expo": {
//       "ios": { "associatedDomains": ["applinks:myapp.com"] },
//       "android": {
//         "intentFilters": [{
//           "action": "VIEW",
//           "autoVerify": true,
//           "data": [{ "scheme": "https", "host": "myapp.com", "pathPrefix": "/product" }],
//           "category": ["BROWSABLE", "DEFAULT"]
//         }]
//       }
//     }
//   }


// ============================================================
// BUOC 2: React Navigation xu ly deep link qua "linking config"
// ============================================================
// Ban khong tu viet code parse URL bang tay. Thay vao do, dinh nghia 1
// object "linking" MO TA cach map TU URL PATH SANG TEN MAN HINH + params -
// y het cach web routing map path -> component. React Navigation tu:
//   - Lang nghe su kien app duoc mo bang URL (ca khi app dang chay NEN,
//     va ca khi app bi KILL HOAN TOAN)
//   - Tu PARSE URL theo config ban dua, roi TU DIEU HUONG toi dung
//     man hinh + set params tuong ung

import { NavigationContainer, LinkingOptions } from "@react-navigation/native";

const linking: LinkingOptions<any> = {
  prefixes: ["myapp://", "https://myapp.com"], // ca custom scheme lan universal link
  config: {
    screens: {
      // Cau truc PHAI KHOP voi cay navigator that (RootStack > MainTab > HomeStack)
      Main: {
        screens: {
          Home: {
            screens: {
              ProductList: "products",
              ProductDetail: "product/:id", // https://myapp.com/product/123 -> params.id = "123"
            },
          },
        },
      },
      Auth: "login",
    },
  },
};

function App() {
  return (
    <NavigationContainer linking={linking}>
      {/* <RootNavigator /> */}
    </NavigationContainer>
  );
}


// ============================================================
// BUOC 3: TRUONG HOP DAC BIET - app bi KILL HOAN TOAN, mo lai bang deep link
// ============================================================
// Neu app dang CHAY NEN: RN dung Linking.addEventListener('url', ...) de
// bat su kien link moi den, roi dieu huong ngay.
//
// Neu app DA BI KILL: khong co "su kien" nao de lang nghe ca, vi app
// chua chay. Luc nay React Navigation dung Linking.getInitialURL() de
// LAY URL DA MO APP ngay LUC KHOI TAO NavigationContainer - dieu huong
// toi dung man hinh TU FRAME DAU TIEN, tranh viec hien Home truoc roi
// moi "nhay" sang ProductDetail sau (gay nhap nhay, trai nghiem xau).
//
// -> Day chinh la cau tra loi cho cau hoi "xu ly navigation state khi
//    app bi kill va mo lai" trong checklist - no LIEN QUAN TRUC TIEP
//    toi deep linking.


// ============================================================
// BUOC 4: AP DUNG THUC TE - deep link tu PUSH NOTIFICATION
// (rat co the day la thu ban da lam nhung chua "goi ten" duoc)
// ============================================================
// Khi backend gui push notification, payload thuong co san 1 truong URL
// hoac { screen, params }, vi du:
//   { screen: "ProductDetail", params: { id: "123" } }
//
// Khi nguoi dung BAM VAO notification, code se goi:
//   navigationRef.current?.navigate(data.screen, data.params);
// -> Day la dieu huong TRUC TIEP qua navigationRef (khong nhat thiet phai
//    di qua chuoi URL/"linking config"), nhung VE BAN CHAT VAN LA MOT
//    DANG DEEP LINKING: mo app va nhay thang toi 1 man hinh cu the dua
//    tren du lieu tu ben ngoai (khac voi nguoi dung tu bam dieu huong).
//
// Neu du an dung them Firebase Dynamic Links hoac Branch.io: nhung thu
// vien nay xu ly them truong hop DEFERRED DEEP LINK - vi du nguoi dung
// BAM link SP nhung CHUA CAI APP -> dan qua App Store/Play Store cai app
// -> SAU KHI CAI XONG VA MO APP LAN DAU, thu vien VAN NHO duoc link ban
// dau va tu dieu huong dung cho -> day la phan PHUC TAP HON deep linking
// co ban cua React Navigation, thuong can tich hop them SDK ben thu 3.


// ============================================================
// BUOC 5: BRANCH.IO trong du an thuc te - CAI DAT va HANDLE
// (chuan bi cho cau hoi "em hay dung gi de xu ly deep link")
// ============================================================
// VI SAO chon Branch.io thay vi chi dung "linking" thuan cua React
// Navigation nhu Buoc 2:
//   1. DEFERRED DEEP LINK: nguoi dung bam link nhung CHUA CAI APP -> Branch
//      dan qua App Store/Play Store -> SAU KHI CAI VA MO APP LAN DAU,
//      Branch VAN NHO duoc link ban dau va tra du lieu ve cho app - React
//      Navigation thuan KHONG lam duoc dieu nay (chi hoat dong khi app
//      DA CAI SAN)
//   2. ATTRIBUTION/TRACKING: biet duoc nguoi dung den tu campaign nao,
//      kenh nao (Facebook Ads, Zalo, SMS...), ai gioi thieu ai (referral)
//   3. Tu tao SHORT LINK + custom preview (OG title/image) de SHARE qua
//      Zalo/Facebook/SMS ma khong can tu build he thong link rieng
//   4. Khong can tu maintain file .well-known/apple-app-site-association
//      va assetlinks.json phuc tap nhu Universal Link/App Link thuan

// --- CAI DAT (tom tat cac buoc chinh) ---
// 1. yarn add react-native-branch (hoac npm install)
// 2. Lay Branch key tu Branch Dashboard (co 2 key: live va test)
// 3. Config NATIVE:
//    iOS:
//      - Them Branch key vao Info.plist (branch_key)
//      - Bat capability "Associated Domains" trong Xcode, them:
//        applinks:xxxx.app.link va applinks:xxxx-alternate.app.link
//    Android:
//      - Them Branch key vao AndroidManifest.xml (meta-data)
//      - Them <intent-filter> nhan domain xxxx.app.link trong Activity chinh
// 4. Goi branch.getLatestReferringParams() hoac branch.subscribe() de nhan du lieu

// --- HANDLE trong JS - lang nghe link duoc mo ---
import branch from "react-native-branch";
import { useEffect } from "react";

function useBranchDeepLink(navigationRef: any) {
  useEffect(() => {
    const unsubscribe = branch.subscribe(({ error, params }) => {
      if (error) {
        console.error("Loi tu Branch: " + error);
        return;
      }
      // "+clicked_branch_link" = true CHI KHI nguoi dung THUC SU bam vao
      // 1 branch link (phan biet voi lan mo app binh thuong khong qua link)
      if (params && params["+clicked_branch_link"]) {
        const screen = params.screen as string;
        const productId = params.product_id as string;
        navigationRef.current?.navigate(screen, { id: productId });
      }
    });

    return () => unsubscribe(); // huy lang nghe khi component unmount
  }, [navigationRef]);
}

// --- TAO LINK de SHARE (vi du: chuc nang "chia se san pham") ---
// async function createShareLink(productId: string) {
//   const branchUniversalObject = await branch.createBranchUniversalObject(
//     `product/${productId}`,
//     {
//       title: "Xem san pham nay",
//       contentMetadata: { customMetadata: { screen: "ProductDetail", product_id: productId } },
//     }
//   );
//   const { url } = await branchUniversalObject.generateShortUrl();
//   return url; // gui link nay qua Zalo/SMS/Facebook...
// }

// --- VI DU TINH NANG THUC TE: chuong trinh GIOI THIEU BAN BE (referral) ---
// 1. User A bam "Chia se" -> createShareLink() sinh link chua ma gioi thieu
//    cua A (vd customMetadata: { referrer_id: "A123" })
// 2. User B bam vao link do. Neu B CHUA CAI APP -> Branch dan qua store.
//    Sau khi B cai xong va mo app LAN DAU, branch.subscribe() nhan lai
//    duoc params { referrer_id: "A123" } DU LA LAN MO APP DAU TIEN
// 3. App goi API bao server "B duoc gioi thieu boi A" -> cong thuong cho ca 2
// -> Day chinh la diem KHAC BIET LON NHAT so voi deep link thuan: van
//    "nho" duoc nguoi gioi thieu DU B phai qua buoc cai app o giua.


// ============================================================
// TOM TAT NGAN GON DE TRA LOI PHONG VAN
// ============================================================
// "Deep link la URL dac biet mo thang app va dieu huong toi 1 man hinh
//  cu the dua tren path/params cua no. React Navigation dung 1 object
//  linking (prefixes + config map path -> screen) truyen vao
//  NavigationContainer, tu lang nghe su kien URL (Linking.addEventListener
//  khi app dang chay nen, Linking.getInitialURL khi app bi kill hoan toan)
//  roi tu dieu huong, khong can minh tu parse thu cong. Push notification
//  dieu huong toi 1 man hinh cu the cung la 1 dang deep linking, chi khac
//  la thuong goi thang navigationRef.navigate thay vi qua URL string. Voi
//  truong hop nguoi dung chua cai app (deferred deep link), thuong can
//  Firebase Dynamic Links hoac Branch.io de nho lai link sau khi cai app."
