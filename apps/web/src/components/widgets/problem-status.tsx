import Button from '@repo/ui/components/Button';
import ToggleButton from '@repo/ui/components/ToggleButton';
import EduButton from '@repo/ui/components/EduButton';
import InlineSvg from '@repo/ui/components/InlineSvg';
import Progressbar from '@repo/ui/components/Progressbar';

export default function ProblemStatus() {
  return (
    <section className='rounded-L bg-primary-box-var1 px-6 pt-6'>
      <div className='flex flex-col gap-y-3'>
        <div className='flex items-center justify-between'>
          <span className='text-headline-s text-black'>나의 문제 현황</span>
          <Button className='text-text2' variant='text'>
            더보기
            <InlineSvg
              srcUrl='https://res.cloudinary.com/dl31hx4rn/image/upload/v1753371493/svg/next-arrow.svg'
              width={18}
              height={18}
            />
          </Button>
        </div>
        <p className='flex items-center gap-x-2'>
          <span className='text-label-l2 text-primary-box-var3'>STEP2</span>
          <span className='text-title-l text-text2'>
            왕초보 Python 입문 (3/20)
          </span>
        </p>
        <Progressbar progress={32} />
        <div className='bg-yellow-5 rounded-L flex max-h-[240px] flex-col gap-y-3 overflow-y-auto p-5'>
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
                  <InlineSvg srcUrl='https://res.cloudinary.com/dl31hx4rn/image/upload/v1753115575/svg/play.svg' />
                </Button>
                <ToggleButton
                  variant='primary_icon'
                  className='aspect-square'
                  imgUrl='https://res.cloudinary.com/dl31hx4rn/image/upload/v1753271887/svg/star.svg'
                  isOn={false}
                />
              </div>
            </div>
          ))}
        </div>
        <Button variant='primary'>바로시작하기</Button>
      </div>
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
];
