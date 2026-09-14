/**
 * CAU 2 (TypeScript): Generic dung de giai quyet van de gi? Viet vi du
 * ham generic.
 */

// ============================================================
// BUOC 0: VAN DE - PHAI CHON GIUA "CU THE QUA" VA "LONG LEO QUA"
// ============================================================

// CACH 1 - VIET RIENG cho TUNG KIEU (an toan nhung LAP LAI code):
function firstStringItem(arr: string[]): string {
  return arr[0];
}
function firstNumberItem(arr: number[]): number {
  return arr[0];
}
// -> DUNG voi kieu du lieu tuong ung, nhung PHAI VIET LAI ham MOI cho
//    MOI kieu du lieu khac nhau (string, number, User, Product...)

// CACH 2 - dung "any" (linh hoat nhung MAT AN TOAN KIEU):
function firstItemAny(arr: any[]): any {
  return arr[0];
}
const result = firstItemAny([1, 2, 3]);
result.toUpperCase(); // KHONG LOI LUC BIEN DICH (vi "any" tat toan bo
// kiem tra kieu), nhung SE CRASH LUC CHAY vi number KHONG CO ham
// toUpperCase() - MAT DI CHINH LOI ICH CUA TYPESCRIPT


// ============================================================
// BUOC 1: GENERIC - VUA LINH HOAT (dung cho MOI KIEU), VUA AN TOAN
// KIEU (giu duoc thong tin kieu CU THE)
// ============================================================
function firstItem<T>(arr: T[]): T {
  return arr[0];
}

const num = firstItem([1, 2, 3]); // T duoc SUY RA la "number"
const str = firstItem(["a", "b"]); // T duoc SUY RA la "string"

// num.toUpperCase(); // LOI LUC BIEN DICH NGAY - vi TypeScript BIET num
// la number (nho generic "T" duoc gan = number tu lan goi nay), khong
// phai "any" nua

// -> "T" la 1 BIEN KIEU (type variable) - GIU LAI moi lien he giua KIEU
//    DAU VAO va KIEU DAU RA, TypeScript TU SUY RA "T" la gi dua tren
//    GIA TRI THUC TE duoc truyen vao, KHONG CAN viet lai ham cho tung kieu


// ============================================================
// BUOC 2: VI DU THUC TE HON - generic VOI NHIEU THAM SO KIEU
// ============================================================
function mapArray<T, U>(arr: T[], fn: (item: T) => U): U[] {
  return arr.map(fn);
}

const names = mapArray([1, 2, 3], (n) => `So ${n}`); // T=number, U=string
// names co kieu string[], TypeScript BIET DUOC dieu nay TU DAY, khong
// can khai bao thu cong


// ============================================================
// BUOC 3: VI DU THUC TE TRONG RN/REACT - generic HOOK
// ============================================================
function useApi<T>(url: string) {
  const [data, setData] = React.useState<T | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((json: T) => setData(json))
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading };
}

interface User {
  id: string;
  name: string;
}
// Goi voi kieu CU THE - "data" se co kieu "User | null", KHONG PHAI "any":
function ProfileScreen() {
  const { data, loading } = useApi<User>("/api/user");
  // data?.name -> TypeScript BIET "name" ton tai, tu dong goi y (autocomplete)
}


// ============================================================
// BUOC 4: GENERIC CONSTRAINT (gioi han kieu duoc phep) - "extends"
// ============================================================
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { name: "An", age: 25 };
getProperty(user, "name"); // OK - "name" la 1 key hop le cua user
// getProperty(user, "email"); // LOI luc bien dich - "email" KHONG PHAI
// key cua user, TypeScript CHAN NGAY tu luc viet code


// ============================================================
// TOM TAT NGAN GON DE TRA LOI PHONG VAN
// ============================================================
// "Generic giai quyet van de phai chon giua viet rieng ham cho tung
// kieu (an toan nhung lap lai code) va dung 'any' (linh hoat nhung mat
// an toan kieu). Generic dung 1 'bien kieu' (vd T) de GIU LAI moi lien
// he giua kieu dau vao va dau ra, TypeScript tu suy ra T dua tren gia
// tri thuc te truyen vao, nen vua tai su dung duoc cho moi kieu, vua
// giu duoc kiem tra kieu chat che. Vi du thuc te hay dung la generic
// hook (useApi<User>('/api/user')) hoac ham voi constraint
// (K extends keyof T) de chi cho phep truy cap key thuc su ton tai tren
// object, TypeScript se bao loi ngay luc viet code neu truyen sai key."

declare const React: any;
