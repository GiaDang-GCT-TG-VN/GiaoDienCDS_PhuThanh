# 📋 QUY TRÌNH XỬ LÝ FILE .DOC → DỮ LIỆU THỦ TỤC

> **Đây là prompt chính thức** để chuyển file ChiTietTTHC `.doc`
> thành dữ liệu `day_du` trong `tthc.json`.
> Dùng file này thay cho mọi hướng dẫn cũ.

---

## 0. TRƯỚC KHI CHẠY

| # | Kiểm | Ghi chú |
|---|---|---|
| 1 | File `.doc` đã nằm trong `01_DuLieu/nguon/` | Tên dạng `ChiTietTTHC_<mã>.doc` |
| 2 | Số file trong đợt này từ 5 đến 10 | Nhiều hơn xem mục 4 |
| 3 | Đã commit trạng thái hiện tại | Phòng khi cần quay lại |

**Nguồn duy nhất là file `.doc`.** Không bóc nội dung từ HTML trang web — xem `quyet-dinh-nguon-du-lieu.md` để biết lý do.

---

## 1. PROMPT CHÍNH

Dán nguyên đoạn dưới vào Claude Code:

```
Xử lý toàn bộ file .doc mới trong 01_DuLieu/nguon/, tự động hết mức.

BƯỚC 1 — Kiểm kê
Liệt kê file ChiTietTTHC_*.doc chưa có .md tương ứng.
Với mỗi file: mã, tên trong .doc, tên trong tthc.json, có khớp không.
Tên lệch thì in cả hai và TIẾP TỤC, ghi vào phần cuối báo cáo.

BƯỚC 2 — Bóc từng file thành .md theo _MAU_NGUON.md v2.1

QUY TẮC:
- CHỈ dùng nội dung file .doc, không bổ sung
- Mục không có → "nguồn không nêu"
- le_phi.mo_ta: nguyên văn cả đoạn, gồm mức phí VÀ toàn bộ miễn giảm
- thoi_han: "Theo mô tả" → mo_ta + chi_tiet là danh sách giai đoạn
- hinh_thuc_nop: đủ các dòng, giữ thời hạn và lệ phí riêng từng dòng
- trinh_tu_thuc_hien: giữ TỪNG bước, không gộp, không rút gọn
- thanh_phan_ho_so: giữ nhóm, giữ "(bản chính)" "(bản sao)" "(nếu có)"

GẶP MỤC LẠ mà mẫu không chứa được → DỪNG TOÀN BỘ, báo ngay.
Không bóc tiếp file còn lại.

BƯỚC 3 — Nhập vào tthc.json
- muc_do_chi_tiet → "day_du"
- Điền đầy đủ mọi trường từ .md
- thuong_gap = false
- ten_than_thien = null
- nguon, nguon_url, ngay_trich_xuat, ngay_cap_nhat

BƯỚC 4 — Tự kiểm và SỬA nếu lệch
Với mỗi thủ tục, đối chiếu .md với .doc gốc:
- Đếm số bước trình tự. In dòng đầu của TỪNG bước ra báo cáo
- Đếm số hình thức nộp
- Đếm số mục thành phần hồ sơ
- Kiểm tra le_phi.mo_ta có chứa các cụm sau không (nếu .doc có):
  "Miễn", "miễn lệ phí", "không thu"
Lệch thì tự sửa rồi báo rõ đã sửa gì.

BƯỚC 5 — Chạy validate.js, build-data.js, commit, push

BƯỚC 6 — BÁO CÁO GỌN, đúng mẫu này:

## Đã xử lý
| Mã | Tên | Số bước | Hình thức nộp | Hồ sơ | Lệ phí có miễn giảm? |

## Đoạn lệ phí nguyên văn của từng thủ tục
(in ra để tôi đối chiếu, đây là mục tôi bắt buộc đọc)

## Tên lệch giữa .doc và tthc.json
(nếu có)

## Mục lạ chưa có trong schema
(nếu có — nếu phần này không rỗng thì tôi phải sửa schema)

## Việc còn lại cần tôi quyết
- thuong_gap cho thủ tục nào
- ten_than_thien

DỪNG sau báo cáo.
```

---

## 2. VIỆC CỦA ANH SAU KHI CHẠY

Prompt đã gánh phần cơ học. Bốn việc còn lại không giao được.

### 2.1. Đọc đoạn lệ phí — bắt buộc

