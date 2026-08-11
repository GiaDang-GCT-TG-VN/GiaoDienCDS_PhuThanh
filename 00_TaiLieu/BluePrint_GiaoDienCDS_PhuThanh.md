# 🌐 BLUEPRINT — GIAO DIỆN CĐS XÃ PHÚ THÀNH (v0.2)

> **Phiên bản:** 0.2 — Nền tảng trực tuyến + Trợ lý AI
> **Ngày:** 10/08/2026
> **Người soạn:** Gia (Tư vấn CĐS)
> **Trạng thái:** 🔴 Nháp — có **2 điểm chặn pháp lý** phải gỡ trước khi code (Mục 2)
> **Thay đổi so với v0.1:** chuyển từ kiosk offline sang platform online có chatbot AI. Đây là **đổi nhóm rủi ro**, không phải sửa chi tiết. Bản v0.1 lưu tại `BluePrint_GiaoDienCDS_PhuThanh_v0.1_kiosk.md`

---

## 0. TÓM TẮT MỘT TRANG

| Hạng mục | v0.1 (kiosk) | **v0.2 (online + AI)** |
|---|---|---|
| Hình thái | Máy tại reception, chạy local | **Web app công khai + kiosk là 1 điểm truy cập** |
| Hosting | Không có | **`.gov.vn`, máy chủ trong nước** |
| Hồ sơ ATTT | Không phát sinh | **Bắt buộc, phê duyệt trước khi vận hành** |
| Dữ liệu cá nhân | Không thu thập | **Không chủ động thu — nhưng dân sẽ tự nhập vào chat** |
| Luật 91/2025 (BVDLCN) | Không áp dụng | **Áp dụng đầy đủ** |
| Chi phí vận hành | ~0 | **Thường niên: hosting + LLM + giám sát** |
| Trách nhiệm khi sai | Nội dung cũ (truy được) | **Bot sinh câu sai, không lặp lại được** |
| Thời gian triển khai | 2–3 tháng | **Phụ thuộc hồ sơ ATTT + cấp tên miền — ngoài tầm kiểm soát** |

---

## 1. CĂN CỨ PHÁP LÝ ÁP DỤNG

| Văn bản | Nội dung liên quan | Hệ quả với dự án |
|---|---|---|
| Luật An toàn thông tin mạng 2015 + **NĐ 85/2016** | Hệ thống thông tin của cơ quan nhà nước phải xác định và phê duyệt cấp độ ATTT | Không có hồ sơ ⇒ không được vận hành |
| **Luật 91/2025/QH15** (BVDLCN, hiệu lực 01/01/2026) | Điều 21 — hồ sơ đánh giá tác động xử lý DLCN (DPIA); Điều 22 — chuyển DLCN xuyên biên giới | Chatbot xử lý câu hỏi của dân = xử lý DLCN |
| **NĐ 356/2025/NĐ-CP** | Hướng dẫn Luật 91; biểu mẫu hồ sơ | Mẫu 09 (báo cáo TIA), Mẫu 01a (thông báo) |
| Luật 91 — dùng nền tảng ngoài lãnh thổ VN xử lý DLCN thu thập tại VN | Được xác định là chuyển dữ liệu xuyên biên giới | **Gọi API LLM nước ngoài rơi vào diện này** |
| Hồ sơ TIA | Gửi Cục An ninh mạng (A05) trong **60 ngày** kể từ ngày chuyển dữ liệu | Nghĩa vụ liên tục, cập nhật định kỳ |
| NĐ 42/2022 | Cung cấp thông tin & DVC trực tuyến của cơ quan nhà nước | Tên miền, nội dung, trách nhiệm |
| CV 3163/SKH&CN-CĐS + Phụ lục I | Không đầu tư trùng lặp; ưu tiên nền tảng dùng chung | Phải chứng minh không trùng Cổng DVC |

> ⚖️ **Lưu ý:** Luật 91 có nêu trường hợp không phải đánh giá tác động chuyển dữ liệu xuyên biên giới đối với *cơ quan nhà nước có thẩm quyền*. **Không tự suy diễn để áp dụng.** Phạm vi điều khoản này phải do luật sư/cơ quan chuyên trách xác nhận bằng văn bản trước khi dựa vào. Thiết kế dưới đây chọn cách **không cần dùng tới điều khoản đó**.

