/**
 * CAU 3 (ES6+): Generator function la gi? Ung dung thuc te cua no.
 */

// ============================================================
// BUOC 0: GENERATOR LA GI - ham co the "TAM DUNG" GIUA CHUNG
// ============================================================
// Ham thuong CHAY TU DAU DEN CUOI KHONG NGAT QUANG. Generator function
// (khai bao voi function*) co the TAM DUNG o tu khoa "yield", TRA VE
// GIA TRI TAM THOI, roi TIEP TUC CHAY TIEP tu dung cho do khi duoc GOI LAI.

function* countUpTo(max: number) {
  for (let i = 1; i <= max; i++) {
    yield i; // TAM DUNG o day, tra ve i, CHO den lan .next() tiep theo
  }
}

const counter = countUpTo(3);
console.log(counter.next()); // { value: 1, done: false }
console.log(counter.next()); // { value: 2, done: false }
console.log(counter.next()); // { value: 3, done: false }
console.log(counter.next()); // { value: undefined, done: true }


// ============================================================
// BUOC 1: DUNG for...of DE DUYET GENERATOR TU NHIEN HON
// ============================================================
for (const num of countUpTo(3)) {
  console.log(num); // 1, 2, 3 - KHONG can tu goi .next() thu cong
}


// ============================================================
// UNG DUNG THUC TE #1: TAO ID/VALUE TANG DAN (infinite sequence) MA
// KHONG TON BO NHO LUU CA DAY SO
// ============================================================
function* infiniteId() {
  let id = 1;
  while (true) {
    yield id++; // KHONG BAO GIO tinh SAN toan bo day so - CHI TINH
    // KHI CAN, tiet kiem bo nho voi day VO HAN hoac RAT DAI
  }
}
const idGen = infiniteId();
console.log(idGen.next().value); // 1
console.log(idGen.next().value); // 2


// ============================================================
// UNG DUNG THUC TE #2: DUYET CAY/CAU TRUC DU LIEU LONG NHAU MOT CACH
// "LAZY" (chi tinh khi can, khong tinh truoc toan bo)
// ============================================================
type TreeNode = { value: number; children?: TreeNode[] };

function* traverseTree(node: TreeNode): Generator<number> {
  yield node.value;
  for (const child of node.children ?? []) {
    yield* traverseTree(child); // "yield*" UY QUYEN cho generator con
  }
}

const tree: TreeNode = {
  value: 1,
  children: [{ value: 2 }, { value: 3, children: [{ value: 4 }] }],
};
for (const v of traverseTree(tree)) {
  console.log(v); // 1, 2, 3, 4 - duyet DFS, CHI tinh tung gia tri KHI CAN
}


// ============================================================
// UNG DUNG THUC TE #3: NEN TANG cho async/await (kien thuc lich su
// huu ich khi bi hoi sau)
// ============================================================
// TRUOC KHI co async/await (ES2017), nguoi ta dung generator KET HOP 1
// "RUNNER" (vd thu vien co-js) de VIET CODE BAT DONG BO TRONG NHU DONG
// BO - generator TAM DUNG o yield MOI PROMISE, runner CHO promise do
// resolve roi MOI ".next()" tiep tuc chay. async/await NGAY NAY thuc
// chat la "DUONG" (syntactic sugar) CHO CHINH CO CHE nay, duoc TICH HOP
// SAN vao JS engine.


// ============================================================
// TOM TAT NGAN GON DE TRA LOI PHONG VAN
// ============================================================
// "Generator function (function*) la ham co the TAM DUNG giua chung
// bang yield, tra ve gia tri tam thoi, va TIEP TUC chay tiep khi duoc
// goi .next() lan sau. Ung dung thuc te: tao sequence vo han/rat dai ma
// khong can tinh san toan bo (tiet kiem bo nho), duyet cau truc du lieu
// lazy (chi tinh khi can, vd duyet cay), va ve mat lich su, generator
// chinh la nen tang ma async/await duoc xay dung tren do truoc khi
// duoc dua thang vao JS engine nhu 1 cu phap rieng."
