/**
 * CAU 4 (Functional Programming): reduce co the thay the map/filter
 * khong? Cho vi du.
 */

// ============================================================
// TRA LOI THANG: CO, VI reduce LA TONG QUAT NHAT trong 3 ham nay
// ============================================================
// map va filter DEU CO THE VIET LAI BANG reduce, vi ca 2 deu la 1
// TRUONG HOP DAC BIET cua "duyet qua tung phan tu VA TICH LUY ket qua" -
// day CHINH LA dinh nghia cua reduce.

const numbers = [1, 2, 3, 4, 5];


// ============================================================
// VI DU 1: reduce THAY THE map
// ============================================================
// map thuong:
const doubled1 = numbers.map((n) => n * 2); // [2, 4, 6, 8, 10]

// VIET LAI bang reduce:
const doubled2 = numbers.reduce((acc: number[], n) => {
  acc.push(n * 2); // (luu y: push mutate "acc" - van chap nhan duoc vi
  // "acc" la BIEN TAM THOI ben trong reduce, khong phai state ben ngoai)
  return acc;
}, []); // [] la GIA TRI KHOI TAO cua "acc"


// ============================================================
// VI DU 2: reduce THAY THE filter
// ============================================================
// filter thuong:
const evens1 = numbers.filter((n) => n % 2 === 0); // [2, 4]

// VIET LAI bang reduce:
const evens2 = numbers.reduce((acc: number[], n) => {
  if (n % 2 === 0) acc.push(n);
  return acc;
}, []);


// ============================================================
// VI DU 3: reduce lam duoc VIEC MA map/filter RIENG LE KHONG LAM DUOC
// TRONG 1 LAN DUYET - filter + map CUNG LUC (toi uu hieu nang)
// ============================================================
// CACH THUONG (duyet MANG 2 LAN: 1 lan filter, 1 lan map):
const result1 = numbers.filter((n) => n % 2 === 0).map((n) => n * 10);
// [20, 40] - nhung PHAI DUYET MANG 2 LAN (filter tao 1 mang trung
// gian, roi map duyet TIEP mang do)

// TOI UU BANG reduce (CHI DUYET MANG 1 LAN DUY NHAT):
const result2 = numbers.reduce((acc: number[], n) => {
  if (n % 2 === 0) acc.push(n * 10); // VUA loc VUA bien doi TRONG CUNG
  // 1 LAN DUYET, khong tao mang trung gian
  return acc;
}, []);
// -> QUAN TRONG voi mang RAT LON (hang tram nghin phan tu) - giam so
//    lan duyet mang tu 2 xuong 1


// ============================================================
// VI DU 4: reduce lam duoc VIEC MA map/filter KHONG BAO GIO lam duoc -
// TINH RA 1 GIA TRI DUY NHAT (khong phai mang moi)
// ============================================================
// Tong cac so:
const total = numbers.reduce((sum, n) => sum + n, 0); // 15

// Dem so lan xuat hien (object, khong phai mang):
const words = ["ao", "so mi", "ao", "quan", "ao"];
const wordCount = words.reduce((acc: Record<string, number>, word) => {
  acc[word] = (acc[word] ?? 0) + 1;
  return acc;
}, {});
// { "ao": 3, "so mi": 1, "quan": 1 }
// -> map/filter LUON tra ve MANG (cung do dai hoac it hon), KHONG THE
//    tao ra 1 GIA TRI DON hay 1 OBJECT nhu the nay


// ============================================================
// KHI NAO VAN NEN DUNG map/filter RIENG (KHONG NEN LAM DUNG reduce)
// ============================================================
// Du reduce LAM DUOC MOI THU, KHONG CO NGHIA NEN dung reduce cho MOI
// TRUONG HOP - voi 1 phep bien doi DON GIAN (chi map HOAC chi filter),
// dung map()/filter() RIENG DE DOC HON, VI TEN HAM da NOI RO Y DINH
// ("map" = bien doi tung phan tu, "filter" = loc) - reduce cho 1 VIEC
// don gian se lam nguoi doc PHAI DOC KY THAN HAM moi hieu no dang lam gi.


// ============================================================
// TOM TAT NGAN GON DE TRA LOI PHONG VAN
// ============================================================
// "Co, vi map va filter deu la truong hop dac biet cua 'duyet qua tung
// phan tu va tich luy ket qua' - dung la dinh nghia cua reduce. reduce
// con lam duoc nhieu hon: ket hop filter+map trong 1 lan duyet duy nhat
// de toi uu hieu nang voi mang lon, hoac tinh ra 1 gia tri/object duy
// nhat (tong, dem so lan xuat hien) ma map/filter khong lam duoc vi
// chung luon tra ve mang. Tuy nhien voi phep bien doi don gian, minh
// van uu tien dung map/filter rieng de code de doc hon, vi ten ham da
// the hien ro y dinh, chi dung reduce khi that su can gop nhieu buoc
// hoac tra ve 1 gia tri khac cau truc mang."
