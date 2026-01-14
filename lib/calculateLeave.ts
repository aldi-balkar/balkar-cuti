import { Holiday } from './holidays';

export type BadgeType = 'BEST_VALUE' | 'LONG_WEEKEND' | 'HEMAT_CUTI';

export interface LeaveRecommendation {
  leaveDates: Date[];
  totalOffDays: number;
  reason: string;
  badge: BadgeType;
  quote: string;
}

// Helper: Cek apakah tanggal adalah weekend
function isWeekend(date: Date): boolean {
  const day = date.getDay();
  return day === 0 || day === 6; // Sunday or Saturday
}

// Helper: Cek apakah tanggal adalah libur
function isHoliday(date: Date, holidays: Date[]): boolean {
  return holidays.some(h => 
    h.getDate() === date.getDate() &&
    h.getMonth() === date.getMonth() &&
    h.getFullYear() === date.getFullYear()
  );
}

// Helper: Hitung hari libur berurutan dari tanggal tertentu
function countConsecutiveOffDays(
  startDate: Date,
  holidays: Date[],
  leaveDates: Date[]
): number {
  let count = 0;
  const currentDate = new Date(startDate);
  
  while (true) {
    const isOff = isWeekend(currentDate) || 
                  isHoliday(currentDate, holidays) || 
                  isHoliday(currentDate, leaveDates);
    
    if (!isOff) break;
    
    count++;
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return count;
}

// Helper: Hitung mundur hari libur berurutan sebelum tanggal tertentu
function countConsecutiveOffDaysBefore(
  endDate: Date,
  holidays: Date[],
  leaveDates: Date[]
): number {
  let count = 0;
  const currentDate = new Date(endDate);
  currentDate.setDate(currentDate.getDate() - 1);
  
  while (true) {
    const isOff = isWeekend(currentDate) || 
                  isHoliday(currentDate, holidays) || 
                  isHoliday(currentDate, leaveDates);
    
    if (!isOff) break;
    
    count++;
    currentDate.setDate(currentDate.getDate() - 1);
  }
  
  return count;
}

// Quote Gen Z random
const genZQuotes: Record<number, string[]> = {
  4: [
    'cuti 1 hari, healing 4 hari. semua happy, win-win solution!',
    'efisien banget! cuma 1 jatah cuti doang gaes',
    'efisiensi? cek. liburan? cek. ini sih strategi cerdas fr fr',
    'literally 1 hari cuti dapet 4 hari off? bestie ini smart move',
  ],
  5: [
    'cuti 1 hari dapet 5 hari off? this is so slay bestie',
    '5 hari libur modal 1 cuti. strategi terbaik tahun ini no cap',
    'produktivitas maksimal, istirahat optimal. balance is the vibe',
    'work-life balance goals! ini namanya strategi cuti cerdas',
  ],
  6: [
    'seminggu healing cuma modal 2 hari cuti. efisien banget! 📈',
    'ambil 2 hari, libur seminggu. math is mathing bestie',
    '6 hari libur = bisa staycation + self care tanpa FOMO, slay!',
    'main character energy: seminggu libur modal 2 hari cuti aja',
  ],
  7: [
    'libur seminggu lebih? kayak bonus kehidupan tambahan',
    'cuti 2-3 hari, libur seminggu. this is the way sis',
    'weekend extension level maksimal. optimal banget buat healing',
    'literally bisa iklanin "living my best life" di IG story seminggu penuh',
  ],
};

function getRandomQuote(totalOffDays: number, leaveDates: Date[]): string {
  const quotes = genZQuotes[totalOffDays] || 
                 genZQuotes[7] || 
                 ['Libur panjang terbaik bulan ini!'];
  // Use date as seed for consistent quote selection
  const seed = leaveDates[0].getDate() + leaveDates[0].getMonth();
  return quotes[seed % quotes.length];
}

// Helper: Cari rekomendasi H-1 libur nasional
function findBeforeHolidayRecommendations(
  monthHolidays: Holiday[],
  holidayDates: Date[]
): LeaveRecommendation[] {
  const recommendations: LeaveRecommendation[] = [];
  
  for (const holiday of monthHolidays) {
    const dayBefore = new Date(holiday.date);
    dayBefore.setDate(dayBefore.getDate() - 1);
    
    if (!isWeekend(dayBefore) && !isHoliday(dayBefore, holidayDates)) {
      const totalOff = countConsecutiveOffDays(dayBefore, holidayDates, [dayBefore]) + 
                       countConsecutiveOffDaysBefore(dayBefore, holidayDates, []);
      
      if (totalOff >= 4) {
        recommendations.push({
          leaveDates: [dayBefore],
          totalOffDays: totalOff,
          reason: `H-1 ${holiday.name} + weekend nyambung`,
          badge: totalOff >= 5 ? 'BEST_VALUE' : 'LONG_WEEKEND',
          quote: getRandomQuote(totalOff, [dayBefore]),
        });
      }
    }
  }
  
  return recommendations;
}

// Helper: Cari rekomendasi H+1 libur nasional
function findAfterHolidayRecommendations(
  monthHolidays: Holiday[],
  holidayDates: Date[]
): LeaveRecommendation[] {
  const recommendations: LeaveRecommendation[] = [];
  
  for (const holiday of monthHolidays) {
    const dayAfter = new Date(holiday.date);
    dayAfter.setDate(dayAfter.getDate() + 1);
    
    if (!isWeekend(dayAfter) && !isHoliday(dayAfter, holidayDates)) {
      const totalOff = countConsecutiveOffDaysBefore(dayAfter, holidayDates, [dayAfter]) + 
                       countConsecutiveOffDays(dayAfter, holidayDates, [dayAfter]);
      
      if (totalOff >= 4) {
        recommendations.push({
          leaveDates: [dayAfter],
          totalOffDays: totalOff,
          reason: `H+1 ${holiday.name} + weekend nyambung`,
          badge: totalOff >= 5 ? 'BEST_VALUE' : 'LONG_WEEKEND',
          quote: getRandomQuote(totalOff, [dayAfter]),
        });
      }
    }
  }
  
  return recommendations;
}

// Helper: Cari kombinasi 2 hari cuti berturut-turut
function findTwoDayLeaveRecommendations(
  year: number,
  month: number,
  holidayDates: Date[]
): LeaveRecommendation[] {
  const recommendations: LeaveRecommendation[] = [];
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  for (let day = 1; day <= daysInMonth - 1; day++) {
    const date1 = new Date(year, month, day);
    const date2 = new Date(year, month, day + 1);
    
    if (isWeekend(date1) || isHoliday(date1, holidayDates)) continue;
    if (isWeekend(date2) || isHoliday(date2, holidayDates)) continue;
    
    const totalOff = countConsecutiveOffDays(date1, holidayDates, [date1, date2]) + 
                     countConsecutiveOffDaysBefore(date1, holidayDates, []);
    
    if (totalOff >= 6) {
      recommendations.push({
        leaveDates: [date1, date2],
        totalOffDays: totalOff,
        reason: `Cuti 2 hari + long weekend`,
        badge: 'HEMAT_CUTI',
        quote: getRandomQuote(totalOff, [date1, date2]),
      });
    }
  }
  
  return recommendations;
}

// Helper: Cari bridge days (cuti di tengah antara libur)
function findBridgeDayRecommendations(
  year: number,
  month: number,
  holidayDates: Date[]
): LeaveRecommendation[] {
  const recommendations: LeaveRecommendation[] = [];
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  for (let day = 1; day <= daysInMonth; day++) {
    const currentDate = new Date(year, month, day);
    
    if (isWeekend(currentDate) || isHoliday(currentDate, holidayDates)) continue;
    
    const dayBefore = new Date(currentDate);
    dayBefore.setDate(dayBefore.getDate() - 1);
    const dayAfter = new Date(currentDate);
    dayAfter.setDate(dayAfter.getDate() + 1);
    
    const hasOffBefore = isWeekend(dayBefore) || isHoliday(dayBefore, holidayDates);
    const hasOffAfter = isWeekend(dayAfter) || isHoliday(dayAfter, holidayDates);
    
    if (hasOffBefore && hasOffAfter) {
      const totalOff = countConsecutiveOffDays(currentDate, holidayDates, [currentDate]) + 
                       countConsecutiveOffDaysBefore(currentDate, holidayDates, []);
      
      if (totalOff >= 4) {
        recommendations.push({
          leaveDates: [currentDate],
          totalOffDays: totalOff,
          reason: 'Bridge weekend & libur nasional',
          badge: 'BEST_VALUE',
          quote: getRandomQuote(totalOff, [currentDate]),
        });
      }
    }
  }
  
  return recommendations;
}

// Helper: Deduplicate dan sort recommendations
function processRecommendations(recommendations: LeaveRecommendation[]): LeaveRecommendation[] {
  // Sort by efficiency
  recommendations.sort((a, b) => {
    const efficiencyA = a.totalOffDays / a.leaveDates.length;
    const efficiencyB = b.totalOffDays / b.leaveDates.length;
    return efficiencyB - efficiencyA;
  });
  
  // Deduplicate
  const uniqueRecommendations: LeaveRecommendation[] = [];
  const seenLeaves = new Set<string>();
  
  for (const rec of recommendations) {
    const key = rec.leaveDates.map(d => d.toISOString()).sort((a, b) => a.localeCompare(b)).join(',');
    if (!seenLeaves.has(key)) {
      seenLeaves.add(key);
      uniqueRecommendations.push(rec);
    }
  }
  
  return uniqueRecommendations.slice(0, 3);
}

// Main function: Hitung cuti optimal
export function calculateOptimalLeave(
  holidays: Holiday[],
  month: number,
  year: number,
  maxLeaveDays: number = 3
): LeaveRecommendation[] {
  const holidayDates = holidays.map(h => h.date);
  const monthHolidays = holidays.filter(h => 
    h.date.getMonth() === month && h.date.getFullYear() === year
  );
  
  const allRecommendations = [
    ...findBeforeHolidayRecommendations(monthHolidays, holidayDates),
    ...findAfterHolidayRecommendations(monthHolidays, holidayDates),
    ...findTwoDayLeaveRecommendations(year, month, holidayDates),
    ...findBridgeDayRecommendations(year, month, holidayDates),
  ];
  
  return processRecommendations(allRecommendations);
}