Prompt in nguyên văn ra báo cáo nên không cần mở file. Nhưng **phải đọc**.

Lý do: nếu đoạn miễn giảm bị rút gọn, kiosk sẽ chỉ hiện con số. Người thuộc diện được miễn — hộ nghèo, người có công, người khuyết tật — sẽ tưởng mình phải trả, hoặc bỏ không làm thủ tục.

Đây cũng là lý do đã bỏ hẳn hướng bóc nội dung từ HTML.

### 2.2. Quyết định `thuong_gap`

Chỉ bật cho thủ tục dân đến quầy hằng ngày. Cần hỏi Bộ phận Một cửa, **không đoán**.

> Bài học: đã từng bật `thuong_gap` cho 5 thủ tục nuôi con nuôi — nhóm hiếm khi có người hỏi. Phải gỡ lại.

### 2.3. Duyệt `ten_than_thien`

Prompt để `null`, anh điền sau khi có ý kiến Một cửa.

> Bài học: tên do AI đề xuất từng sai nghĩa — "Cấp lại giấy con nuôi" cho thủ tục "Đăng ký lại việc nuôi con nuôi". Dân đọc sẽ hiểu nhầm là xin bản sao.

Ghi tên đã chọn vào `04_KiemThu/can-xa-cung-cap.md` mục 5 để xã duyệt.

### 2.4. Kiểm tra trên app

Mở ít nhất hai thủ tục:

| Kiểm | Vì sao |
|---|---|
| Lệ phí có đủ phần miễn giảm | Mục có hậu quả thật với dân |
| Thời hạn có hiện các giai đoạn | Nguồn hay ghi "Theo mô tả" |
| Trình tự đủ số bước | Dễ bị rút gọn |
| Bảng hình thức nộp có hiện | |
| Thành phần hồ sơ không bị cắt | Thiếu một giấy tờ là dân phải quay về |

---

## 3. KHI SCHEMA CẦN SỬA

Báo cáo có mục "Mục lạ chưa có trong schema" không rỗng thì dừng.

1. Không bóc tiếp file còn lại
2. Xem mục đó có đáng thêm không — nếu rỗng trong file mẫu thì chờ gặp file có nội dung thật
3. Thêm trường thì lên phiên bản, cập nhật `_MAU_NGUON.md` và `validate.js`
4. Bóc lại từ đầu

> Sửa schema sau khi đã nhập nhiều thủ tục thì phải nhập lại tất cả. Vì vậy prompt dừng ngay khi gặp mục lạ.

---

## 4. QUY MÔ VÀ THỜI GIAN

**Chia đợt 5–10 file.** Nhiều hơn thì báo cáo dài, dễ đọc lướt và bỏ sót.

| Phạm vi | Số file | Anh tải tay | Xử lý | Anh kiểm | Tổng |
|---|---|---|---|---|---|
| 5 thủ tục | 5 | ~30 ph | ~15 ph | ~20 ph | **~1 giờ** |
| 10 thủ tục | 10 | ~1 giờ | ~30 ph | ~40 ph | **~2 giờ** |
| 30–40 (tầng đầy đủ) | 35 | ~3,5 giờ | ~2 giờ | ~2,5 giờ | **~8 giờ** |
| Cả ngành Tư pháp | 61 | ~6 giờ | ~3,5 giờ | ~4 giờ | **~14 giờ** |
| Toàn bộ | 287 | ~28 giờ | ~16 giờ | ~19 giờ | **~63 giờ** |

Chưa tính công rà soát hằng quý — việc của xã, không phải bên phát triển.

> Cần Đước làm 43 thủ tục thường gặp, không phải toàn bộ. Đó là con số một xã duy trì được. Trước khi làm quá 10 thủ tục, cần biết **ai sẽ rà soát chúng mỗi quý**.

---

## 5. CÁCH TẢI FILE .DOC

1. Mở `01_DuLieu/lien-ket-tthc.html` bằng trình duyệt
2. Tìm thủ tục, bấm **Mở DVC**
3. Trên trang DVC, tìm nút tải file **ChiTietTTHC**
4. Lưu vào `01_DuLieu/nguon/`, giữ nguyên tên file

Bước này không tự động được: link tải chứa mã băm 16 ký tự, không suy ra từ mã thủ tục.

---

*Cập nhật khi schema đổi phiên bản.*
