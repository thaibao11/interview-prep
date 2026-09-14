/**
 * CAU 2 (Networking): Thiet ke offline-first cho app can hoat dong
 * khi mat mang - queue, sync, conflict resolution.
 */

// ============================================================
// BUOC 0: OFFLINE-FIRST NGHIA LA GI (khac voi "chiu duoc mat mang")
// ============================================================
// Offline-first KHONG chi la "hien thong bao loi khi mat mang" - ma la
// THIET KE app coi MANG LA THU KHONG DAM BAO CO SAN NGAY TU DAU, moi
// TINH NANG CHINH van HOAT DONG DUOC (doc du lieu cu, THAO TAC duoc va
// duoc LUU LAI), roi TU DONG DONG BO khi co mang tro lai.


// ============================================================
// BUOC 1: DOC DU LIEU KHI OFFLINE - CACHE CUC BO LA NEN TANG
// ============================================================
// Moi du lieu tu API deu duoc LUU 1 BAN SAO vao local storage (SQLite,
// WatermelonDB, hoac MMKV cho du lieu don gian) - khi mo app OFFLINE,
// HIEN NGAY du lieu tu cache cuc bo (co the danh dau "du lieu cu, dang
// cap nhat"), thay vi man hinh trang/loading vo han.
// React Query/RTK Query (Cau 1) co ho tro san CO CHE PERSIST CACHE ra
// storage (vd persistQueryClient cua React Query), giup PHAN NAY co
// san ma khong can tu xay tu dau.


// ============================================================
// BUOC 2: GHI DU LIEU KHI OFFLINE - MUTATION QUEUE
// ============================================================
// Khi nguoi dung THAO TAC (vd gui tin nhan, dat hang) LUC OFFLINE, KHONG
// THE goi API ngay - THAY VI CHAN nguoi dung lai, LUU thao tac do vao 1
// "HANG DOI" (queue) o local storage, HIEN THI NGAY tren giao dien nhu
// da thanh cong (OPTIMISTIC UPDATE - Buoc 3), roi XU LY HANG DOI do khi
// co mang tro lai:

type QueuedAction = { id: string; type: "SEND_MESSAGE"; payload: any; createdAt: number };

async function enqueueAction(action: QueuedAction) {
  // luu vao AsyncStorage/MMKV/SQLite
}

async function processQueueWhenOnline() {
  // doc TOAN BO action con trong queue, gui LAN LUOT (hoac theo thu tu
  // createdAt) len server, XOA KHOI QUEUE khi server XAC NHAN thanh cong,
  // GIU LAI trong queue (thu lai sau) neu that bai
}

// -> Thu vien ho tro san: react-native-offline, hoac redux-offline
// (voi Redux), hoac tu xay bang NetInfo (bat su kien co mang tro lai) +
// AsyncStorage/MMKV cho hang doi


// ============================================================
// BUOC 3: OPTIMISTIC UPDATE - lam nguoi dung CAM THAY nhanh
// ============================================================
// Thay vi CHO server xac nhan roi moi cap nhat giao dien, CAP NHAT
// GIAO DIEN NGAY LAP TUC nhu THAO TAC DA THANH CONG (vd tin nhan xuat
// hien ngay trong khung chat voi 1 icon "dang gui"), roi:
//   - NEU server xac nhan thanh cong SAU DO -> bo icon "dang gui"
//   - NEU that bai (vd het thoi gian cho, loi server) -> ROLLBACK lai
//     giao dien (bao loi, cho nguoi dung gui lai)
// React Query ho tro san co che nay qua onMutate (cap nhat cache TRUOC)
// + onError (tu dong rollback ve gia tri cu neu that bai)


// ============================================================
// BUOC 4: CONFLICT RESOLUTION - khi 2 NGUON cung sua 1 du lieu
// ============================================================
// Van de: nguoi dung SUA 1 du lieu LUC OFFLINE, nhung TRONG LUC DO,
// CHINH DU LIEU DO cung bi NGUOI KHAC (hoac chinh nguoi dung tu 1 thiet
// bi khac) SUA TREN SERVER - khi dong bo lai, CAI NAO "THANG"?
//
// 3 CHIEN LUOC PHO BIEN:
//   1. LAST WRITE WINS (don gian nhat): ban SUA SAU CUNG (theo timestamp)
//      se GHI DE len ban truoc - de lam, nhung CO THE MAT du lieu cua
//      1 ben ma khong bao cho ai biet
//   2. SERVER WINS: server LUON duoc uu tien, thay doi cuc bo BI HUY
//      neu xung dot - AN TOAN cho server nhung nguoi dung co the MAT
//      thay doi cua chinh minh ma khong hay biet neu khong bao ro
//   3. MERGE THU CONG (hien thi CA 2 PHIEN BAN cho nguoi dung TU CHON,
//      hoac merge tu dong THEO TUNG FIELD neu 2 ben sua CAC FIELD KHAC
//      NHAU cua CUNG 1 object) - PHUC TAP NHAT nhung AN TOAN va RO RANG
//      nhat cho nguoi dung, thuong dung cho du lieu QUAN TRONG (vd tai
//      lieu cong tac, don hang)
//
// Voi da so app THUONG (chat, todo, gio hang) - LAST WRITE WINS hoac
// SERVER WINS la DU DUNG. Chi can MERGE THU CONG khi du lieu THUC SU
// QUAN TRONG va XUNG DOT THUONG XUYEN xay ra.


// ============================================================
// TOM TAT NGAN GON DE TRA LOI PHONG VAN
// ============================================================
// "Offline-first can 3 phan: (1) cache du lieu doc duoc luc offline
// (React Query persist, hoac tu luu vao SQLite/MMKV), (2) mutation queue
// cho thao tac ghi luc offline - luu hang doi, xu ly lan luot khi co
// mang tro lai, ket hop optimistic update de nguoi dung thay ket qua
// ngay lap tuc va rollback neu that bai, va (3) chien luoc xu ly xung
// dot khi dong bo lai - last write wins hoac server wins cho da so
// truong hop don gian, merge thu cong/tu dong theo field cho du lieu
// thuc su quan trong va de xung dot."
