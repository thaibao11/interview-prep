/**
 * CAU 3 (Memory & Performance): WeakMap/WeakSet khac Map/Set the nao
 * va khi nao nen dung.
 */

// ============================================================
// BUOC 0: KHAC BIET COT LOI - "WEAK" (THAM CHIEU YEU) NGHIA LA GI
// ============================================================
// Map/Set: khi dung 1 OBJECT lam key/value, chung TAO 1 THAM CHIEU
// MANH (strong reference) - DU KHONG CON AI KHAC THAM CHIEU TOI OBJECT
// DO NUA, Map/Set VAN GIU NO SONG, GC KHONG THE don dep, GAY MEMORY LEAK
// NEU quen xoa key/value do khoi Map/Set.
//
// WeakMap/WeakSet: TAO THAM CHIEU YEU (weak reference) - NEU KHONG CON
// AI KHAC (ngoai WeakMap/WeakSet) tham chieu toi object do, GC CO THE
// TU DO don dep object do BINH THUONG, VA entry tuong ung trong
// WeakMap/WeakSet TU DONG BIEN MAT theo, KHONG CAN xoa thu cong.


// ============================================================
// BUOC 1: SO SANH TRUC TIEP
// ============================================================
const strongMap = new Map<object, string>();
const weakMap = new WeakMap<object, string>();

let obj: { id: number } | null = { id: 1 };
strongMap.set(obj, "du lieu A");
weakMap.set(obj, "du lieu B");

obj = null; // XOA tham chieu DUY NHAT tu ben ngoai toi object nay

// -> strongMap VAN GIU entry nay MAI MAI (memory leak neu quen
//    strongMap.delete(...) thu cong)
// -> weakMap: object KHONG CON duoc ai tham chieu (ngoai weakMap) -> GC
//    CO THE thu don no, entry trong weakMap TU DONG "BIEN MAT" theo


// ============================================================
// BUOC 2: GIOI HAN CO CHU DICH cua WeakMap/WeakSet
// ============================================================
// - KEY (voi WeakMap) HOAC PHAN TU (voi WeakSet) BAT BUOC phai la
//   OBJECT, KHONG duoc la primitive (string, number...) - vi "weak
//   reference" chi co y nghia voi object (primitive KHONG bi GC theo
//   kieu tham chieu)
// - KHONG THE duyet (iterate) - khong co .keys(), .values(), .forEach(),
//   khong co thuoc tinh .size - VI noi dung co the "BIEN MAT" bat cu
//   luc nao (khi GC chay), NEU cho duyet duoc SE KHONG THE DAM BAO KET
//   QUA ON DINH giua 2 lan duyet


// ============================================================
// BUOC 3: KHI NAO NEN DUNG WeakMap/WeakSet
// ============================================================
// Dung khi CAN GAN "SIEU DU LIEU" (metadata) VAO 1 OBJECT MA KHONG
// MUON NGAN CAN object do bi GC khi khong con dung nua o noi khac -
// VI DU THUC TE:
//
// 1. CACHE ket qua tinh toan GAN VOI 1 OBJECT CU THE (khong phai key
//    dang string/number):
const computeCache = new WeakMap<object, number>();
function expensiveComputation(inputObj: object): number {
  if (computeCache.has(inputObj)) {
    return computeCache.get(inputObj)!;
  }
  const result = /* tinh toan nang */ 42;
  computeCache.set(inputObj, result);
  return result;
  // -> Neu "inputObj" sau nay KHONG CON DUOC DUNG O DAU KHAC, no se bi
  //    GC BINH THUONG, VA cache tuong ung trong computeCache TU DONG
  //    "don dep" theo - KHONG BAO GIO gay leak du minh KHONG BAO GIO tu
  //    tay xoa cache
}

// 2. Danh dau "DA XU LY" cho 1 tap hop object TAM THOI (WeakSet), vi
//    du tranh xu ly TRUNG LAP 1 node trong qua trinh duyet cay/graph,
//    ma KHONG CAN lo don dep tap hop nay sau khi xong


// ============================================================
// TOM TAT NGAN GON DE TRA LOI PHONG VAN
// ============================================================
// "Map/Set giu tham chieu manh toi object key/value, nen neu quen xoa,
// object do KHONG BAO GIO duoc GC, gay memory leak. WeakMap/WeakSet giu
// tham chieu yeu - neu khong con ai khac tham chieu toi object do, GC
// tu do thu don, va entry trong WeakMap/WeakSet tu dong bien mat theo,
// khong can xoa thu cong. Doi lai, WeakMap/WeakSet bat buoc key/phan tu
// phai la object, va khong the duyet duoc (khong co keys/values/size)
// vi noi dung co the bien mat bat ky luc nao. Minh dung WeakMap/WeakSet
// khi can gan metadata/cache vao 1 object ma khong muon ngan object do
// bi don rac khi noi khac khong con dung den no nua."