---

## 2. 🔴 HAI ĐIỂM CHẶN — GỠ TRƯỚC KHI VIẾT DÒNG CODE ĐẦU TIÊN

### Chặn 1 — Hồ sơ cấp độ ATTT
Xã hiện **cấp độ 1**. Hệ thống có giao diện internet phục vụ công dân nhiều khả năng phải **cấp độ 2 trở lên**. Hồ sơ cấp độ 3 mới nằm trong kế hoạch Q4/2026 (Sổ tay mục A7).

**Việc phải làm:** hỏi Sở KH&CN bằng văn bản — hệ thống này cần cấp độ mấy, thẩm quyền phê duyệt thuộc ai, thời gian bao lâu. **Không đoán.**

### Chặn 2 — Tên miền & hạ tầng
Phải xin tên miền `.gov.vn` qua tỉnh, hosting đặt trong nước. Thời gian cấp phát **không nằm trong tay anh**.

**Việc phải làm:** xác nhận tỉnh có cấp subdomain cho xã không, hay phải đặt dưới cổng tỉnh.

> 💡 **Hệ quả lập kế hoạch:** hai chặn này khiến mốc go-live không dự báo được. Vì vậy Mục 9 chia dự án làm **2 pha** — Pha 1 làm được ngay, Pha 2 chờ hồ sơ.

---

## 3. KIẾN TRÚC

```
                    Internet
                        │
              ┌─────────┴─────────┐
              │  Người dân (điện  │
              │  thoại/máy tính)  │
              └─────────┬─────────┘
                        │ HTTPS
        ┌───────────────▼────────────────┐
        │   giaodiencds.<...>.gov.vn     │
        │   (hosting trong nước)         │
        │                                │
        │  ┌──────────────────────────┐  │
        │  │ Frontend (static)        │  │
        │  │ HTML+Tailwind+Alpine     │  │
        │  └──────────┬───────────────┘  │
        │             │                  │
        │  ┌──────────▼───────────────┐  │
        │  │ Backend FastAPI          │  │
        │  │  ├─ /tthc      (tra cứu) │  │
        │  │  ├─ /chat      (RAG)     │  │
        │  │  └─ /feedback  (ẩn danh) │  │
        │  └──────────┬───────────────┘  │
        │             │                  │
        │  ┌──────────▼───────────────┐  │
        │  │ Lọc PII (chặn 2 chiều)   │  │◄── BẮT BUỘC
        │  └──────────┬───────────────┘  │
        │             │                  │
        │  ┌──────────▼───────────────┐  │
        │  │ Vector store + kho TTHC  │  │
        │  │ (đã được cán bộ duyệt)   │  │
        │  └──────────┬───────────────┘  │
        └─────────────┼──────────────────┘
                      │
        ┌─────────────▼──────────────┐
        │  LLM ĐẶT TẠI VIỆT NAM      │
        │  Viettel/FPT/VinAI/Zalo AI │
        │  hoặc self-host mô hình mở │
        └────────────────────────────┘

  Kiosk tại reception = trình duyệt kiosk trỏ vào cùng URL
  (giữ nguyên toàn bộ biện pháp bảo vệ máy công cộng của v0.1)
```

**Quyết định kiến trúc quan trọng nhất: LLM đặt trong nước.**

| Phương án | Xuyên biên giới? | Hồ sơ phải làm | Đánh giá |
|---|---|---|---|
| OpenAI / Anthropic / Gemini API | **Có** | DPIA + TIA + cập nhật 6 tháng/lần + gửi A05 | ❌ Không khuyến nghị |
| LLM Việt Nam (Viettel/FPT/VinAI/Zalo) | Không | DPIA | ✅ **Khuyến nghị** |
| Self-host mô hình mở tại VN | Không | DPIA | ✅ Tốt nếu đủ hạ tầng |
| **Không dùng LLM** (Mục 5) | Không | Tối thiểu | ✅ Cân nhắc nghiêm túc |

---

## 4. TRỢ LÝ AI — RÀNG BUỘC THIẾT KẾ

### 4.1. Nguyên tắc cứng

