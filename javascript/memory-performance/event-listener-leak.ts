/**
 * CAU 4 (Memory & Performance): Event listener khong remove co the
 * gay leak nhu the nao.
 */

// ============================================================
// BUOC 0: CO CHE GAY LEAK - THAM CHIEU 2 CHIEU khong mong muon
// ============================================================
// Khi dang ky 1 event listener, DOI TUONG PHAT SU KIEN (emitter) GIU 1
// THAM CHIEU toi CALLBACK ban truyen vao. Neu callback do la 1 ARROW
// FUNCTION/CLOSURE duoc dinh nghia BEN TRONG 1 component/object, no
// GIU THEO ca "moi truong" (scope) noi no duoc tao ra QUA CLOSURE -
// bao gom CA CAC BIEN/OBJECT LON o scope do.
//
// -> Chi can KHONG GO listener, thi CA "duong day" tu emitter ->
//    callback -> scope cha -> cac bien lon trong do VAN CON NGUYEN,
//    KHONG BI GC, DU component/object da "coi nhu" khong con dung nua.


// ============================================================
// VI DU CU THE - GAY LEAK
// ============================================================
class ChatRoom {
  private messages: string[] = []; // co the la mang RAT LON theo thoi gian

  constructor(private socket: any) {
    // Callback nay la ARROW FUNCTION -> "this" (tuc la INSTANCE
    // ChatRoom nay, bao gom ca "messages") duoc GIU LAI qua closure
    this.socket.on("message", (msg: string) => {
      this.messages.push(msg);
    });
    // KHONG CO DONG NAO go dang ky listener nay o dau ca trong class
  }
}

function openAndCloseChatRoomManyTimes(socket: any) {
  for (let i = 0; i < 100; i++) {
    new ChatRoom(socket); // MOI LAN tao "ChatRoom" moi, listener CU
    // van CON DANG KY tren "socket" (dung chung 1 socket) - CA 100
    // INSTANCE ChatRoom (cung "messages" cua chung) VAN BI GIU LAI
    // trong bo nho, DU khong con bien nao o ben ngoai tro toi chung nua
  }
  // -> Sau vong lap, 100 instance ChatRoom (voi mang messages cua rieng
  //    tung cai) VAN TON TAI trong bo nho, chi vi socket VAN GIU 100
  //    CALLBACK do dang ky - day la LEAK RAT DE XAY RA TRONG THUC TE
  //    (vd 1 man hinh chat duoc mo/dong nhieu lan)
}


// ============================================================
// CACH FIX - LUON HUY DANG KY KHI KHONG CON CAN
// ============================================================
class ChatRoomFixed {
  private messages: string[] = [];
  private handleMessage = (msg: string) => {
    this.messages.push(msg);
  };

  constructor(private socket: any) {
    this.socket.on("message", this.handleMessage);
  }

  destroy() {
    this.socket.off("message", this.handleMessage); // HUY DANG KY -
    // socket KHONG con giu tham chieu toi instance nay nua, GC co the
    // don dep BINH THUONG khi khong con ai khac tham chieu toi no
  }
}


// ============================================================
// LIEN HE VOI REACT/REACT NATIVE (useEffect cleanup)
// ============================================================
// Day CHINH LA LY DO useEffect YEU CAU return 1 HAM CLEANUP: React tu
// dong GOI ham do khi component unmount, DAM BAO listener duoc HUY
// DUNG LUC, TRANH CHINH XAC kieu leak nay - xem chi tiet vi du thuc te
// trong RN o ../../react-native/performance/memory-leaks.tsx (Bug 1)


// ============================================================
// TOM TAT NGAN GON DE TRA LOI PHONG VAN
// ============================================================
// "Khi dang ky event listener, doi tuong phat su kien giu tham chieu
// toi callback do. Neu callback la closure duoc tao trong 1
// component/object, no giu theo ca scope cha qua closure - bao gom cac
// bien/object lon trong do. Neu khong go dang ky, chuoi tham chieu nay
// (emitter -> callback -> scope cha) van con nguyen mai, khien component/
// object do KHONG BAO GIO duoc GC du no da 'coi nhu' khong con dung
// nua - dac biet nguy hiem neu 1 man hinh/component duoc tao va huy
// lap di lap lai nhieu lan ma quen go dang ky moi lan. Cach fix la luon
// go dang ky (removeEventListener/off) khi khong con can, va trong
// React/RN chinh la ly do useEffect yeu cau return ham cleanup."
