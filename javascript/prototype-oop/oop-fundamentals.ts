/**
 * DOC FILE NAY TRUOC TIEN - truoc ca prototype-chain.ts va cac file
 * khac trong thu muc nay. Noi ve KHAI NIEM GOC: OOP la gi, khi nao
 * dung, tai sao dung, va 4 TRU COT cua no ap dung vao JS the nao.
 */

// ============================================================
// BUOC 0: OOP LA GI
// ============================================================
// OOP (Object-Oriented Programming - lap trinh huong doi tuong) la 1
// TRIET LY TO CHUC CODE: thay vi viet CAC HAM RIENG LE xu ly DU LIEU
// RIENG LE, OOP GOM CHUNG "DU LIEU" (properties/state) VA "HANH VI"
// (methods/behavior) LIEN QUAN TOI NHAU VAO CHUNG 1 DON VI GOI LA
// "OBJECT" - MO PHONG cach 1 THUC THE THAT (User, Product, Order,
// Camera...) VUA CO THONG TIN, VUA CO THE "LAM" MOT VIEC GI DO.

class BankAccount {
  private balance: number = 0; // DU LIEU (state) - GOM CHUNG voi hanh vi

  deposit(amount: number) {
    // HANH VI (method) - THAO TAC TRUC TIEP tren DU LIEU cua CHINH NO
    this.balance += amount;
  }

  getBalance() {
    return this.balance;
  }
}
// -> "BankAccount" la 1 DON VI DUY NHAT, KHONG TACH RIENG "balance"
//    (bien) va "deposit" (ham xu ly bien do o dau khac) nhu cach viet
//    THU TUC (procedural) truyen thong


// ============================================================
// BUOC 1: KHI NAO NEN DUNG OOP, TAI SAO
// ============================================================
// NEN dung OOP khi:
//   1. DOMAIN (nghiep vu) TU NHIEN co the mo hinh hoa THANH CAC THUC
//      THE RO RANG co CA trang thai LAN hanh vi (vd User co ten/email
//      VA co the login()/logout(); Order co danh sach san pham VA co
//      the calculateTotal())
//   2. CAN QUAN LY TRANG THAI NOI BO PHUC TAP, muon "AN" (encapsulate)
//      trang thai do, CHI cho phep SUA DOI qua cac METHOD DUOC KIEM
//      SOAT (tranh code ben ngoai TU Y sua bien noi bo sai cach)
//   3. CAN MO HINH HOA QUAN HE PHAN CAP/KE THUA RO RANG (vd nhieu loai
//      Native Module deu co chung 1 so hanh vi co ban, chi khac 1 vai
//      diem - dung ke thua de TAI SU DUNG code chung)
//   4. NHOM LAM VIEC LON, can HOP DONG (interface/contract) RO RANG
//      giua cac phan cua he thong


// ============================================================
// BUOC 2: KHI NAO KHONG NEN/CAN NHAC DUNG FUNCTIONAL THAY THE
// ============================================================
// OOP KHONG PHAI LUON LA LUA CHON TOT NHAT:
//   - Voi CAC PHEP BIEN DOI DU LIEU DON GIAN (vd loc/sap xep/tinh toan
//     tu 1 mang), FUNCTIONAL PROGRAMMING (pure function, map/filter/
//     reduce - da hoc o functional-programming/) THUONG GON VA DE TEST
//     HON, vi KHONG CAN TAO INSTANCE/QUAN LY STATE GI CA
//   - "COMPOSITION OVER INHERITANCE" (uu tien KET HOP hon KE THUA) LA
//     1 NGUYEN LY RAT DUOC UA CHUONG trong JS/React hien dai: THAY VI
//     xay 1 CHUOI KE THUA SAU (class A extends B extends C...) - RAT
//     DE GAY "FRAGILE BASE CLASS" (sua class cha lam VO Y anh huong
//     TAT CA class con), nguoi ta uu tien GHEP NHIEU HANH VI NHO LAI
//     VOI NHAU (composition)
//   - VI DU RO NHAT: chinh REACT da CHUYEN TU class component (OOP,
//     ke thua tu React.Component) SANG function component + HOOKS
//     (functional, composition) - VI hooks (useXxx) DE KET HOP/TAI SU
//     DUNG LOGIC giua cac component KHONG LIEN QUAN VE MAT KE THUA hon
//     nhieu so voi Higher-Order Component/mixin kieu OOP truoc day


// ============================================================
// BUOC 3: 4 TRU COT CUA OOP - AP DUNG VAO JS/TYPESCRIPT
// ============================================================

// --- 1. ENCAPSULATION (dong goi) - GOM DU LIEU + HANH VI, AN CHI TIET
// NOI BO, CHI CHO SUA QUA METHOD DUOC KIEM SOAT ---
class Counter {
  #count = 0; // PRIVATE FIELD (cu phap # cua ES2022) - KHONG THE truy
  // cap TU BEN NGOAI class, kien code (ngay ca lop con extends) khong
  // vo tinh sua sai

