/**
 * Main application JavaScript for GiaoDienCDS_PhuThanh
 * Phase 1 - Offline kiosk application
 *
 * This file will contain:
 * - Data loading from tthc.json
 * - Search functionality with Vietnamese diacritics removal
 * - Navigation between screens
 * - QR code generation
 */

(function() {
  'use strict';

  // Application state
  const state = {
    thuTuc: [],
    cauHinhLienKet: null,
    searchQuery: '',
    currentView: 'home',
    selectedThuTuc: null
  };

  // Load JSON data
  async function loadData() {
    try {
      const [tthcRes, cauHinhRes] = await Promise.all([
        fetch('../01_DuLieu/tthc.json'),
        fetch('../01_DuLieu/cau-hinh-lien-ket.json')
      ]);

      const tthcData = await tthcRes.json();
      state.thuTuc = tthcData.thu_tuc;
      state.cauHinhLienKet = await cauHinhRes.json();

      // Update UI
      document.getElementById('ngay-cap-nhat').textContent = tthcData.ngay_cap_nhat_toan_bo;

      renderThuTucList();
    } catch (error) {
      console.error('Lỗi tải dữ liệu:', error);
      document.getElementById('thu-tuc-list').innerHTML =
        '<p style="color: #dc2626;">Không tải được dữ liệu. Vui lòng kiểm tra file JSON.</p>';
    }
  }

  // Generate DVC link from procedure code
  function generateDvcLink(ma) {
    if (!ma || !state.cauHinhLienKet) return null;
    return state.cauHinhLienKet.mau_link_dvc.replace('{ma}', ma);
  }

  // Render procedure list
  function renderThuTucList() {
    const container = document.getElementById('thu-tuc-list');
    if (!container) return;

    // Filter only active procedures
    const activeThuTuc = state.thuTuc.filter(t => t.trang_thai === 'hieu_luc');

    if (activeThuTuc.length === 0) {
      container.innerHTML = '<p style="color: #6b7280;">Không có thủ tục nào.</p>';
      return;
    }

    container.innerHTML = activeThuTuc.map((thuTuc, index) => {
      const dvcLink = generateDvcLink(thuTuc.ma);
      const linkHtml = dvcLink
        ? `<a href="${dvcLink}" target="_blank" rel="noopener" style="color: #2563eb; text-decoration: none; font-size: 14px;">Xem trên Cổng DVC →</a>`
        : '<span style="color: #9ca3af; font-size: 14px;">Chưa có mã TTHC</span>';

      return `
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 15px;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 15px;">
            <div style="flex: 1;">
              <p style="font-size: 13px; color: #6b7280; margin: 0 0 5px 0;">
                ${index + 1}. Mã: <strong>${thuTuc.ma || 'Chưa có'}</strong>
              </p>
              <h3 style="font-size: 15px; color: #1e293b; margin: 0 0 10px 0; line-height: 1.4;">
                ${thuTuc.ten}
              </h3>
              ${linkHtml}
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  // Initialize application
  async function init() {
    console.log('GiaoDienCDS_PhuThanh initialized');
    await loadData();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
