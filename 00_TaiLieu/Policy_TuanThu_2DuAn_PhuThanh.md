# 🛡️ BẢNG POLICY TUÂN THỦ — 2 DỰ ÁN PHẦN MỀM XÃ PHÚ THÀNH

> **Phiên bản:** 1.0
> **Ngày:** 10/08/2026
> **Người soạn:** Gia (Tư vấn CĐS)
> **Phạm vi áp dụng:** (1) Hệ thống KPI & Nhiệm vụ · (2) Giao Diện CĐS
> **Cách dùng:** cổng kiểm tra bắt buộc tại mỗi mốc. **Không đạt = không đi tiếp.**

---

## 0. QUAN HỆ VỚI CÁC TÀI LIỆU KHÁC

| Tài liệu | Dùng cho | Khác biệt |
|---|---|---|
| `Bang_Policy_CDS_PhuThanh.xlsx` | Lọc **tài liệu nhà nước** trước khi nhập 5 sổ | Đối tượng là văn bản |
| **File này** | Kiểm soát **2 dự án phần mềm** | Đối tượng là sản phẩm phần mềm |

Giữ nguyên cách đánh nhóm A–F để hai bảng đọc nhất quán, bổ sung nhóm G (vận hành & bàn giao) vì phần mềm có vòng đời sau bàn giao mà văn bản không có.

---

## 1. CÁCH SỬ DỤNG

1. Mỗi khi hoàn thành một mốc → mở Mục 3, chạy đúng cổng tương ứng.
2. Mỗi dòng chấm một trong ba: **Đạt · Không đạt · Không áp dụng**. Chọn "Không áp dụng" phải ghi lý do.
3. Có bất kỳ mục ❌ nào trong **Danh sách dừng cứng** (Mục 4) → dừng, không thương lượng.
4. Ghi kết quả vào Mục 6 (nhật ký cổng), kèm ngày và người kiểm.
5. Cổng đã đạt nhưng phạm vi thay đổi sau đó → **chạy lại cổng đó**.

**Nguyên tắc nền:** thứ tự ưu tiên khi mâu thuẫn là **Pháp lý > An toàn dữ liệu > Đúng phạm vi > Tiến độ > Tính năng**. Không bao giờ đảo thứ tự này để kịp deadline.

---

## 2. DANH MỤC POLICY

Cột **Áp dụng**: `KPI` = Hệ thống KPI · `GDC` = Giao Diện CĐS · `Cả 2`

### NHÓM A — PHẠM VI

| Mã | Nội dung | Áp dụng | Câu hỏi kiểm tra | 🚩 Cờ đỏ |
|---|---|---|---|---|
| A1 | Chỉ làm phần thuộc thẩm quyền cấp xã | Cả 2 | Hạng mục này nằm ở cột "Phạm vi xã" hay cột "Tỉnh/TW" trong bảng phân định? | Sản phẩm đụng SOC, IOC, DTI, trục liên thông, CSDL quốc gia |
| A2 | Có căn cứ trong hồ sơ đã trình | Cả 2 | Hạng mục có trong Phụ lục III Phần II, hoặc trong kế hoạch năm được duyệt không? | Làm trước, hợp thức hóa sau |
| A3 | Phạm vi được chốt bằng văn bản | Cả 2 | Có biên bản chốt danh mục chức năng xã ký không? | Chức năng phát sinh qua tin nhắn, không có biên bản |
| A4 | Thay đổi phạm vi phải có phụ lục | Cả 2 | Chức năng mới so với biên bản gốc → đã lập phụ lục chưa? | Scope creep không kiểm soát |

### NHÓM B — KHÔNG TRÙNG NỀN TẢNG DÙNG CHUNG

