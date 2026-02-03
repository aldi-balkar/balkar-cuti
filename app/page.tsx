'use client';

import { useState, useMemo, Suspense } from 'react';
import dynamic from 'next/dynamic';
import Script from 'next/script';
import LoadingScreen from '@/components/LoadingScreen';
import { getHolidaysByYear } from '@/lib/holidays';
import { calculateOptimalLeave } from '@/lib/calculateLeave';

// Dynamic imports untuk optimasi
const MonthSelector = dynamic(() => import('@/components/MonthSelector'), {
  loading: () => <div className="h-32 bg-blue-100 animate-pulse rounded-2xl"></div>,
});

const LeaveRecommendationCard = dynamic(() => import('@/components/LeaveRecommendationCard'), {
  loading: () => <div className="h-64 bg-blue-100 animate-pulse rounded-2xl"></div>,
});

const MONTHS = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

export default function Home() {
  const currentDate = new Date();
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
  
  // Memoized calculation
  const recommendations = useMemo(() => {
    const holidays = getHolidaysByYear(selectedYear);
    return calculateOptimalLeave(holidays, selectedMonth, selectedYear, 3);
  }, [selectedYear, selectedMonth]);
  
  const monthName = MONTHS[selectedMonth];
  
  // JSON-LD Structured Data untuk SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Strategi Cuti Cerdas',
    description: 'Tool gratis untuk menemukan waktu terbaik mengambil cuti. Maksimalkan hari libur dengan planning yang tepat berdasarkan libur nasional Indonesia.',
    url: 'https://cuti-worth-it.vercel.app',
    applicationCategory: 'LifestyleApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'IDR',
    },
    author: {
      '@type': 'Organization',
      name: 'Team GagituAldi',
      url: 'https://gagitualdi.online',
    },
    inLanguage: 'id-ID',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '10000',
    },
  };
  
  return (
    <>
      {/* JSON-LD for SEO */}
      <Script
        id="json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <LoadingScreen />
      <main className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-cyan-500 relative overflow-hidden">
      {/* Animated blobs background */}
      <div className="absolute top-0 left-0 w-64 h-64 md:w-96 md:h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/2 w-64 h-64 md:w-96 md:h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      
      {/* Header */}
      <div className="relative bg-gradient-to-r from-blue-800 via-blue-600 to-cyan-500 text-white py-10 md:py-16 px-4 shadow-2xl">
        <div className="max-w-4xl mx-auto text-center space-y-4 md:space-y-6">
          <div className="inline-block">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold drop-shadow-2xl leading-tight">
              Strategi Cuti Cerdas
            </h1>
          </div>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold opacity-95 max-w-3xl mx-auto">
            Maksimalkan hari liburmu dengan planning yang tepat
          </p>
          <p className="text-sm sm:text-base md:text-lg font-normal opacity-90 max-w-2xl mx-auto">
            Cari tahu kapan waktu terbaik ambil cuti biar dapat long weekend lebih panjang
          </p>
          
          {/* Hero CTA */}
          <div className="pt-4 md:pt-6 space-y-3">
            <div className="bg-white/20 backdrop-blur-sm text-white px-6 py-2 rounded-full inline-block font-semibold text-sm md:text-base border-2 border-white/40">
              Gratis & Langsung Pakai
            </div>
            <p className="text-sm md:text-base font-medium">
              Sudah dipercaya oleh <span className="text-yellow-300 text-lg md:text-xl font-bold">10,000+</span> pegawai kantoran
            </p>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="relative max-w-4xl mx-auto px-4 py-6 md:py-8 space-y-6 md:space-y-8">
        {/* Month Selector */}
        <div className="bg-white rounded-2xl md:rounded-3xl shadow-2xl p-6 md:p-8 border border-blue-200">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6 md:mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 text-center">
              Pilih Bulan yang Ingin Dicek
            </h2>
          </div>
          <div className="flex justify-center">
            <Suspense fallback={<div className="h-24 bg-blue-50 animate-pulse rounded-xl w-full max-w-md"></div>}>
              <MonthSelector
                selectedYear={selectedYear}
                selectedMonth={selectedMonth}
                onYearChange={setSelectedYear}
                onMonthChange={setSelectedMonth}
              />
            </Suspense>
          </div>
        </div>
        
        {/* Results */}
        <div className="space-y-5 md:space-y-6">
          <div className="text-center bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-xl border border-blue-200">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3">
              Hasil untuk {monthName} {selectedYear}
            </h2>
            {recommendations.length > 0 ? (
              <p className="text-base sm:text-lg md:text-xl font-medium text-blue-700">
                Ditemukan {recommendations.length} rekomendasi cuti strategis
              </p>
            ) : (
              <p className="text-base sm:text-lg md:text-xl font-medium text-gray-600">
                Belum ada rekomendasi cuti strategis untuk bulan ini
              </p>
            )}
          </div>
          
          {recommendations.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-1">
              <Suspense fallback={<div className="h-64 bg-blue-100 animate-pulse rounded-2xl"></div>}>
                {recommendations.map((rec) => (
                  <LeaveRecommendationCard
                    key={rec.leaveDates.map(d => d.toISOString()).join('-')}
                    recommendation={rec}
                    monthName={monthName}
                  />
                ))}
              </Suspense>
            </div>
          ) : (
            <div className="bg-blue-50 rounded-2xl md:rounded-3xl shadow-xl p-8 md:p-12 text-center border border-blue-200">
              <div className="text-6xl md:text-7xl mb-6">🤔</div>
              <p className="text-xl md:text-2xl font-bold text-gray-800 mb-3">
                Belum Ada Rekomendasi Khusus
              </p>
              <p className="text-base md:text-lg text-gray-600 mb-4">
                Bulan ini tidak ada kombinasi hari libur yang strategis untuk long weekend.
              </p>
              <p className="text-sm md:text-base text-blue-700 font-medium">
                Coba cek bulan lain yang memiliki hari libur nasional
              </p>
            </div>
          )}
        </div>
        
        {/* CTA Section - Viral Sharing */}
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl md:rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
          <div className="relative text-center space-y-4 md:space-y-5">
            <div className="text-4xl md:text-5xl">📤</div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
              Bagikan ke Rekan Kerja
            </h3>
            <p className="text-base sm:text-lg md:text-xl font-medium text-white/95 max-w-2xl mx-auto">
              Kalau kamu merasa tool ini berguna, share juga ke teman-teman kantormu biar bisa planning cuti bareng!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center pt-3">
              <button 
                onClick={() => {
                  const text = `Nemu tool keren buat strategi cuti! Bisa tau kapan waktu terbaik ambil cuti biar dapet long weekend panjang.\n\nCek di: ${globalThis.location?.href || 'https://cuti-worth-it.vercel.app'}`;
                  globalThis.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
                }}
                className="px-8 py-4 bg-white text-green-600 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 active:scale-95 text-base md:text-lg"
              >
                📱 Share via WhatsApp
              </button>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(globalThis.location?.href || 'https://cuti-worth-it.vercel.app');
                  alert('✅ Link berhasil disalin!');
                }}
                className="px-8 py-4 bg-green-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 active:scale-95 text-base md:text-lg"
              >
                📋 Salin Link
              </button>
            </div>
          </div>
        </div>

        {/* Info Footer */}
        <div className="bg-blue-50 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-lg border border-blue-200">
          <div className="text-center space-y-3">
            <p className="text-base sm:text-lg md:text-xl font-bold text-gray-800">
              💡 Tips: Ambil cuti di hari Jumat atau Senin untuk dapat long weekend otomatis!
            </p>
            <p className="text-sm sm:text-base text-gray-600">
              Data berdasarkan kalender libur nasional dan cuti bersama Indonesia {selectedYear}
            </p>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="relative bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 border-t-2 border-gray-600 py-8 md:py-10 mt-10 md:mt-12">
        <div className="max-w-4xl mx-auto px-4 space-y-6">
          {/* Footer CTA */}
          <div className="text-center bg-white/5 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-white/10">
            <p className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3">
              Tool Ini Bermanfaat?
            </p>
            <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-5 max-w-2xl mx-auto">
              Bantu teman-teman kamu juga dengan membagikan tool ini
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button 
                onClick={() => {
                  const text = `Tool gratis untuk strategi cuti cerdas!\n\nBisa tau kapan waktu terbaik ambil cuti biar dapet long weekend maksimal.\n\nCek: ${globalThis.location?.href || 'https://cuti-worth-it.vercel.app'}`;
                  globalThis.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
                }}
                className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 active:scale-95"
              >
                📱 Bagikan ke Rekan Kerja
              </button>
            </div>
          </div>
          
          {/* Main Footer Content */}
          <div className="text-center text-gray-300 space-y-4">
            <div className="space-y-2">
              <p className="text-base sm:text-lg font-semibold">
                Strategi Cuti Cerdas
              </p>
              <p className="text-sm sm:text-base">
                Maksimalkan hari liburmu dengan planning yang tepat
              </p>
            </div>
            
            {/* Credit Section */}
            <div className="pt-4 border-t border-gray-600">
              <p className="text-sm sm:text-base text-gray-400 mb-2">
                Dibuat dengan ❤️ oleh
              </p>
              <a 
                href="https://gagitualdi.online" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block text-lg sm:text-xl font-bold text-white hover:text-blue-400 transition-colors"
              >
                Team GagituAldi
              </a>
              <p className="text-xs sm:text-sm text-gray-500 mt-3">
                © 2026 Strategi Cuti Cerdas · Semua hak dilindungi
              </p>
            </div>
          </div>
        </div>
      </footer>
    </main>
    </>
  );
}
