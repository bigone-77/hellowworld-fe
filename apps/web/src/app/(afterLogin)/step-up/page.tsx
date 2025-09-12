import StepUpBanner from '@/components/(afterLogin)/step-up/banner';

export default function Page() {
  return (
    <main>
      <h1 className='text-text2 text-display-s'>나의 스텝업 코스</h1>
      <div className='h-3' />
      <p className='flex items-center gap-x-2'>
        <span className='text-label-l2 text-primary-line'>STEP2</span>
        <span className='text-title-l text-text2'>
          왕초보 Python 입문 (3/20)
        </span>
      </p>
      <div className='h-5' />
      <StepUpBanner />
    </main>
  );
}
