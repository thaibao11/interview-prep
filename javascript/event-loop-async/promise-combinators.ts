/**
 * CAU 3 (Event loop & Bat dong bo): Promise.all, Promise.allSettled,
 * Promise.race, Promise.any khac nhau the nao.
 */

// ============================================================
// Promise.all - CHO TAT CA xong, THAT BAI NGAY khi CO 1 CAI LOI
// ============================================================
// Tra ve 1 mang KET QUA (theo DUNG THU TU dau vao) khi TAT CA promise
// deu THANH CONG. Neu CHI 1 promise reject, Promise.all REJECT NGAY
// LAP TUC (khong doi cac promise con lai), mat het ket qua cua nhung
// promise DA thanh cong truoc do.
async function example1() {
  try {
    const [user, orders] = await Promise.all([fetchUser(), fetchOrders()]);
  } catch (err) {
    // CHI 1 trong 2 that bai la vao day, KHONG BIET cai nao thanh cong
  }
}
// -> Dung khi: CAN CA 2 KET QUA moi lam duoc viec tiep theo (vd can ca
//    user va orders moi render duoc man hinh), va NEU 1 CAI LOI thi
//    CA MAN HINH nen bao loi luon


// ============================================================
// Promise.allSettled - CHO TAT CA xong, KHONG BAO GIO reject
// ============================================================
// LUON tra ve mang KET QUA cho MOI promise, moi phan tu la
// { status: "fulfilled", value } hoac { status: "rejected", reason } -
// KHONG QUAN TAM co bao nhieu cai that bai, LUON doi HET va TRA VE DU.
async function example2() {
  const results = await Promise.allSettled([fetchUser(), fetchOrders()]);
  results.forEach((r) => {
    if (r.status === "fulfilled") console.log(r.value);
    else console.log("loi:", r.reason);
  });
}
// -> Dung khi: cac tac vu DOC LAP nhau, muon BIET KET QUA CUA TUNG CAI
//    (vd goi 5 API khac nhau de hien 5 widget tren dashboard - 1 widget
//    loi KHONG NEN lam ca man hinh trang)


// ============================================================
// Promise.race - AI XONG TRUOC (thanh cong HAY THAT BAI) THANG
// ============================================================
// Tra ve/reject NGAY theo promise NAO HOAN THANH DAU TIEN (bat ke thanh
// cong hay that bai), BO QUA cac promise con lai (chung VAN CHAY NGAM,
// chi la KET QUA cua chung KHONG duoc dung nua).
async function example3() {
  try {
    const result = await Promise.race([
      fetchData(),
      new Promise((_, reject) => setTimeout(() => reject("Timeout!"), 5000)),
    ]);
  } catch (err) {
    // vao day neu fetchData() CHAY QUA 5 GIAY (bi "race" boi timeout)
  }
}
// -> Dung KINH DIEN NHAT: IMPLEMENT TIMEOUT cho 1 request (neu API cham
//    qua 5s, "thua cuoc" truoc 1 promise reject sau 5s)


// ============================================================
// Promise.any - AI THANH CONG TRUOC (bo qua that bai) THANG
// ============================================================
// Tra ve KET QUA cua promise DAU TIEN THANH CONG. CHI reject (voi
// AggregateError) khi TAT CA promise DEU that bai. Khac Promise.race o
// cho: race NGA NGAY neu cai DAU TIEN hoan thanh la that bai, con any
// SE BO QUA that bai do va CHO cai KHAC thanh cong.
async function example4() {
  try {
    const result = await Promise.any([
      fetchFromServerA(), // co the loi (server A dang bao tri)
      fetchFromServerB(), // van co the thanh cong
    ]);
  } catch (err) {
    // CHI vao day neu CA A LAN B DEU that bai
  }
}
// -> Dung khi: co NHIEU NGUON DU PHONG (fallback servers/CDN), chi can
//    1 TRONG SO DO thanh cong la du, khong quan tam nguon nao


// ============================================================
// BANG TOM TAT
// ============================================================
//                  | Cho het hay dung som | Reject khi nao
// Promise.all       | Dung som neu co loi  | 1 cai loi la reject ngay
// Promise.allSettled| Cho HET moi promise  | KHONG BAO GIO reject
// Promise.race      | Dung som (ai xong truoc)| Cai DAU TIEN hoan thanh la loi
// Promise.any       | Dung som (ai thanh cong truoc)| CA HET deu loi moi reject


// ============================================================
// TOM TAT NGAN GON DE TRA LOI PHONG VAN
// ============================================================
// "Promise.all cho tat ca thanh cong moi tra ve, nhung reject ngay neu
// co 1 cai loi. Promise.allSettled luon cho het va tra ve ket qua cua
// TUNG promise (ca loi lan thanh cong), khong bao gio tu reject - dung
// khi can biet ket qua rieng cua tung tac vu doc lap. Promise.race tra
// ve/reject theo promise NAO XONG TRUOC (bat ke thanh cong hay loi) -
// dung pho bien nhat de implement timeout. Promise.any tra ve promise
// DAU TIEN THANH CONG, bo qua that bai, chi reject khi TAT CA deu loi -
// dung khi co nhieu nguon du phong chi can 1 cai thanh cong."

declare function fetchUser(): Promise<any>;
declare function fetchOrders(): Promise<any>;
declare function fetchData(): Promise<any>;
declare function fetchFromServerA(): Promise<any>;
declare function fetchFromServerB(): Promise<any>;
