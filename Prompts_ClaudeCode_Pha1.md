# 🧭 BỘ PROMPT CHO CLAUDE CODE — GIAO DIỆN CĐS PHA 1

> **Dự án:** `GiaoDienCDS_PhuThanh`
> **Phạm vi:** Pha 1 — chạy tại chỗ, không backend, không LLM, không internet
> **Cách dùng:** chạy tuần tự P0 → P8. **Dừng và review sau mỗi bước.**
> **Phiên bản:** 1.1 — bổ sung quy tắc dừng và hỏi

---

## ⚠️ TRƯỚC KHI BẮT ĐẦU

1. Tải 3 file tài liệu về và đặt vào `00_TaiLieu/`: Blueprint v0.2, Policy tuân thủ, Bản thảo công văn.
2. `git init` ngay từ đầu. Commit sau mỗi prompt để quay lại được.
3. **Không gộp prompt.** Gộp là mất khả năng review, và vibe coding sai ở bước schema thì hỏng cả dự án.

---

# 🛑 QUY TẮC DỪNG VÀ HỎI

Đây là quy tắc quan trọng nhất trong tài liệu này.

**Vấn đề cần chặn:** khi gặp trở ngại, trợ lý code có xu hướng **tự xoay xở cho xong** — tự chọn thư viện khác, tự đổi cấu trúc dữ liệu, tự bịa dữ liệu để chạy được, tự bỏ qua ràng buộc. Mỗi lần như vậy là một quyết định thiết kế được đưa ra mà anh không biết. Đến bước thứ năm thì dự án đã lệch khỏi blueprint mà không ai nhận ra.

Quy tắc này được đặt vào `CLAUDE.md` ở gốc repo để Claude Code tự đọc mỗi phiên, không cần nhắc lại.

## Nội dung `CLAUDE.md` (P0 sẽ tạo)

```markdown
# Quy tắc làm việc — GiaoDienCDS_PhuThanh

## Ràng buộc phạm vi Pha 1
- Không backend, không API, không database
- Không LLM, không chatbot
- Không CDN — app phải chạy được khi rút mạng
- Stack: HTML + Tailwind + Alpine.js, vanilla JS, không build tool
- Giao diện tiếng Việt, code và comment tiếng Anh

## DỪNG VÀ HỎI — bắt buộc

Khi gặp bất kỳ tình huống nào dưới đây, DỪNG LẠI, báo cho tôi,
đề xuất phương án và CHỜ tôi quyết định. Không tự xử lý rồi báo sau.

1. Lỗi không sửa được sau 2 lần thử
2. Ràng buộc trong file này cản trở việc đang làm
3. Cần thêm thư viện, công cụ hoặc phụ thuộc mới
4. Cần sửa cấu trúc dữ liệu đã chốt trong SCHEMA.md
5. Thiếu dữ liệu hoặc thông tin để hoàn thành yêu cầu
6. Có hai cách làm trở lên mà lựa chọn ảnh hưởng tới thiết kế
7. Yêu cầu của tôi mâu thuẫn với tài liệu trong 00_TaiLieu/
8. Phát hiện lỗi hoặc rủi ro nằm ngoài phạm vi việc đang làm
9. Kết quả khác với những gì tôi mô tả trong prompt

## KHÔNG BAO GIỜ tự làm những việc sau
- Tạo dữ liệu thủ tục hành chính giả, mẫu, hoặc placeholder
- Tự điền lệ phí, thời hạn, thành phần hồ sơ không có trong nguồn
- Thêm CDN, API ngoài, hoặc dịch vụ trực tuyến
- Đổi schema đã chốt
- Bỏ qua trường bắt buộc ngay_cap_nhat hoặc nguon
- Chuyển sang bước tiếp theo khi bước hiện tại chưa được tôi xác nhận

## Kết thúc mỗi bước
Không tự chuyển sang việc tiếp theo. Dừng lại và báo cáo theo mẫu:

- Đã làm: (liệt kê file đã tạo hoặc sửa)
- Chưa làm được: (nếu có)
- Quyết định đã đưa ra: (mọi lựa chọn kỹ thuật, kèm lý do)
- Giả định đã dùng: (mọi thứ tôi tự suy ra mà anh chưa nói)
- Cần anh xác nhận: (câu hỏi cụ thể)
- Đề xuất bước tiếp theo: (chỉ đề xuất, không tự chạy)
```

