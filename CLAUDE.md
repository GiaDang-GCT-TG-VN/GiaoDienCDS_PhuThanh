# Quy tắc làm việc — GiaoDienCDS_PhuThanh

## Ràng buộc phạm vi Pha 1
- Không backend, không API, không database
- Không LLM, không chatbot
- Không CDN — app phải chạy được khi rút mạng
- Stack: HTML + CSS thuần + Alpine.js, vanilla JS, không build tool
- Mã nguồn và comment: tiếng Anh. Tài liệu, README, giao diện: tiếng Việt.

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
10. Bất kỳ thao tác nào có thể làm mất dữ liệu không khôi phục được

## KHÔNG BAO GIỜ tự làm những việc sau
- Chạy bất kỳ lệnh nào viết lại hoặc xóa lịch sử git:
  filter-branch, filter-repo, rebase, reset --hard,
  reflog expire, gc --prune, xóa hoặc pop stash.
  Phải báo cáo phương án và chờ tôi xác nhận CHO TỪNG LẦN.
- Tạo dữ liệu thủ tục hành chính giả, mẫu, hoặc placeholder
- Tự điền lệ phí, thời hạn, thành phần hồ sơ không có trong nguồn
- Bóc nội dung thủ tục từ HTML Cổng DVC. Chỉ dùng file .doc.
  Xem `00_TaiLieu/quyet-dinh-nguon-du-lieu.md`
- Chuẩn hóa, làm gọn, hay sửa khoảng trắng trong các trường chép
  nguyên văn từ nguồn: `le_phi.mo_ta`, `thoi_han.mo_ta`,
  `trinh_tu_thuc_hien`, `thanh_phan_ho_so`.
  Muốn đẹp thì xử lý ở tầng hiển thị, dữ liệu gốc không đổi.
- Thêm CDN, API ngoài, hoặc dịch vụ trực tuyến
- Đổi schema đã chốt
- Bỏ qua trường bắt buộc ngay_cap_nhat hoặc nguon
- Chuyển sang bước tiếp theo khi bước hiện tại chưa được tôi xác nhận

## Quy trình cập nhật dữ liệu

Sau mỗi lần sửa file JSON trong `01_DuLieu/`:
1. Chạy `node 01_DuLieu/validate.js` — kiểm tra dữ liệu theo SCHEMA.md
2. Chạy `node 01_DuLieu/build-data.js` — tạo `02_App/js/data.js`

File `data.js` chứa dữ liệu nhúng sẵn (biến toàn cục `DATA_TTHC`, `DATA_NGANH`, `DATA_XA`, `DATA_LIEN_KET`, `DATA_ICONS`). Nhờ đó app hoạt động với giao thức `file://` mà không cần web server.

## Kết thúc mỗi bước
Không tự chuyển sang việc tiếp theo. Commit ngay sau khi hoàn thành,
trước khi báo cáo. Dừng lại và báo cáo theo mẫu:

- Đã làm: (liệt kê file đã tạo hoặc sửa)
- Chưa làm được: (nếu có)
- Quyết định đã đưa ra: (mọi lựa chọn kỹ thuật, kèm lý do)
- Giả định đã dùng: (mọi thứ tôi tự suy ra mà anh chưa nói)
- Cần anh xác nhận: (câu hỏi cụ thể)
- Đề xuất bước tiếp theo: (chỉ đề xuất, không tự chạy)
