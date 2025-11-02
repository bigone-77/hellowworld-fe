import StepUpBanner from '@/components/(afterLogin)/(onHomeLayout)/step-up/components/banner';
import StepUpContents from '@/components/(afterLogin)/(onHomeLayout)/step-up/components/contents';

export default function Page() {
  return (
    <section className='flex h-full min-h-0 flex-col gap-y-5'>
      <StepUpBanner />

      <div className='h-6' />

      <div className='mb-20 flex-1 overflow-y-auto'>
        <StepUpContents />
      </div>
    </section>
  );
}
