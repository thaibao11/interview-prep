/**
 * DOC FILE NAY TRUOC KHI DOC CAC FILE CHI TIET KHAC TRONG THU MUC NAY
 *
 * Toan bo mang Performance chi la 1 CAU CHUYEN DUY NHAT:
 * "Di theo DUNG 1 HANH TRINH - tu luc nguoi dung THAO TAC den luc MAT
 *  HO THAY KET QUA TREN MAN HINH - hieu nang co the VO O BAT KY 1 TRONG
 *  6 TRAM sau day."
 *
 * Hoc theo 6 TRAM nay, DUNG hoc 7 file roi le - vi tat ca 7 file kia
 * chi la "ZOOM VAO" 1 TRAM cu the trong hanh trinh nay.
 */

// ============================================================
// TRAM 0 (TRUOC KHI DI) - DO TRUOC, DUNG DOAN MO
// ============================================================
// Truoc khi sua bat cu tram nao ben duoi, LUON DO/PROFILE TRUOC (React
// DevTools Profiler, Flipper) de biet CHINH XAC tram nao dang hong,
// thay vi doan "chac la do cai nay".
// (Chi tiet o: debug-rerender-with-flipper.tsx)


// ============================================================
// TRAM 1 - RENDER: React co TINH LAI DUNG THU CAN TINH KHONG?
// ============================================================
// Moi lan co thay doi (state/props/context), React phai QUYET DINH
// "CAI GI THUC SU CAN VE LAI TREN MAN HINH". Neu no TINH LAI ca nhung
// THU KHONG CAN DOI (component cha re-render keo theo con khong lien
// quan), do la RE-RENDER THUA - lang phi ngay TU TRAM DAU TIEN.
// Voi DANH SACH DAI, con them 1 y: FlatList KHONG render het moi item
// cung luc, ma CHI render PHAN DANG NHIN THAY (ao hoa) - cac prop nhu
// windowSize/getItemLayout la de DIEU CHINH DUNG VUNG "nhin thay" do.
// (Chi tiet o: flatlist-optimization.tsx, ../hooks/re-render-optimization.tsx)


// ============================================================
// TRAM 2 - LUONG/KIEN TRUC: KET QUA DUOC "VAN CHUYEN" DEN NATIVE NHU THE NAO?
// ============================================================
// Sau khi React biet CAN DOI GI, thay doi do phai duoc DUA SANG native
// thread de THUC SU hien len man hinh. Day la noi:
//   - Neu JS thread DANG BAN (xu ly logic khac), moi thu "cho qua" no
//     deu bi UN LAI - animation/gesture chay tren JS thread se GIAT
//   - Bridge cu phai "DONG GOI" (serialize JSON) MOI LAN di qua - JSI
//     (kien truc moi) bo qua buoc dong goi nay, cho phep TRUC TIEP hon
//   - Hermes giup app "KHOI DONG NHANH HON" vi code JS da duoc BIEN
//     DICH SAN thanh bytecode TU LUC BUILD, khong phai "nau" (parse/
//     compile) lai tu dau moi lan mo app
// (Chi tiet o: ../architecture/big-picture-story.tsx, hermes-vs-jsc.tsx,
//  bridge-cost-and-new-architecture.tsx)


// ============================================================
// TRAM 3 - TAI NGUYEN: TREN DUONG DI CO "RO RI" HAY "VAC THUA" KHONG?
// ============================================================
// - RO RI (memory leak): 1 subscription/timer/listener KHONG DUOC HUY
//   khi component da unmount se TIEP TUC TON TAI, GIU LAI bo nho MAI -
//   giong 1 vet ro nho, KHONG THAY NGAY nhung CONG DON dan den kiet
//   suc (OOM, app bi kill)
// - VAC THUA (anh khong cache/khong dung size): tai lai 1 anh DA CO SAN
//   tu truoc, hoac tai anh DO PHAN GIAI CAO HON MUC CAN HIEN THI, la
//   dang "vac" nhieu hon can thiet tren moi chuyen di
// (Chi tiet o: memory-leaks.tsx, image-caching.tsx)


