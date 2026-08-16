# SCHEMA — Cấu trúc dữ liệu tthc.json

> **Phiên bản:** 2.3
> **Ngày:** 16/08/2026
> **Trạng thái:** Chờ duyệt

---

## 0. BỐI CẢNH DỮ LIỆU

Danh mục TTHC cấp xã Phú Thành, **huyện Tam Nông, tỉnh Đồng Tháp** có:
- **294 thủ tục**
- **12 ngành**
- **62 lĩnh vực con**

Nguồn dữ liệu hiện có (danh mục) chỉ cung cấp: tên thủ tục, mã TTHC, lĩnh vực, căn cứ pháp lý của danh mục. **Không có** lệ phí, thời hạn, thành phần hồ sơ.

Schema được thiết kế theo **mô hình hai tầng** để:
1. Nhập nhanh 294 thủ tục ở mức danh mục
2. Bổ sung chi tiết dần cho các thủ tục ưu tiên

---

## 1. CẤU TRÚC FILE

### 1.1. File chính: tthc.json

```json
{
  "phien_ban": "1.5",
  "ngay_cap_nhat_toan_bo": "2026-08-10",
  "thu_tuc": [
    { ... }
  ]
}
```

| Trường cấp gốc | Kiểu | Bắt buộc | Mô tả |
|---|---|---|---|
| `phien_ban` | string | ✅ | Phiên bản schema |
| `ngay_cap_nhat_toan_bo` | string (YYYY-MM-DD) | ✅ | Ngày rà soát toàn bộ file gần nhất |
| `thu_tuc` | array | ✅ | Danh sách thủ tục hành chính |

### 1.2. File phân loại: nganh-linh-vuc.json

```json
{
  "phien_ban": "1.0",
  "nganh": [
    {
      "ma": "tu-phap",
      "ten": "Tư pháp",
      "linh_vuc": [
        { "ma": "ho-tich", "ten": "Hộ tịch" },
        { "ma": "chung-thuc", "ten": "Chứng thực" },
        { "ma": "nuoi-con-nuoi", "ten": "Nuôi con nuôi" }
      ]
    },
    {
      "ma": "lao-dong-tbxh",
      "ten": "Lao động - Thương binh và Xã hội",
      "linh_vuc": [
        { "ma": "nguoi-co-cong", "ten": "Người có công" },
        { "ma": "bao-tro-xa-hoi", "ten": "Bảo trợ xã hội" }
      ]
    }
  ]
}
```

| Trường | Kiểu | Bắt buộc | Mô tả |
|---|---|---|---|
| `nganh[].ma` | string | ✅ | Slug ngành (12 ngành) |
| `nganh[].ten` | string | ✅ | Tên chính thức theo văn bản |
| `nganh[].goi_y_noi_dung` | string | ❌ | Gợi ý nội dung ngành cho người dân. Ví dụ: "Hộ tịch, chứng thực, nuôi con nuôi" |
| `nganh[].icon` | string | ❌ | Slug icon tương ứng với ngành |
| `nganh[].linh_vuc` | array | ✅ | Danh sách lĩnh vực con (tổng 62) |
| `nganh[].linh_vuc[].ma` | string | ✅ | Slug lĩnh vực |
| `nganh[].linh_vuc[].ten` | string | ✅ | Tên hiển thị |

### 1.3. File cấu hình liên kết: cau-hinh-lien-ket.json

> ⚠️ **Nguyên tắc:** KHÔNG nhúng URL vào từng thủ tục. Chỉ lưu `ma` trong tthc.json.
> Giao diện ghép `{ma}` vào mẫu URL lúc render và lúc sinh QR.

```json
{
  "mau_link_dvc": "https://vpcp.dichvucong.gov.vn/p/home/dvc-chi-tiet-thu-tuc-nganh-doc.html?ma_thu_tuc={ma}",
  "da_xac_minh_ky_thuat": true,
  "ngay_kiem_thu": "2026-08-11",
  "ma_da_thu": ["1.010041", "2.001263", "1.012783", "1.011441"],
  "da_xac_nhan_boi_xa": false,
  "nguoi_xac_nhan": null,
  "ngay_xac_nhan": null,
  "ghi_chu": "Mẫu đã kiểm chứng kỹ thuật. Chờ cán bộ xã xác nhận nội dung."
}
```

| Trường | Kiểu | Bắt buộc | Mô tả |
|---|---|---|---|
| `mau_link_dvc` | string | ✅ | Mẫu URL với placeholder `{ma}` |
| `da_xac_minh_ky_thuat` | boolean | ✅ | Đã kiểm tra URL hoạt động chưa |
| `ngay_kiem_thu` | string (YYYY-MM-DD) | ✅ | Ngày kiểm thử kỹ thuật |
| `ma_da_thu` | array of string | ✅ | Danh sách mã đã thử nghiệm |
| `da_xac_nhan_boi_xa` | boolean | ✅ | Cán bộ xã đã xác nhận chưa |
| `nguoi_xac_nhan` | string \| null | ❌ | Tên cán bộ xác nhận |
| `ngay_xac_nhan` | string \| null | ❌ | Ngày xác nhận (YYYY-MM-DD) |
| `ghi_chu` | string \| null | ❌ | Ghi chú bổ sung |

**Cách giao diện sử dụng:**
```javascript
const url = cauHinhLienKet.mau_link_dvc.replace('{ma}', thuTuc.ma);
```

### 1.4. File thông tin xã: thong-tin-xa.json

Chứa thông tin cơ bản về UBND xã, phục vụ hiển thị header, popup "Nộp ở đâu", và màn Hướng dẫn từng bước.

```json
{
  "ten_xa": "Phú Thành",
  "ten_day_du": "UBND xã Phú Thành",
  "huyen": "Tam Nông",
  "tinh": "Đồng Tháp",
  "dia_chi": "Bộ phận Một cửa, UBND xã Phú Thành, tỉnh Đồng Tháp",
  "dien_thoai": "",
  "email": "",
  "so_quay": null,
  "nguoi_phu_trach_noi_dung": null,
  "gio_lam_viec": {
    "sang": { "bat_dau": "07:00", "ket_thuc": "11:30" },
    "chieu": { "bat_dau": "13:30", "ket_thuc": "17:00" }
  },
  "ngay_lam_viec": ["Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu"],
  "ghi_chu": ""
}
```

