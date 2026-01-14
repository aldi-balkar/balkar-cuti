import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Cuti Paling Worth It - Strategi Libur Cerdas',
  description: 'Temukan strategi cuti cerdas dengan minimal effort, maksimal healing. Rencanakan long weekend sempurna dengan tool ini!',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  )
}