| # | Ràng buộc | Lý do |
|---|---|---|
| R1 | **Chỉ RAG, không sinh tự do.** Trả lời duy nhất từ kho TTHC đã duyệt | Bot bịa = UBND xã nói sai |
| R2 | **Không tìm thấy ⇒ không đoán.** Trả về "vui lòng liên hệ cán bộ tại quầy" | Thà im lặng còn hơn sai |
| R3 | **Lệ phí, thời hạn, thành phần hồ sơ KHÔNG do model sinh.** Render từ dữ liệu gốc, kèm ngày cập nhật | Đây là các con số dân hành động theo |
| R4 | Mọi câu trả lời **kèm nguồn** (tên thủ tục + ngày cập nhật) | Truy vết được |
| R5 | **Từ chối ngoài phạm vi:** tư vấn pháp lý cho vụ việc cụ thể, chính trị, khiếu nại, y tế, bất kỳ chủ đề ngoài TTHC | Chống lạm dụng + chống phát ngôn sai danh nghĩa cơ quan |
| R6 | Chống prompt injection: tách chỉ dẫn hệ thống khỏi input, không cho đổi vai | Người dùng dụ bot phát ngôn bậy |
| R7 | Nhiệt độ thấp, độ dài giới hạn | Giảm bịa |
| R8 | Luôn kết bằng lối thoát sang người thật | Bot không phải điểm cuối |

### 4.2. Xử lý dữ liệu cá nhân

Giả định nền tảng: **người dân SẼ tự gõ tên, CCCD, số điện thoại vào ô chat** dù có cảnh báo hay không. Thiết kế phải chịu được điều đó.

| Biện pháp | Chi tiết |
|---|---|
| Banner cố định | "Không nhập CCCD, số điện thoại, thông tin cá nhân" — hiện thường trực, không phải popup bấm tắt |
| **Lọc PII chiều vào** | Regex + rule phát hiện CCCD/SĐT/email/số sổ → thay bằng `[đã ẩn]` **trước khi** gửi tới model |
| Lọc chiều ra | Bot không được nhắc lại chuỗi giống PII |
| Không đăng nhập | Không tài khoản ⇒ không hồ sơ người dùng |
| Không lưu hội thoại gắn người | Log đã khử nhận dạng, giữ tối đa 90 ngày, chỉ để cải thiện chất lượng |
| Thông báo xử lý dữ liệu | Trang riêng, mô tả rõ dữ liệu nào được xử lý, mục đích, thời hạn — theo Luật 91 |
| Người phụ trách BVDLCN | Xã phân công bằng văn bản |
| **DPIA** | Lập trước khi vận hành |

### 4.3. Giám sát chất lượng
- **Rà soát mẫu hằng tuần:** cán bộ đọc ngẫu nhiên 20 hội thoại, chấm đúng/sai
- Nút "Câu trả lời này chưa đúng" → vào hàng đợi xử lý
- Sai về lệ phí/thời hạn/thành phần hồ sơ ⇒ **sự cố nghiêm trọng**, sửa trong 24h
- Ghi nhật ký phiên bản kho tri thức để truy được bot đã nói gì vào thời điểm nào

---

## 5. ⭐ PHƯƠNG ÁN ĐỐI CHỨNG: TRỢ LÝ KHÔNG DÙNG LLM

Bắt buộc đưa vào so sánh trước khi chốt.

**Cách làm:** ô tìm kiếm tiếng Việt + cây quyết định có hướng dẫn ("Bạn cần làm gì? → Hộ tịch → Khai sinh → Trường hợp nào?"). Với người dân, cảm giác gần như chatbot.

| Tiêu chí | Có LLM | Không LLM |
|---|---|---|
| Rủi ro bịa đặt | Có, phải giám sát liên tục | **Bằng 0** |
| Luật 91 / TIA | Phải xử lý | Tối thiểu |
| Chi phí vận hành | Thường niên, theo lượt hỏi | **~0** |
| Câu hỏi lạ, diễn đạt tự do | Tốt hơn | Kém hơn |
| Thời gian làm | Dài | Ngắn |
| Thuyết phục lãnh đạo | "Có AI" | Ít hấp dẫn hơn |

> 📌 Nếu ~90% câu hỏi của dân rơi vào 30 thủ tục quen thuộc, phương án không-LLM **thắng về mọi mặt trừ hình thức**. Đề nghị: thống kê thực tế câu hỏi tại quầy trong 2 tuần rồi mới quyết.

---

## 6. PHÂN TẦNG CHỨC NĂNG (cập nhật)