| Trường | Kiểu | Bắt buộc | Mô tả |
|---|---|---|---|
| `ten_xa` | string | ✅ | Tên xã (không có "xã" phía trước) |
| `ten_day_du` | string | ✅ | Tên đầy đủ: "UBND xã ..." |
| `huyen` | string | ✅ | Tên huyện (không có "huyện" phía trước) |
| `tinh` | string | ✅ | Tên tỉnh (không có "tỉnh" phía trước) |
| `dia_chi` | string | ✅ | Địa chỉ đầy đủ bộ phận một cửa |
| `dien_thoai` | string | ❌ | Số điện thoại liên hệ. **Chờ xã cung cấp** |
| `email` | string | ❌ | Email liên hệ. **Chờ xã cung cấp** |
| `so_quay` | string \| null | ❌ | Số quầy tiếp nhận, dùng trong popup "Nộp ở đâu" và màn Hướng dẫn từng bước. **Chờ xã cung cấp** |
| `nguoi_phu_trach_noi_dung` | string \| null | ❌ | Cán bộ chịu trách nhiệm rà soát nội dung thủ tục (theo yêu cầu E2 trong bảng policy). **Chờ xã cung cấp** |
| `gio_lam_viec` | object | ✅ | Giờ làm việc sáng/chiều |
| `gio_lam_viec.sang.bat_dau` | string (HH:MM) | ✅ | Giờ bắt đầu buổi sáng |
| `gio_lam_viec.sang.ket_thuc` | string (HH:MM) | ✅ | Giờ kết thúc buổi sáng |
| `gio_lam_viec.chieu.bat_dau` | string (HH:MM) | ✅ | Giờ bắt đầu buổi chiều |
| `gio_lam_viec.chieu.ket_thuc` | string (HH:MM) | ✅ | Giờ kết thúc buổi chiều |
| `ngay_lam_viec` | array of string | ✅ | Danh sách ngày làm việc trong tuần |
| `ghi_chu` | string | ❌ | Ghi chú bổ sung |

---

## 2. MÔ HÌNH HAI TẦNG

### 2.1. Tổng quan

| Mức độ | `muc_do_chi_tiet` | Mô tả | Số lượng dự kiến |
|---|---|---|---|
| **Danh mục** | `"danh_muc"` | Chỉ có thông tin cơ bản từ danh mục | ~254 thủ tục |
| **Đầy đủ** | `"day_du"` | Có đầy đủ lệ phí, thời hạn, hồ sơ | ~30-40 thủ tục |

### 2.2. Trường bắt buộc theo mức độ

| Trường | `danh_muc` | `day_du` | Ghi chú |
|---|---|---|---|
| `muc_do_chi_tiet` | ✅ | ✅ | |
| `ma` | ✅ (cho phép null) | ✅ (cho phép null) | Cảnh báo nếu null |
| `ten` | ✅ | ✅ | |
| `nganh` | ✅ | ✅ | |
| `linh_vuc` | ✅ | ✅ | |
| `trang_thai` | ✅ | ✅ | Mặc định `"hieu_luc"` |
| `nguon` | ✅ | ✅ | |
| `ngay_cap_nhat` | ✅ | ✅ | Cảnh báo: 365 ngày (danh_muc), 90 ngày (day_du) |
| `truong_hop` | ❌ (null) | ✅ | |
| `noi_nop` | ❌ (null) | ✅ | |
| `can_cu_phap_ly` | ❌ (null) | ✅ | |

### 2.3. Quy tắc hiển thị

> ⚠️ **Giao diện CHỈ hiển thị thủ tục có `trang_thai = "hieu_luc"`.**
>
> Thủ tục `"het_hieu_luc"` hoặc `"thay_the"` vẫn giữ trong file JSON để truy vết lịch sử, nhưng KHÔNG hiển thị cho người dân.

### 2.4. Trường bổ sung

| Trường | Mô tả |
|---|---|
| `thuong_gap` | Boolean. Thủ tục hiển thị ở trang chủ. Tách biệt với `muc_do_chi_tiet` |
| `tu_khoa` | Từ khóa tìm kiếm do cán bộ xã soạn (không trích từ nguồn) |

---

## 3. CẤU TRÚC THỦ TỤC

### 3.1. Ví dụ thủ tục mức "danh_muc"

```json
{
  "muc_do_chi_tiet": "danh_muc",
  "ma": "1.001108",
  "ten": "Đăng ký khai sinh",
  "nganh": "tu-phap",
  "linh_vuc": "ho-tich",
  "mo_ta": null,

  "trang_thai": "hieu_luc",
  "ly_do_thay_doi": null,
  "ma_thay_the": null,

  "thuong_gap": true,
  "tu_khoa": ["làm giấy khai sinh", "khai sinh cho con"],

  "truong_hop": null,
  "noi_nop": null,
  "co_quan_thuc_hien": null,
  "can_cu_phap_ly": null,
  "can_cu_le_phi": null,
  "bieu_mau": null,

  "ghi_chu_can_bo": null,

  "nguon": "Quyết định số 1234/QĐ-UBND ngày 15/03/2026 công bố danh mục TTHC lĩnh vực Tư pháp",
  "nguon_url": null,
  "ngay_trich_xuat": "2026-08-10",
  "ngay_cap_nhat": "2026-08-10",
  "nguoi_cap_nhat": null
}
```

### 3.2. Ví dụ thủ tục mức "day_du"

