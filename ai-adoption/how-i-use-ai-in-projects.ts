/**
 * CAU HOI: "Ban dung AI trong du an nhu the nao?"
 *
 * Ban da co 3 y RAT TOT (init doc source code, Skill cho quy trinh
 * lap lai, MCP cho Figma). Cai dang THIEU la 1 NHOM QUAN TRONG:
 * dung AI DE XAY TINH NANG AI NGAY TRONG SAN PHAM (khac han voi dung
 * AI de HO TRO VIET CODE) - va CV cua ban DA CO SAN vi du rat manh cho
 * dieu nay (Medipal - AI symptom assistant/RAG) ma chua duoc nhac toi.
 */

// ============================================================
// KHUNG TRA LOI - 5 NHOM (sap xep tu "AI ho tro dev" den "AI la 1
// PHAN CUA SAN PHAM")
// ============================================================
//
// 1. NAP NGU CANH DU AN CHO AI     (init, CLAUDE.md/.cursorrules)
// 2. TU DONG HOA QUY TRINH LAP LAI  (Skill: review, commit, PR)
// 3. TU THIET KE SANG CODE          (Figma MCP)
// 4. DEBUG & KIEM THU               (crash log analysis, sinh unit test)
// 5. AI LA 1 TINH NANG CUA SAN PHAM (RAG chatbot, LLM integration) <-
//    DAY LA PHAN DANG THIEU, VA LA DIEM KHAC BIET LON NHAT VOI DA SO
//    UNG VIEN KHAC (ho thuong CHI noi toi nhom 1-4)


// ============================================================
// NHOM 1: NAP NGU CANH DU AN CHO AI
// ============================================================
// "Em luon chay init (hoac tu viet CLAUDE.md/.cursorrules) de AI DOC
// duoc TOAN BO cau truc source code, convention dat ten, kien truc
// module cua du an TRUOC KHI bat dau lam viec - giup goi y code cua AI
// KHOP VOI STYLE cua team, thay vi sinh code 'chuan chung chung' khong
// giong code co san."


// ============================================================
// NHOM 2: TU DONG HOA QUY TRINH LAP LAI (SKILL)
// ============================================================
// "Voi cac thao tac lap di lap lai (code review, viet commit message
// dung convention, kiem tra PR, tao PR), em dong goi thanh cac Skill -
// 1 quy trinh co san de AI LUON LAM DUNG CACH team quy dinh, khong phu
// thuoc AI 'nho' tu prompt truoc do."
// (Xem ro hon phan biet Skill/MCP trong skill-vs-mcp.ts)


// ============================================================
// NHOM 3: TU THIET KE SANG CODE (FIGMA MCP)
// ============================================================
// "Voi man hinh UI, em dung MCP ket noi toi Figma de AI DOC DUOC CHINH
// XAC thong so thiet ke (kich thuoc, mau, khoang cach, ten component)
// thay vi doan tu screenshot - giup UI sinh ra SAT thiet ke hon va
// NHANH HON dang tay do tung gia tri."


// ============================================================
// NHOM 4: DEBUG & KIEM THU (PHAN CV DA GHI NHUNG CHUA NOI RA MIENG)
// ============================================================
// "Em dung AI de PHAN TICH CRASH LOG/stack trace tu Sentry/Crashlytics -
// dua log vao, AI giup KHOANH VUNG nhanh doan code nao co kha nang gay
// loi, dac biet huu ich voi crash KHO TAI HIEN (chi xay ra tren 1 so
// thiet bi/tinh huong cu the). Em cung dung AI de SINH SAN unit test
// cho cac ham logic (dac biet edge case de bo sot), roi tu review va
// dieu chinh lai truoc khi merge - AI giup viet NHANH BO KHUNG test,
// nhung LOGIC ASSERT quan trong van do minh tu kiem tra lai."