### 🟢 Tầng 1 — Không PII, làm được sớm
1.1 Tra cứu TTHC theo lĩnh vực · 1.2 Chi tiết thủ tục (kèm ngày cập nhật) · 1.3 QR tải biểu mẫu · 1.4 QR dẫn Cổng DVC · 1.5 Hướng dẫn "3 bước nộp trực tuyến" · 1.6 Sơ đồ quầy, lịch trực · 1.7 Đánh giá hài lòng ẩn danh · 1.8 **Trợ lý hỏi–đáp (RAG hoặc cây quyết định)**

### 🟡 Tầng 2 — Cần hồ sơ + văn bản cho phép
2.1 Tra tiến độ hồ sơ (cần API tỉnh; xã **không** tự lưu) · 2.2 Lấy số thứ tự (chỉ khi Một cửa chưa có) · 2.3 Tiếp nhận phản ánh (cần quy chế + người chịu trách nhiệm)

### 🔴 Tầng 3 — Không làm
Nhập CCCD · chụp/quét giấy tờ · đăng nhập DVC ngay trên nền tảng · thanh toán lệ phí · lưu lịch sử gắn người dùng · **bot tư vấn pháp lý cho vụ việc cụ thể**

---

## 7. QUẢN TRỊ NỘI DUNG (giữ nguyên từ v0.1 — vẫn là rủi ro số 1)

| Quy tắc | Chi tiết |
|---|---|
| Không gõ tay nội dung TTHC | Lấy từ CSDL quốc gia về TTHC; cán bộ **đối chiếu**, không sáng tác |
| Mỗi thủ tục có `ngay_cap_nhat` hiển thị | Quá 90 ngày → tự cảnh báo "vui lòng đối chiếu tại quầy" |
| 01 cán bộ chịu trách nhiệm nội dung | Phân công bằng văn bản |
| Rà soát tối thiểu hằng quý | Và ngay khi có văn bản mới |
| Câu miễn trừ cố định | "Thông tin mang tính hướng dẫn. Thông tin chính thức tại Cổng DVC quốc gia và cán bộ tiếp nhận." |
| **Kho tri thức của bot = kho TTHC đã duyệt** | Không thêm nguồn ngoài |

---

## 8. CHI PHÍ VẬN HÀNH THƯỜNG NIÊN (mới hoàn toàn so với v0.1)

| Khoản | Tần suất | Ghi chú |
|---|---|---|
| Hosting trong nước | Năm | VNPT/Viettel IDC/FPT Cloud |
| Tên miền `.gov.vn` | Năm | Qua tỉnh |
| Chứng thư số SSL | Năm | |
| LLM (API hoặc self-host) | **Theo lượt hỏi** | Khoản khó dự báo nhất |
| Giám sát & rà soát nội dung | Nhân công thường xuyên | Của xã |
| Duy trì hồ sơ ATTT + DPIA | Định kỳ | |
| Bảo trì, vá bảo mật | Thường xuyên | |

> ⚠️ **Câu hỏi phải trả lời trước khi ký:** ai trả các khoản này từ năm 2027? Nếu chưa có câu trả lời, hệ thống sẽ chết sau năm đầu — và cái chết đó mang tên xã.

---

## 9. LỘ TRÌNH 2 PHA

### Pha 1 — Làm được ngay, không vướng chặn (T8–T10/2026)
- Xây dựng & chuẩn hóa kho dữ liệu TTHC (`tthc.json`) — **tài sản dùng lại cho mọi pha**
- Thống kê câu hỏi thực tế tại quầy 2 tuần → quyết định LLM hay không-LLM
- Dựng frontend + tra cứu + đánh giá hài lòng
- **Triển khai bản kiosk offline tại reception** (theo v0.1) → xã có kết quả nhìn thấy ngay
- Song song: gửi văn bản hỏi Sở về cấp độ ATTT & tên miền

### Pha 2 — Sau khi gỡ 2 điểm chặn
- Hồ sơ cấp độ ATTT được phê duyệt
- Cấp tên miền + thuê hosting trong nước
- Lập DPIA, ban hành thông báo xử lý dữ liệu
- Bật backend + trợ lý hỏi–đáp
- Kiểm thử với người dân thật (≥10 người trên 50 tuổi)
- Vận hành thử có giám sát chặt 4 tuần → mở rộng

