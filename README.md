# 🏖️ Cuti Paling Worth It

> **Strategi libur cerdas dengan minimal effort, maksimal healing ✨**

Tool gratis untuk menemukan waktu terbaik mengambil cuti berdasarkan libur nasional Indonesia. Hemat cuti, dapet long weekend maksimal!

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

## ✨ Features

- 🎯 **Strategi Cuti Cerdas** - Algoritma pintar untuk rekomendasi cuti optimal
- 📅 **Multi-Year Support** - Data libur nasional 2025-2026
- 💯 **Best Value Detection** - Otomatis deteksi tanggal paling worth it
- 📱 **Responsive Design** - Perfect di mobile, tablet, dan desktop
- ⚡ **Super Fast** - Optimized untuk performa maksimal
- 🔍 **SEO Optimized** - Built-in SEO best practices
- 🎨 **Beautiful UI** - Modern gradient design dengan smooth animations
- 📤 **Easy Sharing** - Share via WhatsApp atau copy link

## 🚀 Quick Start

```bash
# Clone repository
git clone https://github.com/aldi-balkar/balkar-cuti.git

# Install dependencies
cd balkar-cuti
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) untuk melihat hasilnya.

## 🎯 How It Works

1. **Pilih Bulan** - Select bulan yang ingin kamu cek
2. **Lihat Rekomendasi** - Algoritma akan analisis hari libur nasional
3. **Strategi Optimal** - Dapat rekomendasi kapan ambil cuti
4. **Share & Plan** - Share ke teman atau grup kantor!

### Algoritma Rekomendasi

Tool ini menganalisis:
- ✅ Hari libur nasional dan cuti bersama
- ✅ Weekend (Sabtu-Minggu)
- ✅ Gap days yang bisa dijembatani
- ✅ Efisiensi cuti (ROI maksimal)

## 📁 Project Structure

```
balkar-cuti/
├── app/
│   ├── globals.css          # Global styles & CTA components
│   ├── layout.tsx            # Root layout with SEO metadata
│   ├── page.tsx              # Main page with structured data
│   ├── sitemap.ts            # Dynamic sitemap
│   ├── robots.ts             # Robots configuration
│   └── opengraph-image.tsx   # Dynamic OG image
├── components/
│   ├── LeaveRecommendationCard.tsx
│   ├── MonthSelector.tsx
│   └── LoadingScreen.tsx
├── lib/
│   ├── holidays.ts           # Holiday data
│   └── calculateLeave.ts     # Core algorithm
└── public/
    ├── manifest.json         # PWA manifest
    └── robots.txt            # Static robots
```

## 🎨 Design System

### CTA Buttons

```tsx
// Primary CTA - Main actions
<button className="btn-cta-primary">
  Ambil Cuti Sekarang
</button>

// Secondary CTA - Supporting actions
<button className="btn-cta-secondary">
  Lihat Detail
</button>

// Outline CTA - Subtle actions
<button className="btn-cta-outline">
  Copy Link
</button>
```

### Animations

- **blob** - Background floating animation
- **pulse-ring** - Attention-grabbing pulse
- **shimmer** - Shine effect for special CTAs
- **bounce** - Playful bounce effect

## 🔍 SEO Features

### Implemented Optimizations

✅ **Meta Tags**
- Title templates
- Description optimization
- Keywords targeting
- Canonical URLs

✅ **Open Graph**
- Facebook sharing
- Twitter Cards
- Dynamic OG images

✅ **Structured Data**
- JSON-LD Schema.org
- WebApplication type
- Aggregate ratings

✅ **Technical SEO**
- Sitemap.xml
- Robots.txt
- Semantic HTML
- Fast loading

✅ **Performance**
- Next.js font optimization
- Image optimization (AVIF/WebP)
- Code splitting
- SWC minification
- Compression enabled

## ⚡ Performance

Target Core Web Vitals:
- **LCP**: < 2.5s
- **FID**: < 100ms
- **CLS**: < 0.1

Optimizations:
- Font preloading with `next/font`
- Dynamic imports
- Image lazy loading
- CSS optimization
- Bundle size reduction
- Cache headers

## 📱 PWA Support

- ✅ Web manifest
- ✅ Theme color
- ✅ App icons (192px, 512px)
- ✅ Standalone mode
- ✅ Mobile-optimized

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: Vercel
- **Font**: Poppins (Google Fonts)

## 📊 Analytics Ready

Pre-configured for:
- Google Analytics
- Facebook Pixel
- Hotjar
- Custom event tracking

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Balkar Cuti Team**

- Website: [https://cuti-worth-it.vercel.app](https://cuti-worth-it.vercel.app)
- GitHub: [@aldi-balkar](https://github.com/aldi-balkar)

## 🙏 Acknowledgments

- Data libur nasional dari kalender resmi Indonesia
- Inspirasi dari Gen Z work-life balance movement
- Built with ❤️ untuk para pejuang kantoran

---

**Made with 💙 and 🔥 · Work smart, rest hard · 2026**
