/**
 * KICH BAN GIOI THIEU BAN THAN + WALKTHROUGH 2 DU AN GAN NHAT
 *
 * NGUYEN TAC: day la KHUNG de LUYEN NOI TU NHIEN BANG LOI RIENG, KHONG
 * PHAI hoc thuoc long tung chu - hoc thuoc se nghe cung, mat tu nhien.
 */

// ============================================================
// NGUYEN TAC CHUNG (doc truoc khi soan kich ban)
// ============================================================
// 1. KHONG liet ke HET moi gach dau dong trong CV - interviewer DA CO
//    CV trong tay, doc lai y nguyen la THUA va nghe ROBOT
// 2. CHI nhan vao 2-3 DIEM NOI BAT MOI DU AN - uu tien NHUNG DIEM BAN
//    DA CHUAN BI SAN cau tra loi sau (xem relyon-deep-dive.ts va
//    fwd-cube-deep-dive.ts) - vi INTERVIEWER SE HOI TIEP DUA TREN CHINH
//    NHUNG GI BAN VUA NOI, nen ban dang CHU DONG CHON "chien truong"
//    cho cau hoi tiep theo
// 3. Uu tien noi VE KET QUA/TAC DONG hon la liet ke cong nghe (vd "giup
//    responder nhan duoc vi tri trong X giay" thay vi chi noi "dung
//    Socket.IO")
// 4. KET THUC bang 1 CAU MOI HOI TIEP - dieu khien huong cau hoi thay
//    vi de interviewer tu do hoi lung tung
// 5. TONG THOI LUONG PHAN GIOI THIEU nen o muc 2-3 PHUT (khong dai hon) -
//    day chi la PHAN MO DAU, khong phai ke het su nghiep


// ============================================================
// PHAN 1 - GIOI THIEU BAN THAN (15-20 GIAY)
// ============================================================
// Cong thuc: [So nam kinh nghiem] + [Chuyen mon chinh] + [1-2 diem
// manh noi bat, gan voi JD neu biet] - KHONG can ke het ky nang trong CV

// VI DU (dieu chinh theo giong noi tu nhien cua ban):
`
Em la Bao, co hon 5 nam kinh nghiem lam React Native cho ca iOS va
Android. Em manh ve TypeScript, Redux Toolkit/React Query, va toi uu
hieu nang - Hermes, kien truc moi, FlashList, Reanimated - cho cac app
chay production o quy mo lon. Ben canh do em cung lam viec truc tiep voi
native code - viet Native Module bang Swift/Kotlin khi can tich hop cac
SDK/tinh nang ma JS thuan khong dap ung du.
`;
// -> CHI 3-4 CAU, KHONG lan man qua nhieu ve hoc van/qua khu xa


// ============================================================
// PHAN 2 - DU AN GAN NHAT: RELYON (45-60 GIAY)
// ============================================================
// Cong thuc cho MOI du an: [1 cau boi canh SAN PHAM la gi] + [2-3 DIEM
// BAN LAM, uu tien diem DA CHUAN BI SAU] + [1 KET QUA/TAC DONG neu co
// so lieu]

`
Du an gan nhat cua em la RELYON - mot app bao ve ca nhan, ket noi nguoi
dung voi doi phan ung trong vong 90 giay khi co tinh huong khan cap.

Phan em phu trach chinh la realtime tracking: stream vi tri nguoi dung
qua Socket.IO, co co che dieu chinh tan suat lay vi tri theo tinh trang
pin de khong lam hao pin qua muc, va xu ly reconnection khi mat mang.

Em cung viet Native Module bang Swift va Kotlin de xu ly location nen
va trigger SOS bang giong noi, cung voi foreground service ben Android
de dam bao viec theo doi vi tri khong bi he dieu hanh tat ngam.

[CHEN SO LIEU THAT NEU CO - vi du: "nho toi uu sampling, giam duoc
khoang X% muc tieu hao pin so voi ban dau" hoac "dam bao do tre canh
bao duoi Y giay"]
`;

// LUU Y: CAU "dieu chinh tan suat theo pin" va "Native Module cho SOS"
// la 2 DIEM DA CHUAN BI SAU trong relyon-deep-dive.ts - CHU DONG nhac
// toi de, NEU interviewer hoi tiep, ban CO SAN cau tra loi thay vi bi
// dong. TRANH nhac toi chi tiet ban CHUA chuan bi ky (vd neu chua chac
// ve "geofence gioi han 100/app" thi KHONG can chu dong dua chi tiet do ra)