```json
{
  "muc_do_chi_tiet": "day_du",
  "ma": "1.001108",
  "ten": "Đăng ký khai sinh",
  "nganh": "tu-phap",
  "linh_vuc": "ho-tich",
  "mo_ta": null,

  "trang_thai": "hieu_luc",
  "ly_do_thay_doi": null,
  "ma_thay_the": null,

  "thuong_gap": true,
  "tu_khoa": ["làm giấy khai sinh", "khai sinh cho con"],

  "truong_hop": [
    {
      "ten_truong_hop": "Đăng ký khai sinh trong thời hạn (60 ngày)",
      "thanh_phan_ho_so": [
        {
          "ten": "Tờ khai đăng ký khai sinh theo mẫu",
          "ban_chinh": 1,
          "ban_sao": 0,
          "ghi_chu": null
        },
        {
          "ten": "Giấy chứng sinh do cơ sở y tế cấp",
          "ban_chinh": 1,
          "ban_sao": 0,
          "ghi_chu": "Trường hợp không có Giấy chứng sinh thì nộp văn bản của người làm chứng"
        }
      ],
      "le_phi": {
        "mo_ta": "Miễn lệ phí",
        "mien_phi": true,
        "so_tien": null,
        "don_vi": null
      },
      "thoi_han": {
        "mo_ta": "Trong ngày làm việc, kể từ ngày nhận đủ hồ sơ hợp lệ",
        "so_ngay": null,
        "don_vi": "ngày làm việc"
      },
      "trinh_tu_thuc_hien": [
        "Bước 1: Người có yêu cầu đăng ký khai sinh nộp hồ sơ tại Bộ phận Tiếp nhận và Trả kết quả UBND cấp xã.",
        "Bước 2: Công chức Tư pháp - Hộ tịch kiểm tra hồ sơ:\n- Nếu hồ sơ đầy đủ, hợp lệ: tiếp nhận và ghi vào Sổ hộ tịch.\n- Nếu hồ sơ chưa đầy đủ: hướng dẫn bổ sung.\n- Nếu hồ sơ không đủ điều kiện: từ chối bằng văn bản.",
        "Bước 3: Trả kết quả cho người yêu cầu."
      ],
      "cach_thuc_thuc_hien": [
        "Nộp trực tiếp tại Bộ phận Tiếp nhận và Trả kết quả UBND cấp xã.",
        "Nộp trực tuyến trên Cổng dịch vụ công quốc gia."
      ]
    },
    {
      "ten_truong_hop": "Đăng ký khai sinh quá thời hạn",
      "thanh_phan_ho_so": [
        {
          "ten": "Tờ khai đăng ký khai sinh theo mẫu",
          "ban_chinh": 1,
          "ban_sao": 0,
          "ghi_chu": null
        }
      ],
      "le_phi": {
        "mo_ta": "25.000 đồng",
        "mien_phi": false,
        "so_tien": 25000,
        "don_vi": "đồng"
      },
      "thoi_han": {
        "mo_ta": "05 ngày làm việc kể từ ngày nhận đủ hồ sơ hợp lệ",
        "so_ngay": 5,
        "don_vi": "ngày làm việc"
      }
    }
  ],

  "noi_nop": "Bộ phận Một cửa UBND xã Phú Thành",
  "co_quan_thuc_hien": "UBND xã Phú Thành",

  "can_cu_phap_ly": [
    {
      "ten_van_ban": "Luật Hộ tịch",
      "so_hieu": "60/2014/QH13",
      "ngay_ban_hanh": "2014-11-20"
    }
  ],

  "can_cu_le_phi": [
    {
      "ten_van_ban": "Nghị quyết quy định mức thu lệ phí hộ tịch trên địa bàn tỉnh Đồng Tháp",
      "so_hieu": null,
      "ngay_ban_hanh": null
    }
  ],

  "bieu_mau": [
    {
      "ten": "Tờ khai đăng ký khai sinh",
      "ma_bieu_mau": "TP/HT-2024-TKKS.01",
      "duong_dan": "bieu-mau/to-khai-khai-sinh.pdf",
      "nguon_tai": "https://dichvucong.gov.vn/...",
      "ngay_tai": "2026-08-10"
    }
  ],

  "ghi_chu_can_bo": null,

  "nguon": "Cơ sở dữ liệu quốc gia về TTHC",
  "nguon_url": "https://dichvucong.gov.vn/p/home/dvc-tthc-thu-tuc-hanh-chinh-chi-tiet.html?ma_thu_tuc=1.001108",
  "ngay_trich_xuat": "2026-08-10",
  "ngay_cap_nhat": "2026-08-10",
  "nguoi_cap_nhat": null
}
```

---

## 4. CHI TIẾT TỪNG TRƯỜNG

### 4.1. Thông tin định danh

| Trường | Kiểu | Bắt buộc | Quy tắc |
|---|---|---|---|
| `muc_do_chi_tiet` | string | ✅ | `"danh_muc"` hoặc `"day_du"` |
| `ma` | string \| null | ✅ tồn tại | Mã từ CSDL quốc gia (dạng `1.001108`). **KHÔNG tự đặt mã.** Chưa tra được thì để `null` (cảnh báo, không lỗi) |
| `ten` | string | ✅ | Tên đầy đủ của thủ tục |
| `nganh` | string | ✅ | Slug ngành, khớp với `nganh-linh-vuc.json` |
| `linh_vuc` | string | ✅ | Slug lĩnh vực con, khớp với `nganh-linh-vuc.json` |
| `mo_ta` | string \| null | ❌ | Mô tả ngắn (nếu có trong nguồn) |

### 4.2. Trạng thái hiệu lực

> ⚠️ **Lý do:** Danh mục TTHC được sửa đổi bởi nhiều quyết định chồng nhau. Riêng ngành Tư pháp đã có 4 quyết định. Khi tỉnh bãi bỏ một thủ tục, phải giữ bản ghi để truy vết, nhưng KHÔNG hiển thị cho người dân.

| Trường | Kiểu | Bắt buộc | Quy tắc |
|---|---|---|---|
| `trang_thai` | string | ✅ | `"hieu_luc"` \| `"het_hieu_luc"` \| `"thay_the"`. Mặc định `"hieu_luc"` |
| `ly_do_thay_doi` | string \| null | ❌ | Văn bản nào bãi bỏ hoặc thay thế thủ tục này |
| `ma_thay_the` | string \| null | ❌ | Mã thủ tục thay thế (nếu có) |

**Ví dụ thủ tục bị thay thế:**

```json
{
  "ma": "1.004873",
  "ten": "Đăng ký khai sinh có yếu tố nước ngoài (phiên bản cũ)",
  "trang_thai": "thay_the",
  "ly_do_thay_doi": "Quyết định số 1234/QĐ-UBND ngày 15/03/2026 sửa đổi danh mục TTHC",
  "ma_thay_the": "1.004873.H87"
}
```

**Ví dụ thủ tục hết hiệu lực:**

```json
{
  "ma": "2.001234",
  "ten": "Cấp giấy chứng nhận XYZ (đã bãi bỏ)",
  "trang_thai": "het_hieu_luc",
  "ly_do_thay_doi": "Quyết định số 5678/QĐ-UBND ngày 01/05/2026 bãi bỏ thủ tục",
  "ma_thay_the": null
}
```

### 4.3. Hiển thị và tìm kiếm

| Trường | Kiểu | Bắt buộc | Quy tắc |
|---|---|---|---|
| `thuong_gap` | boolean | ❌ | Mặc định `false`. `true` = hiển thị ở trang chủ. **Tách biệt** với `muc_do_chi_tiet`: thủ tục có thể thường gặp nhưng chưa có đủ dữ liệu |
| `ten_than_thien` | string \| null | ❌ | Tên thân thiện, ngắn gọn cho thủ tục. Ví dụ: "Làm giấy khai sinh" thay vì "Đăng ký khai sinh". **Dữ liệu do xã tạo** |
| `tu_khoa` | array of string | ❌ | Từ khóa tìm kiếm do cán bộ xã soạn. Ví dụ: `["làm giấy khai sinh"]`. Mảng rỗng `[]` nếu chưa có. **Đây là dữ liệu do xã tạo, KHÔNG phải trích từ nguồn** (xem mục 4.10) |

