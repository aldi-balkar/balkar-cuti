'use client';

import { useState, useMemo, lazy, Suspense } from 'react';
import dynamic from 'next/dynamic';
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
  
  return (
    <>
      <LoadingScreen />
      <main className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-cyan-500 relative overflow-hidden">
      {/* Animated blobs background */}
      <div className="absolute top-0 left-0 w-64 h-64 md:w-96 md:h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/2 w-64 h-64 md:w-96 md:h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      
      {/* Header */}
      <div className="relative bg-gradient-to-r from-blue-800 via-blue-600 to-cyan-500 text-white py-8 md:py-12 px-4 shadow-2xl">
        <div className="max-w-4xl mx-auto text-center space-y-3 md:space-y-4">
          <div className="inline-block">
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold drop-shadow-2xl">
              🏖️ Cuti Paling Worth It 💯
            </h1>
          </div>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold opacity-95">
            no cap fr fr — minimal cuti, maksimal healing ✨
          </p>
          <p className="text-xs sm:text-sm md:text-base font-medium opacity-90">
            strategi cuti cerdas buat kamu, bestie 🫶
          </p>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="relative max-w-4xl mx-auto px-4 py-6 md:py-8 space-y-6 md:space-y-8">
        {/* Month Selector */}
        <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl md:rounded-3xl shadow-2xl p-5 md:p-8 border-4 border-blue-400 transform hover:scale-105 transition-transform duration-300">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-5 md:mb-6">
            <span className="text-3xl md:text-4xl animate-bounce">📅</span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-blue-700 to-cyan-600 bg-clip-text text-transparent text-center">
              pilih bulan mana yg mau dicek bestie
            </h2>
          </div>
          <div className="flex justify-center">
            <Suspense fallback={<div className="h-24 bg-blue-100 animate-pulse rounded-xl w-full max-w-md"></div>}>
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
        <div className="space-y-4 md:space-y-6">
          <div className="text-center bg-white/90 backdrop-blur-sm rounded-2xl md:rounded-3xl p-5 md:p-6 shadow-xl border-4 border-cyan-400">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-700 via-blue-500 to-cyan-500 bg-clip-text text-transparent mb-3">
              hasil pencarian bulan {monthName} {selectedYear}
            </h2>
            {recommendations.length > 0 ? (
              <p className="text-base sm:text-lg md:text-xl font-bold text-blue-700">
                yayyy dapet {recommendations.length} rekomendasi cuti slay abis! 🎉✨
              </p>
            ) : (
              <p className="text-base sm:text-lg md:text-xl font-bold text-gray-700">
                hmm bulan ini agak susah sih untuk long weekend 😅💔
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
            <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl md:rounded-3xl shadow-2xl p-6 md:p-10 text-center border-4 border-dashed border-blue-400">
              <div className="text-6xl md:text-8xl mb-4 md:mb-6 animate-bounce">🤔</div>
              <p className="text-xl md:text-2xl font-bold text-gray-800 mb-2 md:mb-3">
                waduh, bulan ini gaada rekomendasi spesial sis
              </p>
              <p className="text-base md:text-lg font-semibold text-blue-700">
                coba cek bulan lain yg ada haribelnya yuk! 💪
              </p>
            </div>
          )}
        </div>
        
        {/* Info Footer */}
        <div className="bg-gradient-to-r from-blue-200 via-cyan-200 to-blue-300 rounded-2xl md:rounded-3xl p-5 md:p-8 border-4 border-cyan-400 shadow-2xl">
          <div className="text-center space-y-2 md:space-y-3">
            <p className="text-base sm:text-lg md:text-xl font-bold text-blue-900">
              💡 <span className="text-lg sm:text-xl md:text-2xl">pro tip nih bestie:</span> ambil cuti jumat/senin = long weekend langsung! gasss
            </p>
            <p className="text-sm sm:text-base font-semibold text-gray-700">
              *data dari kalender libur nasional & cutbers Indonesia {selectedYear} ya gaes
            </p>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="relative bg-gradient-to-r from-blue-800 via-blue-600 to-cyan-500 border-t-4 border-cyan-400 py-6 md:py-8 mt-8 md:mt-12">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <p className="text-base sm:text-lg md:text-xl font-bold mb-2">
            made with 💙 sama 🔥 buat kalian para pejuang kantoran
          </p>
          <p className="text-sm sm:text-base md:text-lg font-semibold">
            work smart, rest hard, live your best life bestie ✨🫶
          </p>
          <p className="text-xs sm:text-sm mt-2 md:mt-3 opacity-90">
            share ke temen2 kantor ya biar semua bisa strategi cuti bareng! 🚀
          </p>
        </div>
      </footer>
    </main>
    </>
  );
}
