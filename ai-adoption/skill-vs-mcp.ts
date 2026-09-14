/**
 * LAM RO TRUOC: "Skill" va "MCP" LA 2 KHAI NIEM KHAC NHAU, khong phai
 * 1 cai "con goi la" cai kia - noi lan giua 2 thu nay trong phong van
 * se lo ngay la hieu CHUA SAU, du van dang "dung AI nhieu".
 */

// ============================================================
// SKILL - MOT "QUY TRINH/HUONG DAN" DONG GOI SAN, AI LAM THEO
// ============================================================
// Skill la 1 TAP HUONG DAN (instructions) + co the kem THEO cong cu
// rieng, DONG GOI LAI thanh 1 "LENH" co the goi lai NHIEU LAN (vd
// go /review, /commit, /create-pr). Ban chat no la "DAY AI CACH LAM 1
// VIEC LAP DI LAP LAI THEO DUNG QUY TRINH BAN MUON", giong nhu 1 SOP
// (Standard Operating Procedure) ma AI se tuan theo moi lan duoc goi.
//
// Vi du: Skill "review" co the chua san huong dan "kiem tra logic loi,
// kiem tra security, kiem tra style theo convention cua team, KHONG
// duoc bao gio dung --no-verify khi commit..." - AI se LUON LAM DUNG
// THEO CAC BUOC nay moi lan Skill duoc goi, KHONG PHU THUOC vao AI
// "nho" tu prompt truoc do.


// ============================================================
// MCP (Model Context Protocol) - MOT GIAO THUC KET NOI AI TOI DU LIEU/
// CONG CU BEN NGOAI, DE AI "NHIN THAY" DU LIEU THAT, KHONG CHI DOAN
// ============================================================
// MCP la 1 CHUAN GIAO TIEP cho phep AI GOI TRUC TIEP toi 1 "MCP SERVER"
// (vd server cua Figma, GitHub, Jira, 1 database noi bo...) de LAY DU
// LIEU THAT SU/THUC HIEN HANH DONG THAT SU, thay vi CHI dua vao du lieu
// da duoc huan luyen san (training data, von co the CU/khong chinh xac).
//
// Vi du: "Figma MCP server" cho phep AI GOI API cua Figma de DOC DUOC
// CHINH XAC cau truc 1 file thiet ke (kich thuoc, mau sac, khoang cach,
// component da dat ten) - THAY VI AI chi "DOAN" tu 1 tam anh chup man
// hinh (screenshot), giup sinh CODE UI SAT VOI THIET KE HON NHIEU.


// ============================================================
// DIEM KHAC BIET COT LOI - DE NHO DE TRA LOI DUNG KHI BI HOI
// ============================================================
//              | Skill                          | MCP
// -------------------------------------------------------------------
// Ban chat      | 1 QUY TRINH/HUONG DAN co san    | 1 KENH KET NOI toi
//               | de AI LAM THEO                  | DU LIEU/CONG CU BEN NGOAI
// Giai quyet    | "LAM SAO cho DUNG QUY TRINH,     | "LAY DU LIEU THAT O DAU,
// van de gi     | LAP LAI DUOC MOI LAN"            | vi AI khong the TU BIET"
// Vi du         | /review, /commit-message,        | Figma MCP, GitHub MCP,
//               | /create-pr                       | Postgres MCP, Jira MCP
//
// MOI LIEN HE: 1 Skill CO THE GOI DEN 1 hay nhieu MCP server BEN TRONG
// no. Vi du: Skill "tao UI tu Figma" (quy trinh: doc design -> map
// sang component co san -> sinh code theo convention cua du an) SE
// DUNG Figma MCP (de LAY DU LIEU THAT tu file Figma) LAM 1 BUOC BEN
// TRONG quy trinh do - Skill la "CACH LAM", MCP la "NGUON DU LIEU" ma
// cach lam do can toi.


// ============================================================
// CACH TRA LOI KHI BI HOI "SU KHAC NHAU GIUA SKILL VA MCP"
// ============================================================
// "Skill la 1 quy trinh dong goi san de AI lam dung 1 viec lap di lap
// lai theo dung cach team minh muon, con MCP la 1 giao thuc de AI ket
// noi va lay du lieu THAT tu 1 he thong ben ngoai (Figma, GitHub...)
// thay vi chi doan tu training data. Trong du an cua minh, Skill 'tao
// UI tu thiet ke' SU DUNG Figma MCP o BEN TRONG de doc chinh xac thong
// so thiet ke, roi theo quy trinh cua Skill de sinh ra component dung
// convention cua du an."