### 4.4. Trường hợp áp dụng

> ⚠️ **Với `danh_muc`:** `truong_hop` = `null`
> **Với `day_du`:** `truong_hop` bắt buộc, tối thiểu 1 phần tử

| Trường | Kiểu | Bắt buộc (day_du) | Quy tắc |
|---|---|---|---|
| `truong_hop` | array \| null | ✅ | Mảng trường hợp hoặc `null` nếu `danh_muc` |
| `truong_hop[].ten_truong_hop` | string | ✅ | Tên trường hợp. Nếu chỉ có 1 trường hợp, dùng "Trường hợp chung" |
| `truong_hop[].thanh_phan_ho_so` | array | ✅ | Danh sách giấy tờ |
| `truong_hop[].le_phi` | object | ✅ | Thông tin lệ phí |
| `truong_hop[].thoi_han` | object | ✅ | Thời hạn giải quyết |
| `truong_hop[].trinh_tu_thuc_hien` | array \| null | ❌ | Các bước thực hiện (xem 4.4.1) |
| `truong_hop[].cach_thuc_thuc_hien` | array \| null | ❌ | Cách thức nộp hồ sơ (xem 4.4.2) |
| `truong_hop[].hinh_thuc_nop` | array \| null | ❌ | Hình thức nộp chi tiết (xem 4.4.3) |

#### 4.4.1. Trình tự thực hiện

> ⚠️ **Nguyên tắc:** Chép NGUYÊN VĂN từng bước từ nguồn. KHÔNG tự tách cấu trúc lồng.
>
> Nội dung các bước không theo khuôn thống nhất giữa các thủ tục, ép vào cấu trúc lồng sẽ mất thông tin.

| Trường | Kiểu | Bắt buộc | Quy tắc |
|---|---|---|---|
| `trinh_tu_thuc_hien` | array of string \| null | ❌ | Mảng các bước thực hiện, mỗi phần tử là một bước chép nguyên văn. `null` nếu nguồn không nêu hoặc `danh_muc` |

**Ví dụ:**

```json
"trinh_tu_thuc_hien": [
  "Bước 1: Người yêu cầu chứng thực nộp bản sao và xuất trình bản chính để đối chiếu.",
  "Bước 2: Người thực hiện chứng thực kiểm tra bản chính:\n- Trường hợp bản chính hợp lệ: thực hiện chứng thực và trả kết quả ngay trong ngày.\n- Trường hợp bản chính có dấu hiệu giả mạo: từ chối chứng thực.\n- Trường hợp không đủ điều kiện: hướng dẫn người yêu cầu.",
  "Bước 3: Người yêu cầu chứng thực nộp lệ phí và nhận bản sao đã chứng thực."
]
```

> ⚠️ **Lưu ý:** Nếu một bước có nhiều trường hợp con (ví dụ: "hồ sơ đầy đủ / thiếu / không đủ điều kiện"), giữ nguyên trong cùng một phần tử, dùng ký tự xuống dòng `\n` và gạch đầu dòng `-` nếu cần.

#### 4.4.2. Cách thức thực hiện

| Trường | Kiểu | Bắt buộc | Quy tắc |
|---|---|---|---|
| `cach_thuc_thuc_hien` | array of string \| null | ❌ | Danh sách cách thức nộp hồ sơ, mỗi phần tử chép nguyên văn. `null` nếu nguồn không nêu hoặc `danh_muc` |

**Ví dụ:**

```json
"cach_thuc_thuc_hien": [
  "Nộp trực tiếp tại Bộ phận Tiếp nhận và Trả kết quả UBND cấp xã.",
  "Nộp qua dịch vụ bưu chính công ích.",
  "Nộp trực tuyến trên Cổng dịch vụ công quốc gia hoặc Cổng dịch vụ công tỉnh."
]
```

#### 4.4.3. Hình thức nộp chi tiết

> ⚠️ **Khi nào dùng:** Nguồn DVC thường có bảng với 3 dòng (Trực tiếp / Trực tuyến / Bưu chính), mỗi dòng có thời hạn và lệ phí riêng. Dùng `hinh_thuc_nop` để chứa đầy đủ thông tin này.

| Trường | Kiểu | Bắt buộc | Quy tắc |
|---|---|---|---|
| `hinh_thuc_nop` | array \| null | ❌ | Danh sách hình thức nộp. `null` nếu nguồn không nêu hoặc `danh_muc` |
| `hinh_thuc_nop[].ten` | string | ✅ | Tên hình thức: "Trực tiếp", "Trực tuyến", "Dịch vụ bưu chính" |
| `hinh_thuc_nop[].thoi_han` | string \| null | ❌ | Thời hạn riêng cho hình thức này, chép nguyên văn |
| `hinh_thuc_nop[].le_phi` | string \| null | ❌ | Lệ phí riêng cho hình thức này, chép nguyên văn |
| `hinh_thuc_nop[].mo_ta` | string \| null | ❌ | Mô tả bổ sung, chép nguyên văn |

**Ví dụ:**

```json
"hinh_thuc_nop": [
  {
    "ten": "Trực tiếp",
    "thoi_han": "Theo mô tả",
    "le_phi": "400.000 Đồng (Mức thu lệ phí: 400.000đ/trường hợp. Miễn lệ phí...)",
    "mo_ta": "Nộp hồ sơ tại Trung tâm hành chính công..."
  },
  {
    "ten": "Trực tuyến",
    "thoi_han": "Theo mô tả",
    "le_phi": "400.000 Đồng",
    "mo_ta": null
  }
]
```

### 4.5. Thành phần hồ sơ

| Trường | Kiểu | Bắt buộc | Quy tắc |
|---|---|---|---|
| `thanh_phan_ho_so[].ten` | string | ✅ | Tên giấy tờ |
| `thanh_phan_ho_so[].ban_chinh` | number | ✅ | Số bản chính (0 nếu không yêu cầu) |
| `thanh_phan_ho_so[].ban_sao` | number | ✅ | Số bản sao (0 nếu không yêu cầu) |
| `thanh_phan_ho_so[].ghi_chu` | string \| null | ❌ | Ghi chú từ nguồn (không tự soạn) |

### 4.6. Lệ phí

