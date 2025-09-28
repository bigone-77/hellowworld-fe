import Link from 'next/link';

import StepUpBanner from '@/components/(afterLogin)/step-up/components/banner';

import {
  Button,
  EduButton,
  InlineSvg,
  ToggleButton,
} from '@repo/ui/components';

export default function Page() {
  return (
    <section className='flex flex-col gap-y-5'>
      <StepUpBanner />
      <Link href='/step-up/step'>
        <Button className='w-full'>
          <div className='flex-center gap-x-1'>
            <span>02 변수 만들어보기</span>
            <InlineSvg alias='play' />
          </div>
        </Button>
      </Link>
      {lessonData.map((d) => (
        <div key={d.id} className='flex-col-center gap-y-3'>
          <div className='flex items-stretch justify-between gap-x-3'>
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
    </section>
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
  {
    id: 6,
    step: '06',
    title: '비동기 프로그래밍 (async/await)',
    progress: 0,
    isActive: false,
    isBookmarked: false,
  },
  {
    id: 7,
    step: '07',
    title: '비동기 프로그래밍 (async/await)',
    progress: 0,
    isActive: false,
    isBookmarked: false,
  },
  {
    id: 8,
    step: '08',
    title: '비동기 프로그래밍 (async/await)',
    progress: 0,
    isActive: false,
    isBookmarked: false,
  },
  {
    id: 9,
    step: '09',
    title: '비동기 프로그래밍 (async/await)',
    progress: 0,
    isActive: false,
    isBookmarked: false,
  },
  {
    id: 10,
    step: '10',
    title: '비동기 프로그래밍 (async/await)',
    progress: 0,
    isActive: false,
    isBookmarked: false,
  },
  {
    id: 11,
    step: '11',
    title: '비동기 프로그래밍 (async/await)',
    progress: 0,
    isActive: false,
    isBookmarked: false,
  },
  {
    id: 12,
    step: '12',
    title: '비동기 프로그래밍 (async/await)',
    progress: 0,
    isActive: false,
    isBookmarked: false,
  },
];