## Vì sao có mục "Giả định đã dùng"

Đây là mục dễ bỏ qua nhất và cũng có giá trị nhất. Lỗi thì nhìn thấy được, còn **giả định thầm lặng** thì không — ví dụ trợ lý tự quyết định một thủ tục chỉ có một mức lệ phí, và điều đó âm thầm định hình toàn bộ schema. Bắt liệt kê ra là cách duy nhất để anh thấy chúng.

---

## P0 — Dựng khung thư mục và quy tắc

```
Đây là dự án GiaoDienCDS_PhuThanh: công cụ tra cứu thủ tục hành chính
chạy tại chỗ trên máy kiosk đặt ở trụ sở UBND xã.

Ràng buộc bắt buộc của Pha 1:
- Không backend, không API, không database
- Không LLM, không chatbot
- Không CDN — mọi thư viện phải nằm local, app phải chạy được khi rút mạng
- Stack: HTML + Tailwind CSS + Alpine.js, vanilla JS, không build tool
- Giao diện tiếng Việt, code và comment tiếng Anh

Hãy tạo cây thư mục sau (thư mục rỗng thì thêm .gitkeep):

00_TaiLieu/
01_DuLieu/nguon/  01_DuLieu/bieu-mau/
02_App/css/  02_App/js/  02_App/vendor/  02_App/assets/
03_Kiosk/
04_KiemThu/

Tạo README.md ghi rõ phạm vi và 4 ràng buộc trên.
Tạo .gitignore cho dự án web tĩnh.

Tạo CLAUDE.md ở gốc repo với nội dung quy tắc làm việc mà tôi sẽ dán ngay sau đây.

Chưa viết code ứng dụng. Chỉ tạo khung, README và CLAUDE.md.

DỪNG sau khi xong. Báo cáo theo mẫu trong CLAUDE.md.
```

Sau đó dán toàn bộ nội dung `CLAUDE.md` ở mục trên vào.

**Kiểm tra:** `CLAUDE.md` phải tồn tại ở **gốc repo**, không nằm trong thư mục con. README có đủ 4 ràng buộc.

---

## P1 — Chốt schema *(bước quan trọng nhất)*

```
Đọc CLAUDE.md và 00_TaiLieu/BluePrint_v0.2.md.

Tạo 01_DuLieu/SCHEMA.md — tài liệu cấu trúc dữ liệu cho tthc.json.
Chưa viết code, chưa tạo file JSON.

Mỗi thủ tục hành chính tối thiểu cần:
- ma, ten, linh_vuc
- thanh_phan_ho_so (danh sách)
- le_phi, thoi_han, noi_nop
- can_cu_phap_ly
- bieu_mau (danh sách, có tên và đường dẫn file)
- link_dvc (link tới Cổng dịch vụ công)
- ngay_cap_nhat (BẮT BUỘC)
- nguon (BẮT BUỘC — trích từ đâu)

Yêu cầu thiết kế:
- File có trường phien_ban và ngay_cap_nhat_toan_bo ở cấp gốc
- Xử lý được trường hợp một thủ tục có nhiều trường hợp áp dụng
  với lệ phí hoặc thành phần hồ sơ khác nhau
- Tách bạch dữ liệu trích từ văn bản và ghi chú của cán bộ
  thành hai trường riêng, không trộn

Trong SCHEMA.md ghi rõ: quy tắc nhập liệu, trường nào bắt buộc,
và một ví dụ đầy đủ.

Liệt kê rõ mọi giả định anh đã dùng khi thiết kế schema.
DỪNG sau khi xong, chờ tôi duyệt schema.
```

**Kiểm tra:** đọc kỹ phần "nhiều trường hợp áp dụng" và danh sách giả định. Schema sai ở đây, sửa sau khi có 40 thủ tục là làm lại từ đầu.

---

## P2 — Nhập 5 thủ tục thật

> Anh phải tự chuẩn bị nội dung 5 thủ tục từ nguồn chính thức trước, lưu vào `01_DuLieu/nguon/`.

