# GiaoDienCDS_PhuThanh

Công cụ tra cứu thủ tục hành chính chạy tại chỗ trên máy kiosk đặt ở trụ sở UBND xã.

## Phạm vi Pha 1

Đây là bản triển khai **Pha 1** — ứng dụng web tĩnh, hoạt động hoàn toàn offline.

## Ràng buộc bắt buộc

1. **Không backend, không API, không database** — Toàn bộ dữ liệu lưu trong file JSON cục bộ
2. **Không LLM, không chatbot** — Chỉ giao diện tra cứu đơn giản
3. **Không CDN** — Mọi thư viện phải nằm local; app phải chạy được khi rút mạng
4. **Stack: HTML + CSS thuần + Alpine.js, vanilla JS, không build tool**

## Quy tắc ngôn ngữ

- Mã nguồn và comment: tiếng Anh
- Tài liệu, README, giao diện: tiếng Việt

## Đối tượng sử dụng

- Người dân, đặc biệt là người cao tuổi, tại trụ sở UBND xã
- Tối đa 3 lần chạm từ màn hình chính tới thông tin thủ tục

## Cấu trúc thư mục

```
00_TaiLieu/       - Tài liệu tham chiếu (Blueprint, Policy, Bản thảo công văn)
01_DuLieu/        - File dữ liệu
  nguon/          - Văn bản nguồn của thủ tục hành chính
  bieu-mau/       - Biểu mẫu
02_App/           - File ứng dụng
  css/            - Stylesheet
  js/             - JavaScript
  vendor/         - Bản local của thư viện (Alpine.js)
  assets/         - Hình ảnh, icon
03_Kiosk/         - Hướng dẫn cấu hình kiosk
04_KiemThu/       - Checklist và tài liệu kiểm thử
```

## Chạy ứng dụng

Mở `02_App/index.html` trực tiếp trong trình duyệt — hỗ trợ giao thức `file://`, không cần web server.

## Cập nhật dữ liệu

Sau mỗi lần sửa file JSON trong `01_DuLieu/`, chạy lệnh sau để nhúng dữ liệu vào app:

```bash
node 01_DuLieu/build-data.js
```

Lệnh này tạo file `02_App/js/data.js` chứa toàn bộ dữ liệu dưới dạng biến JavaScript. Nhờ đó app hoạt động được với giao thức `file://` (trình duyệt chặn `fetch()` từ file local).

**Quy trình chỉnh sửa dữ liệu:**
1. Sửa file JSON trong `01_DuLieu/`
2. Chạy `node 01_DuLieu/validate.js` để kiểm tra dữ liệu
3. Chạy `node 01_DuLieu/build-data.js` để cập nhật app
4. Mở lại `02_App/index.html` để xem kết quả

---

*Pha 1 — Chỉ hoạt động offline tại chỗ*
