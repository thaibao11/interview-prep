/**
 * CAU 5 (React Native): Bridge (kien truc cu) hoat dong the nao,
 * va tai sao no la bottleneck hieu nang.
 */

// ============================================================
// BUOC 0: RN co 2 THE GIOI tach biet, khong dung chung bo nho
// ============================================================
//   [ THE GIOI JS ]                    [ THE GIOI NATIVE ]
//   Code React, logic app          <->  UIView (iOS) / View (Android)
//   Chay tren JS THREAD                 Chay tren MAIN/UI THREAD
//   (JS engine: Hermes/JSC)             (Swift/ObjC hoac Kotlin/Java)
//
// 2 the gioi nay KHONG THE goi truc tiep ham cua nhau, vi khac ngon ngu,
// khac tien trinh bo nho -> can 1 co che trung gian de "noi chuyen" -> BRIDGE


// ============================================================
// BUOC 1: BRIDGE la gi - hoat dong nhu the nao
// ============================================================
// Bridge la mot HANG DOI TIN NHAN (message queue), hoat dong theo co che:
//   1. Ben JS muon lam gi do voi native (vd: "doi mau nut nay thanh do")
//   2. JS SERIALIZE (chuyen doi) yeu cau do thanh CHUOI JSON
//   3. Chuoi JSON duoc gui qua Bridge sang phia Native
//   4. Native DESERIALIZE (doc lai) JSON thanh du lieu that, roi THUC THI
//      (goi ham native that su de doi mau nut)
//   5. Neu native can tra ket qua ve JS (vd: gia tri touch event),
//      qua trinh serialize/deserialize JSON lai dien ra CHIEU NGUOC LAI
//
// 2 dac diem QUAN TRONG can nho:
//   - BAT DONG BO (asynchronous): JS gui yeu cau xong la chay tiep luon,
//     KHONG cho ket qua tra ve ngay lap tuc (khong the goi dong bo)
//   - Cac message duoc GOM LAI THANH BATCH (theo tung "frame"/tick) roi
//     moi gui qua bridge 1 lan, khong gui tung cai rieng le


// ============================================================
// BUOC 2: TAI SAO day la BOTTLENECK (diem nghen) hieu nang
// ============================================================
// Ly do 1 - Chi phi SERIALIZE/DESERIALIZE JSON:
//   Moi lan JS <-> Native trao doi du lieu, du lieu phai duoc BIEN THANH
//   CHUOI JSON roi PHAN TICH LAI thanh object. Voi du lieu LON hoac
//   TAN SUAT CAO (vd: cuon 1 danh sach dai, hoac animation chay 60 lan/giay),
//   chi phi serialize/deserialize nay CONG DON rat lon.
//
// Ly do 2 - CHI CO THE goi BAT DONG BO, khong the goi DONG BO:
//   Muon do kich thuoc 1 view ngay lap tuc? Khong the - phai gui yeu cau
//   qua bridge, CHO native tra loi bang 1 callback (mat it nhat 1 vong lap).
//   Dieu nay gay kho khan cho nhung thao tac can ket qua NGAY LAP TUC.
//
// Ly do 3 - Animation/Gesture chay o JS thread phai "vuot bridge" MOI FRAME:
//   Neu animation dieu khien tu JS (vd Animated API kieu cu khong dung
//   native driver), MOI FRAME (60 lan/giay) can gui 1 message qua bridge
//   de cap nhat vi tri/mau/kich thuoc. Neu JS thread dang ban (vd dang xu ly
//   logic app nang), message bi CHAM TRE -> animation bi GIAT (jank/dropped frame).
//
// Ly do 4 - JS thread la NGHEN CO (single-threaded):
//   Neu JS thread dang ban xu ly logic (vd 1 tinh toan nang), TOAN BO
//   message dang cho trong hang doi bridge cung bi ket lai, ke ca cac
//   su kien tuong tac cua nguoi dung (touch, scroll).


// ============================================================
// BUOC 3: VI DU THUC TE HAY GAP
// ============================================================
// - FlatList voi danh sach RAT DAI, cuon nhanh: moi lan render item moi
//   phai gui thong tin qua bridge -> neu khong toi uu (thieu getItemLayout,
//   renderItem nang) se giat khi cuon.
// - Animated API (ban CU, khong bat useNativeDriver: true): animation chay
//   tren JS thread, MOI FRAME phai vuot bridge -> de bi giat khi JS thread ban.
//   -> Day chinh la ly do useNativeDriver ra doi: KHI BAT, animation duoc
//      "gui truoc" toan bo cau hinh sang native 1 LAN, roi native TU CHAY
//      animation ma KHONG can hoi lai JS moi frame nua.
// - Day cung la ly do thu vien Reanimated ra doi: cho phep viet logic
//   animation/gesture chay TREN UI THREAD (qua worklet), TRANH hoan toan
//   viec phai vuot bridge lien tuc.