  increment() {
    this.#count++;
  }
  getValue() {
    return this.#count;
  }
}
const counter = new Counter();
counter.increment();
// counter.#count = 100; // LOI BIEN DICH - #count KHONG THE truy cap
// tu ben ngoai
// -> LIEN HE: day CHINH LA MUC DICH ma closure (Cau 2 - scope-hoisting-
//    closures/closure.ts) tung dung de mo phong "private state" TRUOC
//    KHI JS co cu phap # chinh thuc

// --- 2. INHERITANCE (ke thua) - TAI SU DUNG code TU 1 lop CHUNG ---
class Shape {
  area(): number {
    return 0;
  }
}
class Circle extends Shape {
  constructor(private radius: number) {
    super();
  }
  area(): number {
    return Math.PI * this.radius ** 2;
  }
}
// -> Circle TAI SU DUNG cau truc cua Shape, chi GHI DE (override)
//    method "area" cho DUNG voi hinh tron

// --- 3. POLYMORPHISM (da hinh) - CUNG 1 TEN METHOD, HANH VI KHAC NHAU
// TUY THEO OBJECT THUC SU LA GI ---
class Rectangle extends Shape {
  constructor(private width: number, private height: number) {
    super();
  }
  area(): number {
    return this.width * this.height;
  }
}

function printArea(shape: Shape) {
  // GOI CUNG 1 TEN METHOD "area()", nhung KET QUA THUC THI KHAC NHAU
  // TUY "shape" THUC SU LA Circle hay Rectangle - day la DA HINH
  console.log(shape.area());
}
printArea(new Circle(5)); // dung cong thuc hinh tron
printArea(new Rectangle(4, 6)); // dung cong thuc hinh chu nhat

// --- 4. ABSTRACTION (truu tuong hoa) - CHI LO PHAN "LAM GI", GIAU DI
// PHAN "LAM NHU THE NAO" ---
abstract class PaymentProcessor {
  abstract charge(amount: number): Promise<void>; // CHI khai bao "CO
  // HAM NAY", KHONG noi CU THE lam sao thuc hien - lop con PHAI tu
  // hien thuc chi tiet
}
class StripeProcessor extends PaymentProcessor {
  async charge(amount: number) {
    // chi tiet goi API Stripe THAT SU nam o day, nguoi DUNG
    // PaymentProcessor KHONG CAN BIET/QUAN TAM
  }
}
// -> Code GOI charge() CHI CAN BIET "co ham charge(amount)", KHONG CAN
//    biet BEN TRONG dang goi Stripe hay 1 cong thanh toan khac


// ============================================================
// BUOC 4: JS LA "PROTOTYPE-BASED OOP" - KHAC OOP "CLASS-BASED"
// TRUYEN THONG (Java/C++) O DIEM COT LOI NAO
// ============================================================
// Cac ngon ngu OOP CO DIEN (Java, C++) BAT BUOC PHAI CO "class" (1 BAN
// THIET KE/BLUEPRINT) DUOC DINH NGHIA TRUOC, roi MOI "new" ra instance
// TU class do - KHONG CO class thi KHONG THE tao object.
//
// JS (KE CA TRUOC KHI co tu khoa "class" o ES6) CHO PHEP 1 OBJECT KE
// THUA TRUC TIEP TU 1 OBJECT KHAC (qua Object.create - da hoc o
// class-extends-vs-object-create.ts), KHONG CAN THONG QUA 1 "BAN THIET
// KE" NAO CA - day GOI LA "PROTOTYPAL INHERITANCE" (ke thua nguyen
// mau), khac han TRIET LY "CLASS-BASED" cua Java/C++.
//
// "class" trong JS (ES6) CHI LA LOP VO cu phap (Cau 2 - class-syntactic-
// sugar.ts) GIUP JS "TRONG GIONG" cac ngon ngu class-based quen thuoc,
// nhung BEN DUOI VAN LA CO CHE PROTOTYPE nguyen ban.


// ============================================================
// TOM TAT NGAN GON DE TRA LOI PHONG VAN
// ============================================================
// "OOP la triet ly to chuc code bang cach gom du lieu va hanh vi lien
// quan vao chung 1 object, mo phong cac thuc the thuc te. Minh dung OOP
// khi domain co the mo hinh hoa ro rang thanh cac thuc the co trang
// thai + hanh vi, can dong goi/an trang thai noi bo, hoac can mo hinh
// hoa quan he ke thua. Voi cac phep bien doi du lieu don gian, minh uu
// tien functional programming hon vi gon va de test hon - va day cung
// la ly do React chuyen tu class component sang hooks, vi 'composition
// over inheritance' de tai su dung logic hon la ke thua sau nhieu tang.
// 4 tru cot cua OOP: encapsulation (dong goi, vd private field #count),
// inheritance (ke thua qua extends), polymorphism (cung 1 method
// area(), hanh vi khac nhau tuy Circle hay Rectangle), va abstraction
// (khai bao 'co ham gi' qua abstract class, giau chi tiet 'lam nhu the
// nao'). Diem dac biet cua JS la prototype-based OOP - object co the ke
// thua truc tiep tu object khac ma khong can 'class' lam ban thiet ke
// truoc, khac han class-based OOP co dien cua Java/C++; tu khoa class
// trong JS chi la lop vo cu phap cho co che prototype ben duoi."