> ⚠️ **Nguyên tắc:** `mo_ta` là giá trị hiển thị chính, chép nguyên văn từ nguồn. Giao diện **KHÔNG tự ghép chuỗi**.
>
> **Cho phép:** `"Theo quy định"` khi nguồn không nêu số cụ thể.
>
> ⚠️ **Chuỗi `mo_ta` có thể dài**, chứa cả mức phí và các trường hợp miễn giảm. Giao diện **PHẢI hiển thị đầy đủ, KHÔNG cắt ngắn**.

| Trường | Kiểu | Bắt buộc | Quy tắc |
|---|---|---|---|
| `le_phi.mo_ta` | string | ✅ | Chép nguyên văn từ nguồn. **Có thể dài** — chứa cả mức phí cơ bản và các trường hợp miễn giảm. Ví dụ: "400.000đ/trường hợp. Miễn lệ phí đối với trường hợp cha dượng hoặc mẹ kế nhận con riêng..." |
| `le_phi.mien_phi` | boolean \| null | ❌ | `true` nếu miễn phí, `false` nếu có phí, `null` nếu không xác định |
| `le_phi.so_tien` | number \| null | ❌ | Số tiền cố định (nếu có) |
| `le_phi.don_vi` | string \| null | ❌ | "đồng", "đồng/bản", v.v. |
| `le_phi.gia_tham_khao` | number \| null | ❌ | Con số tạm hiểu, **CHƯA xác minh với xã** |
| `le_phi.nguon_tham_khao` | string \| null | ❌ | Nguồn lấy giá tham khảo (URL, tên văn bản) |
| `le_phi.can_xac_minh` | boolean | ❌ | Mặc định `false`. `true` = giá tham khảo cần xã xác nhận |

#### 4.6.1. Quy tắc giá tham khảo (QUAN TRỌNG)

> 🚫 **TUYỆT ĐỐI KHÔNG render `gia_tham_khao` cho người dân.**
>
> Trường này chỉ dùng nội bộ để chuẩn bị dữ liệu, chờ xã xác minh rồi mới chuyển sang `so_tien` + `mo_ta`.

| Quy tắc | Mô tả |
|---|---|
| Giao diện CHỈ hiển thị `le_phi.mo_ta` | Không bao giờ hiển thị `gia_tham_khao` |
| Khi `can_xac_minh = true` | `mo_ta` phải là `"Theo quy định"` hoặc nguyên văn từ nguồn, **KHÔNG được là con số** |
| Validate | `gia_tham_khao` có giá trị mà `can_xac_minh = false` → **LỖI** |

**Ví dụ các dạng lệ phí:**

```json
// Miễn phí
{ "mo_ta": "Miễn lệ phí", "mien_phi": true, "so_tien": null, "don_vi": null,
  "gia_tham_khao": null, "nguon_tham_khao": null, "can_xac_minh": false }

// Có số tiền cố định (đã xác minh)
{ "mo_ta": "5.000 đồng/bản", "mien_phi": false, "so_tien": 5000, "don_vi": "đồng/bản",
  "gia_tham_khao": null, "nguon_tham_khao": null, "can_xac_minh": false }

// Nguồn không nêu số cụ thể, có giá tham khảo CHƯA xác minh
{ "mo_ta": "Theo quy định", "mien_phi": null, "so_tien": null, "don_vi": null,
  "gia_tham_khao": 25000, "nguon_tham_khao": "dichvucong.gov.vn - xã khác", "can_xac_minh": true }

// Theo phần trăm
{ "mo_ta": "0,5% giá trị tài sản", "mien_phi": false, "so_tien": null, "don_vi": null,
  "gia_tham_khao": null, "nguon_tham_khao": null, "can_xac_minh": false }
```

### 4.7. Thời hạn giải quyết

> ⚠️ **Nguyên tắc:** `mo_ta` là giá trị hiển thị chính, chép nguyên văn từ nguồn.
> Khi nguồn ghi "Theo mô tả" kèm danh sách nhiều giai đoạn, dùng `chi_tiet` để chứa từng giai đoạn.

| Trường | Kiểu | Bắt buộc | Quy tắc |
|---|---|---|---|
| `thoi_han.mo_ta` | string | ✅ | Chép nguyên văn. Ví dụ: "Trong ngày làm việc", "Theo mô tả" |
| `thoi_han.chi_tiet` | array of string \| null | ❌ | Danh sách các giai đoạn thời hạn, mỗi phần tử chép nguyên văn. `null` nếu không có |
| `thoi_han.so_ngay` | number \| null | ❌ | Số ngày (nếu trích xuất được) |
| `thoi_han.don_vi` | string \| null | ❌ | "ngày làm việc" hoặc "ngày" |

**Ví dụ thời hạn nhiều giai đoạn:**

```json
"thoi_han": {
  "mo_ta": "Theo mô tả",
  "chi_tiet": [
    "Thời gian xác minh, đánh giá hoàn cảnh gia đình: 05 ngày làm việc",
    "Thời gian kiểm tra hồ sơ và lấy ý kiến: 10 ngày, kể từ ngày nhận đủ hồ sơ hợp lệ",
    "Thời gian những người liên quan thay đổi ý kiến: 10 ngày làm việc",
    "Thời gian tổ chức đăng ký và giao nhận: 05 ngày, kể từ ngày hết hạn thay đổi ý kiến"
  ],
  "so_ngay": null,
  "don_vi": null
}
```

> ⚠️ **Giao diện:** Hiển thị `mo_ta` trước, sau đó `chi_tiet` dạng danh sách nếu có.

### 4.8. Căn cứ pháp lý (thủ tục)

> ⚠️ **Với `danh_muc`:** `can_cu_phap_ly` = `null`
> **Với `day_du`:** bắt buộc, tối thiểu 1 phần tử

| Trường | Kiểu | Bắt buộc (day_du) | Quy tắc |
|---|---|---|---|
| `can_cu_phap_ly` | array \| null | ✅ | Căn cứ pháp lý của thủ tục |
| `can_cu_phap_ly[].ten_van_ban` | string | ✅ | Tên văn bản |
| `can_cu_phap_ly[].so_hieu` | string \| null | ❌ | Số hiệu văn bản |
| `can_cu_phap_ly[].ngay_ban_hanh` | string \| null | ❌ | Ngày ban hành (YYYY-MM-DD) |

### 4.9. Căn cứ lệ phí (tách riêng)

| Trường | Kiểu | Bắt buộc | Quy tắc |
|---|---|---|---|
| `can_cu_le_phi` | array \| null | ❌ | Căn cứ pháp lý riêng cho lệ phí |
| `can_cu_le_phi[].ten_van_ban` | string | ✅ | Tên văn bản (thường là Nghị quyết HĐND tỉnh Đồng Tháp) |
| `can_cu_le_phi[].so_hieu` | string \| null | ❌ | Số hiệu văn bản |
| `can_cu_le_phi[].ngay_ban_hanh` | string \| null | ❌ | Ngày ban hành (YYYY-MM-DD) |

