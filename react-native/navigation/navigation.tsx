/**
 * CAU 7 (React Native): Stack vs Tab vs Drawer Navigator,
 * va khi nao ket hop chung voi nhau.
 */

// ============================================================
// BUOC 0: DINH NGHIA DUNG (sua lai hieu nham thuong gap)
// ============================================================
// Stack Navigator
//   -> Quan ly 1 "chong" man hinh (push/pop), giong chong dia: man hinh
//      moi PUSH len tren, bam back thi POP ra. Co lich su dieu huong ro
//      rang (LIFO - vao sau ra truoc). Vi du: DanhSach -> ChiTiet -> Sua.
//
// Tab Navigator
//   -> Hien thi NHIEU man hinh SONG SONG duoi dang cac tab (thuong o
//      DUOI man hinh). Nguoi dung BAM CHUYEN giua cac tab, KHONG co khai
//      niem "back ve tab truoc" theo kieu stack. MOI TAB THUONG CHUA 1
//      STACK RIENG BEN TRONG NO (khong phai nguoc lai) - de di sau vao
//      chi tiet ma tab bar VAN HIEN THI CO DINH.
//
// Drawer Navigator
//   -> Mot MENU DANG PANEL, AN MAC DINH, TRUOT RA tu canh man hinh (vuot
//      tay hoac bam icon hamburger). KHAC voi Tab: Drawer khong hien thi
//      thuong truc, chi bung ra khi can, thuong dung cho cac muc IT BAM
//      TOI (Settings, Ho tro, Dang xuat...) thay vi dieu huong chinh.


// ============================================================
// BUOC 1: Hanh vi nut BACK khac nhau giua 3 loai (diem hay bi hoi vặn)
// ============================================================
// - Stack: bam back (vat ly Android hoac gesture iOS) -> POP man hinh
//   tren cung ra, quay ve man hinh truoc do trong chong
// - Tab: bam back THUONG KHONG chuyen tab, ma se pop MAN HINH TRONG
//   STACK CUA TAB HIEN TAI (neu co); chi khi stack cua tab da ve man
//   hinh goc thi back moi thoat app (hoac quay tab mac dinh, tuy cau hinh)
// - Drawer: neu drawer DANG MO, bam back se DONG DRAWER LAI truoc,
//   chua thoat man hinh ben duoi


// ============================================================
// BUOC 2: CAU TRUC LONG NHAU THUC TE (Stack > Tab > Stack)
// ============================================================
// Mo hinh RAT PHO BIEN trong app thuc te:
//
//   RootStack (Stack Navigator)
//     |- AuthStack        <- khi CHUA dang nhap (Login, DangKy, QuenMatKhau)
//     |- MainTab (Tab Navigator)   <- khi DA dang nhap
//          |- HomeStack (Stack rieng)   -> DanhSachSanPham -> ChiTietSanPham -> ThanhToan
//          |- SearchStack (Stack rieng) -> TimKiem -> KetQua -> ChiTietSanPham
//          |- ProfileStack (Stack rieng) -> HoSo -> CaiDat -> Drawer (neu can)
//
// Vi RootStack la Stack, ta co the PUSH toan man hinh Auth de mask hoan
// toan MainTab ben duoi (dang nhap xong thi "replace" sang MainTab, khong
// cho bam back quay lai Login).
//
// Vi moi tab (Home/Search/Profile) co STACK RIENG BEN TRONG, nguoi dung
// co the vao ChiTietSanPham tu tab Home, tab bar VAN HIEN o duoi, va
// TRANG THAI cua tab Search/Profile KHONG BI MAT khi quay lai (moi
// Stack cua moi tab duoc giu doc lap, khong bi unmount khi doi tab).

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const RootStack = createNativeStackNavigator();
const MainTab = createBottomTabNavigator();
const HomeStackNav = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStackNav.Navigator>
      <HomeStackNav.Screen name="ProductList" component={() => null} />
      <HomeStackNav.Screen name="ProductDetail" component={() => null} />
    </HomeStackNav.Navigator>
  );
}

function MainTabScreen() {
  return (
    <MainTab.Navigator>
      <MainTab.Screen name="Home" component={HomeStackScreen} />
      {/* <MainTab.Screen name="Search" component={SearchStackScreen} /> */}
      {/* <MainTab.Screen name="Profile" component={ProfileStackScreen} /> */}
    </MainTab.Navigator>
  );
}

function RootNavigator() {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {/* <RootStack.Screen name="Auth" component={AuthStackScreen} /> */}
      <RootStack.Screen name="Main" component={MainTabScreen} />
    </RootStack.Navigator>
  );
}


// ============================================================
// BUOC 3: KHI NAO KET HOP - vi du that
// ============================================================
// - App thuong mai dien tu: RootStack (tach Auth/Main) + MainTab (Home/
//   GioHang/DonHang/CaNhan) + moi tab co Stack rieng de xem chi tiet
// - App co nhieu muc it dung (Settings, Doi mat khau, Dieu khoan, Ho tro,
//   Dang xuat): dat trong Drawer thay vi nhet het vao Tab, vi Tab chi nen
//   co 3-5 muc CHINH, qua nhieu tab se chat va kho bam tren man hinh nho
// - Ung dung goi y: Tab cho CAC LUONG CHINH nguoi dung dung THUONG XUYEN,
//   Drawer cho cac muc PHU, ít dùng nhưng vẫn cần truy cập nhanh


// ============================================================
// TOM TAT NGAN GON DE TRA LOI PHONG VAN
// ============================================================
// "Stack quan ly 1 chong man hinh theo kieu push/pop, co lich su dieu
//  huong. Tab hien thi nhieu man hinh song song, chuyen doi bang bam,
//  va THUONG CHUA 1 STACK RIENG BEN TRONG MOI TAB de di sau ma tab bar
//  van co dinh. Drawer la menu dang panel an mac dinh, truot ra khi can,
//  dung cho cac muc it dung. Trong thuc te hay ket hop: RootStack tach
//  Auth/Main, ben trong Main la Tab cho cac luong chinh, moi tab co
//  Stack rieng, va Drawer (neu can) danh cho cac muc phu nhu Settings."