```
Đọc CLAUDE.md và 01_DuLieu/SCHEMA.md.

Trong 01_DuLieu/nguon/ có nội dung 5 thủ tục hành chính lấy từ nguồn chính thức.
Hãy chuyển chúng thành 01_DuLieu/tthc.json đúng schema.

QUY TẮC TUYỆT ĐỐI:
- Chỉ chép lại nội dung có trong file nguồn
- KHÔNG tự suy luận, KHÔNG tự điền lệ phí, thời hạn hay thành phần hồ sơ
- Thiếu thông tin thì để null và liệt kê ra cho tôi bổ sung
- KHÔNG tạo dữ liệu mẫu, dữ liệu giả, placeholder
- Nguồn không khớp schema thì DỪNG và hỏi, không tự ép cho vừa

Tạo thêm 01_DuLieu/linh-vuc.json cho 6 lĩnh vực:
Văn phòng, Địa chính - Xây dựng, Tư pháp - Hộ tịch,
Văn hóa - Xã hội, Tài chính - Kế toán, Công an xã.

DỪNG sau khi xong. Liệt kê mọi trường để null và lý do.
```

**Kiểm tra:** đối chiếu từng con số lệ phí với nguồn gốc. Đây là `E2` — sai ở đây thì dân làm sai và xã chịu trách nhiệm.

---

## P3 — Bộ kiểm tra dữ liệu

```
Đọc CLAUDE.md.

Viết 01_DuLieu/validate.js — script Node chạy bằng `node validate.js`,
kiểm tra tthc.json và báo lỗi:

- Thiếu trường bắt buộc (đặc biệt ngay_cap_nhat và nguon)
- ma bị trùng
- linh_vuc không có trong linh-vuc.json
- ngay_cap_nhat quá 90 ngày → cảnh báo
- bieu_mau trỏ tới file không tồn tại trong 01_DuLieu/bieu-mau/
- link_dvc sai định dạng URL

In kết quả dạng bảng, thoát với mã lỗi khác 0 nếu có lỗi nghiêm trọng.
Không dùng thư viện ngoài.

DỪNG sau khi xong. Báo cáo kết quả chạy thử trên tthc.json hiện có.
```

**Kiểm tra:** cố tình xóa một `ngay_cap_nhat` xem có bắt được không.

---

## P4 — Đưa thư viện về local

```
Đọc CLAUDE.md.

Tải Tailwind CSS và Alpine.js về 02_App/vendor/ để app chạy được khi không có mạng.

Tạo 02_App/index.html tối giản, nạp thư viện từ vendor/ bằng đường dẫn tương đối,
hiển thị một dòng chữ để xác nhận cả hai đã hoạt động.

Ghi vào 02_App/vendor/README.md: tên file, phiên bản, ngày tải, nguồn tải.

Nếu không tải được, hoặc bản tải về vẫn cần gọi mạng khi chạy,
DỪNG và báo cho tôi. Không thay bằng CDN.
```

**Kiểm tra bắt buộc:** rút mạng, mở `index.html` bằng `file://`, xác nhận Tailwind và Alpine vẫn chạy. Không test bước này thì hôm mất mạng kiosk thành trang trắng.

---

## P5 — Màn hình chính

```
Đọc CLAUDE.md.

Xây màn hình chính trong 02_App/index.html, đọc dữ liệu từ
01_DuLieu/linh-vuc.json và tthc.json.

Yêu cầu giao diện — đối tượng chính là người cao tuổi:
- 6 ô lĩnh vực dạng lưới, ô bấm tối thiểu 120x120px
- Cỡ chữ tối thiểu 20px, tiêu đề lớn hơn
- Tương phản cao, không dùng màu nhạt
- Ô tìm kiếm to đặt phía trên
- Không cuộn ngang
- Nút "Về trang chính" cố định (chưa cần hoạt động ở bước này)

Logic để trong 02_App/js/app.js dùng Alpine.
Tối đa 3 lần chạm từ màn chính tới thông tin thủ tục.

Nếu việc nạp file JSON bằng giao thức file:// gặp vấn đề,
DỪNG và báo, đừng tự chuyển sang chạy web server.
```

**Kiểm tra:** mở trên màn hình dọc, đứng cách 50cm xem có đọc được không.

> ⚠️ Bước này nhiều khả năng chạm vào giới hạn CORS của `file://`. Đó là vấn đề thiết kế thật, cần anh quyết — không phải thứ để trợ lý tự xoay.

---

## P6 — Trang chi tiết thủ tục

