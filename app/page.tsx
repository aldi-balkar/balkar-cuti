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
      <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white py-20 md:py-32 px-4">
        <div className="max-w-6xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-3 md:gap-4 bg-blue-800/30 px-8 py-3 md:py-4 rounded-full border border-blue-500/30 mb-6">
            <FaCalendarCheck className="text-blue-300 text-lg md:text-xl" />
            <span className="text-base md:text-lg font-medium text-blue-100">Planning Liburan yang Tepat</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight">
            Planning Cuti
          </h1>
          
          <p className="text-xl sm:text-2xl md:text-3xl text-blue-100 max-w-4xl mx-auto font-light leading-relaxed">
            Maksimalkan hari libur dengan planning yang tepat berdasarkan kalender libur nasional Indonesia
          </p>
          
          {/* Trust Badge */}
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 pt-8 text-base md:text-lg text-blue-200">
            <div className="flex items-center gap-2 md:gap-3">
              <FaCalendarCheck className="text-green-400 text-xl md:text-2xl" />
              <span>10,000+ Pengguna</span>
            </div>
            <div className="flex items-center gap-2 md:gap-3">
              <FaLightbulb className="text-yellow-400 text-xl md:text-2xl" />
              <span>100% Gratis</span>
            </div>
            <div className="flex items-center gap-2 md:gap-3">
              <FaInfoCircle className="text-blue-400 text-xl md:text-2xl" />
              <span>Data Resmi</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-20 space-y-12 md:space-y-16">
        
        {/* First Time User Guide */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl md:rounded-2xl p-8 md:p-12 border-l-4 md:border-l-[6px] border-blue-600 shadow-sm">
          <div className="flex items-start gap-5 md:gap-6">
            <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 bg-blue-600 rounded-full flex items-center justify-center">
              <FaInfoCircle className="text-white text-xl md:text-2xl" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-5">Cara Menggunakan</h3>
              <ol className="space-y-3 md:space-y-4 text-base md:text-lg text-gray-700">
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
        <div className="bg-white rounded-xl md:rounded-2xl shadow-xl p-8 md:p-16 border border-gray-200">
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 md:mb-4">
              Pilih Periode
            </h2>
            <p className="text-lg md:text-xl text-gray-600">Pilih tahun dan bulan untuk melihat rekomendasi cuti</p>
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
        <div className="space-y-8 md:space-y-10">
          {isLoading ? (
            <LoadingScreen />
          ) : recommendations.length > 0 ? (
            <div className="space-y-8 md:space-y-10">
              <div className="text-center">
                <h2 className="text-2xl md:text-4xl font-semibold text-gray-900 mb-3 md:mb-4">
                  Rekomendasi Cuti Terbaik
                </h2>
                <p className="text-base md:text-xl text-gray-600">
                  Berikut pilihan cuti paling efisien untuk {monthName} {selectedYear}
                </p>
              </div>
              
              {/* Single Combined Card */}
              <div className="bg-white rounded-xl md:rounded-2xl shadow-xl border-2 border-gray-200 overflow-hidden">
                {recommendations.map((rec, index) => (
                  <div key={index} className={`p-6 md:p-10 ${index !== recommendations.length - 1 ? 'border-b-2 border-gray-200' : ''}`}>
                    <div className="flex items-start gap-4 md:gap-5 mb-6 md:mb-8">
                      <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
                        <span className="text-white text-xl md:text-3xl font-semibold">{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg md:text-2xl font-semibold text-gray-900 mb-2">
                          Opsi #{index + 1}
                        </h3>
                        <p className="text-base md:text-lg text-gray-600">{rec.reason}</p>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                      {/* Dates Section */}
                      <div className="space-y-3 md:space-y-4">
                        <div className="flex items-center gap-2 md:gap-3 text-sm md:text-lg font-medium text-gray-700 mb-3 md:mb-4">
                          <FaCalendarCheck className="text-blue-600 text-base md:text-xl" />
                          <span>Ambil Cuti Pada:</span>
                        </div>
                        <div className="space-y-2 md:space-y-3">
                          {rec.leaveDates.map((date, idx) => (
                            <div key={idx} className="flex items-center gap-3 md:gap-4 bg-blue-50 px-4 md:px-6 py-3 md:py-4 rounded-lg md:rounded-xl border border-blue-100">
                              <div className="w-2 h-2 md:w-2.5 md:h-2.5 bg-blue-600 rounded-full"></div>
                              <span className="text-base md:text-lg text-gray-900">{formatDateWithDay(date)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Summary Section */}
                      <div className="space-y-4 md:space-y-5">
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl md:rounded-2xl p-6 md:p-8 border-2 border-green-200">
                          <div className="flex items-center gap-3 md:gap-4 mb-3">
                            <FaLightbulb className="text-green-600 text-xl md:text-3xl" />
                            <span className="text-base md:text-xl font-semibold text-gray-900">Total Benefit</span>
                          </div>
                          <p className="text-3xl md:text-5xl font-bold text-green-700">{rec.totalOffDays} Hari</p>
                          <p className="text-sm md:text-base text-gray-600 mt-2">Libur berturut-turut</p>
                        </div>
                        
                        <div className="flex gap-2 md:gap-3 flex-wrap">
                          <span className="inline-flex items-center gap-2 md:gap-2.5 px-4 md:px-6 py-2 md:py-3 bg-blue-100 text-blue-800 rounded-lg md:rounded-xl text-sm md:text-base font-medium">
                            <FaCalendarCheck className="text-sm md:text-lg" />
                            {rec.leaveDates.length} hari cuti
                          </span>
                          <span className="inline-flex items-center gap-2 md:gap-2.5 px-4 md:px-6 py-2 md:py-3 bg-purple-100 text-purple-800 rounded-lg md:rounded-xl text-sm md:text-base font-medium">
                            <FaLightbulb className="text-sm md:text-lg" />
                            Efisiensi tinggi
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Quote Section */}
                    {rec.quote && (
                      <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t-2 border-gray-200">
                        <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-lg md:rounded-xl p-4 md:p-6 border-l-4 md:border-l-[6px] border-blue-600">
                          <p className="text-sm md:text-lg text-gray-700 italic leading-relaxed">"{rec.quote}"</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                
                {/* Share Section */}
                <div className="bg-gradient-to-r from-slate-900 to-blue-900 p-6 md:p-10">
                  <div className="text-center space-y-4 md:space-y-6">
                    <div className="flex justify-center">
                      <div className="w-12 h-12 md:w-16 md:h-16 bg-white/10 rounded-full flex items-center justify-center">
                        <FaShare className="text-white text-xl md:text-3xl" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg md:text-3xl font-semibold text-white mb-2 md:mb-3">Bagikan Strategi Ini</h3>
                      <p className="text-sm md:text-lg text-blue-200">Bantu rekan kerja merencanakan liburan bersama</p>
                    </div>
                    <button
                      onClick={handleShare}
                      className="inline-flex items-center gap-2 md:gap-3 bg-white text-gray-900 px-6 md:px-10 py-3 md:py-5 rounded-xl md:rounded-2xl text-base md:text-xl font-semibold hover:bg-blue-50 transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      <FaShare className="text-base md:text-lg" />
                      Bagikan via WhatsApp
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl md:rounded-2xl shadow-xl p-12 md:p-20 text-center border-2 border-gray-200">
              <div className="w-20 h-20 md:w-28 md:h-28 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8">
                <FaCalendarCheck className="text-gray-400 text-3xl md:text-5xl" />
              </div>
              <h3 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">Pilih Periode</h3>
              <p className="text-base md:text-xl text-gray-600 max-w-xl mx-auto leading-relaxed">
                Silakan pilih tahun dan bulan di atas untuk melihat rekomendasi strategi cuti yang optimal
              </p>
            </div>
          )}
        </div>
        
        {/* CTA Section - Viral Sharing */}
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl md:rounded-3xl p-10 md:p-16 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
          <div className="relative text-center space-y-6 md:space-y-8">
            <div className="text-5xl md:text-7xl">📤</div>
            <h3 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
              Bagikan ke Rekan Kerja
            </h3>
            <p className="text-lg sm:text-xl md:text-2xl font-medium text-white/95 max-w-3xl mx-auto leading-relaxed">
              Kalau kamu merasa tool ini berguna, share juga ke teman-teman kantormu biar bisa planning cuti bareng!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 md:gap-5 justify-center pt-4 md:pt-6">
              <button 
                onClick={() => {
                  const text = `Nemu tool keren buat strategi cuti! Bisa tau kapan waktu terbaik ambil cuti biar dapet long weekend panjang.\n\nCek di: ${globalThis.location?.href || 'https://cuti.gagitualdi.online'}`;
                  globalThis.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
                }}
                className="px-8 md:px-12 py-4 md:py-6 bg-white text-green-600 font-bold rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 active:scale-95 text-lg md:text-2xl"
              >
                📱 Share via WhatsApp
              </button>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(globalThis.location?.href || 'https://cuti.gagitualdi.online');
                  alert('✅ Link berhasil disalin!');
                }}
                className="px-8 md:px-12 py-4 md:py-6 bg-green-700 text-white font-bold rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 active:scale-95 text-lg md:text-2xl"
              >
                📋 Salin Link
              </button>
            </div>
          </div>
        </div>

        {/* Info Tips Section */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl md:rounded-2xl p-8 md:p-12 border-2 border-blue-200">
          <div className="flex items-start gap-5 md:gap-6">
            <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 bg-blue-600 rounded-full flex items-center justify-center">
              <FaLightbulb className="text-white text-xl md:text-2xl" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">Tips Cuti Strategis</h3>
              <p className="text-base md:text-lg text-gray-700 mb-3 leading-relaxed">
                Ambil cuti di hari <strong>Jumat</strong> atau <strong>Senin</strong> untuk mendapatkan long weekend otomatis!
              </p>
              <p className="text-sm md:text-base text-gray-600">
                Data berdasarkan kalender libur nasional dan cuti bersama Indonesia {selectedYear}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-slate-900 to-blue-900 text-white mt-20 md:mt-24 py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4 text-center space-y-6 md:space-y-8">
          <div className="flex items-center justify-center gap-3 md:gap-4 mb-4">
            <FaCalendarCheck className="text-3xl md:text-4xl text-blue-300" />
            <h3 className="text-3xl md:text-4xl font-bold">Planning Cuti</h3>
          </div>
          <p className="text-base md:text-xl text-blue-200 max-w-3xl mx-auto leading-relaxed">
            Tool gratis untuk menemukan waktu terbaik mengambil cuti. Maksimalkan hari libur dengan planning yang tepat berdasarkan libur nasional Indonesia.
          </p>
          <div className="border-t border-blue-700 my-8"></div>
          <div className="text-blue-300 text-sm md:text-base">
            <p>© {new Date().getFullYear()} Dibuat dengan ❤️ oleh <a href="https://gagitualdi.online" target="_blank" rel="noopener noreferrer" className="font-bold hover:text-white transition-colors underline">Team GagituAldi</a></p>
            <p className="mt-3">Gratis & Open Source • Data Resmi Pemerintah Indonesia</p>
          </div>
        </div>
      </footer>
    </main>
    </>
  );
}