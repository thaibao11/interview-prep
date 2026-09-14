/**
 * CAU 4 (Expo vs React Native CLI): Truong hop nao BAT BUOC phai dung
 * bare CLI thay vi Expo, ke ca Expo hien dai.
 */

// ============================================================
// BUOC 0: PHAN BIET VOI CAU 3 - DAY LA "BAT BUOC", KHONG PHAI "NEN"
// ============================================================
// Cau 3 noi ve TIEU CHI de CHON LUA khi ca 2 huong DEU KHA THI. Cau nay
// noi ve nhung truong hop Expo (KE CA Prebuild/Dev Client hien dai)
// KHONG DAP UNG DUOC VE MAT KY THUAT/QUY TRINH - tuc la KHONG CON LA
// LUA CHON THAT SU.


// ============================================================
// BUOC 1: TICH HOP VAO APP NATIVE DA CO SAN (BROWNFIELD)
// ============================================================
// Mo hinh Prebuild cua Expo GIA DINH RN la GOC CUA CA APP (Expo TU SINH
// RA toan bo project native tu dau). Neu ban co 1 app iOS/Android NATIVE
// LON DA CHAY PRODUCTION, va CHI muon NHUNG (embed) 1 VAI MAN HINH RN
// vao trong app native do (thay vi RN la toan bo app) - day la mo hinh
// "Brownfield". Prebuild KHONG PHU HOP cho mo hinh nay vi no se "XOA VA
// TAO LAI" toan bo project native, TRONG KHI ban can GIU NGUYEN phan
// code native GOC da co san va CHI THEM RN vao NHU 1 THU VIEN. Bare CLI
// (hoac tich hop RN thu cong khong qua Expo) phu hop hon RO RET.


// ============================================================
// BUOC 2: RANG BUOC BUILD/CI PHAI HOAN TOAN ON-PREMISE
// ============================================================
// EAS Build la DICH VU CLOUD cua Expo. Neu cong ty co CHINH SACH BAO
// MAT/NOI BO nghiem ngat KHONG CHO PHEP code/build DI QUA HA TANG cua 1
// ben thu 3 nao (yeu cau build 100% TREN HA TANG NOI BO/on-premise, vd
// nganh tai chinh/chinh phu voi quy dinh du lieu nghiem ngat) - day la
// LY DO KY THUAT/CHINH SACH BAT BUOC phai tu build (dung bare CLI + tu
// setup CI/CD rieng), KHONG THE dua vao EAS Build.
// (Luu y: Expo CO the build LOCAL khong qua EAS - nhung khi do LOI ICH
// chinh cua Expo la "khong can tu quan ly ios/android" van GIU NGUYEN,
// chi mat loi ich "build tren cloud" thoi - day KHONG PHAI ly do bat
// buoc phai chuyen sang bare CLI, chi la MOT PHAN cua Expo khong dung toi)


// ============================================================
// BUOC 3: CAN LEN PHIEN BAN REACT NATIVE MOI NHAT NGAY LAP TUC
// ============================================================
// Moi Expo SDK version gan CO DINH voi 1 phien ban RN cu the, va Expo
// SDK THUONG RA SAU RN 1 NHIP (vai tuan den vai thang) de kip TEST
// TUONG THICH voi he sinh thai Expo. Neu du an CAN 1 TINH NANG RN vua
// ra mat (vd 1 cai tien Fabric/JSI moi nhat) MA CHUA co trong Expo SDK
// hien tai, va KHONG THE CHO Expo SDK cap nhat theo kip - day la
// truong hop BAT BUOC dung bare CLI de TOAN QUYEN kiem soat phien ban RN.


// ============================================================
// BUOC 4: CAN THIET LAP NATIVE PROJECT QUA DAC THU, KHONG THE DIEN TA
// QUA CONFIG PLUGIN
// ============================================================
// Mac du config plugin (prebuild-cng.tsx) co the lam duoc RAT NHIEU
// (them permission, sua Info.plist/AndroidManifest, them file cau
// hinh...), MOT SO TRUONG HOP CUC KY DAC THU (vd cau truc multi-target
// Xcode rat phuc tap, tich hop 1 SDK yeu cau THAY DOI CAU TRUC project
// (khong chi THEM cau hinh) theo cach ma he thong "mods" cua config
// plugin CHUA HO TRO) van kho/khong the lam qua config plugin, BUOC
// phai tu tay can thiep TRUC TIEP vao project native nhu bare CLI.
// (Truong hop nay NGAY CANG HIEM vi he thong config plugin ngay cang
// day du, nhung VAN CON TON TAI voi mot so tich hop rat dac thu)


// ============================================================
// TOM TAT NGAN GON DE TRA LOI PHONG VAN
// ============================================================
// "Bare CLI la bat buoc (khong chi la 'nen') trong 4 truong hop chinh:
// (1) tich hop RN vao 1 app native da co san (brownfield) - vi Prebuild
// gia dinh RN la goc cua ca app; (2) rang buoc build/CI phai hoan toan
// on-premise vi ly do bao mat/chinh sach, khong the dua vao dich vu
// cloud EAS; (3) can len phien ban RN moi nhat ngay lap tuc ma khong the
// cho Expo SDK cap nhat theo kip; va (4) can thiet lap native project
// qua dac thu ma he thong config plugin chua ho tro dien ta duoc. Ngoai
// 4 truong hop nay, Expo hien dai voi Prebuild/Dev Client hoan toan dap
// ung duoc nhu cau native tuong duong bare CLI."
