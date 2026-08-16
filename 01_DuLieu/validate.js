#!/usr/bin/env node
/**
 * validate.js - Validate tthc.json against SCHEMA.md v2.1
 * Run with: node validate.js
 * Exit code: 0 if no errors, 1 if errors found
 */

const fs = require('fs');
const path = require('path');

// Colors for terminal output
const RED = '\x1b[31m';
const YELLOW = '\x1b[33m';
const GREEN = '\x1b[32m';
const RESET = '\x1b[0m';
const BOLD = '\x1b[1m';

// Counters
let errors = 0;
let warnings = 0;

// Results storage
const results = {
  errors: [],
  warnings: []
};

function logError(ma, field, message) {
  errors++;
  results.errors.push({ ma: ma || '(no ma)', field, message });
}

function logWarning(ma, field, message) {
  warnings++;
  results.warnings.push({ ma: ma || '(no ma)', field, message });
}

// Load JSON file
function loadJson(filename) {
  const filepath = path.join(__dirname, filename);
  try {
    const content = fs.readFileSync(filepath, 'utf8');
    return JSON.parse(content);
  } catch (e) {
    console.error(`${RED}ERROR: Cannot load ${filename}: ${e.message}${RESET}`);
    process.exit(1);
  }
}

// Check if date is valid YYYY-MM-DD
function isValidDate(dateStr) {
  if (!dateStr || typeof dateStr !== 'string') return false;
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateStr)) return false;
  const date = new Date(dateStr);
  return !isNaN(date.getTime());
}

