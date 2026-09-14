/**
 * CHI TIET: Cache anh trong React Native (mo rong tu how-i-optimize-performance.tsx)
 */

// ============================================================
// BUOC 0: Image MAC DINH cua RN co cache khong?
// ============================================================
// - iOS: <Image> mac dinh dua vao NSURLCache cua he thong - CO cache
//   nhung KHONG KIEM SOAT DUOC nhieu (thoi gian song, dung luong toi
//   da, chinh sach xoa cache...)
// - Android: <Image> mac dinh dung Fresco ben duoi - CO ca memory cache
//   VA disk cache, nhung cau hinh/hanh vi KHAC iOS, kho DAM BAO NHAT
//   QUAN giua 2 nen tang
// -> Van de: hanh vi cache KHONG DONG NHAT giua iOS/Android, va KHONG
//    CO API de minh CHU DONG kiem soat (preload, ep xoa cache, uu tien
//    tai anh nao truoc...) -> vi vay hau het du an THUC TE dung THU
//    VIEN RIENG thay vi Image mac dinh.


// ============================================================
// BUOC 1: react-native-fast-image (hoac expo-image cho du an dung Expo)
// ============================================================
// FastImage dung SDWebImage (iOS) / Glide (Android) ben duoi - 2 thu
// vien cache anh MANH NHAT tren tung nen tang, cho HANH VI DONG NHAT
// va NHIEU QUYEN KIEM SOAT hon Image mac dinh.

import FastImage from "react-native-fast-image";

function Avatar({ uri }: { uri: string }) {
  return (
    <FastImage
      style={{ width: 48, height: 48, borderRadius: 24 }}
      source={{
        uri,
        priority: FastImage.priority.normal, // low/normal/high - anh quan trong (avatar dang xem) uu tien hon anh o xa
        cache: FastImage.cacheControl.immutable, // xem Buoc 2 ben duoi
      }}
      resizeMode={FastImage.resizeMode.cover}
    />
  );
}

// --- PRELOAD anh TRUOC KHI CAN HIEN THI (vd: preload avatar cua danh
// sach ban be TRUOC KHI nguoi dung cuon toi, giup cuon muot hon) ---
function preloadAvatars(urls: string[]) {
  FastImage.preload(urls.map((uri) => ({ uri })));
}


// ============================================================
// BUOC 2: CHIEN LUOC CACHE - xu ly truong hop URL GIONG NHAU nhung
// NOI DUNG ANH DA DOI (vd user doi avatar moi nhung van dung chung 1 URL)
// ============================================================
// cache: FastImage.cacheControl.immutable (mac dinh)
//   -> Gia dinh URL nay VINH VIEN khong doi noi dung. Cache RAT MANH
//      (gan nhu khong bao gio goi lai server neu da co trong cache).
//      Phu hop anh san pham, anh bai viet (URL co id rieng cho moi anh).
//
// cache: FastImage.cacheControl.web
//   -> TON TRONG HTTP cache-control header tu SERVER (giong cach browser
//      cache anh web binh thuong) - PHU HOP anh CO THE DOI NOI DUNG
//      (vd avatar user, anh bia) - server kiem soat thoi gian cache qua
//      header, khong bi cache "cung" vinh vien
//
// cache: FastImage.cacheControl.cacheOnly
//   -> CHI lay tu cache, KHONG BAO GIO goi mang - dung cho truong hop
//      DA PRELOAD SAN va chac chan co trong cache
//
// GIAI PHAP THUC TE PHO BIEN NHAT khi avatar co the doi: BACKEND THEM
// QUERY PARAM VERSION vao URL moi khi anh doi (vd ?v=173625...), vi day
// la CACH DON GIAN NHAT de "URL khac = anh khac", khong phu thuoc chinh
// sach cache cua client:
//   avatar_url: "https://cdn.app.com/avatar/user123.jpg?v=1694500000"


// ============================================================
// BUOC 3: TOI UU KICH THUOC ANH TRUOC KHI CACHE/HIEN THI
// ============================================================
// - KHONG tai anh goc DO PHAN GIAI CAO (vd 4000x3000) de hien trong 1
//   o 100x100 - vua TON BANG THONG, vua TON BO NHO GIAI MA (decode) anh
//   lon hon nhieu so voi kich thuoc hien thi thuc te
// - YEU CAU BACKEND/CDN tra ve NHIEU KICH THUOC (thumbnail, medium,
//   full) va client CHON DUNG SIZE THEO NGU CANH hien thi (avatar nho
//   dung thumbnail, xem chi tiet moi dung full)
// - Dinh dang WEBP thay vi PNG/JPEG khi co the ho tro - nhe hon dang ke
//   voi chat luong tuong duong, giam ca dung luong tai VA dung luong cache


// ============================================================
// BUOC 4: VI DU THUC TE - danh sach avatar trong app chat/social
// ============================================================
// Van de: FlatList danh sach ban be/tin nhan co RAT NHIEU avatar, neu
// dung Image mac dinh, MOI LAN cuon lai qua 1 avatar da xem truoc do co
// the phai TAI LAI TU MANG (tuy hanh vi cache khong nhat quan), gay giat
// khi cuon nhanh.
//
// Giai phap: FastImage voi cache: immutable (avatar it doi, hoac da co
// version trong URL) + PRELOAD truoc N avatar dau tien luc man hinh
// vua mo, giup LAN CUON DAU TIEN da muot ngay, va CAC LAN CUON SAU (quay
// lai man hinh nay) GAN NHU TUC THI vi da co san trong disk cache.


// ============================================================
// TOM TAT NGAN GON DE TRA LOI PHONG VAN
// ============================================================
// "Image mac dinh cua RN co cache nhung khong nhat quan giua iOS/Android
// va khong kiem soat duoc, nen minh dung react-native-fast-image (dua
// tren SDWebImage/Glide) de co cache dong nhat va kiem soat duoc qua
// cacheControl: immutable cho anh khong doi, hoac web cho anh co the
// doi noi dung nhu avatar (ket hop them version trong URL o backend).
// Ngoai ra minh luon dam bao anh duoc resize dung kich thuoc hien thi
// truoc khi tai, dung WebP khi co the, va preload truoc nhung anh sap
// hien thi (vd avatar dau danh sach) de trai nghiem cuon muot ngay tu
// dau thay vi phai doi tai xong moi hien."
