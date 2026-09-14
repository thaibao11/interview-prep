/**
 * Callback la gi, khi nao dung, va "Callback Hell" la gi.
 *
 * DOC FILE NAY TRUOC promise-combinators.ts va
 * async-await-error-handling.ts - vi Promise/async-await duoc SINH RA
 * DE GIAI QUYET DUNG VAN DE cua callback (dac biet la Callback Hell).
 */

// ============================================================
// BUOC 0: CALLBACK LA GI - DINH NGHIA DON GIAN NHAT
// ============================================================
// Callback la 1 HAM duoc TRUYEN VAO LAM THAM SO cho 1 ham KHAC, de ham
// KHAC DO GOI LAI (call back) TAI 1 THOI DIEM PHU HOP - co the NGAY
// LAP TUC (dong bo) hoac SAU NAY khi 1 tac vu hoan tat (bat dong bo).


// ============================================================
// BUOC 1: 2 LOAI CALLBACK - DONG BO vs BAT DONG BO (RAT HAY BI NHAM)
// ============================================================

// --- Callback DONG BO - GOI NGAY LAP TUC, trong luc ham dang chay ---
[1, 2, 3].forEach((item) => {
  console.log(item); // callback nay duoc GOI NGAY, KHONG cho, KHONG
  // lien quan gi den bat dong bo/event loop
});
// map, filter, reduce, forEach, sort... deu nhan callback DONG BO

// --- Callback BAT DONG BO - GOI SAU, khi 1 tac vu (thuong la I/O,
// timer) HOAN TAT ---
setTimeout(() => {
  console.log("Chay sau 1000ms"); // callback nay CHAY SAU, thong qua
  // Web API + Callback Queue + Event Loop (da hoc o definitions.ts)
}, 1000);

// -> Khi noi "callback" trong ngu canh BAT DONG BO (nhu cau hoi nay
//    thuong hoi), THUONG AM CHI loai THU 2


// ============================================================
// BUOC 2: KHI NAO DUNG CALLBACK - VAN CON DUNG DUOC O DAU NGAY NAY
// ============================================================
// 1. CAC HAM DUYET MANG (dong bo): map/filter/reduce/forEach - day VAN
//    LA CACH DUNG CHINH THUC, khong co gi thay the
// 2. EVENT LISTENER: addEventListener, socket.on("message", callback) -
//    callback duoc goi MOI LAN su kien xay ra (co the NHIEU LAN, khac
//    Promise CHI resolve/reject 1 LAN DUY NHAT)
// 3. API/THU VIEN CU (truoc thoi Promise pho bien), theo QUY UOC
//    "ERROR-FIRST CALLBACK" cua Node.js:
function readFileCallback(
  path: string,
  callback: (err: Error | null, data?: string) => void
) {
  // gia lap: doc file xong goi callback(null, data) neu OK,
  // hoac callback(error) neu loi
}
readFileCallback("./file.txt", (err, data) => {
  if (err) {
    console.error("Loi:", err);
    return;
  }
  console.log("Noi dung:", data);
});
// -> Quy uoc: THAM SO DAU TIEN LUON la "err" (null neu khong loi),
// THAM SO SAU la ket qua - day la CHUAN CU cua he sinh thai Node.js
// TRUOC KHI Promise/async-await tro nen pho bien


// ============================================================
// BUOC 3: CALLBACK HELL ("PYRAMID OF DOOM") - VAN DE CHINH cua callback
// ============================================================
// Xay ra khi CAN LAM NHIEU TAC VU BAT DONG BO TUAN TU, MOI TAC VU SAU
// PHU THUOC KET QUA cua tac vu TRUOC - VOI CALLBACK, cach DUY NHAT la
// LONG CALLBACK VAO BEN TRONG CALLBACK, CANG NGAY CANG SAU:

getUser(1, (err1, user) => {
  if (err1) return console.error(err1);
  getOrders(user.id, (err2, orders) => {
    if (err2) return console.error(err2);
    getOrderDetails(orders[0].id, (err3, details) => {
      if (err3) return console.error(err3);
      getShippingInfo(details.shippingId, (err4, shipping) => {
        if (err4) return console.error(err4);
        console.log(shipping); // KET QUA CUOI CUNG, sau 4 TANG LONG NHAU
        // -> CANG NHIEU BUOC, CODE CANG "LECH SANG PHAI" (hinh KIM TU
        //    THAP), RAT KHO DOC, KHO BAO TRI
      });
    });
  });
});

