'use client';

import { FaCalendarAlt, FaCalendarDay } from 'react-icons/fa';
import CustomSelect from './CustomSelect';

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
  const yearOptions = YEARS.map(year => ({ value: year, label: year.toString() }));
  const monthOptions = MONTHS.map((month, index) => ({ value: index, label: month }));

  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full max-w-2xl">
      <CustomSelect
        value={selectedYear}
        onChange={onYearChange}
        options={yearOptions}
        label="Tahun"
        icon={<FaCalendarAlt className="text-blue-600" />}
      />
      
      <CustomSelect
        value={selectedMonth}
        onChange={onMonthChange}
        options={monthOptions}
        label="Bulan"
        icon={<FaCalendarDay className="text-blue-600" />}
      />
    </div>
  );
}
