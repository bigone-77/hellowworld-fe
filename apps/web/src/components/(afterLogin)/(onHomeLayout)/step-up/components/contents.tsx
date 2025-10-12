'use client';

import StepLabel from '@/components/(afterLogin)/(onHomeLayout)/step-up/components/step-label';

import {
  Button,
  EduButton,
  InlineSvg,
  Progressbar,
  ToggleButton,
} from '@repo/ui/components';
import Link from 'next/link';

export default function StepUpContents() {
  return (
    <div className='bg-surface-var1 rounded-S flex h-full w-full flex-col justify-start overflow-hidden'>
      <div className='bg-surface-var1 sticky top-0 z-10 px-6 pt-6'>
        <div className='flex flex-col gap-y-5'>
          <StepLabel
            stepNo={2}
            title={'파이썬 시작 및 기본 환경 설정'}
            status={'current'}
            currentCnt={2}
            totalCnt={5}
            titleSize='l'
          />
          <Progressbar progress={32} />
          <Link href={'/step-test'}>
            <Button className='w-full'>
              <div className='flex-center gap-x-1'>
                <span>02 변수 만들어보기</span>
                <InlineSvg alias='play' />
              </div>
            </Button>
          </Link>
        </div>

        <div className='h-5' />
      </div>

      <div className='flex flex-1 flex-col gap-y-3 overflow-y-auto px-6 pb-6'>
        {lessonData.map((d) => (
          <div key={d.id} className='flex-col-center'>
            <div className='flex w-full items-stretch justify-between gap-x-3'>
              <EduButton
                step={d.step}
                title={d.title}
                progress={d.progress}
                isActive={d.progress !== 0}
              />
              <div className='flex items-center gap-x-2'>
                <Button variant='primary_icon' className='aspect-square'>
                  <InlineSvg alias='play' />
                </Button>
                <ToggleButton
                  variant='primary_icon'
                  className='aspect-square'
                  alias='star'
                  isOn={false}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const lessonData = [
  {
    id: 1,
    step: '01',
    title: '자료형과 변수 이해하기',
    progress: 100,
    isActive: false,
    isBookmarked: true,
  },
  {
    id: 2,
    step: '02',
    title: '반복문(for, while) 마스터',
    progress: 75,
    isActive: true, // 현재 활성화된 항목
    isBookmarked: false,
  },
  {
    id: 3,
    step: '03',
    title: '함수 선언과 호출',
    progress: 20,
    isActive: false,
    isBookmarked: true,
  },
  {
    id: 4,
    step: '04',
    title: '객체와 클래스의 개념',
    progress: 0,
    isActive: false,
    isBookmarked: false,
  },
  {
    id: 5,
    step: '05',
    title: '비동기 프로그래밍 (async/await)',
    progress: 0,
    isActive: false,
    isBookmarked: false,
  },
];
