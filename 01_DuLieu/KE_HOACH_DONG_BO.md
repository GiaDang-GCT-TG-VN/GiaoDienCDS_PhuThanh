# KẾ HOẠCH ĐỒNG BỘ DỮ LIỆU

> **Trạng thái:** Chưa triển khai — chờ trao đổi với xã khi triển khai thực tế
> **Ngày tạo:** 10/08/2026

---

## 1. MỤC ĐÍCH

Tài liệu này chuẩn bị cho việc chuyển đổi từ JSON tĩnh sang cơ sở dữ liệu quan hệ khi xã có nhu cầu:
- Nhiều người cùng cập nhật dữ liệu
- Đồng bộ giữa nhiều kiosk
- Tích hợp với hệ thống khác của xã/huyện

**Hiện tại (Pha 1):** Vẫn dùng JSON, không có database.

---

## 2. CẤU TRÚC BẢNG QUAN HỆ

### 2.1. Bảng `nganh` (Ngành)

| Cột | Kiểu | Ràng buộc | Ánh xạ JSON |
|---|---|---|---|
| `id` | INT | PK, AUTO_INCREMENT | — |
| `ma` | VARCHAR(50) | UNIQUE, NOT NULL | `nganh[].ma` |
| `ten` | NVARCHAR(200) | NOT NULL | `nganh[].ten` |

### 2.2. Bảng `linh_vuc` (Lĩnh vực)

| Cột | Kiểu | Ràng buộc | Ánh xạ JSON |
|---|---|---|---|
| `id` | INT | PK, AUTO_INCREMENT | — |
| `ma` | VARCHAR(50) | UNIQUE, NOT NULL | `linh_vuc[].ma` |
| `ten` | NVARCHAR(200) | NOT NULL | `linh_vuc[].ten` |
| `nganh_id` | INT | FK → `nganh.id`, NOT NULL | Quan hệ cha-con |

### 2.3. Bảng `thu_tuc` (Thủ tục hành chính)

| Cột | Kiểu | Ràng buộc | Ánh xạ JSON |
|---|---|---|---|
| `id` | INT | PK, AUTO_INCREMENT | — |
| `ma` | VARCHAR(20) | UNIQUE (nullable) | `thu_tuc[].ma` |
| `ten` | NVARCHAR(500) | NOT NULL | `thu_tuc[].ten` |
| `muc_do_chi_tiet` | ENUM('danh_muc', 'day_du') | NOT NULL | `thu_tuc[].muc_do_chi_tiet` |
| `nganh_id` | INT | FK → `nganh.id`, NOT NULL | Lookup từ `nganh` slug |
| `linh_vuc_id` | INT | FK → `linh_vuc.id`, NOT NULL | Lookup từ `linh_vuc` slug |
| `mo_ta` | NVARCHAR(1000) | NULL | `thu_tuc[].mo_ta` |
| `trang_thai` | ENUM('hieu_luc', 'het_hieu_luc', 'thay_the') | NOT NULL, DEFAULT 'hieu_luc' | `thu_tuc[].trang_thai` |
| `ly_do_thay_doi` | NVARCHAR(500) | NULL | `thu_tuc[].ly_do_thay_doi` |
| `ma_thay_the` | VARCHAR(20) | NULL | `thu_tuc[].ma_thay_the` |
| `thuong_gap` | BOOLEAN | DEFAULT FALSE | `thu_tuc[].thuong_gap` |
| `noi_nop` | NVARCHAR(300) | NULL | `thu_tuc[].noi_nop` |
| `co_quan_thuc_hien` | NVARCHAR(300) | NULL | `thu_tuc[].co_quan_thuc_hien` |
| `link_dvc` | VARCHAR(500) | NULL | `thu_tuc[].link_dvc` |
| `ghi_chu_can_bo` | NVARCHAR(1000) | NULL | `thu_tuc[].ghi_chu_can_bo` |
| `nguon` | NVARCHAR(500) | NOT NULL | `thu_tuc[].nguon` |
| `nguon_url` | VARCHAR(500) | NULL | `thu_tuc[].nguon_url` |
| `ngay_trich_xuat` | DATE | NOT NULL | `thu_tuc[].ngay_trich_xuat` |
| `ngay_cap_nhat` | DATE | NOT NULL | `thu_tuc[].ngay_cap_nhat` |
| `nguoi_cap_nhat` | NVARCHAR(100) | NULL | `thu_tuc[].nguoi_cap_nhat` |

### 2.4. Bảng `tu_khoa` (Từ khóa tìm kiếm)

| Cột | Kiểu | Ràng buộc | Ánh xạ JSON |
|---|---|---|---|
| `id` | INT | PK, AUTO_INCREMENT | — |
| `thu_tuc_id` | INT | FK → `thu_tuc.id`, NOT NULL | — |
| `tu_khoa` | NVARCHAR(200) | NOT NULL | `thu_tuc[].tu_khoa[]` |

