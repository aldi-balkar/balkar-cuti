'use client';

interface MonthSelectorProps {
  readonly selectedYear: number;
  readonly selectedMonth: number;
  readonly onYearChange: (year: number) => void;
  readonly onMonthChange: (month: number) => void;
}

const MONTHS = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

const YEARS = [2025, 2026];

export default function MonthSelector({
  selectedYear,
  selectedMonth,
  onYearChange,
  onMonthChange,
}: Readonly<MonthSelectorProps>) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 md:gap-6 w-full max-w-md">
      <div className="flex-1">
        <label htmlFor="year" className="block text-base md:text-lg font-extrabold text-blue-800 mb-2 md:mb-3">
          📅 Tahun
        </label>
        <select
          id="year"
          value={selectedYear}
          onChange={(e) => onYearChange(Number(e.target.value))}
          className="w-full px-4 md:px-5 py-3 md:py-4 rounded-xl md:rounded-2xl border-4 border-blue-400 bg-gradient-to-br from-white to-blue-50 text-gray-800 text-base md:text-lg font-bold shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-500 focus:border-blue-600 transition-all hover:border-blue-500 hover:shadow-2xl transform hover:scale-105 cursor-pointer"
        >
          {YEARS.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <div className="flex-1">
        <label htmlFor="month" className="block text-base md:text-lg font-extrabold text-cyan-700 mb-2 md:mb-3">
          📆 Bulan
        </label>
        <select
          id="month"
          value={selectedMonth}
          onChange={(e) => onMonthChange(Number(e.target.value))}
          className="w-full px-4 md:px-5 py-3 md:py-4 rounded-xl md:rounded-2xl border-4 border-cyan-400 bg-gradient-to-br from-white to-cyan-50 text-gray-800 text-base md:text-lg font-bold shadow-xl focus:outline-none focus:ring-4 focus:ring-cyan-500 focus:border-cyan-600 transition-all hover:border-cyan-500 hover:shadow-2xl transform hover:scale-105 cursor-pointer"
        >
          {MONTHS.map((month) => (
            <option key={month} value={MONTHS.indexOf(month)}>
              {month}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
