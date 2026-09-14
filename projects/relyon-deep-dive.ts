/**
 * DU AN 1 TRONG CV: RELYON (02/2026 - 08/2026) - app bao ve ca nhan 24/7
 *
 * File nay LIET KE nhung CHI TIET trong CV DE BI HOI VAN NHAT, kem
 * "KHUNG TRA LOI GOI Y" (nhung dieu 1 cau tra loi TOT nen nham toi) -
 * BAN CAN TU DIEN VAO CHI TIET THAT cua chinh du an, vi minh khong biet
 * ban da lam CHINH XAC nhu the nao ben trong.
 */

// ============================================================
// CHI TIET 1: "battery-aware sampling" trong Realtime Tracking
// ============================================================
// CV ghi: "streaming the live position to responders with battery-aware
// sampling and reconnection handling"
//
// CAU HOI CO THE BI HOI:
//   - "Battery-aware sampling nghia la gi, cu the lam sao de can bang
//      giua do chinh xac vi tri va tieu hao pin?"
//   - "Ban dung API/thu vien nao de lay vi tri nen (background location)?"
//   - "Lam sao xu ly khac biet gioi han background location giua iOS va
//      Android (iOS co "Always" permission rieng, Android 12+ sieu that
//      chat voi foreground service)?"
//
// KHUNG TRA LOI TOT NEN CO:
//   - Neu ket noi PIN THAP hoac nguoi dung DUNG YEN (khong di chuyen),
//     GIAM TAN SUAT lay vi tri (vd tu 5s/lan xuong 30s/lan) - danh doi
//     do chinh xac lay do tuoi tho pin
//   - Dung "distanceFilter" (chi bao vi tri khi di chuyen qua 1 nguong
//     khoang cach) thay vi lay theo THOI GIAN co dinh
//   - Tren Android: dung Foreground Service + Notification thuong truc
//     (bat buoc tu Android 8+ cho background location dai han)
//   - Tren iOS: dung "Significant-change location service" khi KHONG
//     can chinh xac cao, chi chuyen sang GPS chinh xac cao (standard
//     location service) khi THUC SU can (vd dang trong ca khan cap)


// ============================================================
// CHI TIET 2: "voice-activated SOS trigger" (Native Module)
// ============================================================
// CAU HOI CO THE BI HOI:
//   - "Voice-activated SOS hoat dong the nao khi app o background/man
//      hinh khoa - lam sao 'nghe' duoc lenh thoai lien tuc ma khong
//      tieu ton pin qua muc?"
//   - "Co dung wake-word detection tren thiet bi (on-device) khong, hay
//      goi len server? Neu tren thiet bi, dung thu vien/SDK nao?"
//   - "Vi sao PHAI viet Native Module rieng cho tinh nang nay, thay vi
//      dung thu vien JS co san?" (Cau nay noi thang toi Cau 11 -
//      react-native/native-modules/native-modules.tsx - ly do "khong co
//      san" hoac "can hieu nang/truy cap API he thong sau")
//
// KHUNG TRA LOI TOT NEN CO:
//   - Phan biet ro: co dang dung 1 SDK wake-word co san (vd Picovoice
//     Porcupine) hay tu build - VI SAO chon huong do
//   - Xu ly QUYEN RIENG TU: microphone luon bat de nghe la van de NHAY
//     CAM, can noi ro co CO CHE TAT/BAT tinh nang nay ro rang cho nguoi
//     dung, va tuan thu quy dinh App Store/Play Store ve microphone
//     background (rat de bi TU CHOI REVIEW neu khong giai thich ro
//     trong app description)
//   - Foreground service tren Android: PHAI co notification hien thi
//     LIEN TUC de nguoi dung biet app dang "nghe"


// ============================================================
// CHI TIET 3: Geofence (Rings/Location Groups) + escalation rules
// ============================================================
// CAU HOI CO THE BI HOI:
//   - "Dung API nao de lam geofencing? Android/iOS gioi han bao nhieu
//      geofence dong thoi cho 1 app?" (Android gioi han 100 geofence/app
//      - neu du an co NHIEU safe zone hon, can co logic chon LOC ra
//      geofence nao "active" gan vi tri hien tai nhat)
//   - "Do tre phat hien enter/exit co the toi bao nhieu? Anh huong gi
//      den tinh huong khan cap (can phan ung TRONG 90 GIAY theo mo ta
//      san pham)?"
//   - "Alert escalation rules - cu the la gi, co bao nhieu buc, ai
//      quyet dinh khi nao escalate?"
//
// KHUNG TRA LOI TOT NEN CO:
//   - Doi voi gioi han so luong geofence, can noi ro CHIEN LUOC (vd
//     chi active cac geofence GAN NHAT voi vi tri hien tai, cap nhat
//     dong khi user di chuyen)
//   - Vi day la app AN TOAN TINH MANG (phai phan hoi trong 90s), can
//     nhan manh: khong chi PHAI VAO geofence detection cua he dieu
//     hanh (co do tre vai chuc giay - vai phut tuy platform), ma con co
//     THEM lop kiem tra CHU DONG (active polling) khi o trong tinh
//     huong "nhay cam" de giam do tre


// ============================================================
// CHI TIET 4: "Missed check-in detection and automatic alert triggering"
// ============================================================
// CAU HOI CO THE BI HOI:
//   - "Neu app bi nguoi dung TAT HOAN TOAN (kill), lam sao van PHAT
//      HIEN duoc 'missed check-in' va TU DONG bao dong?"
//
// KHUNG TRA LOI TOT NEN CO (DAY LA CAU HOI BAY - logic client KHONG DU):
//   - Logic "missed check-in" KHONG THE chi dua vao timer PHIA CLIENT,
//     vi app co the bi kill hoan toan (timer se KHONG CHAY). Can co 1
//     SCHEDULED JOB PHIA SERVER (cron/queue) theo doi deadline check-in
//     cua tung user, TU KICH HOAT canh bao neu qua han MA KHONG NHAN
//     duoc check-in tu client, thay vi cho JS-side timer trong app
//   - Client chi co vai tro: GUI check-in len server dung han, va HIEN
//     THI/NHAC NHO nguoi dung (local notification) TRUOC khi den han


// ============================================================
// DIEM CAN TU CHUAN BI THEM (khong the doan tu CV, PHAI TU BAN DIEN VAO)
// ============================================================
// - 1 tinh huong CU THE ban da GAP KHO KHAN trong du an nay va cach xu
//   ly (chuan bi theo STAR: Tinh huong - Nhiem vu - Hanh dong - Ket qua)
// - Con so CU THE neu co (vd giam duoc bao nhieu % pin tieu hao sau khi
//   toi uu sampling, giam duoc bao nhieu giay do tre canh bao)
// - Vi sao chon Socket.IO thay vi cac giai phap realtime khac (WebSocket
//   thuan, MQTT - MQTT thuong PHU HOP HON cho IoT/tiet kiem pin, neu bi
//   hoi "sao khong dung MQTT" can co cau tra loi hop ly)