### 4.10. Biểu mẫu

| Trường | Kiểu | Bắt buộc | Quy tắc |
|---|---|---|---|
| `bieu_mau` | array \| null | ❌ | `null` nếu chưa có hoặc `danh_muc` |
| `bieu_mau[].ten` | string | ✅ | Tên biểu mẫu |
| `bieu_mau[].ma_bieu_mau` | string \| null | ❌ | Mã biểu mẫu (nếu có) |
| `bieu_mau[].duong_dan` | string | ✅ | Đường dẫn tương đối từ `01_DuLieu/` |
| `bieu_mau[].nguon_tai` | string | ✅ | URL nguồn tải biểu mẫu |
| `bieu_mau[].ngay_tai` | string (YYYY-MM-DD) | ✅ | Ngày tải file về |

### 4.11. Thông tin khác

| Trường | Kiểu | Bắt buộc (day_du) | Quy tắc |
|---|---|---|---|
| `noi_nop` | string \| null | ✅ | Nơi nộp hồ sơ. `null` nếu `danh_muc` |
| `co_quan_thuc_hien` | string \| null | ❌ | Cơ quan thực hiện |
| `co_quan_phoi_hop` | string \| null | ❌ | Cơ quan phối hợp (nếu có) |
| `loai_thu_tuc` | string \| null | ❌ | Loại thủ tục (ví dụ: "TTHC không được luật giao cho địa phương quy định...") |
| `dia_chi_tiep_nhan` | string \| null | ❌ | Địa chỉ tiếp nhận hồ sơ cụ thể (nếu nguồn nêu) |
| `doi_tuong_thuc_hien` | string \| null | ❌ | Đối tượng thực hiện (ví dụ: "Công dân Việt Nam") |
| `ket_qua_thuc_hien` | string \| null | ❌ | Kết quả thực hiện (ví dụ: "Giấy chứng nhận nuôi con nuôi trong nước") |
| `yeu_cau_dieu_kien` | array of string \| null | ❌ | Yêu cầu, điều kiện thực hiện. Mỗi phần tử là một điều kiện, chép nguyên văn |

> ⚠️ **Trường CHƯA thêm:** "Cơ quan có thẩm quyền" (trùng `co_quan_thuc_hien`), "Cơ quan được ủy quyền", "Từ khóa", "Mô tả" — bốn mục này rỗng trong file .doc mẫu đầu tiên. Chờ gặp file có nội dung thật rồi mới thêm trường.

**Ví dụ yêu cầu điều kiện:**

```json
"yeu_cau_dieu_kien": [
  "Có năng lực hành vi dân sự đầy đủ",
  "Hơn con nuôi từ 20 tuổi trở lên – không áp dụng đối với trường hợp cha dượng nhận con riêng của vợ...",
  "Có điều kiện về sức khỏe, kinh tế, chỗ ở bảo đảm việc chăm sóc, nuôi dưỡng, giáo dục con nuôi"
]
```

> ⚠️ **Trường `link_dvc` đã bỏ.** Thay bằng file cấu hình `cau-hinh-lien-ket.json` với mẫu URL dùng chung. Xem mục 1.3.

### 4.12. Tách bạch dữ liệu gốc và dữ liệu do xã tạo (E1)

> ⚠️ **Quy tắc E1:** Mọi thông tin trích từ văn bản gốc để trong các trường chính. Dữ liệu do xã tạo riêng để trong các trường dưới đây. Không trộn lẫn.

| Trường | Kiểu | Bắt buộc | Quy tắc |
|---|---|---|---|
| `ghi_chu_can_bo` | string \| null | ❌ | Ghi chú của cán bộ xã. **Dữ liệu do xã tạo** |
| `tu_khoa` | array of string | ❌ | Từ khóa tìm kiếm do cán bộ xã soạn. **Dữ liệu do xã tạo** |

### 4.13. Truy vết nguồn (BẮT BUỘC)

| Trường | Kiểu | Bắt buộc | Quy tắc |
|---|---|---|---|
| `nguon` | string | ✅ | Tên nguồn. Ví dụ: "Quyết định công bố danh mục TTHC cấp xã tỉnh Đồng Tháp", "Cơ sở dữ liệu quốc gia về TTHC" |
| `nguon_url` | string \| null | ❌ | URL cụ thể của nguồn (nếu có) |
| `ngay_trich_xuat` | string (YYYY-MM-DD) | ✅ | Ngày trích xuất dữ liệu từ nguồn |
| `ngay_cap_nhat` | string (YYYY-MM-DD) | ✅ | Ngày cập nhật gần nhất trong file này |
| `nguoi_cap_nhat` | string \| null | ❌ | Tên người cập nhật |

---

## 5. QUY TẮC NHẬP LIỆU

### 5.1. Quy tắc bắt buộc

1. **KHÔNG GÕ TAY NỘI DUNG TTHC** (E2)
   - Chỉ trích nguyên văn từ CSDL quốc gia hoặc văn bản pháp luật
   - Cán bộ **đối chiếu**, không sáng tác

2. **KHÔNG TỰ SUY LUẬN**
   - Thiếu thông tin → để `null`, đánh dấu `muc_do_chi_tiet = "danh_muc"`
   - KHÔNG đoán lệ phí, thời hạn, thành phần hồ sơ

3. **LUÔN CÓ `nguon`, `ngay_trich_xuat`, `ngay_cap_nhat`**
   - Ba trường này không bao giờ được để trống
   - Chu kỳ cảnh báo hết hạn:
     - `day_du`: cảnh báo sau **90 ngày**
     - `danh_muc`: cảnh báo sau **365 ngày**
   - **Với `danh_muc`:** trường `nguon` phải ghi rõ **SỐ HIỆU** quyết định công bố danh mục, không chỉ ghi tên chung chung. Lý do: một ngành có nhiều quyết định, phải biết thủ tục đến từ quyết định nào.
     - ✅ Đúng: `"Quyết định số 1234/QĐ-UBND ngày 15/03/2026 công bố danh mục TTHC lĩnh vực Tư pháp"`
     - ❌ Sai: `"Quyết định công bố danh mục TTHC cấp xã tỉnh Đồng Tháp"`

4. **LỆ PHÍ VÀ THỜI HẠN: `mo_ta` LÀ GIÁ TRỊ CHÍNH**
   - Chép nguyên văn từ nguồn
   - Cho phép `"Theo quy định"` khi nguồn không nêu số cụ thể
   - Giao diện **LUÔN hiển thị `mo_ta`**, không tự ghép chuỗi

