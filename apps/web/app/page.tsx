'use client';

import dynamic from 'next/dynamic';

const WidgetDashboard = dynamic(() => import('./_components/WidgetDashboard'), {
  ssr: false,
});

export default function Page() {
  return (
    <main className='min-h-screen bg-gray-100 p-8'>
      <WidgetDashboard />
    </main>
  );
}
