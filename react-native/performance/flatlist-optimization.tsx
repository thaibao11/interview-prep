/**
 * CAU 22 (React Native): Cac prop toi uu FlatList voi danh sach lon.
 */

import React, { memo, useCallback } from "react";
import { FlatList, View, Text } from "react-native";

type Item = { id: string; name: string };

// ============================================================
// BUOC 0: VAN DE - FlatList render TAT CA item cung luc se cham/ton bo nho
// ============================================================
// FlatList "ao hoa" (virtualize) danh sach: CHI RENDER cac item DANG
// HIEN THI TREN MAN HINH (+ 1 vung dem xung quanh), KHONG render toan
// bo hang ngan item cung luc. Cac prop duoi day giup dieu chinh CO CHE
// AO HOA nay cho phu hop voi danh sach cu the.


// ============================================================
// CAC PROP QUAN TRONG
// ============================================================
const ItemRow = memo(function ItemRow({ item }: { item: Item }) {
  return (
    <View>
      <Text>{item.name}</Text>
    </View>
  );
});

function OptimizedList({ data }: { data: Item[] }) {
  const renderItem = useCallback(({ item }: { item: Item }) => <ItemRow item={item} />, []);
  // renderItem duoc useCallback -> KHONG tao ham moi moi lan List re-render,
  // ket hop ItemRow da memo -> tranh re-render THUA cho tung dong (Cau 3)

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id} // ON DINH, KHONG dung index (Cau 3)
      renderItem={renderItem}
      // getItemLayout: BO QUA buoc TU DO chieu cao/vi tri tung item luc
      // scroll (FlatList mac dinh phai TU DO de biet vi tri) - neu MOI
      // ITEM CO CHIEU CAO CO DINH, khai bao san giup FlatList TINH TOAN
      // NGAY, khong can do dac -> scroll muot hon, dac biet khi
      // scrollToIndex toi 1 vi tri xa
      getItemLayout={(_, index) => ({ length: 60, offset: 60 * index, index })}
      // windowSize: SO "man hinh" du lieu duoc GIU render xung quanh
      // vung dang hien thi (mac dinh 21 - kha rong). GIAM xuong (vd 5)
      // -> it item render hon, TON IT BO NHO HON, nhung scroll rat
      // nhanh/lien tuc co the thay "khoang trang" thoang qua truoc khi
      // item kip render
      windowSize={5}
      // maxToRenderPerBatch: SO item render MOI 1 "dot" (batch) trong
      // luc scroll. GIAM xuong giup MOI DOT RENDER NHE HON, tranh giat
      // frame ngay luc render, nhung co the khien item "hien ra cham hon"
      // 1 chut khi scroll rat nhanh
      maxToRenderPerBatch={10}
      // initialNumToRender: SO item render NGAY LAN DAU TIEN (luc man
      // hinh vua mo) - GIAM xuong giup MAN HINH DAU TIEN HIEN NHANH HON
      // (khong can doi render het 1 danh sach dai truoc khi thay gi do)
      initialNumToRender={10}
      // removeClippedSubviews: (chu yeu tren Android) GO cac view DA
      // CUON RA KHOI MAN HINH khoi cay native, giai phong bo nho - huu
      // ich voi danh sach RAT DAI, nhung doi khi gay glitch nho tren 1
      // so thiet bi/phien ban Android cu nen can test ky truoc khi bat
      removeClippedSubviews={true}
    />
  );
}


// ============================================================
// LUU Y: FlashList (thu vien cua Shopify) - THAY THE HIEU NANG CAO HON
// ============================================================
// Voi danh sach RAT LON/RAT PHUC TAP, nhieu du an chuyen sang dung
// @shopify/flash-list thay vi FlatList mac dinh - API TUONG TU FlatList
// (de migrate) nhung dung THUAT TOAN AO HOA khac (tai su dung view thay
// vi tao/huy lien tuc), cho HIEU NANG SCROLL TOT HON RO RET voi list lon.


// ============================================================
// TOM TAT NGAN GON DE TRA LOI PHONG VAN
// ============================================================
// "Minh dung keyExtractor on dinh (khong dung index), renderItem qua
// useCallback ket hop component da React.memo de tranh re-render thua
// tung dong, getItemLayout neu item co chieu cao co dinh de bo qua buoc
// tu do, va dieu chinh windowSize/maxToRenderPerBatch/initialNumToRender
// theo do dai danh sach de can bang giua toc do hien thi va bo nho su
// dung. removeClippedSubviews giup giai phong bo nho voi list rat dai
// nhung can test ky tren Android. Voi danh sach cuc lon, minh can nhac
// chuyen sang FlashList cua Shopify de co hieu nang scroll tot hon."
