/**
 * CAU 3 (Prototype & OOP): So sanh ke thua qua "class extends" va
 * "Object.create".
 */

// ============================================================
// CACH 1: class extends - CAP DO CAO (declarative), TU DONG THIET LAP
// CA CHAIN LAN CONSTRUCTOR
// ============================================================
class Animal {
  constructor(public name: string) {}
  speak() {
    return `${this.name} keu`;
  }
}

class Dog extends Animal {
  constructor(name: string, public breed: string) {
    super(name); // GOI CONSTRUCTOR CUA CHA - BAT BUOC phai goi TRUOC
    // KHI dung "this" trong constructor con
  }
  speak() {
    return `${super.speak()} - gau gau!`; // super.method() GOI DUOC
    // METHOD CUA CHA, ket hop THEM logic rieng
  }
}

const dog = new Dog("Lu", "Poodle");
console.log(dog.speak()); // "Lu keu - gau gau!"

// class extends TU DONG LAM HO:
//   - Dog.prototype.[[Prototype]] = Animal.prototype (thiet lap CHAIN)
//   - super(name) TU DONG goi constructor cha VOI DUNG "this" cua instance
//   - super.speak() TU DONG tim dung method tren prototype CUA CHA


// ============================================================
// CACH 2: Object.create(proto) - CAP DO THAP (low-level), CHI TAO
// OBJECT VOI PROTOTYPE CHỈ ĐỊNH, KHONG CO GI TU DONG THEM
// ============================================================
const animalProto = {
  speak(this: { name: string }) {
    return `${this.name} keu`;
  },
};

const catProto = Object.create(animalProto); // catProto.[[Prototype]] = animalProto
catProto.meow = function (this: { name: string }) {
  return `${this.name}: Meo!`;
};

const cat = Object.create(catProto); // cat.[[Prototype]] = catProto
cat.name = "Mimi";

console.log(cat.speak()); // "Mimi keu" - DI LEN chain toi animalProto
console.log(cat.meow()); // "Mimi: Meo!" - tim thay o catProto

// Object.create KHONG CO:
//   - KHONG CO "super" - neu muon GOI METHOD CUA "CHA" tu method con,
//     phai tu VIET: animalProto.speak.call(this) THU CONG
//   - KHONG CO constructor TU DONG chay - phai TU GAN thuoc tinh (nhu
//     "cat.name = 'Mimi'" o tren) SAU KHI tao object, khong co buoc
//     "khoi tao" tap trung nhu constructor


// ============================================================
// BANG SO SANH
// ============================================================
//                  | class extends              | Object.create
// -------------------------------------------------------------------
// Muc do            | Cao (declarative, de doc)  | Thap (thao tac
//                    |                            | prototype truc tiep)
// Thiet lap chain    | TU DONG                    | THU CONG (truyen
//                    |                            | proto vao tham so)
// Goi "ham cha"      | super() / super.method()   | Tu goi .call()/.apply()
// Khoi tao du lieu   | constructor tap trung      | Gan thuoc tinh
//                    |                            | rieng le sau khi tao
// Phu hop nhat khi   | OOP CO CAU TRUC RO RANG,   | Ke thua tu 1 OBJECT
//                    | nhieu tang ke thua co to   | LITERAL don gian
//                    | chuc (Component, Model...) | (khong phai tu 1
//                    |                            | "class"/constructor),
//                    |                            | hoac can prototype
//                    |                            | LINH HOAT, TAO DONG


// ============================================================
// KHI NAO CHON CAI NAO
// ============================================================
// - class extends: khi xay dung HE THONG OOP CO CAU TRUC RO RANG (vd
//   BaseComponent -> Screen -> ProfileScreen), can constructor param,
//   super() de tai su dung logic khoi tao cua cha
// - Object.create: khi CAN 1 OBJECT ke thua TRUC TIEP tu 1 OBJECT
//   LITERAL co san (khong phai class), hoac can TAO PROTOTYPE MOT CACH
//   DONG/LINH HOAT LUC CHAY (runtime) MA KHONG CAN dinh nghia class co dinh


// ============================================================
// TOM TAT NGAN GON DE TRA LOI PHONG VAN
// ============================================================
// "class extends la cach ke thua CAP CAO, TU DONG thiet lap prototype
// chain va cho phep dung super() de goi constructor/method cua lop cha
// mot cach tien loi. Object.create la cach lam CAP THAP hon - chi tao 1
// object voi [[Prototype]] duoc chi dinh truc tiep, KHONG co super,
// KHONG co constructor tu dong, phai tu gan thuoc tinh va tu goi
// .call()/.apply() neu muon tai su dung logic cua 'object cha'. Minh
// dung class extends cho he thong OOP co cau truc ro rang nhieu tang,
// va dung Object.create khi can ke thua truc tiep tu 1 object literal
// co san hoac can thiet lap prototype mot cach linh hoat luc runtime."
