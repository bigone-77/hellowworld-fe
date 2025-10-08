import TestContent from '@/components/(afterLogin)/(offHomeLayout)/test/content';
import TestHeader from '@/components/(afterLogin)/(offHomeLayout)/test/header';

export default function Page() {
  return (
    <div className='flex min-h-screen flex-col'>
      <TestHeader />

      <main className='flex flex-1 overflow-hidden pb-[43] pt-[26]'>
        <TestContent />
      </main>
    </div>
  );
}
