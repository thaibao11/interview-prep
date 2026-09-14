/**
 * CAU 4 (Event loop & Bat dong bo): async/await xu ly loi ra sao,
 * so voi .then().catch()?
 */

// ============================================================
// BUOC 0: async/await la "SYNTACTIC SUGAR" cho Promise
// ============================================================
// async/await KHONG PHAI 1 co che bat dong bo MOI - no chi la CACH
// VIET DE DOC HON cho Promise (van chay tren microtask queue giong het
// Promise thuong).


// ============================================================
// BUOC 1: try/catch THAY THE .then().catch()
// ============================================================
// .then().catch():
function withThenCatch() {
  return fetchUser()
    .then((user) => fetchOrders(user.id))
    .then((orders) => processOrders(orders))
    .catch((err) => {
      console.error(err); // BAT loi tu BAT KY buoc nao trong chuoi .then() o tren
    });
}

// async/await (doc TU NHIEN HON, giong code DONG BO):
async function withAsyncAwait() {
  try {
    const user = await fetchUser();
    const orders = await fetchOrders(user.id);
    return processOrders(orders);
  } catch (err) {
    console.error(err); // BAT loi tu BAT KY dong await nao o tren, GIONG
    // HET catch() cua Promise chain
  }
}
// -> Ca 2 CACH DEU bat duoc loi TU BAT KY BUOC NAO trong chuoi, chi
//    khac o CU PHAP: try/catch doc gan voi code dong bo hon, de theo
//    doi luong logic hon KHI CO NHIEU BUOC LONG NHAU (tranh "callback/
//    .then() dai qua nhieu tang")


// ============================================================
// BUOC 2: BAY HAY GAP #1 - QUEN await TRONG HAM ASYNC se KHONG BAT
// DUOC LOI dung cho
// ============================================================
async function trapMissingAwait() {
  try {
    // QUEN "await" o day:
    fetchUser(); // neu fetchUser() reject, LOI NAY SE KHONG duoc catch
    // o day - vi khong "await", ham async KHONG BIET NO CAN CHO promise
    // nay, catch() ben duoi SE KHONG BAT DUOC LOI TU DAY
  } catch (err) {
    console.error("Se KHONG BAO GIO chay toi day tu loi cua fetchUser()");
  }
}


// ============================================================
// BUOC 3: BAY HAY GAP #2 - Promise.all vs await TUNG CAI mot (TUAN TU)
// ============================================================
// SAI (cham hon can thiet - CHAY TUAN TU khi 2 request KHONG PHU THUOC nhau):
async function slowSequential() {
  const user = await fetchUser(); // cho xong roi MOI bat dau cai sau
  const products = await fetchProducts(); // le ra co the chay SONG SONG
  return { user, products };
}

// DUNG (chay SONG SONG khi 2 request DOC LAP, nhanh hon ro ret):
async function fastParallel() {
  const [user, products] = await Promise.all([fetchUser(), fetchProducts()]);
  return { user, products };
}


// ============================================================
// BUOC 4: XU LY LOI CHI TIET HON - finally va loi CU THE
// ============================================================
async function withFinally() {
  let loading = true;
  try {
    const data = await fetchUser();
    return data;
  } catch (err) {
    if (err instanceof NetworkError) {
      // xu ly rieng loi mang
    }
    throw err; // co the NEM LAI de noi goi ham nay tiep tuc xu ly
  } finally {
    loading = false; // LUON chay, du thanh cong hay that bai - hop de
    // tat trang thai loading
  }
}


// ============================================================
// TOM TAT NGAN GON DE TRA LOI PHONG VAN
// ============================================================
// "async/await la cu phap de doc hon cho Promise, van chay tren
// microtask queue giong het. Loi duoc bat bang try/catch thay vi
// .catch(), bat duoc loi tu bat ky dong await nao trong khoi try - ve
// chuc nang tuong duong .then().catch() nhung de theo doi hon khi co
// nhieu buoc long nhau. 2 bay hay gap: quen 'await' truoc 1 loi goi
// async se khien loi khong duoc catch dung cho, va await tung cai mot
// tuan tu khi 2 request thuc ra doc lap nhau se cham hon can thiet -
// nen dung Promise.all khi cac tac vu khong phu thuoc nhau."

class NetworkError extends Error {}
declare function fetchUser(): Promise<any>;
declare function fetchOrders(userId: any): Promise<any>;
declare function processOrders(orders: any): any;
declare function fetchProducts(): Promise<any>;
