/**
 * CAU 3: this trong function thuong vs arrow function
 * Di tu don gian -> phuc tap.
 */

// ============================================================
// BUOC 0: this trong function thuong PHU THUOC VAO CACH GOI,
// KHONG phu thuoc vao noi ham duoc khai bao
// ============================================================
function whoAmI() {
  console.log(this);
}
// Cung 1 ham whoAmI, nhung goi kieu khac nhau -> this khac nhau (xem Buoc 1, 2)


// ============================================================
// BUOC 1: Goi nhu METHOD cua object -> this = object DUNG TRUOC dau cham
// ============================================================
const user = {
  name: "An",
  greet() {
    console.log(this.name); // this = user, vi goi la user.greet()
  },
};
user.greet(); // "An"


// ============================================================
// BUOC 2: Goi DUNG MOT MINH (standalone) -> this = undefined (strict/module)
// ============================================================
const greetFn = user.greet; // lay ham ra, KHONG con dinh kem voi user nua
// greetFn(); // this luc nay la undefined -> loi: Cannot read properties of undefined (reading 'name')
// -> Day la nguon goc rat nhieu bug: TACH ham method ra khoi object se LAM MAT this


// ============================================================
// BUOC 3: Bug thuc te - truyen method lam CALLBACK cung lam mat this
// (rat hay gap trong React/React Native: onPress, addEventListener, setTimeout...)
// ============================================================
class Counter {
  count = 0;

  // method thuong -> khi truyen lam callback se MAT this
  incrementBroken() {
    this.count++;
    console.log(this.count);
  }
}

const c = new Counter();
// setTimeout(c.incrementBroken, 1000);
// -> Loi! Vi setTimeout goi ham nay mot minh (standalone), khong con la c.incrementBroken()
//    nen this ben trong khong con tro toi c nua (this = undefined)

// Tuong tu trong React Native class component:
// <Button onPress={this.incrementBroken} />  -> khi nguoi dung bam, this ben trong bi mat


// ============================================================
// BUOC 4: ARROW FUNCTION - khong co this rieng, "MUON" this cua noi
// no duoc KHAI BAO (lexical this) - giong het co che cua closure
// ============================================================
class CounterFixed {
  count = 0;

  // class field arrow function -> this luon la CounterFixed instance,
  // vi arrow function lay this tu scope luc khai bao (bien trong class), khong phai luc goi
  incrementFixed = () => {
    this.count++;
    console.log(this.count);
  };
}

const c2 = new CounterFixed();
const detached = c2.incrementFixed; // tach ra khoi c2
detached(); // 1 - VAN CHAY DUNG, du goi standalone
detached(); // 2
// -> Vi incrementFixed la arrow function, this cua no da duoc "khoa" vao c2
//    tu luc khai bao, khong quan tam sau nay no duoc goi kieu gi (giong closure "ghi nho" bien)


// ============================================================
// BUOC 5: 3 CACH SUA loi mat this cua function thuong
// ============================================================
class CounterVer2 {
  count = 0;

  incrementBroken() {
    this.count++;
  }
}
const c3 = new CounterVer2();

// Cach 1: .bind() - tao ra 1 ham moi, this bi "khoa cung" vinh vien
const bound = c3.incrementBroken.bind(c3);
bound(); // OK

// Cach 2: boc trong arrow function khi truyen di
// setTimeout(() => c3.incrementBroken(), 1000); // OK, vi goi qua c3.

// Cach 3 (pho bien nhat trong React/RN hien dai): khai bao thang bang class field arrow
// function nhu Buoc 4 - khoi phai bind thu cong o moi noi


// ============================================================
// BUOC 6: call / apply / bind - CHU DONG chi dinh this
// ============================================================
function introduce(this: { name: string }, greeting: string) {
  console.log(greeting + ", toi la " + this.name);
}

const personA = { name: "Binh" };

introduce.call(personA, "Xin chao");           // call: truyen this + cac tham so RIENG LE
introduce.apply(personA, ["Xin chao"]);        // apply: truyen this + tham so dang MANG
const introduceBinh = introduce.bind(personA); // bind: tra ve HAM MOI, this bi khoa san
introduceBinh("Hello");


// ============================================================
// TOM TAT NGAN GON DE TRA LOI PHONG VAN
// ============================================================
// "this trong function thuong duoc xac dinh boi CACH GOI (object dung truoc dau cham
//  luc goi), nen rat de bi mat khi tach ham ra hoac truyen lam callback.
//  Arrow function khong co this rieng, no lay this tu scope cha luc duoc KHAI BAO
//  (lexical this), nen dung arrow function lam class field la cach pho bien de
//  tranh mat this trong React/React Native. call/apply/bind dung de CHU DONG
//  gan this cho mot function thuong."