5. **MÃ THỦ TỤC**
   - Dùng mã từ CSDL quốc gia (dạng `1.001108`)
   - **KHÔNG tự đặt mã**
   - Chưa tra được thì để `null` (cảnh báo, không lỗi)

6. **PHÂN LOẠI HAI CẤP**
   - `nganh`: 1 trong 12 ngành
   - `linh_vuc`: 1 trong 62 lĩnh vực con (thuộc ngành)
   - Cả hai đều là slug, khớp với `nganh-linh-vuc.json`

7. **TÁCH BIỆT `thuong_gap` VÀ `muc_do_chi_tiet`**
   - `thuong_gap`: thủ tục dân hay hỏi → hiển thị trang chủ
   - `muc_do_chi_tiet`: có đủ dữ liệu hay chưa
   - Một thủ tục có thể `thuong_gap = true` nhưng `muc_do_chi_tiet = "danh_muc"` (chưa kịp nhập đầy đủ)

### 5.2. Quy tắc định dạng

- Ngày tháng: `YYYY-MM-DD`
- Slug: chữ thường, không dấu, dùng gạch ngang (`tu-phap`, `ho-tich`)
- Đường dẫn biểu mẫu: tương đối từ `01_DuLieu/`, dùng `/`
- URL: bắt đầu bằng `https://`

### 5.3. Nâng cấp từ danh_muc lên day_du

Khi bổ sung chi tiết cho một thủ tục:

1. Đổi `muc_do_chi_tiet` từ `"danh_muc"` sang `"day_du"`
2. Điền đầy đủ các trường bắt buộc của `day_du`:
   - `truong_hop` (với `le_phi.mo_ta`, `thoi_han.mo_ta`, `thanh_phan_ho_so`)
   - `noi_nop`
   - `can_cu_phap_ly`
3. Cập nhật `nguon`, `nguon_url`, `ngay_trich_xuat`, `ngay_cap_nhat`

---

## 6. QUY TẮC VALIDATE

Script `validate.js` kiểm tra theo `muc_do_chi_tiet`:

### 6.1. Kiểm tra chung (cả hai mức)

| Kiểm tra | Loại | Chi tiết |
|---|---|---|
| `muc_do_chi_tiet` | LỖI | Phải là `"danh_muc"` hoặc `"day_du"` |
| `ma` | CẢNH BÁO | Nếu `null` → cảnh báo "Chưa có mã TTHC" |
| `ma` trùng | LỖI | Hai bản ghi cùng `ma` (khác `null`) → LỖI. Bỏ qua kiểm tra này nếu `ma = null` |
| `ten` | LỖI | Không được rỗng |
| `nganh` | LỖI | Phải khớp với `nganh-linh-vuc.json` |
| `linh_vuc` | LỖI | Phải khớp với ngành tương ứng |
| `trang_thai` | LỖI | Phải là `"hieu_luc"` \| `"het_hieu_luc"` \| `"thay_the"` |
| `nguon` | LỖI | Không được rỗng |
| `nguon` (danh_muc) | CẢNH BÁO | Với `danh_muc`: nên chứa số hiệu quyết định (regex kiểm tra dạng `số .../QĐ-`) |
| `ngay_cap_nhat` | LỖI / CẢNH BÁO | Định dạng YYYY-MM-DD. Cảnh báo hết hạn theo mức độ (xem 6.4) |
| `thuong_gap` | — | Nếu có, phải là boolean |
| `tu_khoa` | — | Nếu có, phải là mảng chuỗi |

### 6.2. Kiểm tra riêng `day_du`

| Kiểm tra | Loại | Chi tiết |
|---|---|---|
| `truong_hop` | LỖI | Phải là array, tối thiểu 1 phần tử |
| `truong_hop[].ten_truong_hop` | LỖI | Không được rỗng |
| `truong_hop[].thanh_phan_ho_so` | LỖI | Phải là array, tối thiểu 1 phần tử |
| `truong_hop[].le_phi.mo_ta` | LỖI | Không được rỗng |
| `truong_hop[].le_phi.gia_tham_khao` | LỖI | Nếu có giá trị mà `can_xac_minh = false` → **LỖI** (phải đặt `can_xac_minh = true`) |
| `truong_hop[].le_phi.can_xac_minh` | LỖI | Nếu `can_xac_minh = true` mà `mo_ta` chứa số tiền cụ thể → **LỖI** |
| `truong_hop[].thoi_han.mo_ta` | LỖI | Không được rỗng |
| `truong_hop[].trinh_tu_thuc_hien` | CẢNH BÁO | Nếu `null` → cảnh báo "Thiếu trình tự thực hiện" |
| `truong_hop[].cach_thuc_thuc_hien` | — | Tùy chọn, không cảnh báo nếu thiếu |
| `noi_nop` | LỖI | Không được rỗng |
| `can_cu_phap_ly` | LỖI | Phải là array, tối thiểu 1 phần tử |
| `bieu_mau[].duong_dan` | CẢNH BÁO | Kiểm tra file tồn tại trong `01_DuLieu/bieu-mau/` |

### 6.3. Kiểm tra riêng `danh_muc`

| Kiểm tra | Loại | Chi tiết |
|---|---|---|
| `truong_hop`, `noi_nop`, `can_cu_phap_ly` | CẢNH BÁO | Nên là `null`. Nếu không → cảnh báo "Có thể đang trong quá trình nâng cấp" |

### 6.4. Chu kỳ cảnh báo hết hạn

| `muc_do_chi_tiet` | Chu kỳ | Lý do |
|---|---|---|
| `day_du` | **90 ngày** | Thông tin chi tiết cần cập nhật thường xuyên |
| `danh_muc` | **365 ngày** | Tránh 294 thủ tục cùng cảnh báo gây nhiễu, làm mất tác dụng cảnh báo thật ở tầng `day_du` |

---

## 7. DANH SÁCH GIẢ ĐỊNH

| # | Giả định | Lý do | Ảnh hưởng nếu sai |
|---|---|---|---|
| G1 | Danh mục có 294 thủ tục, 12 ngành, 62 lĩnh vực con | Theo thông tin anh cung cấp | Cần điều chỉnh `nganh-linh-vuc.json` |
| G2 | Nguồn danh mục chỉ có: tên, mã, lĩnh vực | Theo thông tin anh cung cấp | — |
| G3 | `le_phi.mo_ta = "Theo quy định"` là hợp lệ | Nguồn không phải lúc nào cũng nêu số cụ thể | — |
| G4 | Phân loại 2 cấp: ngành → lĩnh vực | Theo cấu trúc danh mục TTHC chuẩn | — |
| G5 | Thủ tục `danh_muc` vẫn hiển thị được với link DVC | Giao diện ghép `ma` vào mẫu URL từ `cau-hinh-lien-ket.json` | — |
| G6 | Xã Phú Thành thuộc tỉnh Đồng Tháp | Theo thông tin anh cung cấp | — |
| G7 | Khoảng 30-40 thủ tục sẽ được nhập đầy đủ | Ước tính từ thủ tục thường gặp | Có thể nhiều hoặc ít hơn |

