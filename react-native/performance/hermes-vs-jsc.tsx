/**
 * CAU 23 (React Native): Hermes engine mang lai loi ich gi so voi JSC.
 */

// ============================================================
// BUOC 0: JSC (JavaScriptCore) la gi
// ============================================================
// JSC la JS engine MAC DINH cua Safari/WebKit, duoc RN dung lam engine
// chay JS TRUOC KHI co Hermes. JSC PHAI BIEN DICH (parse + compile)
// TOAN BO code JS MOI LAN APP KHOI DONG, TREN CHINH THIET BI cua nguoi dung.


// ============================================================
// BUOC 1: HERMES giai quyet van de gi
// ============================================================
// Hermes la JS engine RIENG do Facebook/Meta phat trien, TOI UU RIENG
// CHO REACT NATIVE (khac JSC la engine "dung chung" cho browser). Loi ich
// chinh:
//
// 1. BYTECODE PRECOMPILATION - giam thoi gian KHOI DONG APP (startup time):
//    Voi JSC, code JS (dang text) duoc PARSE + COMPILE NGAY TREN THIET BI
//    moi lan mo app. Voi Hermes, code JS duoc BIEN DICH SAN THANH BYTECODE
//    NGAY LUC BUILD APP (tren may CI/build server), nen luc app khoi dong
//    tren thiet bi CHI CAN DOC BYTECODE co san va CHAY, KHONG can parse/
//    compile lai tu dau -> giam ro ret thoi gian tu luc bam icon den luc
//    thay man hinh dau tien (dac biet ro tren thiet bi CAU HINH THAP).
//
// 2. BO NHO (memory) THAP HON: Hermes duoc thiet ke voi GARBAGE COLLECTOR
//    rieng, toi uu cho dac thu cua mobile app (bo nho han che hon may
//    tinh/server), giup GIAM RAM SU DUNG so voi JSC trong nhieu truong hop.
//
// 3. KICH THUOC APP (app size) NHO HON: vi khong can dong goi 1 JS engine
//    "day du" nhu JSC/V8, Hermes duoc toi uu GON NHE hon cho rieng RN.
//
// 4. Ho tro tot hon cho DEBUGGING qua Chrome DevTools/Flipper voi cac
//    cong cu Hermes rieng (Hermes debugger).


// ============================================================
// BUOC 2: DANH DOI (trade-off) can biet
// ============================================================
// - Mot so tinh nang JS RAT MOI (vd 1 so API Intl day du, mot so cu
//   phap ES rat moi) co the CHUA duoc Hermes ho tro NGAY LAP TUC bang
//   JSC/V8 - can kiem tra compatibility khi dung API la
// - Hermes YEU CAU CAU HINH RIENG khi debug voi mot so cong cu cu, tuy
//   nhien voi cac ban RN gan day, Hermes da la MAC DINH va duoc ho tro
//   tot boi hau het tooling (Flipper, React DevTools)


// ============================================================
// BUOC 3: CACH KIEM TRA/BAT HERMES (de tra loi neu bi hoi ap dung the nao)
// ============================================================
// Tu RN 0.70 tro di, Hermes la ENGINE MAC DINH cho ca iOS va Android.
// Kiem tra/bat thu cong (voi ban RN cu hon):
//   android/app/build.gradle:
//     project.ext.react = [ enableHermes: true ]
//   ios/Podfile:
//     :hermes_enabled => true
//
// Kiem tra app dang chay Hermes hay khong tu code:
//   const isHermes = () => !!global.HermesInternal;


// ============================================================
// TOM TAT NGAN GON DE TRA LOI PHONG VAN
// ============================================================
// "Hermes la JS engine rieng cua Meta, toi uu chuyen cho React Native,
// khac JSC la engine dung chung tu Safari/WebKit. Loi ich lon nhat la
// BIEN DICH SAN THANH BYTECODE LUC BUILD, nen luc app khoi dong tren
// thiet bi khong can parse/compile JS tu dau nhu JSC, giam ro ret thoi
// gian khoi dong (startup time), dac biet tren thiet bi cau hinh thap.
// Ngoai ra Hermes con giup giam RAM su dung va kich thuoc app nho hon.
// Tu RN 0.70, Hermes la mac dinh cho ca 2 nen tang."
