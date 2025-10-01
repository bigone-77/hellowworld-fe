import { Mascot, Progressbar, StatItem } from '@repo/ui/components';

export default function ProblemBanner() {
  return (
    <div className='bg-surface-var1 rounded-S relative w-full px-10 pb-10 pt-[60]'>
      <div className='mt-[14] flex items-start justify-between'>
        <div className='flex gap-x-10'>
          <StatItem
            label='내 랭킹'
            value={1245}
            unit='시간'
            change={32}
            changeType='increase'
          />
          <StatItem
            label='내 점수'
            value={342}
            unit='PT'
            change={24}
            changeType='increase'
          />
          <StatItem label='다음 승급 점수' value={342} unit='PT' />
          <div className='w-[1] bg-[#d9d9d9]' />
          <StatItem
            label='내 티어 평균 점수'
            value={1024}
            unit='PT'
            change={65}
            changeType='decrease'
          />
        </div>

        <Mascot variant='default' pose='typing' message='태일님 차근 차근!' />
      </div>

      <div className='mt-[-40]'>
        <Progressbar progress={32} />
      </div>
    </div>
  );
}
