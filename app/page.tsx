'use client';

import { useState, useMemo, Suspense } from 'react';
import dynamic from 'next/dynamic';
import Script from 'next/script';
import { FaInfoCircle, FaShare, FaCalendarCheck, FaLightbulb } from 'react-icons/fa';
import LoadingScreen from '@/components/LoadingScreen';
import { getHolidaysByYear } from '@/lib/holidays';
import { calculateOptimalLeave } from '@/lib/calculateLeave';

// Dynamic imports untuk optimasi
const MonthSelector = dynamic(() => import('@/components/MonthSelector'), {
  loading: () => <div className="h-32 bg-gray-100 animate-pulse rounded-xl"></div>,
});

const LeaveRecommendationCard = dynamic(() => import('@/components/LeaveRecommendationCard'), {
  loading: () => <div className="h-64 bg-gray-100 animate-pulse rounded-xl"></div>,
});

const MONTHS = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

export default function Home() {
  const currentDate = new Date();
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth() + 1);
  const [isLoading, setIsLoading] = useState(false);
  
  // Memoized calculation
  const recommendations = useMemo(() => {
    const holidays = getHolidaysByYear(selectedYear);
    return calculateOptimalLeave(holidays, selectedMonth, selectedYear, 3);
  }, [selectedYear, selectedMonth]);
  
  const monthName = MONTHS[selectedMonth];
  
  // Format date with day name
  const formatDateWithDay = (date: Date) => {
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const dayName = days[date.getDay()];
    const dateStr = date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    return `${dayName}, ${dateStr}`;
  };
  
  // JSON-LD Structured Data untuk SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Planning Cuti',
    description: 'Tool gratis untuk menemukan waktu terbaik mengambil cuti. Maksimalkan hari libur dengan planning yang tepat berdasarkan libur nasional Indonesia.',
    url: 'https://cuti.gagitualdi.online',
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
  
  const handleShare = () => {
    const shareText = recommendations.length > 0
      ? `Rekomendasi Cuti ${monthName} ${selectedYear}:\n\n${recommendations.map((rec, i) => 
          `${i + 1}. Ambil cuti ${rec.leaveDates.length} hari → dapat ${rec.totalOffDays} hari libur!`
        ).join('\n')}\n\nCek strategi cutimu di:`
      : 'Cek strategi cuti terbaikmu di:';
    
    const url = globalThis.location?.href || 'https://cuti.gagitualdi.online';
    globalThis.open(`https://wa.me/?text=${encodeURIComponent(`${shareText}\n${url}`)}`, '_blank');
  };
  
  return (
    <>
      {/* JSON-LD for SEO */}
      <Script
        id="json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <main className="min-h-screen bg-white">
      
      {/* Header - Navy Professional */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white py-16 md:py-24 px-4">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-3 bg-blue-800/30 px-6 py-2 rounded-full border border-blue-500/30 mb-4">
            <FaCalendarCheck className="text-blue-300" />
            <span className="text-sm font-medium text-blue-100">Planning Liburan yang Tepat</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
            Planning Cuti
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto font-light">
            Maksimalkan hari libur dengan planning yang tepat berdasarkan kalender libur nasional Indonesia
          </p>
          
          {/* Trust Badge */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-6 text-sm text-blue-200">
            <div className="flex items-center gap-2">
              <FaCalendarCheck className="text-green-400" />
              <span>10,000+ Pengguna</span>
            </div>
            <div className="flex items-center gap-2">
              <FaLightbulb className="text-yellow-400" />
              <span>100% Gratis</span>
            </div>
            <div className="flex items-center gap-2">
              <FaInfoCircle className="text-blue-400" />
              <span>Data Resmi</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 py-10 md:py-16 space-y-10">
        
        {/* First Time User Guide */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 md:p-8 border-l-4 border-blue-600 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <FaInfoCircle className="text-white text-lg" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Cara Menggunakan</h3>
              <ol className="space-y-2 text-sm md:text-base text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-blue-600 flex-shrink-0">1.</span>
                  <span>Pilih <strong>tahun</strong> dan <strong>bulan</strong> yang ingin Anda cek</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-blue-600 flex-shrink-0">2.</span>
                  <span>Lihat rekomendasi tanggal cuti yang paling optimal</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-blue-600 flex-shrink-0">3.</span>
                  <span>Bagikan ke rekan kerja untuk planning bersama</span>
                </li>
              </ol>
            </div>
          </div>
        </div>
        
        {/* Month Selector */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-10 border border-gray-200">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Pilih Periode
            </h2>
            <p className="text-gray-600">Pilih tahun dan bulan untuk melihat rekomendasi cuti</p>
          </div>
          <div className="flex justify-center">
            <Suspense fallback={<div className="h-24 bg-gray-100 animate-pulse rounded-xl w-full max-w-2xl"></div>}>
              <MonthSelector
                selectedYear={selectedYear}
                selectedMonth={selectedMonth}
                onYearChange={setSelectedYear}
                onMonthChange={setSelectedMonth}
              />
            </Suspense>
          </div>
        </div>
        
        {/* Results Section */}
        <div className="space-y-6">
          {isLoading ? (
            <LoadingScreen />
          ) : recommendations.length > 0 ? (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2">
                  Rekomendasi Cuti Terbaik
                </h2>
                <p className="text-sm md:text-base text-gray-600">
                  Berikut pilihan cuti paling efisien untuk {monthName} {selectedYear}
                </p>
              </div>
              
              {/* Single Combined Card */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                {recommendations.map((rec, index) => (
                  <div key={index} className={`p-4 md:p-6 ${index !== recommendations.length - 1 ? 'border-b border-gray-200' : ''}`}>
                    <div className="flex items-start gap-3 md:gap-4 mb-4 md:mb-6">
                      <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg md:rounded-xl flex items-center justify-center shadow-md">
                        <span className="text-white text-lg md:text-xl font-semibold">{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-1">
                          Opsi #{index + 1}
                        </h3>
                        <p className="text-sm md:text-base text-gray-600">{rec.reason}</p>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                      {/* Dates Section */}
                      <div className="space-y-2 md:space-y-3">
                        <div className="flex items-center gap-2 text-xs md:text-sm font-medium text-gray-700 mb-2 md:mb-3">
                          <FaCalendarCheck className="text-blue-600 text-sm" />
                          <span>Ambil Cuti Pada:</span>
                        </div>
                        <div className="space-y-2">
                          {rec.leaveDates.map((date, idx) => (
                            <div key={idx} className="flex items-center gap-2 md:gap-3 bg-blue-50 px-3 md:px-4 py-2 md:py-3 rounded-lg border border-blue-100">
                              <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-blue-600 rounded-full"></div>
                              <span className="text-sm md:text-base text-gray-900">{formatDateWithDay(date)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Summary Section */}
                      <div className="space-y-3 md:space-y-4">
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg md:rounded-xl p-4 md:p-5 border border-green-200">
                          <div className="flex items-center gap-2 md:gap-3 mb-2">
                            <FaLightbulb className="text-green-600 text-base md:text-xl" />
                            <span className="text-sm md:text-base font-semibold text-gray-900">Total Benefit</span>
                          </div>
                          <p className="text-2xl md:text-3xl font-bold text-green-700">{rec.totalOffDays} Hari</p>
                          <p className="text-xs md:text-sm text-gray-600 mt-1">Libur berturut-turut</p>
                        </div>
                        
                        <div className="flex gap-2 flex-wrap">
                          <span className="inline-flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-blue-100 text-blue-800 rounded-lg text-xs md:text-sm font-medium">
                            <FaCalendarCheck className="text-xs md:text-sm" />
                            {rec.leaveDates.length} hari cuti
                          </span>
                          <span className="inline-flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-purple-100 text-purple-800 rounded-lg text-xs md:text-sm font-medium">
                            <FaLightbulb className="text-xs md:text-sm" />
                            Efisiensi tinggi
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Quote Section */}
                    {rec.quote && (
                      <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-gray-200">
                        <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-lg p-3 md:p-4 border-l-4 border-blue-600">
                          <p className="text-xs md:text-sm text-gray-700 italic">"{rec.quote}"</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                
                {/* Share Section */}
                <div className="bg-gradient-to-r from-slate-900 to-blue-900 p-4 md:p-6">
                  <div className="text-center space-y-3 md:space-y-4">
                    <div className="flex justify-center">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-white/10 rounded-full flex items-center justify-center">
                        <FaShare className="text-white text-base md:text-xl" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-base md:text-xl font-semibold text-white mb-1 md:mb-2">Bagikan Strategi Ini</h3>
                      <p className="text-xs md:text-sm text-blue-200">Bantu rekan kerja merencanakan liburan bersama</p>
                    </div>
                    <button
                      onClick={handleShare}
                      className="inline-flex items-center gap-2 md:gap-3 bg-white text-gray-900 px-4 md:px-6 py-2 md:py-3 rounded-lg md:rounded-xl text-sm md:text-base font-semibold hover:bg-blue-50 transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      <FaShare className="text-sm" />
                      Bagikan via WhatsApp
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center border border-gray-200">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaCalendarCheck className="text-gray-400 text-3xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Pilih Periode</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Silakan pilih tahun dan bulan di atas untuk melihat rekomendasi strategi cuti yang optimal
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
                  const text = `Nemu tool keren buat strategi cuti! Bisa tau kapan waktu terbaik ambil cuti biar dapet long weekend panjang.\n\nCek di: ${globalThis.location?.href || 'https://cuti.gagitualdi.online'}`;
                  globalThis.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
                }}
                className="px-8 py-4 bg-white text-green-600 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 active:scale-95 text-base md:text-lg"
              >
                📱 Share via WhatsApp
              </button>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(globalThis.location?.href || 'https://cuti.gagitualdi.online');
                  alert('✅ Link berhasil disalin!');
                }}
                className="px-8 py-4 bg-green-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 active:scale-95 text-base md:text-lg"
              >
                📋 Salin Link
              </button>
            </div>
          </div>
        </div>

        {/* Info Tips Section */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 md:p-8 border border-blue-200">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <FaLightbulb className="text-white text-lg" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Tips Cuti Strategis</h3>
              <p className="text-gray-700 mb-2">
                Ambil cuti di hari <strong>Jumat</strong> atau <strong>Senin</strong> untuk mendapatkan long weekend otomatis!
              </p>
              <p className="text-sm text-gray-600">
                Data berdasarkan kalender libur nasional dan cuti bersama Indonesia {selectedYear}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-slate-900 to-blue-900 text-white mt-16 md:mt-20 py-10 md:py-12">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-4">
          <div className="flex items-center justify-center gap-2 mb-3">
            <FaCalendarCheck className="text-2xl text-blue-300" />
            <h3 className="text-2xl font-bold">Planning Cuti</h3>
          </div>
          <p className="text-blue-200 max-w-2xl mx-auto">
            Tool gratis untuk menemukan waktu terbaik mengambil cuti. Maksimalkan hari libur dengan planning yang tepat berdasarkan libur nasional Indonesia.
          </p>
          <div className="border-t border-blue-700 my-6"></div>
          <div className="text-blue-300 text-sm">
            <p>© {new Date().getFullYear()} Dibuat dengan ❤️ oleh <a href="https://gagitualdi.online" target="_blank" rel="noopener noreferrer" className="font-bold hover:text-white transition-colors underline">Team GagituAldi</a></p>
            <p className="mt-2">Gratis & Open Source • Data Resmi Pemerintah Indonesia</p>
          </div>
        </div>
      </footer>
    </main>
    </>
  );
}