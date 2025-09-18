import WidgetWrapper from '@/components/(afterLogin)/home/widgets/layout/Wrapper';
import {
  Button,
  EduButton,
  InlineSvg,
  Progressbar,
  ToggleButton,
} from '@repo/ui/components';

export default function ProblemStatus() {
  return (
    <WidgetWrapper title='나의 문제 현황' isMoreBtnVisible href='/step-up'>
      <div className='mt-3 flex flex-col gap-y-3'>
        <p className='flex items-center gap-x-2'>
          <span className='text-label-l2 text-primary-box-var3'>STEP2</span>
          <span className='text-title-l text-text2'>
            왕초보 Python 입문 (3/20)
          </span>
        </p>
        <Progressbar progress={32} />
        <div className='bg-text-box rounded-L flex max-h-[224] flex-col gap-y-3 overflow-y-auto p-5'>
          {lessonData.map((d) => (
            <div
              key={d.id}
              className='flex items-stretch justify-between gap-x-3'
            >
              <EduButton
                step={d.step}
                title={d.title}
                progress={d.progress}
                isActive
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
          ))}
        </div>
        <Button variant='primary'>바로시작하기</Button>
      </div>
    </WidgetWrapper>
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
    progress: 0,
    isActive: true, // 현재 활성화된 항목
    isBookmarked: false,
  },
  {
    id: 3,
    step: '03',
    title: '함수 선언과 호출',
    progress: 0,
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
