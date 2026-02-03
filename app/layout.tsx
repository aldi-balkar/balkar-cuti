import type { Metadata, Viewport } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'

const poppins = Poppins({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#1e3a8a',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://cuti-worth-it.vercel.app'),
  title: {
    default: 'Strategi Cuti Cerdas - Planning Liburan yang Tepat',
    template: '%s | Strategi Cuti Cerdas',
  },
  description: 'Tool gratis untuk menemukan waktu terbaik mengambil cuti. Maksimalkan hari libur dengan planning yang tepat. Hemat cuti, dapat long weekend lebih panjang!',
  keywords: [
    'strategi cuti',
    'planning cuti',
    'kalender libur nasional',
    'long weekend Indonesia',
    'cuti bersama',
    'kalender libur 2026',
    'rencana liburan',
    'tips ambil cuti',
    'cuti hemat',
    'long weekend planner',
    'kalkulator cuti',
    'jadwal libur nasional',
    'perencanaan liburan',
  ],
  authors: [{ name: 'Team GagituAldi', url: 'https://gagitualdi.online' }],
  creator: 'Team GagituAldi',
  publisher: 'Team GagituAldi',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://cuti-worth-it.vercel.app',
    title: 'Strategi Cuti Cerdas - Planning Liburan yang Tepat',
    description: 'Tool gratis untuk menemukan waktu terbaik mengambil cuti. Maksimalkan hari libur dengan planning yang tepat berdasarkan libur nasional Indonesia.',
    siteName: 'Strategi Cuti Cerdas',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Strategi Cuti Cerdas - Planning Liburan yang Tepat',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Strategi Cuti Cerdas - Planning Liburan yang Tepat',
    description: 'Tool gratis untuk menemukan waktu terbaik mengambil cuti. Maksimalkan hari libur dengan planning yang tepat.',
    creator: '@gagitualdi',
    images: ['/opengraph-image'],
  },
  alternates: {
    canonical: 'https://cuti-worth-it.vercel.app',
  },
  category: 'lifestyle',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" className={poppins.variable}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1e3a8a" />
      </head>
      <body className={poppins.className}>{children}</body>
    </html>
  )
}