---

## 8. THAY ĐỔI SO VỚI PHIÊN BẢN TRƯỚC

### v2.1 so với v2.0

| Điểm | v2.0 | v2.1 |
|---|---|---|
| `loai_thu_tuc` | — | **MỚI**: Loại thủ tục (chuỗi từ nguồn) |
| `co_quan_phoi_hop` | — | **MỚI**: Cơ quan phối hợp |
| `dia_chi_tiep_nhan` | — | **MỚI**: Địa chỉ tiếp nhận hồ sơ cụ thể |

> ⚠️ **Lý do cập nhật:** Bóc file .doc đầu tiên (2.001263) phát hiện 3 trường có nội dung mà schema v2.0 chưa chứa được.

### v2.0 so với v1.9

| Điểm | v1.9 | v2.0 |
|---|---|---|
| `thoi_han.chi_tiet` | — | **MỚI**: Mảng chuỗi các giai đoạn thời hạn khi nguồn ghi "Theo mô tả" |
| `truong_hop[].hinh_thuc_nop` | — | **MỚI**: Bảng hình thức nộp với thời hạn và lệ phí riêng cho từng hình thức |
| `yeu_cau_dieu_kien` | — | **MỚI**: Mảng chuỗi các điều kiện thực hiện thủ tục |
| `ket_qua_thuc_hien` | — | **MỚI**: Kết quả sau khi giải quyết xong |
| `doi_tuong_thuc_hien` | — | **MỚI**: Đối tượng được thực hiện thủ tục |
| `le_phi.mo_ta` | Chuỗi | Ghi rõ: có thể dài, chứa cả mức phí và trường hợp miễn giảm. Giao diện KHÔNG cắt ngắn |

> ⚠️ **Lý do cập nhật:** File .doc từ DVC có cấu trúc phong phú hơn trang web, cần mở rộng schema để chứa đầy đủ.

### v1.9 so với v1.7

| Điểm | v1.7 | v1.9 |
|---|---|---|
| `truong_hop[].trinh_tu_thuc_hien` | — | **MỚI**: Mảng chuỗi chép nguyên văn các bước thực hiện |
| `truong_hop[].cach_thuc_thuc_hien` | — | **MỚI**: Mảng chuỗi các cách thức nộp hồ sơ |
| Validate | — | Cảnh báo nếu `day_du` thiếu `trinh_tu_thuc_hien` |

> ⚠️ **Lưu ý thiết kế:** Nội dung các bước không theo khuôn thống nhất giữa các thủ tục (ví dụ: một bước có thể chứa 3 trường hợp con với các mẫu phiếu khác nhau). Schema lưu nguyên văn dạng chuỗi, KHÔNG ép vào cấu trúc lồng để tránh mất thông tin.

### v1.7 so với v1.6

| Điểm | v1.6 | v1.7 |
|---|---|---|
| `nganh[].ten_than_thien` | — | **MỚI**: Tên thân thiện cho ngành, dùng ngôn ngữ gần gũi với người dân nông thôn miền Nam |
| Ví dụ | "Tư pháp" | "Hộ tịch & Giấy tờ" |

### v1.6 so với v1.5

| Điểm | v1.5 | v1.6 |
|---|---|---|
| `link_dvc` | Trường trong mỗi thủ tục | **XÓA BỎ** |
| `cau-hinh-lien-ket.json` | — | **MỚI**: file cấu hình mẫu URL dùng chung |
| Nguyên tắc | — | KHÔNG nhúng URL vào từng thủ tục, ghép `{ma}` vào mẫu lúc render |

---

## 9. LỊCH SỬ PHIÊN BẢN

| Phiên bản | Ngày | Thay đổi chính |
|---|---|---|
| v1.0 | 10/08/2026 | Schema ban đầu |
| v1.1 | 10/08/2026 | Thêm `le_phi.mo_ta`, `thoi_han.mo_ta`, `can_cu_le_phi`, chỉ dùng mã CSDL quốc gia |
| v1.2 | 10/08/2026 | Mô hình hai tầng (`danh_muc`/`day_du`), thêm `nganh`, 294 thủ tục |
| v1.3 | 10/08/2026 | Sửa tỉnh Đồng Tháp, `ma`/`link_dvc` cho phép null, `thuong_gap`, `tu_khoa`, chu kỳ cảnh báo riêng |
| v1.4 | 10/08/2026 | Thêm `trang_thai`, `ly_do_thay_doi`, `ma_thay_the`, kiểm tra mã trùng, `nguon` phải có số hiệu |
| v1.5 | 10/08/2026 | Thêm `gia_tham_khao`, `nguon_tham_khao`, `can_xac_minh` cho lệ phí; cấm render giá tham khảo |
| v1.6 | 11/08/2026 | Xóa `link_dvc`, thêm `cau-hinh-lien-ket.json` với mẫu URL dùng chung |
| v1.7 | 11/08/2026 | Thêm `goi_y_noi_dung` cho ngành, `ten_than_thien` cho thủ tục |
| v1.9 | 11/08/2026 | Thêm `trinh_tu_thuc_hien`, `cach_thuc_thuc_hien` vào trường hợp; cảnh báo validate nếu thiếu |
| v2.0 | 16/08/2026 | Thêm `thoi_han.chi_tiet`, `hinh_thuc_nop`, `yeu_cau_dieu_kien`, `ket_qua_thuc_hien`, `doi_tuong_thuc_hien`; ghi rõ `le_phi.mo_ta` có thể dài |
| v2.1 | 16/08/2026 | Thêm `loai_thu_tuc`, `co_quan_phoi_hop`, `dia_chi_tiep_nhan`; ghi chú trường chưa thêm |
| v2.2 | 16/08/2026 | Sửa vị trí trường: `goi_y_noi_dung`, `icon` về cấp ngành; `ten_than_thien` về cấp thủ tục |
| v2.3 | 17/08/2026 | Tài liệu hóa `thong-tin-xa.json`; thêm `so_quay`, `nguoi_phu_trach_noi_dung` |

---

*Chờ duyệt trước khi tạo tthc.json và validate.js.*