| Mã | Nội dung | Áp dụng | Câu hỏi kiểm tra | 🚩 Cờ đỏ |
|---|---|---|---|---|
| B1 | Không xây lại thứ tỉnh/TW đã cung cấp | Cả 2 | Đã kiểm tra tỉnh có nền tảng tương đương chưa? Bằng cách nào, ngày nào? | Chưa hỏi mà đã kết luận "tỉnh không có" |
| B2 | Không trùng Cổng DVC / Một cửa | GDC | Chức năng này Cổng DVC quốc gia đã làm chưa? | Tra tiến độ hồ sơ, nộp hồ sơ, thanh toán lệ phí |
| B3 | Không trùng hệ thống báo cáo dùng chung | KPI | Hệ thống thông tin báo cáo của tỉnh có thay thế được không? | Xây lại chức năng báo cáo đã có |
| B4 | Kiểm tra chatbot dùng chung của tỉnh | GDC | Tỉnh đã/đang xây trợ lý ảo TTHC chưa? | Xây song song một cái tương tự |
| B5 | Ưu tiên khai thác trước khi tự xây | Cả 2 | Đã cân nhắc phương án dùng nền tảng sẵn có chưa? | Mặc định tự xây vì "dễ làm hơn" |

### NHÓM C — KINH PHÍ & MUA SẮM

| Mã | Nội dung | Áp dụng | Câu hỏi kiểm tra | 🚩 Cờ đỏ |
|---|---|---|---|---|
| C1 | Có nguồn kinh phí hợp lệ | Cả 2 | Kinh phí lấy từ khoản nào, đã được duyệt chưa? | Làm rồi mới tìm nguồn |
| C2 | **Không chia nhỏ gói mua sắm** | Cả 2 | Tổng giá trị các gói cùng nội dung, cùng năm, cùng nhà cung cấp là bao nhiêu? | 2 hợp đồng nhỏ cùng một người bán, cùng người ký, đều dưới ngưỡng |
| C3 | Vượt ngưỡng ⇒ chào giá cạnh tranh | Cả 2 | Tổng gói vượt ngưỡng chưa? Có đủ ≥3 báo giá độc lập chưa? | Chỉ định thầu cho gói lẽ ra phải cạnh tranh |
| C4 | Giá có neo thị trường kiểm chứng được | Cả 2 | Mỗi dòng dự toán có nguồn giá tham chiếu không? | Con số không truy được nguồn |
| C5 | **Tách chi phí một lần và chi phí thường niên** | Cả 2 | Chi phí vận hành từ năm sau ai trả, lấy từ đâu? | Chỉ tính chi phí xây, bỏ trống vận hành |
| C6 | Chi phí vận hành có cam kết nguồn | GDC | Hosting, LLM, giám sát năm 2027 đã có nguồn chưa? | Hệ thống chết sau năm đầu |

### NHÓM D — DỮ LIỆU & AN TOÀN THÔNG TIN

| Mã | Nội dung | Áp dụng | Câu hỏi kiểm tra | 🚩 Cờ đỏ |
|---|---|---|---|---|
| D1 | **Hệ thống internet-facing phải có hồ sơ cấp độ ATTT được phê duyệt trước khi vận hành** | GDC (và KPI nếu mở internet) | Cấp độ mấy? Ai phê duyệt? Ngày phê duyệt? | Go-live trước, hồ sơ sau |
| D2 | Tên miền `.gov.vn`, hosting trong nước | GDC | Tên miền là gì? Máy chủ đặt ở đâu? | `.pages.dev`, `.vercel.app`, hosting nước ngoài |
| D3 | Xác định rõ dữ liệu cá nhân được xử lý | Cả 2 | Hệ thống chạm vào dữ liệu cá nhân nào? Của ai? | "Chắc không có dữ liệu cá nhân đâu" |
| D4 | **Lập DPIA trước khi vận hành** | Cả 2 | Đã lập hồ sơ đánh giá tác động xử lý DLCN chưa? | Bỏ qua vì "hệ thống nhỏ" |
| D5 | **Chuyển dữ liệu xuyên biên giới phải có TIA** | Cả 2 | Có gọi dịch vụ đặt ngoài VN không? Đã lập TIA và gửi cơ quan chuyên trách chưa? | Gọi API LLM nước ngoài; lưu dữ liệu trên cloud nước ngoài |
| D6 | Ưu tiên xử lý dữ liệu trong nước | Cả 2 | Có phương án thay thế đặt tại VN không? Vì sao không chọn? | Chọn dịch vụ ngoại vì tiện, không vì cần |
| D7 | Lọc PII ở đầu vào trước khi gửi tới model | GDC | Có bộ lọc CCCD/SĐT/email chưa? Đã test chưa? | Tin rằng banner cảnh báo là đủ |
| D8 | **Không công khai dữ liệu cá nhân ngoài ý muốn** | KPI | Link CSV/dashboard công khai chứa những gì? Ai xem được? | Published-to-web CSV chứa tên cán bộ + đánh giá hiệu quả |
| D9 | Phân quyền theo vai, có ghi vết | KPI | Cán bộ A có thấy dữ liệu cán bộ B không? Có log ai sửa gì không? | Ai cũng sửa được mọi ô |
| D10 | Có thông báo xử lý dữ liệu cho người dùng | Cả 2 | Trang thông báo ở đâu? Nội dung có đủ mục đích, phạm vi, thời hạn không? | Không có gì |
| D11 | Có sao lưu và thử khôi phục | Cả 2 | Sao lưu tần suất nào? Đã test khôi phục chưa? | Có backup nhưng chưa bao giờ thử phục hồi |
| D12 | Bảo vệ máy công cộng | GDC | Kiosk có khóa chế độ, chặn USB, tự reset phiên chưa? | Kiosk thoát ra desktop được |

