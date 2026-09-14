/**
 * CAU BO SUNG (Quan ly state): RTK Query vs React Query - khac nhau
 * nhu the nao, tai sao dung cai nay, luc nao thi dung.
 *
 * (Doc big-picture-story.tsx TRUOC neu chua ro vi sao 2 thu nay TON TAI
 * SONG SONG voi Redux/Zustand thay vi thay the chung)
 */

// ============================================================
// BUOC 0: CA HAI GIAI QUYET CHUNG 1 VAN DE - SERVER STATE
// ============================================================
// Ca RTK Query va React Query (TanStack Query) deu lo cho ban:
//   - Tu dong CACHE ket qua theo 1 "key" (vd ["product", productId])
//   - DEDUPE: 2 component CUNG goi 1 API o CUNG 1 thoi diem -> CHI 1
//     REQUEST THAT SU duoc gui, ca 2 component deu nhan chung ket qua
//   - Tu dong quan ly trang thai isLoading/isError/data, KHONG can tu
//     viet 3 bien state (loading, error, data) cho MOI LAN goi API nhu
//     cach lam thu cong voi useEffect + useState
//   - Background refetch: TU DONG goi lai API khi nguoi dung QUAY LAI
//     app (window/app focus), khi MANG KET NOI LAI, hoac theo 1 KHOANG
//     THOI GIAN dinh truoc - dam bao du lieu KHONG QUA CU ma khong can
//     nguoi dung tu bam "lam moi"
//   - Cung cap san CACHE INVALIDATION: sau khi 1 MUTATION (vd tao don
//     hang moi) thanh cong, TU DONG danh dau 1 SO CACHE KHAC la "CU",
//     kich hoat refetch lai DUNG NHUNG CHO can cap nhat


// ============================================================
// BUOC 1: KHAC BIET CHINH - MUC DO GAN VOI REDUX
// ============================================================

// --- RTK Query: XAY DUNG BEN TRONG Redux Toolkit ---
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { configureStore } from "@reduxjs/toolkit";

const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.example.com" }),
  tagTypes: ["Product"], // dung cho CACHE INVALIDATION (Buoc 0)
  endpoints: (builder) => ({
    getProducts: builder.query<any[], void>({
      query: () => "products",
      providesTags: ["Product"], // danh dau cache nay THUOC VE tag "Product"
    }),
    addProduct: builder.mutation<any, Partial<any>>({
      query: (body) => ({ url: "products", method: "POST", body }),
      invalidatesTags: ["Product"], // sau khi them SAN PHAM MOI, tu dong
      // danh dau CACHE "Product" la CU, kich hoat refetch getProducts
    }),
  }),
});

export const { useGetProductsQuery, useAddProductMutation } = productApi;
// -> Hook duoc TU SINH RA tu ten endpoint, dung THANG trong component

const store = configureStore({
  reducer: { [productApi.reducerPath]: productApi.reducer },
  middleware: (getDefault) => getDefault().concat(productApi.middleware),
});
// -> Ket qua cache duoc LUU VAO CHINH Redux store, XEM DUOC qua Redux
//    DevTools GIONG NHU 1 phan state Redux binh thuong


// --- React Query: THU VIEN DOC LAP, KHONG PHU THUOC Redux ---
import { useQuery, useMutation, useQueryClient, QueryClient } from "@tanstack/react-query";

function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: () => fetch("https://api.example.com/products").then((r) => r.json()),
  });
}

function useAddProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: any) =>
      fetch("https://api.example.com/products", { method: "POST", body }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] }); // TU TAY
      // goi invalidate (khong tu dong qua "tag" nhu RTK Query, nhung
      // LINH HOAT hon vi ban CHU DONG kiem soat invalidate LUC NAO)
    },
  });
}
// -> KHONG can Redux store, KHONG can Provider tich hop san he thong
//    reducer/middleware - chi can boc <QueryClientProvider> o goc app


// ============================================================
// BUOC 2: BANG SO SANH NGAN GON
// ============================================================
//                      | RTK Query                | React Query
// ---------------------------------------------------------------
// Phu thuoc Redux      | CO (nam trong RTK)       | KHONG (doc lap hoan toan)
// DevTools             | Dung chung Redux DevTools| DevTools rieng cua React Query
// Cache invalidation   | Qua "tags" (khai bao truoc) | Goi thu cong invalidateQueries
//                      | (tu dong hon, it code hon)  | (linh hoat hon, kiem soat ro hon)
// Setup ban dau        | Can dinh nghia createApi | Chi can QueryClientProvider,
//                      | + gan vao Redux store    | KHONG can setup store gi ca
// Phu hop nhat khi     | App DA/SE dung Redux cho | App dung Zustand/Context/
//                      | client state             | khong dung global state lib nao


// ============================================================
// BUOC 3: VAY LUC NAO CHON CAI NAO
// ============================================================
// CHON RTK QUERY khi:
//   - App DA DUNG Redux (Toolkit) cho client state -> dung luon RTK
//     Query TRANH THEM 1 THU VIEN MOI, dung CHUNG 1 bo DevTools, 1 he
//     sinh thai duy nhat, team chi can hoc 1 pattern
//   - Muon cache invalidation KHAI BAO SAN qua tags (it code hon cho
//     cac quan he "mutation A anh huong query B" phuc tap, nhieu lop)
//
// CHON REACT QUERY khi:
//   - App KHONG dung Redux (dung Zustand/Context/khong dung global
//     state lib nao rieng) -> KHONG CAN THEM Redux CHI DE co server
//     state caching - React Query DOC LAP HOAN TOAN, setup nhe hon nhieu
//   - Can THEM LINH HOAT trong tung truong hop invalidate (kiem soat
//     thu cong, khong bi rang buoc theo "tag" dinh san)
//   - Du an moi, KHONG co rang buoc phai theo kien truc Redux co san
//
// -> QUY TAC DON GIAN NHAT: "App co Redux roi thi dung RTK Query. App
//    chua co Redux (hoac khong dinh dung Redux) thi dung React Query,
//    DUNG VI RTK QUERY MA PHAI CAI CA REDUX VAO CHI DE FETCH DATA."


// ============================================================
// TOM TAT NGAN GON DE TRA LOI PHONG VAN
// ============================================================
// "RTK Query va React Query giai quyet chung 1 van de: quan ly server
// state voi cache, dedupe request, tu dong loading/error, va background
// refetch - dieu ma Redux/Zustand thuan khong lam tot. Khac biet chinh
// la RTK Query nam SAN trong Redux Toolkit, cache luu trong chinh Redux
// store va xem duoc qua Redux DevTools, cache invalidation qua he thong
// 'tags' khai bao truoc; con React Query la thu vien HOAN TOAN DOC LAP,
// khong can Redux, invalidate cache thu cong linh hoat hon qua
// invalidateQueries. Minh chon RTK Query neu du an DA dung Redux cho
// client state de tranh them 1 thu vien rieng; con neu du an dung
// Zustand/Context hoac khong co global state lib nao, minh chon React
// Query vi khong can cai them ca Redux chi de co server-state caching."
