import StepLabel from '@/components/(afterLogin)/step-up/components/step-label';

import { StatItem, Mascot, Progressbar } from '@repo/ui/components';

export default function StepUpBanner() {
  return (
    <div className='bg-surface-var1 rounded-S w-full px-10 pb-10 pt-[18]'>
      <StepLabel
        step={2}
        title='왕초보 Python 입문'
        currentIdx={3}
        totalCnt={20}
        titleSize='l'
      />
      <div className='mt-[14] flex items-start justify-between'>
        <div className='flex gap-x-10'>
          <StatItem label='총 공부시간' value={508} unit='시간' />
          <StatItem label='문제풀이 수' value={342} unit='문제' />
        </div>

        <Mascot variant='default' pose='typing' message='태일님 차근 차근!' />
      </div>

      <div className='mt-[-40]'>
        <Progressbar progress={32} />
      </div>
    </div>
  );
}