// ============================================================
// NHOM 5: AI LA 1 TINH NANG CUA SAN PHAM (KHAC HAN 4 NHOM TREN - DAY
// LA PHAN NEN CHU DONG NOI RA, VI THE HIEN CHIEU SAU KHAC BIET)
// ============================================================
// 4 nhom tren deu la "dung AI DE LAM VIEC NHANH HON" (AI ho tro DEV).
// Nhom nay la "XAY DUNG 1 TINH NANG AI CHO CHINH NGUOI DUNG CUOI dung" -
// day la CAU CHUYEN CO GIA TRI HON NHIEU trong mat interviewer senior,
// vi no khong chi la "biet dung cong cu" ma la "biet TICH HOP AI VAO
// KIEN TRUC SAN PHAM":
//
// "Trong du an Medipal (app benh nhan cua phong kham), em xay dung tinh
// nang AI symptom assistant - man hinh cho phep benh nhan HOI TRIEU
// CHUNG va nhan CAU TRA LOI dua tren NOI DUNG Y TE DA DUOC PHONG KHAM
// PHE DUYET (khong phai AI tu do tra loi bat ky thu gi tim duoc). Ve mat
// ky thuat, em tich hop mot dich vu RAG (Retrieval-Augmented Generation)
// qua OpenAI API: cau hoi cua benh nhan duoc dung de TIM KIEM (retrieve)
// cac doan noi dung y te LIEN QUAN NHAT tu knowledge base cua phong
// kham TRUOC, roi MOI dua CA cau hoi LAN cac doan noi dung do vao model
// de sinh cau tra loi - dam bao AI CHI TRA LOI DUA TREN TAI LIEU DA
// DUOC DUYET, giam rui ro 'bia' thong tin y te sai (hallucination). Ben
// giao dien, em lam UI STREAMING (tra loi hien dan tung chu, giong
// ChatGPT) de nguoi dung khong phai cho lau. Voi cau hoi CO DAU HIEU
// khan cap, luong duoc THIET KE DE CHUYEN TIEP sang bac si that thay vi
// de AI tu xu ly."


// ============================================================
// CAU KET (CHU DONG MOI HOI SAU - ky thuat da hoc o performance/
// hooks) - RAT PHU HOP VOI CAU HOI NAY VI CO NHIEU HUONG DE DAO SAU
// ============================================================
// "Do la nhung cach em dung AI trong du an, tu ho tro quy trinh phat
// trien den tich hop thang vao san pham. Anh/chi muon em di sau vao
// phan nao - vi du kien truc RAG cu the, hay cach em kiem soat rui ro
// khi dua AI-generated code vao production?"


// ============================================================
// DIEM CAN CHUAN BI THEM NEU BI HOI SAU VE RAG (Medipal)
// ============================================================
// - "Retrieve" cu the la GI - tim kiem bang gi (vector search/embedding,
//   hay full-text search don gian)? Neu dung vector search, luu vector
//   o dau (Pinecone, pgvector, hay tu build)?
// - "Function calling" (CV co nhac) - vi du cu the AI da GOI HAM NAO
//   trong luc tro chuyen (vd tra cuu lich hen, kiem tra bac si co ranh
//   khong) thay vi CHI tra loi van ban thuan?
// - Xu ly khi AI TRA LOI SAI/khong chac chan - co co che nao de NGUOI
//   DUNG BAO CAO, hay AI TU NHAN BIET va CHUYEN sang bac si that?


// ============================================================
// KHONG QUEN NHAC TOI - GIOI HAN/RUI RO KHI DUNG AI (DIEM CONG SENIOR)
// ============================================================
// Mot cau tra loi CHI TOAN KHEN AI se nghe THIEU CHIN CHAN. Nen chu
// dong them 1 CAU VE GIOI HAN neu con thoi gian:
// "Du dung AI nhieu, em luon REVIEW KY code AI sinh ra truoc khi merge,
// dac biet voi vung NHAY CAM (thanh toan, xac thuc, xu ly du lieu y te)
// - AI co the sinh code CHAY DUOC nhung KHONG DUNG BUSINESS LOGIC hoac
// BO SOT EDGE CASE, nen KHONG BAO GIO merge AI-generated code MA KHONG
// review ky nhu code tu dong nghiep."


// ============================================================
// TOM TAT NGAN GON DE TRA LOI PHONG VAN (BAN DAY DU)
// ============================================================
// "Em dung AI o nhieu tang: nap ngu canh du an qua init/CLAUDE.md de
// goi y code khop convention team; dong goi Skill cho cac quy trinh lap
// lai nhu review, commit, tao PR; dung Figma MCP de sinh UI sat thiet
// ke; dung AI phan tich crash log va sinh unit test. Nhung phan em thay
// gia tri nhat la tich hop AI THANG VAO SAN PHAM - vi du man hinh AI
// symptom assistant trong du an Medipal, dung RAG qua OpenAI API de tra
// loi cau hoi benh nhan dua tren noi dung y te da duyet, co UI streaming
// va co luong chuyen tiep bac si that voi cau hoi khan cap. Du dung AI
// nhieu, em van luon review ky truoc khi merge, dac biet voi vung nhay
// cam nhu thanh toan hay du lieu y te."
