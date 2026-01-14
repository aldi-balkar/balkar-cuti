'use client';

import { LeaveRecommendation, BadgeType } from '@/lib/calculateLeave';

interface LeaveRecommendationCardProps {
  readonly recommendation: LeaveRecommendation;
  readonly monthName: string;
}

const BADGE_CONFIG: Record<BadgeType, { label: string; color: string }> = {
  BEST_VALUE: { label: 'Best Value 💯', color: 'bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500' },
  LONG_WEEKEND: { label: 'Long Weekend 🎉', color: 'bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500' },
  HEMAT_CUTI: { label: 'Hemat Cuti 😎', color: 'bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400' },
};

const MONTHS = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

function formatDate(date: Date): string {
  const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const dayName = days[date.getDay()];
  const dayNum = date.getDate();
  const monthName = MONTHS[date.getMonth()];
  
  return `${dayName}, ${dayNum} ${monthName}`;
}

function formatDateShort(date: Date): string {
  const dayNum = date.getDate();
  const monthName = MONTHS[date.getMonth()];
  
  return `${dayNum} ${monthName}`;
}

function generateWhatsAppText(
  recommendation: LeaveRecommendation,
  monthName: string
): string {
  const leaveDatesText = recommendation.leaveDates
    .map(d => formatDate(d))
    .join(', ');
  
  return `🔥 CUTI PALING WORTH IT – ${monthName.toUpperCase()}

📌 Ambil cuti: ${leaveDatesText}
🛌 Libur: ${recommendation.totalOffDays} hari
🎉 Karena: ${recommendation.reason}

💬 "${recommendation.quote}"

✨ Mau cek tanggal worth it buat ambil cuti? 
Cek aja di: ${typeof window !== 'undefined' ? window.location.origin : 'https://cuti-worth-it.vercel.app'}

#CutiWorthIt #StrategyLiburan #WorkLifeBalance`;
}

export default function LeaveRecommendationCard({
  recommendation,
  monthName,
}: Readonly<LeaveRecommendationCardProps>) {
  const badge = BADGE_CONFIG[recommendation.badge];
  
  const handleShare = () => {
    const text = generateWhatsAppText(recommendation, monthName);
    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/?text=${encodedText}`;
    
    // Open WhatsApp in new window
    window.open(whatsappUrl, '_blank');
  };
  
  const handleCopy = () => {
    const text = generateWhatsAppText(recommendation, monthName);
    navigator.clipboard.writeText(text);
    
    // Show feedback
    alert('✅ Teks berhasil dicopy! Tinggal paste di mana aja.');
  };
  
  return (
    <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl md:rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 overflow-hidden border-4 border-blue-400 transform hover:scale-105">
      {/* Badge */}
      <div className={`${badge.color} text-white px-4 md:px-6 py-3 md:py-4 flex items-center justify-between shadow-lg`}>
        <span className="font-extrabold text-sm md:text-base uppercase tracking-wider">
          {badge.label}
        </span>
        <span className="text-xs md:text-sm font-bold bg-white/30 backdrop-blur-sm px-2 md:px-3 py-1 rounded-full">
          {recommendation.leaveDates.length} hari cuti
        </span>
      </div>
      
      {/* Content */}
      <div className="p-4 md:p-6 space-y-4 md:space-y-5">
        {/* Tanggal Cuti */}
        <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl md:rounded-2xl p-4 md:p-5 border-4 border-blue-300 shadow-lg transform hover:scale-105 transition-transform">
          <div className="text-sm md:text-base text-blue-800 font-extrabold mb-2 md:mb-3 flex items-center gap-2">
            <span className="text-xl md:text-2xl">📅</span> ambil cuti di:
          </div>
          <div className="space-y-2">
            {recommendation.leaveDates.map((date) => (
              <div key={date.toISOString()} className="text-gray-800 font-bold text-base md:text-lg bg-white/70 backdrop-blur-sm px-3 py-2 rounded-lg">
                {formatDate(date)}
              </div>
            ))}
          </div>
        </div>
        
        {/* Total Libur */}
        <div className="flex items-center gap-3 md:gap-4 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-xl md:rounded-2xl p-4 md:p-5 border-4 border-cyan-300 shadow-lg transform hover:scale-105 transition-transform">
          <div className="text-4xl md:text-5xl animate-bounce">👏</div>
          <div className="flex-1">
            <div className="text-sm md:text-base text-blue-800 font-extrabold">total libur dapet:</div>
            <div className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-cyan-600">
              {recommendation.totalOffDays} hari! 😍
            </div>
          </div>
        </div>
        
        {/* Alasan */}
        <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl md:rounded-2xl p-4 md:p-5 border-4 border-blue-300 shadow-lg transform hover:scale-105 transition-transform">
          <div className="text-sm md:text-base text-blue-800 font-extrabold mb-2 md:mb-3 flex items-center gap-2">
            <span className="text-xl md:text-2xl">🎉</span> kenapa worth it banget?
          </div>
          <div className="text-gray-800 font-bold text-base md:text-lg">
            {recommendation.reason}
          </div>
        </div>
        
        {/* Quote Gen Z */}
        <div className="bg-gradient-to-r from-blue-100 via-cyan-100 to-indigo-100 rounded-xl md:rounded-2xl p-4 md:p-5 border-4 border-blue-300 shadow-lg">
          <div className="text-gray-800 font-bold text-base md:text-xl text-center leading-relaxed">
            💬 <span className="italic">"{recommendation.quote}"</span> ✨
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-2 md:pt-3">
          <button
            onClick={handleShare}
            className="flex-1 bg-gradient-to-r from-green-500 via-teal-500 to-cyan-500 text-white font-extrabold py-3 md:py-4 px-4 md:px-6 rounded-xl md:rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-200 hover:scale-105 active:scale-95 border-4 border-green-600 text-base md:text-lg"
          >
            📱 Share ke WA
          </button>
          <button
            onClick={handleCopy}
            className="flex-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600 text-white font-extrabold py-3 md:py-4 px-4 md:px-6 rounded-xl md:rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-200 hover:scale-105 active:scale-95 border-4 border-blue-700 text-base md:text-lg"
          >
            📋 Copy Text
          </button>
        </div>
      </div>
    </div>
  );
}