### NHÓM E — TOÀN VẸN SỐ LIỆU & NỘI DUNG

| Mã | Nội dung | Áp dụng | Câu hỏi kiểm tra | 🚩 Cờ đỏ |
|---|---|---|---|---|
| E1 | Tách bạch dữ liệu gốc và phần diễn giải | Cả 2 | Số liệu trích xuất và nhận xét có nằm ở cột/trường riêng không? | Trộn lẫn, không lọc được |
| E2 | **Nội dung TTHC không gõ tay** | GDC | Lấy từ nguồn nào? Ai đối chiếu? | Cán bộ tự soạn lại nội dung thủ tục |
| E3 | Mọi nội dung có ngày cập nhật hiển thị | GDC | Trường `ngay_cap_nhat` có hiện ra không? Quá hạn có cảnh báo không? | Thông tin không rõ cũ mới |
| E4 | **Số liệu quan trọng không do model sinh ra** | GDC | Lệ phí, thời hạn, thành phần hồ sơ render từ dữ liệu gốc hay từ câu trả lời của LLM? | Bot tự nói con số |
| E5 | Trợ lý chỉ trả lời trong kho đã duyệt, không đoán | GDC | Hỏi thủ tục không tồn tại → bot trả lời gì? | Bot bịa ra quy trình |
| E6 | Có cơ chế người dùng báo sai | GDC | Nút báo lỗi ở đâu? Ai xử lý? Trong bao lâu? | Không ai biết bot đang nói sai |
| E7 | Rà soát mẫu định kỳ | GDC | Bao nhiêu hội thoại/tuần được người đọc lại? | Không giám sát |
| E8 | Công thức tính minh bạch, kiểm tra được | KPI | Công thức Σ(kl×%)/Σ(kl) có tài liệu hóa không? Tính tay ra cùng kết quả không? | Số trên dashboard không ai giải thích được |
| E9 | Nguyên tắc "chưa nhập báo cáo = chưa thực hiện" được áp nhất quán | KPI | Có trường hợp ngoại lệ nào không? Ai duyệt ngoại lệ? | Nới lỏng tùy người |
| E10 | Có câu miễn trừ trách nhiệm | GDC | Câu miễn trừ hiển thị ở đâu? | Không có |

### NHÓM F — PHÁP LÝ & XUNG ĐỘT LỢI ÍCH

| Mã | Nội dung | Áp dụng | Câu hỏi kiểm tra | 🚩 Cờ đỏ |
|---|---|---|---|---|
| F1 | **Người ký duyệt không phải người có quan hệ thân thích với bên cung cấp** | Cả 2 | Ai ký duyệt? Quan hệ với bên cung cấp? | Anh Nam ký duyệt hợp đồng của Gia |
| F2 | Không vừa viết yêu cầu vừa bán giải pháp | Cả 2 | Ai viết yêu cầu kỹ thuật? Ai viết tiêu chí nghiệm thu? | Cùng một người làm cả ba vai |
| F3 | Có báo giá bên thứ ba đối chứng | Cả 2 | Bao nhiêu báo giá độc lập? Từ đơn vị nào? | Chỉ có báo giá của chính mình |
| F4 | Quan hệ lợi ích được ghi nhận công khai trong hồ sơ | Cả 2 | Đã ghi vào biên bản/hợp đồng chưa? | Giấu, để người khác phát hiện |
| F5 | Nội dung pháp lý được người có chuyên môn xác nhận | Cả 2 | Ai rà? Ngày nào? Bằng văn bản không? | Tự suy diễn điều khoản luật |
| F6 | Không dựa vào điều khoản miễn trừ chưa được xác nhận | Cả 2 | Có đang giả định mình được miễn nghĩa vụ nào không? Căn cứ đâu? | "Cơ quan nhà nước chắc được miễn" |
| F7 | Tuân thủ quy định về tài sản công khi mua sắm | Cả 2 | Quy trình mua sắm theo văn bản nào? | Mua trước, làm thủ tục sau |

