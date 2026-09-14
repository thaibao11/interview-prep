/**
 * ON TAP JAVASCRIPT - REACT NATIVE SENIOR INTERVIEW
 * File ghi lai vi du chi tiet cho tung cau hoi da luyen tap.
 */

// ============================================================
// CAU 1: var vs let vs const (scope, hoisting, reassignment)
// ============================================================

// 1. Reassignment
var a = 1;
a = 2; // OK

let b = 1;
b = 2; // OK

const c = 1;
// c = 2; // Loi: Assignment to constant variable.

// Luu y: const chi khoa "binding" (khong doi tham chieu), khong khoa GIA TRI ben trong.
// Voi object/array, van mutate duoc noi dung ben trong:
const user = { name: "An" };
user.name = "Binh"; // OK, khong loi
// user = {}; // Loi, vi day la gan lai bien c

const list = [1, 2];
list.push(3); // OK -> [1, 2, 3]


// 2. Scope: function scope (var) vs block scope (let/const)
function scopeDemo() {
  if (true) {
    var x = "var trong if";
    let y = "let trong if";
  }
  console.log(x); // "var trong if" -> var thoat ra khoi block if
  // console.log(y); // ReferenceError: y is not defined -> let bi gioi han trong block {}
}

// var con "ro ri" ra khoi vong lap, khoi if, khoi while... chi bi chan boi function
// day la nguon goc rat nhieu bug trong code cu (pre-ES6)


// 3. Hoisting & Temporal Dead Zone (TDZ)
console.log(hoistedVar); // undefined (khai bao duoc hoist, gan gia tri thi khong)
var hoistedVar = "gia tri";

// console.log(hoistedLet); // ReferenceError: Cannot access 'hoistedLet' before initialization
let hoistedLet = "gia tri"; // ton tai trong TDZ tu dau block den dong nay

// TDZ ap dung cho ca let VA const -> khac nhau voi var o cho:
// var hoisted + gan undefined, con let/const hoisted nhung "khoa" cho den khi chay qua dong khai bao


// 4. Follow-up kinh dien: vong lap var vs let voi setTimeout (bai test hieu block scope + closure)
console.log("--- for var ---");
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log("var i =", i), 0);
}
// In ra: var i = 3 / var i = 3 / var i = 3
// Ly do: chi co 1 bien i duy nhat (function/global scope), ca 3 callback deu tham chieu
// den CUNG 1 O NHO, sau khi vong lap ket thuc i = 3

console.log("--- for let ---");
for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log("let j =", j), 0);
}
// In ra: let j = 0 / let j = 1 / let j = 2
// Ly do: let tao MOT BINDING MOI cho moi vong lap (block scope theo tung iteration),
// moi closure "chup" lay gia tri j rieng cua vong lap do
