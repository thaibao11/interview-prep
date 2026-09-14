/**
 * CAU 15 (React Native): Redux Toolkit (RTK) giai quyet
 * nhung van de gi cua Redux truyen thong.
 */

// ============================================================
// BUOC 0: Redux truyen thong (truoc RTK) co van de gi
// ============================================================
// - Rat nhieu BOILERPLATE: tu dinh nghia action type (constant string,
//   de sai chinh ta gay bug ngam), tu viet action creator, tu viet
//   reducer voi switch-case dai
// - Phai TU CAI immer (hoac tu spread thu cong) de dam bao immutability,
//   de VIET SAI (mutate truc tiep state ma khong hay biet)
// - Phai TU CAU HINH Redux DevTools + middleware (redux-thunk...) thu cong
// - Khong co chuan chung cho goi API bat dong bo, moi du an tu nghi 1 kieu


// ============================================================
// BUOC 1: RTK giai quyet tung van de mot
// ============================================================
// createSlice: GOP action + reducer vao 1 CHO DUY NHAT, TU SINH action
// creator tu ten reducer, va DUNG IMMER NGAM DINH nen viet code nhu dang
// "mutate" truc tiep nhung thuc chat van immutable ben duoi:
import { createSlice, configureStore, createAsyncThunk } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [] as { id: string; qty: number }[] },
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload); // viet nhu mutate, Immer lo phan immutable
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
  },
});
// -> Redux thuong: phai viet
//    return { ...state, items: [...state.items, action.payload] }
//    RTK: chi can state.items.push(...) - it code hon, kho viet sai hon

// configureStore: TU BAT SAN Redux DevTools + middleware mac dinh hop ly
// (vd redux-thunk co san), khong can tu setup tu dau:
const store = configureStore({ reducer: { cart: cartSlice.reducer } });

// createAsyncThunk: CHUAN HOA cach xu ly 1 lan goi API bat dong bo, tu
// dispatch 3 trang thai pending/fulfilled/rejected, khong can tu viet
// lai logic nay moi lan can goi API:
const fetchProducts = createAsyncThunk("products/fetch", async () => {
  const res = await fetch("https://api.example.com/products");
  return res.json();
});


// ============================================================
// BUOC 2: RTK Query - giai quyet luon phan DATA FETCHING/CACHE
// ============================================================
// Voi du an CHUA dung React Query/SWR, RTK Query giai quyet CA VIEC
// FETCH + CACHE + INVALIDATE data tu API, TICH HOP SAN trong he sinh
// thai Redux (khong can them thu vien fetching rieng):
//
// export const apiSlice = createApi({
//   baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
//   endpoints: (builder) => ({
//     getProducts: builder.query({ query: () => "products" }),
//   }),
// });
// export const { useGetProductsQuery } = apiSlice; // 1 hook dung thang trong component


// ============================================================
// TOM TAT NGAN GON DE TRA LOI PHONG VAN
// ============================================================
// "RTK giai quyet boilerplate cua Redux thuong: createSlice gop action+
// reducer va tich hop Immer san (viet nhu mutate ma van immutable),
// configureStore tu bat DevTools + middleware hop ly, createAsyncThunk
// chuan hoa goi API bat dong bo voi 3 trang thai pending/fulfilled/
// rejected, va RTK Query giai quyet luon ca fetching/caching data ma
// khong can them thu vien rieng nhu React Query."
