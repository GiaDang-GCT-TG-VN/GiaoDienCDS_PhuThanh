/**
 * search.js - Vietnamese search with diacritics removal
 *
 * Handles Vietnamese text normalization:
 * - Removes diacritics (dấu) using NFD normalization
 * - Special handling for đ/Đ (not handled by NFD)
 * - Case-insensitive matching
 *
 * Test cases for removeDiacritics():
 * - "địa chính" → "dia chinh"
 * - "đất đai" → "dat dai"
 * - "đăng ký" → "dang ky"
 * - "Đồng Tháp" → "Dong Thap"
 * - "hộ tịch" → "ho tich"
 * - "khai sinh" → "khai sinh" (no change)
 */

(function() {
  'use strict';

  /**
   * Remove Vietnamese diacritics from text
   * @param {string} str - Input string
   * @returns {string} - String without diacritics
   */
  function removeDiacritics(str) {
    if (!str) return '';

    // First, handle đ/Đ manually (NFD doesn't decompose these)
    str = str.replace(/đ/g, 'd').replace(/Đ/g, 'D');

    // Then use NFD to decompose other Vietnamese characters
    // and remove combining diacritical marks (Unicode range 0300-036f)
    return str.normalize('NFD').replace(/[̀-ͯ]/g, '');
  }

  /**
   * Search procedures by query
   * @param {string} query - Search query
   * @param {Array} thuTuc - List of procedures
   * @returns {Array} - Matching procedures
   */
  function searchThuTuc(query, thuTuc) {
    if (!query || !thuTuc || !Array.isArray(thuTuc)) return [];

    const normalizedQuery = removeDiacritics(query.toLowerCase().trim());
    if (!normalizedQuery) return [];

    return thuTuc.filter(tt => {
      // Only search active procedures
      if (tt.trang_thai !== 'hieu_luc') return false;

      // Search in ten
      if (tt.ten && removeDiacritics(tt.ten.toLowerCase()).includes(normalizedQuery)) {
        return true;
      }

      // Search in ten_than_thien
      if (tt.ten_than_thien && removeDiacritics(tt.ten_than_thien.toLowerCase()).includes(normalizedQuery)) {
        return true;
      }

      // Search in tu_khoa array
      if (tt.tu_khoa && Array.isArray(tt.tu_khoa)) {
        for (const keyword of tt.tu_khoa) {
          if (removeDiacritics(keyword.toLowerCase()).includes(normalizedQuery)) {
            return true;
          }
        }
      }

      // Search in ma
      if (tt.ma && tt.ma.toLowerCase().includes(normalizedQuery)) {
        return true;
      }

      return false;
    });
  }

  // Expose functions globally for Alpine.js
  window.VNSearch = {
    removeDiacritics: removeDiacritics,
    searchThuTuc: searchThuTuc
  };

  // Self-test on load (development only)
  if (typeof console !== 'undefined') {
    const testCases = [
      ['địa chính', 'dia chinh'],
      ['đất đai', 'dat dai'],
      ['đăng ký', 'dang ky'],
      ['Đồng Tháp', 'Dong Thap'],
      ['hộ tịch', 'ho tich'],
      ['khai sinh', 'khai sinh'],
      ['Chứng thực', 'Chung thuc'],
      ['TTHC', 'TTHC']
    ];

    let allPassed = true;
    for (const [input, expected] of testCases) {
      const result = removeDiacritics(input);
      if (result !== expected) {
        console.error(`VNSearch test FAILED: "${input}" → "${result}" (expected "${expected}")`);
        allPassed = false;
      }
    }
    if (allPassed) {
      console.log('VNSearch: All diacritics tests passed');
    }
  }
})();