// ============================================================
// PHAN 3 - DU AN THU 2: FWD CUBE (45-60 GIAY)
// ============================================================
`
Truoc RELYON, em lam FWD Cube - nen tang ho tro tu van vien bao hiem,
diem dac biet la du an nay dung React Native Expo de chia se 1 codebase
cho ca iOS, Android va Web.

Em phu trach phan dang nhap chung (single sign-on) voi xu ly refresh
token tu dong va yeu cau xac thuc lai bang van tay sau khi session het
han. Em cung tich hop mua hang trong app voi validate receipt o phia
server de dam bao bao mat, khong chi tin tuong client.

Mot phan em thay dang nho la viet 1 Expo config plugin de bridge 1 SDK
scan tai lieu va ky dien tu cua ben thu 3 vao project - vi SDK do chua
co san config plugin.

[CHEN 1 CAU CHUYEN THAT neu co - vi du tung gap loi gi khi lam config
plugin, hoac 1 con so ve hieu qua]
`;

// LUU Y: "Expo config plugin" la DIEM RAT DANG NHAC TOI CHU DONG, vi no
// (1) the hien kien thuc SAU ve Expo Prebuild (khong phai ai cung biet),
// va (2) DE DANG dan interviewer hoi ve TAI SAO du an nay dung Expo
// trong khi CV ghi CLI la "primary" - CAU HOI NAY BAN DA CO SAN CAU TRA
// LOI (xem fwd-cube-deep-dive.ts, phan "MAU THUAN TIEM AN") - CHU DONG
// nhac toi Expo o day CHINH LA CACH "MOI" interviewer hoi dung cau ban
// da chuan bi, thay vi ho tu hoi 1 huong khac ban chua chuan bi ky.


// ============================================================
// PHAN 4 - CAU KET, CHU DONG MOI HOI TIEP (5-10 GIAY)
// ============================================================
`
Do la 2 du an gan nhat cua em. Anh/chi muon em di sau vao phan nao a -
phan ky thuat cu the, hay em ke them ve cac du an truoc do?
`;
// -> Cau nay QUAN TRONG: no (1) bao hieu ban DA KE XONG, tranh im lang
//    gay gong, va (2) CHU DONG DE INTERVIEWER CHON HUONG, giup ban BIET
//    TRUOC ho quan tam gi de TAP TRUNG tra loi, thay vi doan mo


// ============================================================
// NHUNG DIEU CAN TRANH KHI KE
// ============================================================
// - TRANH doc lien tuc CA CHUOI cong nghe khong ngat (vd "em dung
//   Redux Toolkit, React Query, Socket.IO, Firebase FCM, Firestore,
//   Crashlytics, Analytics, Remote Config, Deeplink, NodeJS NestJS...")
//   - nghe nhu DOC LAI CV, khong co CAU CHUYEN, VA cho interviewer QUA
//   NHIEU HUONG de hoi ngau nhien vao dieu ban chua chuan bi
// - TRANH noi "em lam MOI THU trong du an" - HAY RO RANG PHAN NAO la
//   PHAN CHINH BAN PHU TRACH, thay vi mo ta ca du an nhu the ban lam
//   toan bo mot minh (interviewer senior se NGHI NGO neu nghe qua chung
//   chung, vi 1 du an 200 MM khong the 1 nguoi lam het)
// - TRANH IM LANG dot ngot khong biet ket thuc luc nao - luon co CAU
//   KET mo duong cho interviewer hoi tiep (Phan 4)


// ============================================================
// CACH LUYEN TAP
// ============================================================
// 1. Doc to phien ban tren 2-3 lan, CHINH LAI THANH LOI VAN TU NHIEN
//    CUA CHINH BAN (khong copy nguyen van cau chu trong file nay)
// 2. Bam GIO khi noi thu - dam bao TONG THOI GIAN Phan 1+2+3+4 nam
//    trong 2-3 PHUT
// 3. Sau khi noi xong Phan 2 (RELYON), TU HOI: "neu interviewer hoi
//    ngay ve battery-aware sampling luc nay, minh tra loi duoc khong?"
//    - neu CHUA chac, quay lai doc relyon-deep-dive.ts truoc khi luyen tiep
