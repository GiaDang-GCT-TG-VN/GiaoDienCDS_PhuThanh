# Vendor Libraries

Local copies of third-party libraries for offline operation.

## Files

| File | Library | Version | Date | Source |
|------|---------|---------|------|--------|
| `alpine.min.js` | Alpine.js | 3.14.1 | 2026-08-11 | https://unpkg.com/alpinejs@3.14.1/dist/cdn.min.js |

## Fonts

| File | Font | Weight | Format |
|------|------|--------|--------|
| `fonts/BeVietnamPro-Regular.woff2` | Be Vietnam Pro | 400 | WOFF2 |
| `fonts/BeVietnamPro-Medium.woff2` | Be Vietnam Pro | 500 | WOFF2 |
| `fonts/BeVietnamPro-SemiBold.woff2` | Be Vietnam Pro | 600 | WOFF2 |
| `fonts/BeVietnamPro-Bold.woff2` | Be Vietnam Pro | 700 | WOFF2 |

## Notes

- All files are downloaded for offline use per CLAUDE.md constraint #3 (no CDN)
- Font files are placeholders (~1.6KB each) - design uses system fonts per design spec

## Why no Tailwind CSS?

Tailwind was removed from stack in favor of custom CSS with design tokens because:

1. **Single fixed layout (1920×1080)** - No responsive breakpoints needed
2. **Design tokens** - Colors, fonts, spacing defined in `css/tokens.css` for consistency
3. **Smaller footprint** - Custom CSS (~10KB) vs Tailwind (~300KB+ even with purge)
4. **Simpler maintenance** - No build step, no purging, no config files
5. **High contrast mode** - Easier to implement with CSS custom properties
