/**
 * CAU 1 (ES6+): Optional chaining (?.) va nullish coalescing (??)
 * giai quyet van de gi so voi || ?
 */

// ============================================================
// OPTIONAL CHAINING (?.) - GIAI QUYET VAN DE GI
// ============================================================
// TRUOC DAY, muon doc 1 thuoc tinh SAU trong object CO THE null/undefined
// o giua duong, phai kiem tra TUNG CAP:
const user1 = { address: { city: "Ha Noi" } };

// CACH CU (dai dong, de sot):
const city1 = user1 && user1.address && user1.address.city;

// CACH MOI voi ?. (NGAN GON, TU DONG dung lai VA tra ve undefined ngay
// khi GAP null/undefined o BAT KY nac nao trong chuoi):
const city2 = user1?.address?.city;
const zip = user1?.address?.zipCode?.trim(); // AN TOAN du zipCode co the undefined

// Cung dung duoc cho GOI HAM (khong chac ham co ton tai khong) va MANG:
const result = user1?.getFullAddress?.(); // chi GOI neu getFullAddress TON TAI
const first = user1?.tags?.[0]; // truy cap phan tu mang an toan


// ============================================================
// NULLISH COALESCING (??) - GIAI QUYET VAN DE GI SO VOI ||
// ============================================================
// || TRA VE toan hang PHAI neu toan hang TRAI la "FALSY" - nhung
// FALSY bao gom CA 0, "", false, KHONG CHI null/undefined - day la
// NGUON GOC BUG PHO BIEN:
const count1 = 0;
const displayCount1 = count1 || 10; // KET QUA: 10 -> SAI! muon giu 0
// nhung || coi 0 la falsy nen thay bang 10

const displayCount2 = count1 ?? 10; // KET QUA: 0 -> DUNG, vi ?? CHI
// thay the khi gia tri la null HOAC undefined, KHONG QUAN TAM 0/""/false

// Vi du khac hay gap - form input:
const isEnabled = false;
const setting1 = isEnabled || true; // SAI: luon ra true, mat gia tri false that
const setting2 = isEnabled ?? true; // DUNG: giu nguyen false, vi false
// KHONG PHAI null/undefined


// ============================================================
// BANG SO SANH NGAN GON
// ============================================================
//        | Thay the khi nao          | Vi du bug neu dung SAI cong cu
// ||      | Gia tri FALSY (0,"",false,| count || 10 -> mat gia tri 0
//         | null, undefined, NaN)     | that (hien 10 thay vi 0)
// ??      | CHI null/undefined        | An toan voi 0/""/false


// ============================================================
// TOM TAT NGAN GON DE TRA LOI PHONG VAN
// ============================================================
// "Optional chaining (?.) giai quyet viec phai kiem tra thu cong TUNG
// CAP object co the null/undefined truoc khi truy cap thuoc tinh sau -
// tu dong dung lai va tra ve undefined ngay khi gap null/undefined o
// bat ky nac nao, thay vi phai viet chuoi && dai dong. Nullish
// coalescing (??) giai quyet dung diem yeu cua || : || coi MOI GIA TRI
// FALSY (ke ca 0, '', false) la 'khong co gia tri' nen thay the nham,
// con ?? CHI thay the khi gia tri that su la null hoac undefined - an
// toan voi cac gia tri hop le nhu 0 hay false."
