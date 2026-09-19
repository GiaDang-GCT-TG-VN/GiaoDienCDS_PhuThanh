# Quyết định: nguồn dữ liệu cho thủ tục mức day_du

**Ngày quyết định:** 2026-09-19
**Người quyết định:** Chủ dự án
**Trạng thái:** Đang áp dụng

---

## Quyết định

1. **Nguồn duy nhất** cho nội dung thủ tục mức `day_du` là file `ChiTietTTHC_<mã>.doc` tải từ Cổng Dịch vụ công quốc gia.

2. **KHÔNG bóc nội dung thủ tục từ HTML trang web** của Cổng, kể cả khi trang tải được bình thường.

3. **Ngoại lệ duy nhất:** được lấy URL tải biểu mẫu từ HTML, dạng
   `https://csdl.dichvucong.gov.vn/web/jsp/download_file.jsp?ma=<hash>`.
   Đây là dữ liệu bổ sung. Không được dùng để ghi đè bất kỳ trường nào đã bóc từ file .doc.

---

## Lý do

HTML trang chi tiết thiếu nhiều mục so với file .doc, trong đó có một mục gây hại trực tiếp cho người dân.

### Mục thiếu

| Mục | Trong file .doc | Trong HTML |
|---|---|---|
| Căn cứ pháp lý | có | không |
| Kết quả thực hiện | có | không |
| Đối tượng thực hiện | có | không |
| Loại thủ tục | có | không |
| Cơ quan phối hợp | có | không |
| Số quyết định, Lĩnh vực, Cấp thực hiện, Từ khóa | có | không |
| **Chi tiết miễn giảm lệ phí** | có | **không** |

### Vì sao chi tiết miễn giảm lệ phí là lý do quyết định

HTML chỉ hiển thị số tiền, kèm một nút "Xem chi tiết" gọi JavaScript. Toàn bộ đoạn miễn giảm nằm sau lệnh gọi đó, không có trong HTML ban đầu.

Với thủ tục 2.001263 (đăng ký việc nuôi con nuôi trong nước), file .doc ghi mức 400.000 đồng **kèm** các diện được miễn: cha dượng hoặc mẹ kế nhận con riêng; cô, cậu, dì, chú, bác ruột nhận cháu; trẻ khuyết tật, nhiễm HIV/AIDS hoặc mắc bệnh hiểm nghèo; người có công với cách mạng.

Nếu bóc từ HTML, kiosk sẽ chỉ hiện "400.000 Đồng". **Người thuộc diện được miễn sẽ tưởng mình phải trả tiền.** Cờ `can_xac_minh` không cứu được tình huống này vì đó là dấu hiệu nội bộ cho cán bộ, người dân đứng trước màn hình không nhìn thấy.

Việc này cũng trái quy tắc trong `CLAUDE.md`: `le_phi.mo_ta` phải chép nguyên văn, không rút gọn.

---

## Cơ sở kiểm chứng

Kiểm tra ngày 2026-09-19 trên hai thủ tục khác ngành:

| Mã | Tên | Kết quả |
|---|---|---|
| 1.001193 | Đăng ký khai sinh | thiếu đúng bộ mục nêu trên |
| 2.001263 | Đăng ký việc nuôi con nuôi trong nước | thiếu đúng bộ mục nêu trên |

Các mục HTML **có** thì nội dung khớp với file .doc: trình tự thực hiện, thời hạn giải quyết (đủ từng giai đoạn), thành phần hồ sơ, yêu cầu điều kiện, và con số lệ phí. Thiếu sót nằm ở phạm vi bao phủ, không phải ở độ chính xác.

Hai mẫu chưa đủ để khẳng định cho toàn bộ 287 thủ tục, nhưng vì cả hai thuộc hai ngành khác nhau và thiếu giống hệt nhau, đây nhiều khả năng là cách Cổng dựng trang chứ không phải cá biệt.

### Ghi chú kỹ thuật

- Trang chi tiết trả về HTTP 200, không bị chặn.
- Trang rất lớn (trên 10 MB, truyền theo kiểu chunked) vì cuối trang có bảng liệt kê thủ tục ở từng tỉnh/xã. Nội dung thủ tục nằm trong khoảng 410–550 dòng đầu, dưới 50 KB.
- Endpoint đằng sau nút "Xem chi tiết" lệ phí chưa được dò. Nếu sau này cần, phải xin ý kiến trước.

---

## Hệ quả với quy trình

- Bổ sung thủ tục `day_du` mới vẫn phải tải file .doc thủ công từ Cổng.
- Không viết script bóc nội dung từ HTML.
- Nếu về sau Cổng bổ sung đủ các mục còn thiếu vào HTML, xem lại quyết định này và ghi rõ ngày sửa.
