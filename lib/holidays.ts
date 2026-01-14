// Data libur nasional dan cuti bersama Indonesia 2025-2026
export interface Holiday {
  date: Date;
  name: string;
  isJointLeave?: boolean; // cuti bersama
}

export const holidays2025: Holiday[] = [
  { date: new Date(2025, 0, 1), name: 'Tahun Baru 2025' },
  { date: new Date(2025, 0, 29), name: 'Tahun Baru Imlek 2576' },
  { date: new Date(2025, 2, 29), name: 'Isra Mikraj Nabi Muhammad SAW' },
  { date: new Date(2025, 2, 31), name: 'Hari Raya Nyepi' },
  { date: new Date(2025, 3, 1), name: 'Cuti Bersama Nyepi', isJointLeave: true },
  { date: new Date(2025, 3, 18), name: 'Wafat Isa Al Masih' },
  { date: new Date(2025, 3, 30), name: 'Hari Raya Idul Fitri 1446 H' },
  { date: new Date(2025, 4, 1), name: 'Hari Raya Idul Fitri 1446 H' },
  { date: new Date(2025, 3, 28), name: 'Cuti Bersama Idul Fitri', isJointLeave: true },
  { date: new Date(2025, 3, 29), name: 'Cuti Bersama Idul Fitri', isJointLeave: true },
  { date: new Date(2025, 4, 2), name: 'Cuti Bersama Idul Fitri', isJointLeave: true },
  { date: new Date(2025, 4, 5), name: 'Cuti Bersama Idul Fitri', isJointLeave: true },
  { date: new Date(2025, 4, 1), name: 'Hari Buruh Internasional' },
  { date: new Date(2025, 4, 29), name: 'Kenaikan Isa Al Masih' },
  { date: new Date(2025, 5, 5), name: 'Hari Raya Waisak 2569' },
  { date: new Date(2025, 5, 6), name: 'Hari Lahir Pancasila' },
  { date: new Date(2025, 5, 7), name: 'Hari Raya Idul Adha 1446 H' },
  { date: new Date(2025, 5, 9), name: 'Cuti Bersama Idul Adha', isJointLeave: true },
  { date: new Date(2025, 6, 7), name: 'Tahun Baru Islam 1447 H' },
  { date: new Date(2025, 7, 17), name: 'Hari Kemerdekaan RI' },
  { date: new Date(2025, 8, 15), name: 'Maulid Nabi Muhammad SAW' },
  { date: new Date(2025, 11, 25), name: 'Hari Raya Natal' },
  { date: new Date(2025, 11, 26), name: 'Cuti Bersama Natal', isJointLeave: true },
];

export const holidays2026: Holiday[] = [
  { date: new Date(2026, 0, 1), name: 'Tahun Baru 2026' },
  { date: new Date(2026, 0, 2), name: 'Cuti Bersama Tahun Baru', isJointLeave: true },
  { date: new Date(2026, 1, 17), name: 'Tahun Baru Imlek 2577' },
  { date: new Date(2026, 2, 19), name: 'Isra Mikraj Nabi Muhammad SAW' },
  { date: new Date(2026, 2, 21), name: 'Hari Raya Nyepi' },
  { date: new Date(2026, 2, 20), name: 'Cuti Bersama Nyepi', isJointLeave: true },
  { date: new Date(2026, 3, 3), name: 'Wafat Isa Al Masih' },
  { date: new Date(2026, 3, 20), name: 'Hari Raya Idul Fitri 1447 H' },
  { date: new Date(2026, 3, 21), name: 'Hari Raya Idul Fitri 1447 H' },
  { date: new Date(2026, 3, 17), name: 'Cuti Bersama Idul Fitri', isJointLeave: true },
  { date: new Date(2026, 3, 22), name: 'Cuti Bersama Idul Fitri', isJointLeave: true },
  { date: new Date(2026, 3, 23), name: 'Cuti Bersama Idul Fitri', isJointLeave: true },
  { date: new Date(2026, 4, 1), name: 'Hari Buruh Internasional' },
  { date: new Date(2026, 4, 14), name: 'Kenaikan Isa Al Masih' },
  { date: new Date(2026, 4, 26), name: 'Hari Raya Waisak 2570' },
  { date: new Date(2026, 5, 1), name: 'Hari Lahir Pancasila' },
  { date: new Date(2026, 5, 27), name: 'Hari Raya Idul Adha 1447 H' },
  { date: new Date(2026, 5, 26), name: 'Cuti Bersama Idul Adha', isJointLeave: true },
  { date: new Date(2026, 6, 17), name: 'Tahun Baru Islam 1448 H' },
  { date: new Date(2026, 7, 17), name: 'Hari Kemerdekaan RI' },
  { date: new Date(2026, 8, 5), name: 'Maulid Nabi Muhammad SAW' },
  { date: new Date(2026, 11, 25), name: 'Hari Raya Natal' },
  { date: new Date(2026, 11, 24), name: 'Cuti Bersama Natal', isJointLeave: true },
];

export function getHolidaysByYear(year: number): Holiday[] {
  if (year === 2025) return holidays2025;
  if (year === 2026) return holidays2026;
  return [];
}
