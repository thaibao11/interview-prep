/**
 * CAU 4 (Networking): Retry va exponential backoff nen ap dung khi nao
 * trong networking layer.
 *
 * (Cau 3 - cache anh - da tra loi chi tiet o ../performance/image-caching.tsx,
 * khong lap lai o day)
 */

// ============================================================
// BUOC 0: VI SAO CAN RETRY - KHONG PHAI LOI NAO CUNG NEN GIONG NHAU
// ============================================================
// Mot so loi mang la TAM THOI (mat song wifi 1 chut, server qua tai
// tam thoi) - THU LAI ngay sau do CO THE THANH CONG. Nhung mot so loi
// KHONG NEN retry (vd sai mat khau - retry mai van sai, hoac request
// SAI DU LIEU - 400 Bad Request).


// ============================================================
// BUOC 1: NEN RETRY khi nao, KHONG NEN khi nao
// ============================================================
// NEN retry:
//   - Loi MANG (network timeout, mat ket noi tam thoi)
//   - Loi SERVER TAM THOI: 502/503/504 (server qua tai/dang restart)
//   - 429 Too Many Requests (CAN CHO 1 khoang truoc khi thu lai, thuong
//     server co goi y qua header Retry-After)
//
// KHONG NEN retry:
//   - 400 Bad Request, 422 Validation Error (du lieu gui SAI - retry
//     nguyen si SE VAN SAI, phai SUA DU LIEU truoc)
//   - 401 Unauthorized (can REFRESH TOKEN truoc, khong phai retry
//     nguyen request cu)
//   - 403 Forbidden (KHONG CO QUYEN - retry khong giai quyet duoc gi)
//   - MUTATION khong idempotent MA CHUA CHAC server da nhan duoc hay
//     chua (vd "tao don hang" - neu retry ma request DAU TIEN thuc ra
//     DA THANH CONG, co the TAO TRUNG 2 don hang - can co CO CHE
//     IDEMPOTENCY KEY o backend truoc khi an toan retry loai request nay)


// ============================================================
// BUOC 2: EXPONENTIAL BACKOFF - vi sao KHONG retry ngay lap tuc lien tuc
// ============================================================
// Neu retry NGAY LAP TUC lien tuc (vd moi 100ms mot lan) khi server
// dang QUA TAI, HANH DONG NAY LAM SERVER CANG QUA TAI HON (hang ngan
// client cung dong loat retry lien tuc) - GOI LA "RETRY STORM", co the
// bien 1 su co nho thanh SU CO LON.
//
// EXPONENTIAL BACKOFF giai quyet: MOI LAN retry that bai, THOI GIAN
// CHO truoc lan retry TIEP THEO se TANG THEO CAP SO NHAN (vd 1s -> 2s
// -> 4s -> 8s...), giam ap luc len server dang qua tai, dong thoi VAN
// cho client co hoi thu lai khi tinh hinh on dinh hon.

async function fetchWithRetry(
  url: string,
  options: RequestInit,
  maxRetries = 4
): Promise<Response> {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const res = await fetch(url, options);
      if (res.ok) return res;

      // CHI retry voi loi TAM THOI (Buoc 1), KHONG retry 400/401/403/422
      if (![429, 502, 503, 504].includes(res.status)) return res;
    } catch (err) {
      // loi mang (mat ket noi) -> tiep tuc vong lap de retry
      if (attempt === maxRetries) throw err;
    }

    const delay = Math.min(1000 * 2 ** attempt, 30000); // toi da 30s
    const jitter = Math.random() * 300; // xem Buoc 3
    await new Promise((resolve) => setTimeout(resolve, delay + jitter));
  }
  throw new Error("Het so lan retry");
}


// ============================================================
// BUOC 3: JITTER - tranh HANG NGAN client CUNG RETRY DUNG 1 THOI DIEM
// ============================================================
// Neu TAT CA client deu tinh delay THEO CONG THUC GIONG HET NHAU (1s,
// 2s, 4s...), va TAT CA cung bi loi TU 1 THOI DIEM (vd server vua bi
// down), thi TAT CA client se CUNG DONG LOAT retry LAI O CUNG 1 THOI
// DIEM - lai gay qua tai (van la "retry storm", chi bi ĐẨY LUI thoi
// gian, chua giai quyet triet de). THEM 1 LUONG NGAU NHIEN NHO (jitter)
// vao delay giup CAC CLIENT RAI RAC THOI DIEM RETRY, tranh dong loat.


// ============================================================
// BUOC 4: THU VIEN CO SAN (khong nhat thiet phai tu viet)
// ============================================================
// - axios-retry: gan them logic retry+backoff vao axios instance co san
// - React Query/RTK Query (Cau 1): co CAU HINH RETRY SAN (retry: 3,
//   retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000)) -
//   khong can tu viet retry logic rieng neu da dung cac thu vien nay


// ============================================================
// TOM TAT NGAN GON DE TRA LOI PHONG VAN
// ============================================================
// "Minh chi retry voi loi TAM THOI (timeout, 502/503/504, 429), KHONG
// retry voi loi do DU LIEU SAI (400/422) hay QUYEN (401/403) vi retry
// khong giai quyet duoc nguyen nhan goc. Dung exponential backoff (delay
// tang gap doi moi lan that bai) de tranh 'retry storm' lam server qua
// tai them, ket hop jitter (do ngau nhien nho) de cac client khong dong
// loat retry cung 1 thoi diem. Voi mutation KHONG idempotent (vd tao don
// hang), can co idempotency key o backend truoc khi an toan retry. Neu
// dang dung React Query/RTK Query/axios-retry, phan lon logic nay da co
// san, khong can tu viet tu dau."