// VAN DE CU THE CUA CALLBACK HELL:
//   1. KHO DOC: logic chinh bi "CHON VUI" giua cac tang long nhau
//   2. XU LY LOI LAP LAI o MOI TANG (if (err) return...) - de QUEN kiem
//      tra loi o 1 tang nao do
//   3. KHO CHIA SE/TAI SU DUNG logic giua cac buoc
//   4. KHO chay SONG SONG nhieu tac vu doc lap (phai tu dem so luong
//      hoan tat thu cong bang bien dem, RAT DE SAI)


// ============================================================
// BUOC 4: PROMISE/ASYNC-AWAIT GIAI QUYET CALLBACK HELL NHU THE NAO
// ============================================================
// CUNG logic tren, VIET LAI bang async/await (gia dinh cac ham da
// duoc CHUYEN sang tra ve Promise - xem Buoc 5):
async function getShippingInfoFlow() {
  try {
    const user = await getUserAsync(1);
    const orders = await getOrdersAsync(user.id);
    const details = await getOrderDetailsAsync(orders[0].id);
    const shipping = await getShippingInfoAsync(details.shippingId);
    console.log(shipping);
  } catch (err) {
    console.error(err); // XU LY LOI O 1 CHO DUY NHAT cho CA CHUOI,
    // thay vi lap lai if (err) o MOI TANG
  }
}
// -> Code "THANG HANG" (linear), doc TU TREN XUONG DUOI giong code
//    dong bo thong thuong, KHONG con "kim tu thap" long nhau, va CHI
//    CAN 1 try/catch DUY NHAT cho CA CHUOI


// ============================================================
// BUOC 5: CHUYEN 1 HAM CALLBACK-BASED SANG PROMISE-BASED
// (thuong goi la "promisify" - RAT HAY duoc hoi thuc hanh)
// ============================================================
function readFilePromise(path: string): Promise<string> {
  return new Promise((resolve, reject) => {
    readFileCallback(path, (err, data) => {
      if (err) reject(err); // callback loi -> Promise reject
      else resolve(data!); // callback thanh cong -> Promise resolve
    });
  });
}
// Gio co the dung: const data = await readFilePromise("./file.txt");
// (Node.js co san util.promisify() de lam viec nay tu dong cho cac ham
// theo dung quy uoc error-first callback)


// ============================================================
// TOM TAT NGAN GON DE TRA LOI PHONG VAN
// ============================================================
// "Callback la 1 ham duoc truyen vao ham khac de duoc GOI LAI sau - co
// the dong bo (map/forEach) hoac bat dong bo (setTimeout, event
// listener, API kieu cu theo quy uoc error-first callback cua Node).
// Callback hell (pyramid of doom) xay ra khi can lam nhieu tac vu bat
// dong bo TUAN TU, moi buoc phu thuoc ket qua buoc truoc - voi callback,
// cach duy nhat la long callback vao nhau ngay cang sau, gay kho doc,
// xu ly loi lap lai o moi tang, va kho tai su dung logic. Promise gom
// cac buoc do thanh 1 CHUOI .then() phang hon, va async/await con lam
// no doc THANG HANG nhu code dong bo, chi can 1 try/catch duy nhat cho
// ca chuoi thay vi kiem tra loi o tung tang. Muon dung 1 ham callback
// cu trong code moi, co the 'promisify' no bang cach boc trong 1
// Promise moi, goi resolve/reject dua tren ket qua cua callback."

declare function getUser(id: number, cb: (err: any, user: any) => void): void;
declare function getOrders(userId: number, cb: (err: any, orders: any[]) => void): void;
declare function getOrderDetails(orderId: number, cb: (err: any, details: any) => void): void;
declare function getShippingInfo(shippingId: number, cb: (err: any, shipping: any) => void): void;
declare function getUserAsync(id: number): Promise<any>;
declare function getOrdersAsync(userId: number): Promise<any[]>;
declare function getOrderDetailsAsync(orderId: number): Promise<any>;
declare function getShippingInfoAsync(shippingId: number): Promise<any>;
