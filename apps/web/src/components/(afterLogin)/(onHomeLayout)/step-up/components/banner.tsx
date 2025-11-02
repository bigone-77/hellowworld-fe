import { StatItem, Mascot, Progressbar } from '@repo/ui/components';

export default function StepUpBanner() {
  return (
    <div className='bg-surface-var1 rounded-S w-full px-10 pb-10 pt-[18]'>
      <div className='mt-[14] flex items-start justify-between'>
        <div className='flex gap-x-10'>
          <StatItem label='총 공부시간' value={508} unit='시간' />
          <StatItem label='풀은 문제' value={342} unit='문제' />
          <StatItem label='정답률' value={85} unit='%' />
        </div>

        <Mascot variant='default' pose='typing' message='태일님 차근 차근!' />
      </div>

      <div className='mt-[-40]'>
        <Progressbar height={56} progress={32} />
      </div>
    </div>
  );
}
