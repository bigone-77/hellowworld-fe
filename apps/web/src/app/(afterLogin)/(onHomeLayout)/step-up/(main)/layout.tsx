import StepUpLayout, {
  dummyStepData,
} from '@repo/ui/layouts/(afterLogin)/step-up/layout';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex h-full flex-col'>
      <div className='shrink-0'>
        <h1 className='text-text2 text-display-s'>나의 스텝업 코스</h1>
        <div className='h-3' />
      </div>

      <div className='mt-5 grid min-h-0 flex-1 grid-cols-[455px_1fr] gap-6'>
        <StepUpLayout steps={dummyStepData} />
        <section className='flex-col-center h-full min-h-0'>{children}</section>
      </div>
    </div>
  );
}
