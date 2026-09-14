/**
 * CAU 3 (TypeScript): Ke ten va cong dung cua vai utility type hay
 * dung (Partial, Pick, Omit, Record...).
 */

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
}


// ============================================================
// Partial<T> - BIEN TAT CA thuoc tinh THANH TUY CHON (optional)
// ============================================================
function updateProduct(id: string, changes: Partial<Product>) {
  // "changes" co the CHI chua 1 VAI thuoc tinh cua Product (vd chi
  // { price: 100 }), KHONG BAT BUOC du het name/description...
}
updateProduct("p1", { price: 150000 }); // OK - khong can truyen day du


// ============================================================
// Required<T> - NGUOC LAI Partial - BAT BUOC TAT CA thuoc tinh (bo dau ?)
// ============================================================
interface Config {
  timeout?: number;
  retries?: number;
}
function applyConfig(config: Required<Config>) {
  // BAT BUOC ca timeout LAN retries deu phai co gia tri, khong duoc
  // thieu cai nao (du ban dau khai bao Config la optional)
}


// ============================================================
// Pick<T, Keys> - CHON RA 1 SO thuoc tinh TU T de tao type MOI
// ============================================================
type ProductPreview = Pick<Product, "id" | "name">;
// ProductPreview = { id: string; name: string } - CHI 2 truong nay,
// dung khi CHI CAN 1 PHAN thong tin (vd hien card san pham trong list,
// khong can hien full description/price)


// ============================================================
// Omit<T, Keys> - NGUOC LAI Pick - LAY TAT CA TRU 1 SO thuoc tinh
// ============================================================
type ProductWithoutDescription = Omit<Product, "description">;
// = { id: string; name: string; price: number } - HUU ICH khi CHI MUON
// BO 1-2 truong (vd bo "password" khoi User khi tra ve cho client),
// thay vi phai liet ke lai TAT CA cac truong CON LAI nhu Pick


// ============================================================
// Record<Keys, ValueType> - TAO OBJECT TYPE voi TAP HOP KEY CO DINH,
// TAT CA cung 1 kieu GIA TRI
// ============================================================
type StatusLabel = Record<"loading" | "success" | "error", string>;
// = { loading: string; success: string; error: string } - dam bao
// PHAI CO DU CA 3 KEY, KHONG THIEU KEY NAO

const statusLabels: StatusLabel = {
  loading: "Dang tai...",
  success: "Thanh cong",
  error: "Loi",
  // neu THIEU 1 key (vd quen "error") -> TypeScript BAO LOI NGAY
};

// Vi du thuc te khac: dung Record de dam bao MAP DU cac gia tri enum:
type UserRole = "admin" | "editor" | "viewer";
const rolePermissions: Record<UserRole, string[]> = {
  admin: ["read", "write", "delete"],
  editor: ["read", "write"],
  viewer: ["read"],
};


// ============================================================
// Readonly<T> - LAM TAT CA thuoc tinh KHONG THE GAN LAI (immutable)
// ============================================================
const frozenProduct: Readonly<Product> = {
  id: "p1",
  name: "Ao thun",
  price: 100000,
  description: "...",
};
// frozenProduct.price = 200000; // LOI luc bien dich: Cannot assign to
// 'price' because it is a read-only property


// ============================================================
// ReturnType<T> - LAY RA KIEU TRA VE cua 1 HAM (khong can tu khai bao
// lai type thu cong)
// ============================================================
function createUser() {
  return { id: "u1", name: "An", createdAt: new Date() };
}
type User = ReturnType<typeof createUser>;
// User TU DONG co kieu { id: string; name: string; createdAt: Date }
// -> khong can VIET LAI interface User thu cong, tranh LECH KIEU khi
//    ham createUser thay doi sau nay ma quen cap nhat type


// ============================================================
// TOM TAT NGAN GON DE TRA LOI PHONG VAN
// ============================================================
// "Cac utility type hay dung: Partial<T> lam tat ca thuoc tinh thanh
// tuy chon (dung cho object update chi truyen 1 phan), Pick<T, Keys>
// chon ra 1 so truong de tao type nho hon (vd preview trong list), Omit
// nguoc lai lay tat ca tru vai truong (vd bo password khoi User tra ve
// client), Record<Keys, Value> tao object voi tap key co dinh - dam bao
// khong thieu key nao (rat hop de map du cac gia tri cua 1 enum/union),
// Readonly<T> lam object immutable, va ReturnType<typeof fn> lay tu dong
// kieu tra ve cua 1 ham thay vi phai tu khai bao lai type thu cong, giup
// tranh lech kieu khi ham thay doi sau nay."
