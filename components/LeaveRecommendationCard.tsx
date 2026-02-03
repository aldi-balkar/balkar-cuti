'use client';

import { LeaveRecommendation, BadgeType } from '@/lib/calculateLeave';

interface LeaveRecommendationCardProps {
  readonly recommendation: LeaveRecommendation;
  readonly monthName: string;
}

const BADGE_CONFIG: Record<BadgeType, { label: string; color: string }> = {
  BEST_VALUE: { label: 'Paling Optimal', color: 'bg-gradient-to-r from-blue-600 to-cyan-600' },
  LONG_WEEKEND: { label: 'Long Weekend', color: 'bg-gradient-to-r from-indigo-600 to-blue-600' },
  HEMAT_CUTI: { label: 'Hemat Cuti', color: 'bg-gradient-to-r from-blue-700 to-cyan-500' },
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
  
  return `STRATEGI CUTI CERDAS – ${monthName.toUpperCase()}

📌 Ambil cuti: ${leaveDatesText}
🗓️ Total libur: ${recommendation.totalOffDays} hari
💡 Alasan: ${recommendation.reason}

"${recommendation.quote}"

Mau cek tanggal terbaik buat ambil cuti? 
Coba tool ini: ${globalThis.location?.origin || 'https://cuti-worth-it.vercel.app'}`;
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
    globalThis.open(whatsappUrl, '_blank');
  };
  
  const handleCopy = () => {
    const text = generateWhatsAppText(recommendation, monthName);
    navigator.clipboard.writeText(text);
    
    // Show feedback
    alert('✅ Teks berhasil disalin ke clipboard!');
  };
  
  return (
    <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200">
      {/* Badge */}
      <div className={`${badge.color} text-white px-5 md:px-6 py-4 md:py-5 flex items-center justify-between`}>
        <span className="font-bold text-base md:text-lg">
          {badge.label}
        </span>
        <span className="text-sm md:text-base font-semibold bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
          {recommendation.leaveDates.length} hari cuti
        </span>
      </div>
      
      {/* Content */}
      <div className="p-5 md:p-7 space-y-4 md:space-y-5">
        {/* Tanggal Cuti */}
        <div className="bg-blue-50 rounded-xl p-4 md:p-5 border border-blue-200">
          <div className="text-sm md:text-base text-gray-700 font-bold mb-3 flex items-center gap-2">
            <span className="text-xl">📅</span> Tanggal Cuti
          </div>
          <div className="space-y-2">
            {recommendation.leaveDates.map((date) => (
              <div key={date.toISOString()} className="text-gray-800 font-semibold text-base md:text-lg bg-white px-4 py-2 rounded-lg shadow-sm">
                {formatDate(date)}
              </div>
            ))}
          </div>
        </div>
        
        {/* Total Libur */}
        <div className="flex items-center gap-4 bg-green-50 rounded-xl p-4 md:p-5 border border-green-200">
          <div className="text-4xl md:text-5xl">✨</div>
          <div className="flex-1">
            <div className="text-sm md:text-base text-gray-600 font-medium">Total Hari Libur</div>
            <div className="text-3xl md:text-4xl font-bold text-green-600">
              {recommendation.totalOffDays} hari
            </div>
          </div>
        </div>
        
        {/* Alasan */}
        <div className="bg-blue-50 rounded-xl p-4 md:p-5 border border-blue-200">
          <div className="text-sm md:text-base text-gray-700 font-bold mb-2 flex items-center gap-2">
            <span className="text-xl">💡</span> Kenapa Recommended?
          </div>
          <div className="text-gray-700 font-medium text-base md:text-lg">
            {recommendation.reason}
          </div>
        </div>
        
        {/* Quote */}
        <div className="bg-gray-50 rounded-xl p-4 md:p-5 border border-gray-200">
          <div className="text-gray-600 font-medium text-base md:text-lg text-center leading-relaxed italic">
            "{recommendation.quote}"
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-3">
          <button
            onClick={handleShare}
            className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 md:py-4 px-5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 active:scale-95 text-base"
          >
            📱 Bagikan via WhatsApp
          </button>
          <button
            onClick={handleCopy}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 md:py-4 px-5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 active:scale-95 text-base"
          >
            📋 Salin Teks
          </button>
        </div>
      </div>
    </div>
  );
}
