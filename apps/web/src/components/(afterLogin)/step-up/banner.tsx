import { Mascot } from '@repo/ui/components';

export default function StepUpBanner() {
  return (
    // 전체를 감싸는 Wrapper
    // 'relative'를 주어 자식 요소의 z-index와 absolute 포지셔닝의 기준점으로 만듭니다.
    <div className='relative w-full rounded-lg bg-yellow-50 p-6'>
      {/* 상단 컨텐츠 (통계 + 마스코트) */}
      {/* 'z-10'을 주어 프로그레스 바보다 위에 오도록 합니다. */}
      <div className='relative z-10 flex items-start justify-between'>
        {/* 1. 통계 섹션 (총 공부시간, 문제풀이 수) */}
        {/* 두 통계를 하나의 div로 묶어 flex로 간격을 줍니다. */}
        <div className='flex gap-x-8'>
          <div>
            <p className='text-sm text-gray-600'>총 공부시간</p>
            <span className='text-4xl font-bold text-black'>508</span>
            {/* ... 시간, 증감 표시 ... */}
          </div>
          <div>
            <p className='text-sm text-gray-600'>문제풀이 수</p>
            <span className='text-4xl font-bold text-black'>342</span>
            {/* ... 문제, 증감 표시 ... */}
          </div>
        </div>

        {/* 2. 마스코트 섹션 */}
        {/* 마스코트 크기나 위치 미세조정이 필요하다면 이 div를 활용하세요. */}
        <div>
          <Mascot variant='default' pose='typing' message='태일' />
        </div>
      </div>

      {/* 하단 프로그레스 바 */}
      {/* 음수 마진(mt-[-40px])을 이용해 위로 끌어올려 마스코트와 겹치게 만듭니다. */}
      {/* z-index가 없는 이 요소는 z-10인 상단 컨텐츠보다 자연스럽게 아래에 위치합니다. */}
      <div className='mt-[-40px] h-5 w-full rounded-full bg-yellow-800 bg-opacity-50'>
        <div
          className='flex h-full items-center justify-center rounded-full bg-yellow-400 text-sm font-bold text-yellow-900'
          style={{ width: '32%' }}
        >
          32%
        </div>
      </div>
    </div>
  );
}