// Calculate days since date
function daysSince(dateStr) {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = now - date;
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

// Check if nguon contains decision number (QĐ pattern)
function hasDecisionNumber(nguon) {
  if (!nguon) return false;
  // Pattern: số XXX/QĐ- or số XX/QĐ-
  return /số\s+\d+\/QĐ-/i.test(nguon);
}

// Main validation
function validate() {
  console.log(`${BOLD}Validating tthc.json against SCHEMA.md v2.1${RESET}\n`);

  // Load data files
  const tthc = loadJson('tthc.json');
  const nganhLinhVuc = loadJson('nganh-linh-vuc.json');

  // Build lookup maps
  const validNganh = new Set(nganhLinhVuc.nganh.map(n => n.ma));
  const nganhToLinhVuc = {};
  for (const nganh of nganhLinhVuc.nganh) {
    nganhToLinhVuc[nganh.ma] = new Set(nganh.linh_vuc.map(lv => lv.ma));
  }

  // Valid trang_thai values
  const validTrangThai = new Set(['hieu_luc', 'het_hieu_luc', 'thay_the']);

  // Check root fields
  if (!tthc.phien_ban) {
    logError(null, 'phien_ban', 'Missing required field');
  }
  if (!tthc.ngay_cap_nhat_toan_bo) {
    logError(null, 'ngay_cap_nhat_toan_bo', 'Missing required field');
  }
  if (!Array.isArray(tthc.thu_tuc)) {
    logError(null, 'thu_tuc', 'Must be an array');
    printResults();
    return;
  }

  const thuTucList = tthc.thu_tuc;
  console.log(`Found ${thuTucList.length} procedures to validate.\n`);

  // Track duplicate ma
  const seenMa = new Map();

  for (let i = 0; i < thuTucList.length; i++) {
    const tt = thuTucList[i];
    const ma = tt.ma;
    const idx = `[${i}]`;

    // Check muc_do_chi_tiet
    if (!tt.muc_do_chi_tiet || !['danh_muc', 'day_du'].includes(tt.muc_do_chi_tiet)) {
      logError(ma, 'muc_do_chi_tiet', `Must be "danh_muc" or "day_du", got: ${tt.muc_do_chi_tiet}`);
    }

    const isDayDu = tt.muc_do_chi_tiet === 'day_du';
    const isDanhMuc = tt.muc_do_chi_tiet === 'danh_muc';

    // Check ma
    if (ma === null || ma === undefined) {
      logWarning(ma, 'ma', 'Missing ma (TTHC code) - should be filled later');
    } else if (typeof ma === 'string' && ma.trim() !== '') {
      // Check for duplicates
      if (seenMa.has(ma)) {
        logError(ma, 'ma', `Duplicate ma found at index ${seenMa.get(ma)} and ${i}`);
      } else {
        seenMa.set(ma, i);
      }
    }

    // Check ten
    if (!tt.ten || (typeof tt.ten === 'string' && tt.ten.trim() === '')) {
      logError(ma, 'ten', 'Required field is empty');
    }

    // Check nganh
    if (!tt.nganh) {
      logError(ma, 'nganh', 'Required field is missing');
    } else if (!validNganh.has(tt.nganh)) {
      logError(ma, 'nganh', `Invalid nganh "${tt.nganh}" - not found in nganh-linh-vuc.json`);
    }

    // Check linh_vuc
    if (!tt.linh_vuc) {
      logError(ma, 'linh_vuc', 'Required field is missing');
    } else if (tt.nganh && validNganh.has(tt.nganh)) {
      const validLinhVuc = nganhToLinhVuc[tt.nganh];
      if (!validLinhVuc || !validLinhVuc.has(tt.linh_vuc)) {
        logError(ma, 'linh_vuc', `Invalid linh_vuc "${tt.linh_vuc}" for nganh "${tt.nganh}"`);
      }
    }

    // Check trang_thai
    if (!tt.trang_thai) {
      logError(ma, 'trang_thai', 'Required field is missing');
    } else if (!validTrangThai.has(tt.trang_thai)) {
      logError(ma, 'trang_thai', `Invalid value "${tt.trang_thai}" - must be one of: hieu_luc, het_hieu_luc, thay_the`);
    }

    // Check nguon
    if (!tt.nguon || (typeof tt.nguon === 'string' && tt.nguon.trim() === '')) {
      logError(ma, 'nguon', 'Required field is empty');
    } else if (isDanhMuc && !hasDecisionNumber(tt.nguon)) {
      logWarning(ma, 'nguon', 'For danh_muc, nguon should contain decision number (số .../QĐ-)');
    }

    // Check ngay_cap_nhat
    if (!tt.ngay_cap_nhat) {
      logError(ma, 'ngay_cap_nhat', 'Required field is missing');
    } else if (!isValidDate(tt.ngay_cap_nhat)) {
      logError(ma, 'ngay_cap_nhat', `Invalid date format: ${tt.ngay_cap_nhat} (expected YYYY-MM-DD)`);
    } else {
      const days = daysSince(tt.ngay_cap_nhat);
      const threshold = isDayDu ? 90 : 365;
      if (days > threshold) {
        logWarning(ma, 'ngay_cap_nhat', `Last updated ${days} days ago (threshold: ${threshold} days for ${tt.muc_do_chi_tiet})`);
      }
    }

    // Check le_phi.gia_tham_khao and can_xac_minh
    if (isDayDu && tt.truong_hop && Array.isArray(tt.truong_hop)) {
      for (let j = 0; j < tt.truong_hop.length; j++) {
        const th = tt.truong_hop[j];
        if (th.le_phi) {
          const lp = th.le_phi;
          // Rule: gia_tham_khao has value but can_xac_minh is false -> ERROR
          if (lp.gia_tham_khao !== null && lp.gia_tham_khao !== undefined && lp.can_xac_minh === false) {
            logError(ma, `truong_hop[${j}].le_phi`, 'gia_tham_khao has value but can_xac_minh is false - must set can_xac_minh to true');
          }
        }
      }
    }

    // Check day_du required fields
    if (isDayDu) {
      // truong_hop
      if (!tt.truong_hop || !Array.isArray(tt.truong_hop) || tt.truong_hop.length === 0) {
        logError(ma, 'truong_hop', 'Required for day_du - must be array with at least 1 element');
      } else {
        for (let j = 0; j < tt.truong_hop.length; j++) {
          const th = tt.truong_hop[j];
          if (!th.ten_truong_hop) {
            logError(ma, `truong_hop[${j}].ten_truong_hop`, 'Required field is empty');
          }
          if (!th.thanh_phan_ho_so || !Array.isArray(th.thanh_phan_ho_so) || th.thanh_phan_ho_so.length === 0) {
            logError(ma, `truong_hop[${j}].thanh_phan_ho_so`, 'Required - must be array with at least 1 element');
          }
          if (!th.le_phi || !th.le_phi.mo_ta) {
            logError(ma, `truong_hop[${j}].le_phi.mo_ta`, 'Required field is empty');
          }
          if (!th.thoi_han || !th.thoi_han.mo_ta) {
            logError(ma, `truong_hop[${j}].thoi_han.mo_ta`, 'Required field is empty');
          }
          // Check trinh_tu_thuc_hien - WARNING if missing for day_du
          if (!th.trinh_tu_thuc_hien || !Array.isArray(th.trinh_tu_thuc_hien) || th.trinh_tu_thuc_hien.length === 0) {
            logWarning(ma, `truong_hop[${j}].trinh_tu_thuc_hien`, 'Missing trinh_tu_thuc_hien - should be filled for day_du');
          }

          // v2.0: Check thoi_han.chi_tiet (optional, array of strings)
          if (th.thoi_han && th.thoi_han.chi_tiet !== undefined) {
            if (!Array.isArray(th.thoi_han.chi_tiet)) {
              logError(ma, `truong_hop[${j}].thoi_han.chi_tiet`, `Must be array, got: ${typeof th.thoi_han.chi_tiet}`);
            } else {
              for (const item of th.thoi_han.chi_tiet) {
                if (typeof item !== 'string') {
                  logError(ma, `truong_hop[${j}].thoi_han.chi_tiet`, 'Array must contain strings only');
                  break;
                }
              }
            }
          }

          // v2.0: Check hinh_thuc_nop (optional, array of objects)
          if (th.hinh_thuc_nop !== undefined) {
            if (!Array.isArray(th.hinh_thuc_nop)) {
              logError(ma, `truong_hop[${j}].hinh_thuc_nop`, `Must be array, got: ${typeof th.hinh_thuc_nop}`);
            } else {
              for (let k = 0; k < th.hinh_thuc_nop.length; k++) {
                const ht = th.hinh_thuc_nop[k];
                if (!ht.ten || typeof ht.ten !== 'string') {
                  logError(ma, `truong_hop[${j}].hinh_thuc_nop[${k}].ten`, 'Required field, must be string');
                }
              }
            }
          }
        }
      }

      // noi_nop
      if (!tt.noi_nop) {
        logError(ma, 'noi_nop', 'Required for day_du');
      }

      // can_cu_phap_ly
      if (!tt.can_cu_phap_ly || !Array.isArray(tt.can_cu_phap_ly) || tt.can_cu_phap_ly.length === 0) {
        logError(ma, 'can_cu_phap_ly', 'Required for day_du - must be array with at least 1 element');
      }

      // v2.0: yeu_cau_dieu_kien (optional, array of strings)
      if (tt.yeu_cau_dieu_kien !== undefined) {
        if (!Array.isArray(tt.yeu_cau_dieu_kien)) {
          logError(ma, 'yeu_cau_dieu_kien', `Must be array, got: ${typeof tt.yeu_cau_dieu_kien}`);
        } else {
          for (const item of tt.yeu_cau_dieu_kien) {
            if (typeof item !== 'string') {
              logError(ma, 'yeu_cau_dieu_kien', 'Array must contain strings only');
              break;
            }
          }
        }
      }

      // v2.0: ket_qua_thuc_hien (optional, string)
      if (tt.ket_qua_thuc_hien !== undefined && typeof tt.ket_qua_thuc_hien !== 'string') {
        logError(ma, 'ket_qua_thuc_hien', `Must be string, got: ${typeof tt.ket_qua_thuc_hien}`);
      }

      // v2.0: doi_tuong_thuc_hien (optional, string)
      if (tt.doi_tuong_thuc_hien !== undefined && typeof tt.doi_tuong_thuc_hien !== 'string') {
        logError(ma, 'doi_tuong_thuc_hien', `Must be string, got: ${typeof tt.doi_tuong_thuc_hien}`);
      }

      // v2.1: loai_thu_tuc (optional, string)
      if (tt.loai_thu_tuc !== undefined && tt.loai_thu_tuc !== null && typeof tt.loai_thu_tuc !== 'string') {
        logError(ma, 'loai_thu_tuc', `Must be string, got: ${typeof tt.loai_thu_tuc}`);
      }

      // v2.1: co_quan_phoi_hop (optional, string)
      if (tt.co_quan_phoi_hop !== undefined && tt.co_quan_phoi_hop !== null && typeof tt.co_quan_phoi_hop !== 'string') {
        logError(ma, 'co_quan_phoi_hop', `Must be string, got: ${typeof tt.co_quan_phoi_hop}`);
      }

      // v2.1: dia_chi_tiep_nhan (optional, string)
      if (tt.dia_chi_tiep_nhan !== undefined && tt.dia_chi_tiep_nhan !== null && typeof tt.dia_chi_tiep_nhan !== 'string') {
        logError(ma, 'dia_chi_tiep_nhan', `Must be string, got: ${typeof tt.dia_chi_tiep_nhan}`);
      }
    }

    // Check thuong_gap type
    if (tt.thuong_gap !== undefined && typeof tt.thuong_gap !== 'boolean') {
      logError(ma, 'thuong_gap', `Must be boolean, got: ${typeof tt.thuong_gap}`);
    }

    // Check tu_khoa type
    if (tt.tu_khoa !== undefined && tt.tu_khoa !== null) {
      if (!Array.isArray(tt.tu_khoa)) {
        logError(ma, 'tu_khoa', `Must be array, got: ${typeof tt.tu_khoa}`);
      } else {
        for (const kw of tt.tu_khoa) {
          if (typeof kw !== 'string') {
            logError(ma, 'tu_khoa', `Array must contain strings only`);
            break;
          }
        }
      }
    }
  }

  printResults();
}

function printResults() {
  console.log('='.repeat(80));
  console.log(`${BOLD}VALIDATION RESULTS${RESET}`);
  console.log('='.repeat(80));

  if (results.errors.length > 0) {
    console.log(`\n${RED}${BOLD}ERRORS (${results.errors.length}):${RESET}`);
    console.log('-'.repeat(80));
    for (const err of results.errors) {
      console.log(`${RED}[ERROR]${RESET} ma=${err.ma} | ${err.field}: ${err.message}`);
    }
  }

  if (results.warnings.length > 0) {
    console.log(`\n${YELLOW}${BOLD}WARNINGS (${results.warnings.length}):${RESET}`);
    console.log('-'.repeat(80));
    for (const warn of results.warnings) {
      console.log(`${YELLOW}[WARN]${RESET}  ma=${warn.ma} | ${warn.field}: ${warn.message}`);
    }
  }

  console.log('\n' + '='.repeat(80));
  console.log(`${BOLD}SUMMARY${RESET}`);
  console.log('='.repeat(80));
  console.log(`Errors:   ${errors > 0 ? RED : GREEN}${errors}${RESET}`);
  console.log(`Warnings: ${warnings > 0 ? YELLOW : GREEN}${warnings}${RESET}`);

  if (errors > 0) {
    console.log(`\n${RED}${BOLD}VALIDATION FAILED${RESET}`);
    process.exit(1);
  } else {
    console.log(`\n${GREEN}${BOLD}VALIDATION PASSED${RESET}`);
    process.exit(0);
  }
}

// Run validation
validate();
