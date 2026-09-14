/**
 * CAU 4 (TypeScript): Type narrowing la gi? TypeScript suy luan kieu
 * qua typeof/in/instanceof ra sao.
 */

// ============================================================
// BUOC 0: TYPE NARROWING LA GI
// ============================================================
// Narrowing la qua trinh TypeScript TU THU HEP 1 KIEU RONG (vd union
// nhieu kha nang) XUONG 1 KIEU CU THE HON, DUA TREN CAC DIEU KIEN
// (if, typeof, instanceof...) ban VIET TRONG CODE - TypeScript "DOC
// HIEU" logic re nhanh cua ban de BIET CHINH XAC kieu nao dang duoc xu
// ly O TUNG NHANH.


// ============================================================
// BUOC 1: typeof - narrowing cho PRIMITIVE TYPE
// ============================================================
function printId(id: string | number) {
  if (typeof id === "string") {
    console.log(id.toUpperCase()); // TypeScript BIET "id" la string O
    // DAY, cho phep goi ham cua string (toUpperCase) MA KHONG BAO LOI
  } else {
    console.log(id.toFixed(2)); // O NHANH ELSE, TypeScript TU SUY RA
    // "id" CHI CON THE LA number (da loai truong hop string) - cho
    // phep goi toFixed cua number
  }
}


// ============================================================
// BUOC 2: instanceof - narrowing cho CLASS INSTANCE
// ============================================================
class ApiError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
  }
}

function handleError(error: Error | ApiError) {
  if (error instanceof ApiError) {
    console.log(error.statusCode); // TypeScript BIET day la ApiError,
    // cho phep truy cap "statusCode" (thuoc tinh CHI CO tren ApiError,
    // KHONG CO tren Error thuong)
  } else {
    console.log(error.message); // con lai la Error thuong
  }
}


// ============================================================
// BUOC 3: "in" - narrowing DUA TREN SU TON TAI cua 1 THUOC TINH
// (huu ich khi CAC KHA NANG KHONG PHAI class, chi la object shape)
// ============================================================
type Cat = { meow: () => void };
type Dog = { bark: () => void };

function makeSound(animal: Cat | Dog) {
  if ("meow" in animal) {
    animal.meow(); // TypeScript BIET day la Cat (co thuoc tinh "meow")
  } else {
    animal.bark(); // con lai la Dog
  }
}


// ============================================================
// BUOC 4: DISCRIMINATED UNION - CACH NARROWING MANH VA PHO BIEN NHAT
// TRONG THUC TE (dung 1 truong "type"/"status" CHUNG lam "co so")
// ============================================================
type RequestState =
  | { status: "loading" }
  | { status: "success"; data: string }
  | { status: "error"; message: string };

function renderState(state: RequestState) {
  switch (state.status) {
    case "loading":
      return "Dang tai...";
    case "success":
      return state.data; // TypeScript BIET CHAC CHAN co "data" O DAY,
      // vi CHI nhanh "success" moi co truong nay trong union
    case "error":
      return state.message; // tuong tu, chi nhanh "error" moi co "message"
  }
}
// -> Day la LY DO discriminated union RAT PHO BIEN de mo ta trang thai
//    API/Redux state - TypeScript BAT LOI NGAY neu quen 1 nhanh (vd
//    switch thieu case "error" - voi cau hinh strict, TypeScript co the
//    canh bao "not all code paths return a value")


// ============================================================
// BUOC 5: CUSTOM TYPE GUARD - TU VIET HAM NARROWING RIENG
// ============================================================
function isApiError(error: unknown): error is ApiError {
  // "error is ApiError" la 1 "TYPE PREDICATE" - bao TypeScript RANG neu
  // ham nay tra ve true, hay COI "error" la kieu ApiError tu do tro di
  return error instanceof ApiError;
}

function handleUnknownError(error: unknown) {
  if (isApiError(error)) {
    console.log(error.statusCode); // TypeScript TIN vao type guard,
    // cho phep truy cap statusCode ngay ca khi tham so goc la "unknown"
  }
}


// ============================================================
// TOM TAT NGAN GON DE TRA LOI PHONG VAN
// ============================================================
// "Narrowing la qua trinh TypeScript tu thu hep 1 kieu rong (thuong la
// union) xuong kieu cu the hon dua tren dieu kien trong code. typeof
// dung de narrow cac primitive type (string/number/boolean), instanceof
// dung de narrow class instance, va 'in' dung de narrow dua tren su ton
// tai cua 1 thuoc tinh khi cac kha nang khong phai class ma chi la
// object shape. Cach narrowing manh va pho bien nhat trong thuc te la
// discriminated union - dung 1 truong chung (vd status) lam 'co so' de
// switch/if, TypeScript tu biet chinh xac cac truong con lai co ton tai
// hay khong o tung nhanh. Khi logic phuc tap hon, minh viet custom type
// guard bang cu phap 'x is Type' de tu dinh nghia dieu kien narrowing rieng."
