/**
 * CAU 10 (React Native): Xu ly navigation state khi app bi KILL
 * HOAN TOAN va mo lai.
 */

// ============================================================
// BUOC 0: PHAN BIET 2 TINH HUONG DE BI NHAM (quan trong)
// ============================================================
// 1. App mo lai TU 1 DEEP LINK (Cau 8) -> dung Linking.getInitialURL(),
//    dieu huong toi man hinh MA LINK DO TRO TOI.
//
// 2. App bi kill va nguoi dung TU MO LAI BINH THUONG (bam icon app,
//    KHONG qua link nao ca) -> MAC DINH React Navigation LUON bat dau
//    lai tu initialRouteName (thuong la Home), MAT HET vi tri dang xem
//    truoc do (vd dang o Settings > ThongBao thi bi kill, mo lai se
//    ve Home chu KHONG quay lai dung Settings > ThongBao).
//
// -> Cau hoi nay hoi ve TINH HUONG SO 2: lam sao NHO LAI duoc vi tri cu,
//    day goi la NAVIGATION STATE PERSISTENCE.


// ============================================================
// BUOC 1: CO CHE - luu TOAN BO navigation state, khoi phuc luc mo app
// ============================================================
// React Navigation cho phep:
//   - onStateChange: callback duoc goi MOI KHI navigation state doi
//     (chuyen man hinh, push, pop...) -> luu state nay (dang JSON) vao
//     AsyncStorage
//   - initialState: prop truyen vao NavigationContainer LUC KHOI TAO,
//     neu co gia tri thi NavigationContainer se DUNG STATE DO thay vi
//     bat dau tu initialRouteName mac dinh

import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PERSISTENCE_KEY = "NAVIGATION_STATE_V1";

function App() {
  const [isReady, setIsReady] = useState(false);
  const [initialState, setInitialState] = useState();

  useEffect(() => {
    const restoreState = async () => {
      try {
        const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY);
        const state = savedStateString ? JSON.parse(savedStateString) : undefined;
        if (state !== undefined) {
          setInitialState(state);
        }
      } finally {
        setIsReady(true);
      }
    };

    if (!isReady) restoreState();
  }, [isReady]);

  if (!isReady) {
    return null; // hoac hien Splash Screen trong luc doc AsyncStorage
  }

  return (
    <NavigationContainer
      initialState={initialState}
      onStateChange={(state) => AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state))}
    >
      {/* <RootNavigator /> */}
    </NavigationContainer>
  );
}


// ============================================================
// BUOC 2: LUU Y QUAN TRONG - KHONG PHAI luc nao cung nen bat tinh nang nay
// ============================================================
// Rui ro neu bat trong PRODUCTION mot cach bua bai:
//   - Man hinh can DANG NHAP (auth-gated): neu user A logout roi user B
//     dang nhap tren cung thiet bi, state cu cua A co the bi khoi phuc
//     nham, dua B vao dung man hinh/du lieu KHONG thuoc ve ho
//   - Cau truc navigator DOI (vd update app them/xoa 1 man hinh) -> state
//     JSON cu luu tu ban truoc co the KHONG con khop, gay loi hoac crash
//     khi khoi phuc
//
// Trong thuc te, tinh nang nay THUONG chi bat trong __DEV__ (moi truong
// dev) de giu nguyen vi tri man hinh moi lan Fast Refresh/reload code,
// do do dev khong phai bam lai tu Home moi lan sua code xong:
//
//   const persistNavigationState = __DEV__; // chi bat luc dev
//
// Neu san pham THUC SU CAN nho vi tri cho nguoi dung (vd app doc truyen/
// sach nho dang doc chuong nao), nen luu RIENG business state do (vd
// { bookId, chapterIndex } vao AsyncStorage/DB) thay vi dua vao TOAN BO
// navigation state - an toan hon va khong phu thuoc cau truc navigator.


// ============================================================
// BUOC 3: KET HOP VOI DEEP LINK (Cau 8) - uu tien cai nao truoc?
// ============================================================
// Neu ca 2 co cung luc: co initialState da luu TU TRUOC, VA app dong thoi
// duoc mo bang 1 DEEP LINK MOI -> nen UU TIEN DEEP LINK MOI, vi day la
// Y DINH RO RANG cua nguoi dung O HIEN TAI (vd bam vao 1 thong bao/link
// moi), quan trong hon vi tri cu tu lan truoc.
//
// React Navigation tu xu ly thu tu nay hop ly khi ca "linking" (Cau 8)
// va "initialState" (Cau 10) deu duoc cau hinh dung cach - deep link
// se GHI DE len initialState da khoi phuc.


// ============================================================
// TOM TAT NGAN GON DE TRA LOI PHONG VAN
// ============================================================
// "Mac dinh app kill roi mo lai se ve initialRouteName, mat vi tri cu.
//  De nho lai, dung onStateChange de luu navigation state (JSON) vao
//  AsyncStorage moi khi state doi, va initialState de khoi phuc luc
//  NavigationContainer khoi tao. Nhung trong production can can than:
//  khong nen ap dung cho man hinh auth-gated (de nham state giua cac
//  user), va neu cau truc navigator thay doi giua cac ban app thi state
//  cu co the khong con khop. Thuc te thuong chi bat tinh nang nay o
//  __DEV__ de tien loi khi code, con voi du lieu THUC SU can nho (vd
//  dang doc chuong nao) thi luu rieng business state thay vi dua vao
//  toan bo navigation state. Neu vua co state cu vua co deep link moi,
//  nen uu tien deep link vi do la y dinh hien tai cua nguoi dung."