// ============================================================
// TRAM 4 - KHOI DONG: TRUOC KHI "CHUYEN DI" DAU TIEN CO THE BAT DAU
// ============================================================
// Day la 1 TRAM DAC BIET: no xay ra TRUOC KHI nguoi dung kip thao tac
// gi ca (luc mo app). Neu ban BAT app phai lam QUA NHIEU VIEC (goi API,
// khoi tao SDK nang, doc storage) NGAY LUC KHOI DONG, nguoi dung phai
// CHO LAU HON CAN THIET truoc khi thay man hinh dau tien. Giai phap:
// TRI HOAN (lazy load) nhung viec KHONG CAN NGAY, chi lam dung viec can
// thiet de HIEN MAN HINH DAU TIEN cang som cang tot.
// (Chi tiet o: how-i-optimize-performance.tsx, muc 5)


// ============================================================
// TRAM 5 - MANG & KICH THUOC GOI: CO DANG TAI/VAC DU THUA KHONG?
// ============================================================
// - MANG: goi lai API da co san trong cache, tai HET du lieu 1 luc thay
//   vi phan trang - la dang lam nhieu viec hon can, tuong tu Tram 3
//   nhung o TANG MANG thay vi tang bo nho
// - KICH THUOC GOI (bundle size): cang nhieu thu vien khong dung den bi
//   dong goi vao app, app cang "NANG" hon luc TAI VE VA luc MO LEN (lien
//   quan truc tiep Tram 4)
// (Chi tiet o: how-i-optimize-performance.tsx, muc 6)


// ============================================================
// SO DO 1 DONG DE NHAM MAT HINH DUNG CA HANH TRINH
// ============================================================
//
//   [Do truoc] -> RENDER (tinh dung thu can) -> LUONG/KIEN TRUC (van
//   chuyen ket qua sang native) -> TAI NGUYEN (khong ro ri, khong vac
//   thua) -> [rieng KHOI DONG: giam viec truoc chuyen di dau tien] ->
//   MANG & BUNDLE (khong tai/vac du thua)


// ============================================================
// CACH TU KIEM TRA XEM DA NHO DUNG MACH CHUA
// ============================================================
// Tu hoi lai THEO DUNG THU TU 6 TRAM, khong nhin dap an:
//   0. Vi sao PHAI do truoc, thay vi sua ngay theo cam tinh?
//   1. "Re-render thua" nghia la gi, va FlatList "ao hoa" nghia la gi?
//   2. JS thread ban thi anh huong gi den animation? Hermes giup ich
//      cho TRAM NAO, giup the nao?
//   3. Ke 2 dang "hao phi tai nguyen" thuong gap, moi dang cach fix la gi?
//   4. Vi sao Tram Khoi dong lai DAC BIET (xay ra TRUOC luc nao)?
//   5. Ke 2 huong toi uu o tram cuoi, moi huong 1 vi du?
//
// Tra loi duoc ca 6 cau THEO DUNG MACH la nam vung TOAN BO chu de -
// so lieu cu the (windowSize bao nhieu, ten ham AbortController...) chi
// la CHI TIET DIEN VAO khi can, khong phai thu hoc dau tien.


// ============================================================
// TOM TAT 1 CAU (hoc thuoc cau nay la du de mo dau cau tra loi)
// ============================================================
// "Minh nhin hieu nang nhu 1 hanh trinh tu luc nguoi dung thao tac den
// luc thay ket qua: dau tien la do truoc de biet dung cho hong, roi
// kiem tra render co tinh thua khong (memo, FlatList ao hoa), tiep theo
// la luong/kien truc co bi nghen khong (JS thread ban, Bridge cu, Hermes
// giup khoi dong nhanh hon), roi tai nguyen co bi ro ri hay vac thua
// khong (memory leak, cache anh), rieng luc khoi dong thi giam bot viec
// khong can ngay, va cuoi cung la mang/bundle co dang tai/vac du thua
// khong. Minh luon di theo dung thu tu nay de khong bo sot huong nao."
