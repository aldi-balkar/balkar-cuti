# Icon Requirements

## Required Icons for Production

Untuk deploy production, kamu perlu tambahkan icon-icon ini:

### 1. Favicon
- **Path**: `/public/favicon.ico`
- **Size**: 32x32 atau 16x16 px
- **Format**: ICO
- **Rekomendasi**: Logo atau emoji 🏖️

### 2. Apple Touch Icon
- **Path**: `/public/apple-touch-icon.png`
- **Size**: 180x180 px
- **Format**: PNG
- **Purpose**: iOS home screen icon

### 3. PWA Icons

#### Icon 192px
- **Path**: `/public/icon-192.png`
- **Size**: 192x192 px
- **Format**: PNG
- **Purpose**: Android home screen

#### Icon 512px
- **Path**: `/public/icon-512.png`
- **Size**: 512x512 px
- **Format**: PNG
- **Purpose**: Splash screen & high-res displays

## Quick Generation Options

### Option 1: Online Generators
1. **Favicon.io** - https://favicon.io/
   - Upload logo/text
   - Auto-generate all sizes
   - Download zip package

2. **RealFaviconGenerator** - https://realfavicongenerator.net/
   - Comprehensive icon generator
   - All platforms supported

### Option 2: Design Tools
1. **Figma**
   - Design 512x512 base icon
   - Export berbagai sizes
   - Use gradient background (#1e3a8a to #06b6d4)

2. **Canva**
   - Use template "App Icon"
   - Export multiple sizes

### Option 3: Simple Placeholder
Untuk testing, bisa pakai emoji as placeholder:

```bash
# Generate simple favicons dengan emoji
# Gunakan tool online: https://favicon.io/emoji-favicons/beach-umbrella/
```

## Design Guidelines

### Color Scheme
- **Primary**: #1e3a8a (Blue 900)
- **Accent**: #3b82f6 (Blue 500)
- **Highlight**: #06b6d4 (Cyan 500)

### Style Recommendations
- Use beach/vacation theme (🏖️, ☀️, 🌴)
- Gradient background
- Simple, recognizable at small sizes
- Match website branding

## After Adding Icons

1. Test PWA installation on mobile
2. Check favicon appears in browser tabs
3. Verify Apple touch icon on iOS
4. Run Lighthouse audit again

## Current Status

❌ `/public/favicon.ico` - Not created yet
❌ `/public/apple-touch-icon.png` - Not created yet  
❌ `/public/icon-192.png` - Not created yet
❌ `/public/icon-512.png` - Not created yet

These icons are referenced in:
- `app/layout.tsx` (head section)
- `public/manifest.json` (PWA config)

## Quick Fix for Development

Untuk development, bisa skip dulu icons. Nanti sebelum production deploy, generate semua icons sesuai guidelines di atas.

Website tetap bisa jalan normal tanpa icons, cuma tampilannya di browser tab dan mobile home screen belum optimal.
