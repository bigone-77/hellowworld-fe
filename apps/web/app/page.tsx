'use client';

import Calendar from '@repo/ui/components/Calendar';

export default function Page() {
  const datesToHighlight = [
    new Date('2025-07-03'),
    new Date('2025-07-05'),
    new Date('2025-07-06'),
    new Date('2025-07-07'),
    new Date('2025-07-08'),
    new Date('2025-07-09'),
    new Date('2025-07-13'),
    new Date('2025-07-14'),
    new Date('2025-07-15'),
    new Date('2025-07-16'),
    new Date('2025-07-17'),
    new Date('2025-07-18'), // 선택된 날짜도 하이라이트 대상에 포함
  ];

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-16'>
      <Calendar highlightedDates={datesToHighlight} />
    </main>
  );
}