```
Đọc CLAUDE.md.

Thêm màn hình chi tiết một thủ tục, render toàn bộ từ tthc.json.

Bắt buộc:
- Hiển thị ngay_cap_nhat ở vị trí dễ thấy
- Nếu ngay_cap_nhat quá 90 ngày, hiện cảnh báo:
  "Thông tin có thể đã thay đổi, vui lòng đối chiếu tại quầy"
- Cuối trang luôn có dòng cố định:
  "Thông tin mang tính hướng dẫn. Thông tin chính thức tại Cổng dịch vụ công
  quốc gia và cán bộ tiếp nhận."
- Xử lý được thủ tục có nhiều trường hợp áp dụng
- Sinh mã QR tại chỗ cho link_dvc và cho từng biểu mẫu
  (thư viện QR đặt trong vendor/, KHÔNG gọi API sinh QR ngoài)

Không hiển thị bất kỳ số liệu nào không có trong tthc.json.

Nếu thư viện QR nào cũng cần gọi mạng, DỪNG và báo.
```

**Kiểm tra:** mở Network tab khi sinh QR. Không được có request nào ra ngoài.

---

## P7 — Tìm kiếm tiếng Việt

```
Đọc CLAUDE.md.

Viết 02_App/js/search.js — tìm kiếm trong tthc.json.

Yêu cầu:
- Bỏ dấu: gõ "khai sinh" ra "Khai sinh", gõ "ho tich" ra "Hộ tịch"
- Xử lý riêng chữ đ và Đ (NFD không tách được, phải thay thủ công)
- Tìm cả trong ten và thanh_phan_ho_so
- Không phân biệt hoa thường
- Không kết quả thì hiện gợi ý 6 lĩnh vực, không để màn hình trống
- Thuần vanilla JS, không thư viện ngoài

Viết kèm trường hợp kiểm thử cho phần bỏ dấu.
DỪNG sau khi xong, báo kết quả chạy test.
```

---

## P8 — Cấu hình kiosk và kiểm thử

```
Đọc CLAUDE.md.

Tạo 03_Kiosk/autostart.md — hướng dẫn chạy app ở chế độ kiosk trên Windows:
mở Chrome kiosk mode trỏ vào file index.html, tự khởi động cùng máy,
chặn phím tắt thoát, ẩn thanh địa chỉ.

Tạo 03_Kiosk/bao-mat-may.md — biện pháp bảo vệ máy công cộng:
vô hiệu cổng USB, tài khoản quyền hạn chế, đóng băng hệ điều hành,
tự quay về màn hình chính sau 60 giây không thao tác,
tách khỏi mạng nội bộ của máy nghiệp vụ.

Thêm vào app: tự reset về màn hình chính sau 60 giây idle.

Tạo 04_KiemThu/checklist.md gồm các mục kiểm thử,
bắt buộc có: chạy offline, ngày cập nhật hiển thị đúng,
QR sinh offline, tìm kiếm bỏ dấu, reset idle, không thoát được ra desktop.

Phần cấu hình Windows nào anh không chắc, ghi rõ là chưa kiểm chứng,
đừng viết như đã xác nhận.
```

---

## 🚫 BA THỨ KHÔNG ĐƯỢC LÀM Ở PHA 1

Nếu Claude Code tự đề xuất, từ chối:

1. **Thêm backend hoặc API** — Pha 1 không có. Chờ `D1` và `D2`.
2. **Gọi CDN cho tiện** — hỏng nguyên tắc offline.
3. **Sinh dữ liệu thủ tục mẫu để demo** — dữ liệu giả trong file thật là cách nhanh nhất để một con số sai lọt vào bản chạy thật.

---

## 📋 SAU MỖI BƯỚC — VIỆC CỦA ANH

1. Đọc phần **Giả định đã dùng** trước, đọc phần "Đã làm" sau. Giả định mới là chỗ dự án lệch hướng.
2. Chạy thử, đừng chỉ đọc code.
3. Commit với thông điệp ghi rõ bước nào.
4. Có giả định nào sai → sửa ngay, đừng để sang bước sau.
5. Xác nhận rõ ràng trước khi cho chạy bước kế tiếp.

---

## SAU KHI XONG PHA 1

Chạy cổng `G3` trong bảng policy trước khi cho xã xem demo. Đặc biệt `E3`, `E4`, `E10`.

---

*Cập nhật khi schema hoặc phạm vi thay đổi.*
