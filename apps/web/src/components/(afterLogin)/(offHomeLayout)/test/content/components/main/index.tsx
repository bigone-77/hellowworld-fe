import TestContentMainLeftSection from '@/components/(afterLogin)/(offHomeLayout)/test/content/components/main/left-section';
import TestContentMainRightSection from '@/components/(afterLogin)/(offHomeLayout)/test/content/components/main/right-section';

export default function TestContentMain() {
  return (
    <main className='bg-surface-var2 rounded-L relative grid size-full grid-cols-2 items-center gap-8'>
      <TestContentMainLeftSection />
      <TestContentMainRightSection />
      <div
        className='bg-secondary-box absolute left-1/2 top-1/2 h-4/5 w-[5] -translate-x-1/2 -translate-y-1/2'
        aria-hidden='true'
      />
    </main>
  );
}