// ============================================================
// BUOC 3B: VI DU CODE CU THE - de tra loi khi interviewer hoi
// "vay no ap dung vao code cua em o dau"
// ============================================================
import { NativeModules, Alert, Animated } from "react-native";

// --- Vi du 1: Goi mot Native Module - day CHINH LA 1 lan "vuot bridge" ---
// Alert.alert() ban chat la 1 native module co san cua RN
Alert.alert("Thong bao", "Day la 1 loi goi vuot qua Bridge");
// Duoi hau truong: JS SERIALIZE ten module ("AlertManager"), ten ham ("alert"),
// va tham so ("Thong bao", "Day la...") thanh JSON -> day qua bridge ->
// Native DESERIALIZE -> thuc thi hien Alert that -> KHONG co ket qua tra ve
// ngay lap tuc, day la loi goi BAT DONG BO

// Neu ban dung 1 thu vien nhu react-native-device-info:
// DeviceInfo.getDeviceName() cung la 1 native module -> MOI LAN goi la
// 1 lan serialize/deserialize qua bridge (kien truc cu)


// --- Vi du 2: Do kich thuoc 1 view - PHAI bat dong bo, khong the dong bo ---
function measureExample(viewRef: React.RefObject<any>) {
  viewRef.current?.measure((x: number, y: number, width: number, height: number) => {
    // Ket qua CHI CO O DAY, ben trong callback - vi phai gui yeu cau qua
    // bridge sang native, cho native do that roi gui JSON ket qua tra ve
    console.log(width, height);
  });
  // console.log(width) // KHONG THE viet o day - chua co ket qua, do la bat dong bo
}


// --- Vi du 3: Animated API - VI DU RO NHAT ve chi phi "vuot bridge moi frame" ---
function AnimatedBadExample() {
  const opacity = new Animated.Value(0);

  Animated.timing(opacity, {
    toValue: 1,
    duration: 500,
    useNativeDriver: false, // KHONG bat native driver
  }).start();
  // -> Voi useNativeDriver: false, MOI FRAME (toi da 60 lan/giay trong 500ms),
  //    JS phai TINH gia tri opacity moi, SERIALIZE, GUI qua bridge de native
  //    cap nhat view. Neu JS thread dang ban viec khac cung luc, cac frame
  //    nay bi tre -> animation GIAT (jank).
}

function AnimatedGoodExample() {
  const opacity = new Animated.Value(0);

  Animated.timing(opacity, {
    toValue: 1,
    duration: 500,
    useNativeDriver: true, // BAT native driver
  }).start();
  // -> Voi useNativeDriver: true, JS chi gui 1 LAN DUY NHAT toan bo cau hinh
  //    animation (tu gia tri, den gia tri, thoi gian, duong cong easing)
  //    sang native NGAY TU DAU. Sau do NATIVE TU CHAY animation hoan toan,
  //    KHONG can hoi lai JS o tung frame nua -> muot hon han, khong bi
  //    anh huong boi viec JS thread co dang ban hay khong.
  //    (Luu y: useNativeDriver chi ap dung duoc voi cac thuoc tinh khong
  //    anh huong layout, vd opacity/transform - khong dung duoc voi
  //    width/height/margin...)
}

// -> Neu interviewer hoi "em ap dung kien thuc nay o dau trong du an thuc te?"
//    tra loi: "Em luon bat useNativeDriver: true cho cac animation co the,
//    va voi animation/gesture phuc tap hon (vd keo tha, vuot trang) em dung
//    Reanimated + Gesture Handler de logic chay hoan toan tren UI thread,
//    tranh phai vuot bridge (hoac goi JSI voi kien truc moi) o tung frame."


// ============================================================
// BUOC 4: (PREVIEW) Kien truc moi giai quyet van de nay the nao
// ============================================================
// Kien truc moi thay Bridge bang JSI (JavaScript Interface):
//   - JS co the giu THAM CHIEU TRUC TIEP toi object/ham native (khong can
//     serialize thanh JSON), goi duoc TRUC TIEP va DONG BO neu can
//   - Khong con "hang doi JSON" o giua, giam manh chi phi serialize
// -> Day se la noi dung cau hoi tiep theo (JSI, Fabric, TurboModules)


// ============================================================
// TOM TAT NGAN GON DE TRA LOI PHONG VAN
// ============================================================
// "RN co JS thread va Native/UI thread tach biet, khong dung chung bo nho.
//  Bridge la mot hang doi tin nhan bat dong bo, moi lan JS va Native trao
//  doi du lieu deu phai SERIALIZE/DESERIALIZE thanh JSON. No la bottleneck
//  vi: (1) chi phi serialize/deserialize voi du lieu lon/tan suat cao,
//  (2) chi goi duoc bat dong bo nen khong the doc ket qua native ngay lap
//  tuc, (3) animation/gesture dieu khien tu JS phai vuot bridge moi frame
//  nen de giat khi JS thread ban. Day cung la ly do useNativeDriver va
//  Reanimated ra doi - de tranh phai vuot bridge lien tuc."
