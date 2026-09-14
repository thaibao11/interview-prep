/**
 * CAU 2 (Functional Programming): Implement debounce va throttle bang
 * closure - khac nhau ra sao.
 */

// ============================================================
// BUOC 0: VAN DE CHUNG - 1 SU KIEN XAY RA QUA NHIEU LAN LIEN TUC
// ============================================================
// Vi du: nguoi dung GO PHIM tim kiem (moi ky tu 1 su kien), hoac CUON
// man hinh (hang chuc su kien/giay) - neu CHAY 1 HAM NANG (goi API,
// tinh toan) O MOI LAN su kien, se RAT LANG PHI/GIAT. Debounce va
// throttle deu GIAI QUYET van de nay, nhung THEO 2 CHIEN LUOC KHAC NHAU.


// ============================================================
// DEBOUNCE - CHI CHAY SAU KHI "YEN LANG" DUOC 1 KHOANG THOI GIAN
// ============================================================
// Y TUONG: MOI LAN su kien xay ra, HUY BO LAN HEN GIO TRUOC DO, DAT LAI
// HEN GIO MOI. Ham CHI THUC SU CHAY neu KHONG CO su kien nao xay ra
// THEM trong 1 KHOANG THOI GIAN lien tuc.

function debounce<T extends (...args: any[]) => void>(fn: T, delay: number) {
  let timer: ReturnType<typeof setTimeout>; // BIEN NAY duoc "GHI NHO"
  // qua CLOSURE - moi lan goi ham tra ve, no dung CHUNG 1 "timer"

  return (...args: Parameters<T>) => {
    clearTimeout(timer); // HUY lan hen gio TRUOC (neu co)
    timer = setTimeout(() => fn(...args), delay); // DAT LAI hen gio MOI
  };
}

const searchDebounced = debounce((keyword: string) => {
  console.log("Goi API tim kiem:", keyword);
}, 300);

// Neu nguoi dung go "r", "re", "rea", "reac", "react" LIEN TUC trong
// 300ms -> CHI 1 LAN GOI API DUY NHAT ("react"), vi moi ky tu MOI DEU
// HUY LAN HEN TRUOC va DAT LAI TU DAU
// -> DUNG cho: O TIM KIEM (search input), validate form KHI NGUNG GO,
//    resize window (chi tinh lai layout SAU KHI nguoi dung NGUNG keo)


// ============================================================
// THROTTLE - CHAY DEU DAN THEO NHIP CO DINH, KHONG QUAN TAM CON BAO
// NHIEU SU KIEN O GIUA
// ============================================================
// Y TUONG: CHAY NGAY LAN DAU, roi "KHOA" (block) KHONG CHO CHAY TIEP
// TRONG 1 KHOANG THOI GIAN, DU CO BAO NHIEU su kien xay ra trong luc do.

function throttle<T extends (...args: any[]) => void>(fn: T, limit: number) {
  let inThrottle = false; // "CO SET" duoc GHI NHO qua closure

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      fn(...args); // CHAY NGAY lan nay
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false; // MO KHOA sau "limit" ms
      }, limit);
    }
    // neu inThrottle dang true, LOI GOI NAY BI BO QUA HOAN TOAN
  };
}

const onScrollThrottled = throttle(() => {
  console.log("Tinh toan vi tri cuon...");
}, 200);

// Du CUON RAT NHANH (hang chuc su kien scroll/giay), ham CHI CHAY TOI
// DA 1 LAN MOI 200ms - DAM BAO co PHAN HOI DEU DAN, KHONG bi "im lang
// hoan toan" cho den khi nguoi dung DUNG HAN (khac debounce)
// -> DUNG cho: su kien scroll (can cap nhat UI LIEN TUC nhung KHONG
//    CAN qua day), keo tha (drag), theo doi vi tri chuot/ngon tay LIEN TUC


// ============================================================
// BANG SO SANH NGAN GON
// ============================================================
//           | Chay khi nao               | Vi du dung
// Debounce   | CHI SAU KHI "im lang" 1    | O tim kiem, validate form,
//            | khoang thoi gian           | resize window
// Throttle   | DEU DAN theo nhip co dinh, | Scroll event, drag, theo
//            | khong doi "im lang"        | doi vi tri chuot/gesture


// ============================================================
// TOM TAT NGAN GON DE TRA LOI PHONG VAN
// ============================================================
// "Ca hai deu dung closure de 'ghi nho' trang thai (timer hoac co) giua
// cac lan goi. Debounce huy lan hen gio truoc va dat lai moi lan co su
// kien moi, nen CHI chay sau khi su kien 'im lang' du lau - phu hop o
// tim kiem, vi ta chi muon goi API sau khi nguoi dung go xong. Throttle
// chay ngay lan dau roi khoa lai trong 1 khoang thoi gian co dinh, bo
// qua moi loi goi trong luc khoa - phu hop scroll/drag, vi ta van muon
// co phan hoi DEU DAN trong luc su kien dang lien tuc xay ra, khong the
// doi den luc 'im lang' hoan toan moi phan hoi."
