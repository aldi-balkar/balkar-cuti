export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: 'https://cuti-worth-it.vercel.app/sitemap.xml',
  }
}