### NHÓM G — VẬN HÀNH & BÀN GIAO

| Mã | Nội dung | Áp dụng | Câu hỏi kiểm tra | 🚩 Cờ đỏ |
|---|---|---|---|---|
| G1 | Xã sở hữu mã nguồn và dữ liệu | Cả 2 | Hợp đồng ghi rõ chưa? Đã bàn giao thực tế chưa? | Chỉ bàn giao bản chạy |
| G2 | Có tài liệu vận hành và quản trị | Cả 2 | Người khác đọc tài liệu có vận hành được không? | Chỉ Gia biết cách sửa |
| G3 | Không khóa chặt vào một nhà cung cấp | Cả 2 | Nếu đổi đơn vị khác tiếp quản, mất bao lâu? | Phụ thuộc hoàn toàn vào một người |
| G4 | Có người của xã chịu trách nhiệm từng phần | Cả 2 | Ai chịu trách nhiệm nội dung? Ai vận hành kỹ thuật? Có văn bản phân công không? | Không ai đứng tên |
| G5 | Có tập huấn và biên bản tập huấn | Cả 2 | Ngày nào, bao nhiêu người, nội dung gì? | Hướng dẫn miệng |
| G6 | Có quy trình xử lý sự cố | Cả 2 | Hệ thống sai/sập thì báo ai, trong bao lâu? | Không có |
| G7 | Nghiệm thu theo danh mục chức năng đã chốt | Cả 2 | Biên bản nghiệm thu đối chiếu với biên bản phạm vi chưa? | Nghiệm thu cảm tính |

---

## 3. CỔNG KIỂM TRA THEO MỐC

### 🚪 G0 — Trước khi bắt đầu (khởi động)
`A1` `A2` `B1` `B5` `C1` `F1` `F2` `F4`

> Cổng này quyết định **có nên làm dự án này không**. Trượt ở đây thì mọi việc sau đều lãng phí.

### 🚪 G1 — Chốt phạm vi (trước khi thiết kế)
`A3` `B2` `B3` `B4` `C2` `C3` `C4` `C5` `D1` `D2` `D3` `F3` `F5`

> **Riêng Giao Diện CĐS:** `D1` và `D2` phải có **trả lời bằng văn bản từ Sở**, không phải phỏng đoán. Chưa có văn bản = cổng chưa đạt.

### 🚪 G2 — Thiết kế xong (trước khi viết code)
`A4` `D4` `D5` `D6` `D7` `E1` `E2` `E4` `E8` `G3`

> Chọn LLM và chọn nơi đặt dữ liệu phải xong ở cổng này. Đổi sau khi đã code = làm lại.

### 🚪 G3 — Demo nội bộ (trước khi cho xã xem)
`E3` `E4` `E5` `E8` `E9` `E10` `D7` `D12`

> Demo là lần đầu người khác nhìn thấy sản phẩm. Nếu demo hiện số liệu sai, ấn tượng sai đó rất khó gỡ.

### 🚪 G4 — Trước UAT (xã dùng thử)
`D8` `D9` `D10` `D11` `E6` `E7` `G4` `G5`

> Kiểm `D8` thật kỹ với hệ KPI: mở link CSV/dashboard bằng cửa sổ ẩn danh, không đăng nhập, xem thấy gì.

### 🚪 G5 — 🔴 Trước khi go-live (cổng nặng nhất)
`D1` `D2` `D4` `D5` `D10` `E2` `E3` `E4` `E5` `E10` `C3` `C6` `F1` `F3` `F4` `F6` `F7` `G1` `G2` `G6` `G7`

> Không đạt bất kỳ mục nào trong cổng này ⇒ **không mở cho người dân/cán bộ dùng thật.**

