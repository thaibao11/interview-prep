/**
 * CAU MO DAU: "Em hay trinh bay lifecycle trong React"
 *
 * Day la cau hoi RONG - neu liet ke ten phuong thuc kieu "hoc vet" se
 * nghe roi rac, thieu chieu sau. File nay la 1 KICH BAN TRA LOI CO THU
 * TU, di tu DINH NGHIA -> 3 GIAI DOAN -> THU TU CHAY CU THE -> LIEN HE
 * THUC TE (hooks) - dung ca 4 lop nay se the hien duoc chieu sau senior.
 */

// ============================================================
// LOP 1 - MO DAU BANG DINH NGHIA (1 CAU, luon noi truoc tien)
// ============================================================
// "Lifecycle la CHUOI CAC GIAI DOAN 1 component TRAI QUA, tu luc no
// DUOC TAO RA va gan vao cay giao dien, qua cac lan CAP NHAT, cho den
// luc no bi GO BO khoi giao dien. React cho phep minh 'moc vao' (hook
// vao) TUNG GIAI DOAN do de chay code dung luc can."


// ============================================================
// LOP 2 - 3 GIAI DOAN CHINH (noi TEN GIAI DOAN truoc, method sau)
// ============================================================
// 1. MOUNTING   - component duoc tao ra LAN DAU
// 2. UPDATING   - state/props doi, component RENDER LAI
// 3. UNMOUNTING - component bi go khoi giao dien
//
// (Chi tiet method + code moi giai doan: xem component-lifecycle.tsx)


// ============================================================
// LOP 3 - THU TU CHAY CU THE (phan hay bi HOI VAT/HOI SAU nhat)
// ============================================================
// Neu interviewer hoi tiep "vay cac phuong thuc do chay theo THU TU
// NAO", day la cau tra loi day du (bao gom ca cac method IT DUNG hon
// nhung VAN TON TAI - neu ban chi nho 3 cai chinh cung on, nhung biet
// them mach nay se GHI DIEM CHIEU SAU):
//
// --- Luc MOUNT ---
//   constructor
//     -> getDerivedStateFromProps   (it dung - tinh state TU props TRUOC render)
//     -> render
//     -> componentDidMount
//
// --- Luc UPDATE (state/props doi) ---
//   getDerivedStateFromProps
//     -> shouldComponentUpdate      (it dung - QUYET DINH co render tiep khong)
//     -> render
//     -> getSnapshotBeforeUpdate    (it dung - "chup" 1 gia tri TU giao
//                                     dien CU truoc khi no bi thay doi,
//                                     vd luu lai vi tri cuon TRUOC KHI
//                                     DOM thay doi, de khoi phuc dung cho)
//     -> componentDidUpdate         (nhan duoc gia tri "chup" o tren lam tham so)
//
// --- Luc UNMOUNT ---
//   componentWillUnmount
//
// -> MEO NHO THU TU: "props/state doi TRUOC, RENDER O GIUA, DID/EFFECT
//    LUON O SAU CUNG" - cac phuong thuc co chu "before/derived" luon
//    chay TRUOC render, cac phuong thuc co chu "did" luon chay SAU render.


// ============================================================
// LOP 4 - LIEN HE THUC TE (BAT BUOC noi phan nay - the hien kien thuc
// CAP NHAT, khong chi hoc thuoc class component da cu)
// ============================================================
// "Tuy nhien, trong du an thuc te hien nay minh dung function component
// + Hooks la chinh. useEffect voi dependency array GOM CHUNG
// componentDidMount va componentDidUpdate thanh 1 khai niem - khong con
// nghi theo 'thoi diem' nua ma theo 'dong bo voi gia tri nao', va ham
// return ben trong useEffect dong vai tro nhu componentWillUnmount."
// (Chi tiet: component-lifecycle.tsx)
//
// Neu bi hoi tiep "vay Hooks co thay THE HET class lifecycle khong" -
// tra loi: "Gan nhu het, TRU 1 truong hop: Error Boundary
// (componentDidCatch) VAN BAT BUOC phai la class component, chua co
// hook tuong duong." - day la 1 CAU TRA LOI GAY AN TUONG vi cho thay
// ban biet CA GIOI HAN cua Hooks, khong chi biet mat tot.


// ============================================================
// MAU CAU TRA LOI HOAN CHINH (doc thu, ghep du 4 lop tren)
// ============================================================
// "Lifecycle la chuoi cac giai doan 1 component trai qua tu luc duoc
// tao ra, qua cac lan cap nhat, den luc bi go bo khoi giao dien. Co 3
// giai doan chinh: Mounting - luc component duoc tao lan dau, di qua
// constructor, render, roi componentDidMount; Updating - moi khi state
// hoac props doi, component render lai roi chay componentDidUpdate;
// va Unmounting - componentWillUnmount duoc goi truoc khi component bi
// go bo, thuong dung de don dep subscription hay timer. Ngoai 3 cai
// chinh nay con co vai phuong thuc it dung hon nhu shouldComponentUpdate
// de kiem soat co render tiep hay khong, hoac getSnapshotBeforeUpdate
// de luu lai 1 gia tri tu giao dien cu truoc khi no thay doi. Trong du
// an thuc te, minh dung function component va Hooks la chinh, nen
// useEffect voi dependency array dong vai tro gop chung ca
// componentDidMount va componentDidUpdate, va ham return ben trong no
// thay the componentWillUnmount. Diem dang luu y la Error Boundary van
// bat buoc phai dung class component, vi Hooks chua co giai phap thay
// the cho componentDidCatch."
//
// -> Cau cuoi (Error Boundary) la "con at chu bai" - neu con thoi gian
//    hoac muon ghi diem them, chu dong noi ra thay vi doi bi hoi.