> Chia pha để xã có sản phẩm dùng được ngay, không bị treo chờ thủ tục — đồng thời không đánh cược tiến độ vào thứ ngoài tầm kiểm soát.

---

## 10. RỦI RO (cập nhật)

| Rủi ro | Mức | Giảm thiểu |
|---|---|---|
| Vận hành khi chưa có hồ sơ cấp độ ATTT | **Rất cao** | Không go-live trước khi phê duyệt. Không có ngoại lệ |
| Bot trả lời sai lệ phí/thành phần hồ sơ | **Rất cao** | R1–R4; số liệu không do model sinh; rà soát tuần |
| Dân tự nhập PII vào chat → ra nước ngoài | **Rất cao** | LLM đặt trong nước + lọc PII chiều vào |
| Prompt injection, phát ngôn sai danh nghĩa cơ quan | **Cao** | R5, R6; giới hạn phạm vi; giám sát |
| Nội dung TTHC lỗi thời | **Cao** | Mục 7 |
| Không ai trả chi phí vận hành từ 2027 | **Cao** | Chốt nguồn kinh phí thường xuyên trước khi ký |
| Gộp gói vượt ngưỡng → sai quy trình mua sắm | **Cao** | Chào giá cạnh tranh, ≥3 báo giá độc lập, người ký duyệt không phải anh Nam |
| Xung đột lợi ích kéo dài (vận hành dịch vụ nhiều năm) | **Cao** | Công khai trong hồ sơ; xã tự viết yêu cầu nghiệm thu; tham vấn chuyên môn đấu thầu |
| Trùng lặp Cổng DVC / nền tảng tỉnh | TB | Giữ ranh giới; kiểm tra tỉnh đã có chatbot chưa |
| Tấn công từ internet | TB | Theo hồ sơ cấp độ; rate limit; WAF |

---

## 11. ⚠️ ĐIỂM CHỜ XÃ / CẦN XÁC MINH

**Pháp lý — ưu tiên cao nhất**
1. Hệ thống này cần ATTT cấp độ mấy? (hỏi Sở KH&CN **bằng văn bản**)
2. Tỉnh cấp subdomain `.gov.vn` cho xã, hay phải nằm dưới cổng tỉnh?
3. **Tỉnh đã có hoặc đang xây chatbot TTHC dùng chung chưa?** Nếu có ⇒ dừng, khai thác cái đó
4. Phạm vi điều khoản miễn đánh giá tác động cho cơ quan nhà nước — cần luật sư xác nhận

**Nghiệp vụ**
5. Báo cáo Phụ lục III đã ký gửi Sở chưa? Phần II chốt 6 hạng mục?
6. Nguồn kinh phí vận hành thường niên từ 2027 lấy ở đâu?
7. Danh mục TTHC cấp xã đang lấy từ nguồn nào, ai cập nhật?
8. Một cửa đã có hệ thống lấy số thứ tự chưa?
9. Thống kê câu hỏi thực tế tại quầy (2 tuần) — căn cứ quyết định LLM hay không

**Kỹ thuật**
10. Ảnh chụp app Cần Đước — bóc chức năng, loại phần không nên sao chép

---

## 12. ĐIỀU KHOẢN HỢP ĐỒNG CẦN CÓ

- Xã **sở hữu mã nguồn + kho dữ liệu TTHC**, bàn giao kèm tài liệu
- **Trách nhiệm nội dung TTHC thuộc xã**, không thuộc bên phát triển
- **Trách nhiệm với câu trả lời của trợ lý AI: ghi rõ giới hạn**, kèm cơ chế rà soát của xã
- Nghiệm thu theo danh mục chức năng đã chốt
- Tách bạch: chi phí xây dựng (một lần) vs chi phí vận hành (thường niên)
- Điều khoản chuyển giao vận hành cho bên khác — tránh khóa chặt vào một nhà cung cấp
- Bảo hành 6–12 tháng; thay đổi chức năng = phụ lục hợp đồng
- Ghi nhận công khai quan hệ giữa bên tư vấn và người ký duyệt

---

*Bản nháp phục vụ thảo luận nội bộ. Chưa dùng để trình ký. Các nội dung pháp lý cần luật sư/cơ quan chuyên trách xác nhận trước khi triển khai.*