### 2.5. Bảng `truong_hop` (Trường hợp áp dụng)

| Cột | Kiểu | Ràng buộc | Ánh xạ JSON |
|---|---|---|---|
| `id` | INT | PK, AUTO_INCREMENT | — |
| `thu_tuc_id` | INT | FK → `thu_tuc.id`, NOT NULL | — |
| `ten_truong_hop` | NVARCHAR(500) | NOT NULL | `truong_hop[].ten_truong_hop` |
| `le_phi_mo_ta` | NVARCHAR(300) | NOT NULL | `truong_hop[].le_phi.mo_ta` |
| `le_phi_mien_phi` | BOOLEAN | NULL | `truong_hop[].le_phi.mien_phi` |
| `le_phi_so_tien` | DECIMAL(15,2) | NULL | `truong_hop[].le_phi.so_tien` |
| `le_phi_don_vi` | VARCHAR(50) | NULL | `truong_hop[].le_phi.don_vi` |
| `le_phi_gia_tham_khao` | DECIMAL(15,2) | NULL | `truong_hop[].le_phi.gia_tham_khao` |
| `le_phi_nguon_tham_khao` | NVARCHAR(300) | NULL | `truong_hop[].le_phi.nguon_tham_khao` |
| `le_phi_can_xac_minh` | BOOLEAN | DEFAULT FALSE | `truong_hop[].le_phi.can_xac_minh` |
| `thoi_han_mo_ta` | NVARCHAR(300) | NOT NULL | `truong_hop[].thoi_han.mo_ta` |
| `thoi_han_so_ngay` | INT | NULL | `truong_hop[].thoi_han.so_ngay` |
| `thoi_han_don_vi` | VARCHAR(50) | NULL | `truong_hop[].thoi_han.don_vi` |

### 2.6. Bảng `thanh_phan_ho_so` (Thành phần hồ sơ)

| Cột | Kiểu | Ràng buộc | Ánh xạ JSON |
|---|---|---|---|
| `id` | INT | PK, AUTO_INCREMENT | — |
| `truong_hop_id` | INT | FK → `truong_hop.id`, NOT NULL | — |
| `ten` | NVARCHAR(500) | NOT NULL | `thanh_phan_ho_so[].ten` |
| `ban_chinh` | INT | NOT NULL, DEFAULT 0 | `thanh_phan_ho_so[].ban_chinh` |
| `ban_sao` | INT | NOT NULL, DEFAULT 0 | `thanh_phan_ho_so[].ban_sao` |
| `ghi_chu` | NVARCHAR(500) | NULL | `thanh_phan_ho_so[].ghi_chu` |

### 2.7. Bảng `can_cu_phap_ly` (Căn cứ pháp lý)

| Cột | Kiểu | Ràng buộc | Ánh xạ JSON |
|---|---|---|---|
| `id` | INT | PK, AUTO_INCREMENT | — |
| `thu_tuc_id` | INT | FK → `thu_tuc.id`, NOT NULL | — |
| `loai` | ENUM('thu_tuc', 'le_phi') | NOT NULL | Phân biệt `can_cu_phap_ly` và `can_cu_le_phi` |
| `ten_van_ban` | NVARCHAR(500) | NOT NULL | `can_cu_phap_ly[].ten_van_ban` |
| `so_hieu` | VARCHAR(100) | NULL | `can_cu_phap_ly[].so_hieu` |
| `ngay_ban_hanh` | DATE | NULL | `can_cu_phap_ly[].ngay_ban_hanh` |

### 2.8. Bảng `bieu_mau` (Biểu mẫu)

| Cột | Kiểu | Ràng buộc | Ánh xạ JSON |
|---|---|---|---|
| `id` | INT | PK, AUTO_INCREMENT | — |
| `thu_tuc_id` | INT | FK → `thu_tuc.id`, NOT NULL | — |
| `ten` | NVARCHAR(300) | NOT NULL | `bieu_mau[].ten` |
| `ma_bieu_mau` | VARCHAR(50) | NULL | `bieu_mau[].ma_bieu_mau` |
| `duong_dan` | VARCHAR(300) | NOT NULL | `bieu_mau[].duong_dan` |
| `nguon_tai` | VARCHAR(500) | NOT NULL | `bieu_mau[].nguon_tai` |
| `ngay_tai` | DATE | NOT NULL | `bieu_mau[].ngay_tai` |

---

## 3. SƠ ĐỒ QUAN HỆ

```
nganh (1) ──┬── (N) linh_vuc
            │
            └── (N) thu_tuc (1) ──┬── (N) tu_khoa
                                  ├── (N) truong_hop (1) ── (N) thanh_phan_ho_so
                                  ├── (N) can_cu_phap_ly
                                  └── (N) bieu_mau
```

---

## 4. CÂU HỎI CẦN HỎI XÃ