### 🚪 G6 — Định kỳ sau go-live
| Tần suất | Kiểm |
|---|---|
| Hằng tuần | `E7` (rà soát mẫu hội thoại) · `E6` (hàng đợi báo sai) |
| Hằng quý | `E2` `E3` (rà nội dung TTHC) · `D11` (thử khôi phục backup) |
| 6 tháng | `D5` (cập nhật TIA nếu có) · `D4` (rà DPIA) |
| Hằng năm | `C6` (nguồn kinh phí năm sau) · `D1` (hồ sơ cấp độ còn hiệu lực) |

---

## 4. 🛑 DANH SÁCH DỪNG CỨNG

Gặp bất kỳ điều nào dưới đây → **dừng ngay, không đi tiếp bằng bất kỳ lý do tiến độ nào**:

1. Mở hệ thống ra internet khi **chưa có hồ sơ cấp độ ATTT được phê duyệt**
2. Đặt hệ thống của cơ quan nhà nước trên **hosting nước ngoài** hoặc tên miền không phải `.gov.vn`
3. Gửi dữ liệu cá nhân của người dân **ra nước ngoài** mà chưa có TIA
4. Để **API key lộ trong mã nguồn phía client**
5. Bot **tự sinh ra con số lệ phí / thời hạn / thành phần hồ sơ**
6. Công khai **tên cán bộ kèm đánh giá hiệu quả** ở đường link ai cũng mở được
7. **Chia nhỏ gói mua sắm** để né ngưỡng đấu thầu
8. Người ký duyệt là **người thân thích** với bên cung cấp, không có báo giá đối chứng
9. Dựa vào một **điều khoản miễn trừ chưa được xác nhận bằng văn bản**
10. Xây lại thứ **tỉnh/TW đã cung cấp** mà chưa kiểm tra

---

## 5. MA TRẬN ÁP DỤNG NHANH

| Nhóm | KPI | Giao Diện CĐS | Ghi chú |
|---|---|---|---|
| A — Phạm vi | ✅ | ✅ | |
| B — Không trùng lặp | ⚠️ | 🔴 | GDC rủi ro cao nhất |
| C — Kinh phí | 🔴 | 🔴 | Gộp gói ⇒ C2, C3 nặng cho cả hai |
| D — Dữ liệu & ATTT | ⚠️ | 🔴 | KPI: D8, D9. GDC: toàn nhóm |
| E — Toàn vẹn | ⚠️ | 🔴 | KPI: công thức. GDC: nội dung + AI |
| F — Pháp lý & COI | 🔴 | 🔴 | Như nhau, và nặng cho cả hai |
| G — Vận hành | ⚠️ | 🔴 | GDC có chi phí thường niên |

🔴 rủi ro cao · ⚠️ cần chú ý · ✅ tiêu chuẩn

---

## 6. NHẬT KÝ CỔNG

| Ngày | Dự án | Cổng | Kết quả | Mục không đạt | Hướng xử lý | Người kiểm |
|---|---|---|---|---|---|---|
| | | | | | | |
| | | | | | | |

---

## 7. GHI CHÚ QUAN TRỌNG

**Về nội dung pháp lý.** Các mục nhóm D và F tham chiếu quy định đang trong giai đoạn hoàn thiện hướng dẫn thi hành. File này là **công cụ quản trị rủi ro của bên tư vấn**, không phải ý kiến pháp lý. Trước khi dùng làm căn cứ trình xã hoặc ký hợp đồng, cần người có chuyên môn rà soát — đặc biệt các mục `D4` `D5` `F6` `C2` `C3`.

**Về nhóm F.** Đây là nhóm dễ bị bỏ qua nhất vì nó bất tiện cho chính người chạy dự án. Chấm nhóm F một cách trung thực là phần khó nhất của bảng này, và cũng là phần bảo vệ Gia nhiều nhất nếu về sau có ai đặt câu hỏi.

**Về việc chấm "Không áp dụng".** Mỗi lần chọn "Không áp dụng" phải ghi lý do vào nhật ký. Một cổng có quá nhiều "Không áp dụng" thường là dấu hiệu đang né, không phải dấu hiệu dự án đơn giản.

---

*Cập nhật khi có quy định mới hoặc khi phạm vi dự án thay đổi.*
