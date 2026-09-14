/**
 * CAU 1 (Networking): Dung thu vien nao de goi API va cache du lieu -
 * so sanh fetch/axios, React Query/SWR/RTK Query, tai sao chon, khi
 * nao dung cai nao.
 *
 * (Neu chua ro vi sao "cache du lieu tu API" la 1 VAN DE RIENG, khac
 * voi Redux/Zustand - doc ../state-management/big-picture-story.tsx
 * TRUOC: do la khai niem "CLIENT STATE vs SERVER STATE")
 */

// ============================================================
// LOP 1 - TANG HTTP CLIENT: fetch vs axios
// ============================================================
// Day la LOP THAP NHAT - chi lo viec GUI REQUEST/NHAN RESPONSE, CHUA
// lien quan gi den cache.
//
// fetch (co san trong RN, khong can cai them):
//   - KHONG TU DONG throw loi khi status la 4xx/5xx - PHAI TU KIEM TRA
//     response.ok, neu khong SE DE SOT LOI (code coi 404 la "thanh cong")
//   - KHONG TU DONG parse JSON - phai goi .json() rieng 1 buoc
//   - Ho tro HUY REQUEST qua AbortController (chuan Web API)
//
// axios (thu vien ngoai, cai them):
//   - TU DONG throw loi khi status khong phai 2xx (dung try/catch tu nhien hon)
//   - TU DONG parse JSON (response.data la object san)
//   - Co INTERCEPTORS (chan MOI request/response de xu ly chung - vd
//     tu dong gan Authorization header, tu dong refresh token khi gap 401)
//   - Co san TIMEOUT (fetch native truoc day KHONG co timeout, phai tu
//     ghep voi AbortController + setTimeout)
//
// -> Voi du an CAN interceptor (gan token, refresh token tu dong, log
//    moi request) - axios TIEN LOI HON RO RET. Voi nhu cau don gian,
//    fetch co san la du, khong can them dependency.

import axios from "axios";

const apiClient = axios.create({ baseURL: "https://api.example.com", timeout: 10000 });

apiClient.interceptors.request.use((config) => {
  // config.headers.Authorization = `Bearer ${getToken()}`;
  return config;
});

apiClient.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response?.status === 401) {
      // tu dong refresh token roi goi lai request cu (logic that phuc tap hon)
    }
    return Promise.reject(error);
  }
);


// ============================================================
// LOP 2 - TANG CACHE/SERVER STATE: React Query vs SWR vs RTK Query
// ============================================================
// Day la LOP TREN CUNG - GOI HTTP client (fetch/axios) BEN TRONG, roi
// THEM cache, dedupe, refetch, loading/error state tu dong (Cau da hoc
// ky o ../state-management/rtk-query-vs-react-query.tsx voi RTK Query,
// phan nay MO RONG THEM SWR de so sanh day du hon):
//
// React Query (TanStack Query):
//   - Doc lap, KHONG can Redux, he sinh thai lon, nhieu tinh nang (infinite
//     query, optimistic update, query cancellation, devtools rieng)
//   - Phu hop DA SO DU AN, la LUA CHON MAC DINH neu khong co ly do dac biet
//
// SWR (cua Vercel):
//   - Y TUONG GIONG React Query (stale-while-revalidate), API DON GIAN
//     HON, BUNDLE SIZE NHO HON
//   - IT TINH NANG NANG CAO HON React Query (vd infinite query/mutation
//     phuc tap khong manh bang), phu hop du an CAN NHE, don gian, hoac
//     da dung he sinh thai Next.js/Vercel (SWR duoc chinh Vercel duy tri)
//
// RTK Query:
//   - Nhu da hoc - phu hop khi du an DA DUNG Redux Toolkit cho client
//     state, tranh phai them 1 thu vien rieng


// ============================================================
// LOP 3 - GRAPHQL: Apollo Client (chi ap dung neu BACKEND la GraphQL)
// ============================================================
// Neu backend expose GraphQL (khong phai REST), Apollo Client la LUA
// CHON PHO BIEN NHAT - no lam CA 2 VIEC: vua la "http client" (gui
// GraphQL query/mutation), vua la "cache layer" (cache theo tung FIELD
// cua object, khong chi theo URL nhu React Query/SWR - vi GraphQL cho
// phep nhieu query khac nhau TRA VE CUNG 1 object).
// -> KHONG PHAI "doi thu" cua React Query/RTK Query o TREN - day la LUA
//    CHON RIENG cho backend GraphQL, khong ap dung cho REST.


// ============================================================
// BANG QUYET DINH NGAN GON
// ============================================================
//   Backend la GraphQL?
//     -> CO: Apollo Client (hoac urql)
//     -> KHONG (REST):
//          Da dung Redux Toolkit cho client state?
//            -> CO: RTK Query
//            -> KHONG: React Query (mac dinh, day du tinh nang nhat)
//               hoac SWR (neu muon nhe, don gian, hoac da dung Next.js)
//
//   Rieng tang HTTP client (khong lien quan cache):
//     Can interceptor (auto refresh token, gan header chung, log request)?
//       -> CO: axios
//       -> KHONG, chi goi API don gian: fetch la du, khong can them thu vien


// ============================================================
// TOM TAT NGAN GON DE TRA LOI PHONG VAN
// ============================================================
// "Minh tach 2 tang: tang HTTP client (fetch/axios) chi lo gui request/
// nhan response - axios tien loi hon khi can interceptor (auto refresh
// token, gan header chung), fetch du dung neu nhu cau don gian. Tang
// tren la server-state/cache (React Query, SWR, RTK Query) - React
// Query la lua chon mac dinh cua minh vi day du tinh nang va doc lap
// voi Redux; SWR nhe hon, API don gian hon, hop voi du an don gian hoac
// da dung he sinh thai Next.js/Vercel; RTK Query minh chi chon khi du
// an DA dung Redux Toolkit san, de tranh them 1 thu vien rieng. Neu
// backend la GraphQL thi dung Apollo Client, day la lua chon rieng cho
// GraphQL chu khong phai doi thu cua React Query/RTK Query."