Trước khi triển khai database, cần làm rõ các vấn đề sau:

### 4.1. Hạ tầng

| # | Câu hỏi | Ghi chú |
|---|---|---|
| 1 | Xã dùng **hệ quản trị CSDL** nào? (MySQL, SQL Server, PostgreSQL, SQLite?) | Ảnh hưởng cú pháp SQL và driver |
| 2 | Database đặt **ở đâu**? (Máy chủ xã, máy kiosk, cloud?) | Ảnh hưởng kiến trúc mạng |
| 3 | **Ai quản lý** database? (Cán bộ tin học xã, huyện, hay đơn vị thuê ngoài?) | Cần đào tạo/hỗ trợ |
| 4 | Xã có **kết nối mạng nội bộ** giữa các máy không? | Ảnh hưởng cách đồng bộ |

### 4.2. Nghiệp vụ

| # | Câu hỏi | Ghi chú |
|---|---|---|
| 5 | **Ai được quyền ghi** dữ liệu? (Tất cả cán bộ, chỉ cán bộ văn phòng, chỉ admin?) | Cần phân quyền |
| 6 | Có cần **phê duyệt** trước khi dữ liệu lên kiosk không? | Workflow phức tạp hơn |
| 7 | Đồng bộ **một chiều hay hai chiều**? (Database → Kiosk, hay cả hai?) | Ảnh hưởng thiết kế |
| 8 | Có cần **log lịch sử** ai sửa gì không? | Cần thêm bảng audit |

### 4.3. Tích hợp

| # | Câu hỏi | Ghi chú |
|---|---|---|
| 9 | Xã có hệ thống **quản lý TTHC** nào khác không? | Có thể đồng bộ |
| 10 | Có cần **API** để hệ thống khác truy vấn không? | Cần backend |
| 11 | Dữ liệu có cần **đồng bộ lên huyện/tỉnh** không? | Mở rộng phạm vi |

---

## 5. PHƯƠNG ÁN ĐỒNG BỘ (DỰ KIẾN)

### Phương án A: Export JSON định kỳ

```
[Database] ──(export)──> [tthc.json] ──(copy)──> [Kiosk]
```

- **Ưu:** Đơn giản, kiosk vẫn chạy offline
- **Nhược:** Không realtime, cần export thủ công hoặc cron job

### Phương án B: Kiosk kết nối trực tiếp database

```
[Kiosk] ──(SQL query)──> [Database]
```

- **Ưu:** Realtime
- **Nhược:** Kiosk cần mạng, phức tạp hơn

### Phương án C: API trung gian

```
[Kiosk] ──(HTTP)──> [API Server] ──(SQL)──> [Database]
```

- **Ưu:** Bảo mật, linh hoạt, có thể cache
- **Nhược:** Cần backend, cần server chạy API

**Khuyến nghị:** Bắt đầu với **Phương án A** (export JSON) vì đơn giản, không cần thay đổi kiến trúc Pha 1.

---

## 6. SCRIPT CHUYỂN ĐỔI (THAM KHẢO)

### 6.1. JSON → SQL (Import)

```javascript
// Pseudocode - chưa triển khai
async function importJsonToDatabase(jsonPath, dbConnection) {
  const data = JSON.parse(fs.readFileSync(jsonPath));

  // 1. Import nganh-linh-vuc.json
  for (const nganh of data.nganh) {
    await db.insert('nganh', { ma: nganh.ma, ten: nganh.ten });
    for (const lv of nganh.linh_vuc) {
      await db.insert('linh_vuc', { ma: lv.ma, ten: lv.ten, nganh_id: ... });
    }
  }

  // 2. Import tthc.json
  for (const tt of data.thu_tuc) {
    // Insert thu_tuc, tu_khoa, truong_hop, ...
  }
}
```

### 6.2. SQL → JSON (Export)

```javascript
// Pseudocode - chưa triển khai
async function exportDatabaseToJson(dbConnection, outputPath) {
  const thuTuc = await db.query(`
    SELECT * FROM thu_tuc
    WHERE trang_thai = 'hieu_luc'
  `);

  // Build JSON structure matching schema v1.5
  const output = {
    phien_ban: "1.5",
    ngay_cap_nhat_toan_bo: new Date().toISOString().split('T')[0],
    thu_tuc: thuTuc.map(tt => buildThuTucObject(tt))
  };

  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
}
```

---

## 7. LƯU Ý QUAN TRỌNG

> ⚠️ **CHƯA TRIỂN KHAI**
>
> Tài liệu này chỉ là chuẩn bị. Việc chuyển sang database sẽ thực hiện khi:
> 1. Xã xác nhận có nhu cầu
> 2. Đã trả lời các câu hỏi ở mục 4
> 3. Đã hoàn thành Pha 1 (JSON tĩnh)
>
> **Pha 1 vẫn dùng JSON, không có database.**

---

*Cập nhật: 10/08/2026*
