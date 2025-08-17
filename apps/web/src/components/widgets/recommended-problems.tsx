import { WIDGET_HEIGHT_MAP } from '@/config/grid';
import Button from '@repo/ui/components/Button';
import InlineSvg from '@repo/ui/components/InlineSvg';
import Label from '@repo/ui/components/Label';
import ToggleButton from '@repo/ui/components/ToggleButton';
import { cn } from 'node_modules/@repo/ui/src/lib/utils';

export default function RecommendedProblems() {
  const widgetHeight = WIDGET_HEIGHT_MAP[3];
  return (
    <section
      className='rounded-L flex flex-col bg-white px-6 pt-6'
      style={{ maxHeight: widgetHeight }}
    >
      <span className='text-headline-s text-black'>오늘의 추천문제</span>
      <div className='py-5'>
        <Button variant='primary' className='w-full'>
          다시받기
        </Button>
      </div>
      <div className='min-h-0 flex-1 overflow-y-auto'>
        {dummyProblemData.map((d, index) => (
          <div
            key={d.id}
            className={cn(
              'border-text-box-var border-b pb-6',
              index > 0 && 'pt-6',
            )}
          >
            <Label>{d.id}번</Label>
            <div className='h-3' />
            <div className='grid grid-cols-[2fr_1fr] items-start gap-x-4'>
              <div className='flex flex-col justify-between gap-y-2'>
                <span className='text-title-l text-text2'>{d.title}</span>

                <div className='flex items-center gap-x-2'>
                  {d.tags.map((tag) => (
                    <Button key={tag} variant='outline_s'>
                      #{tag}
                    </Button>
                  ))}
                </div>
              </div>

              <div className='flex h-full items-center justify-end'>
                <div className='flex h-11 items-stretch gap-x-2'>
                  <Button variant='primary_icon'>
                    <InlineSvg srcUrl='https://res.cloudinary.com/dl31hx4rn/image/upload/v1753115575/svg/play.svg' />
                  </Button>
                  <ToggleButton
                    variant='primary_icon'
                    isOn={true}
                    imgUrl='https://res.cloudinary.com/dl31hx4rn/image/upload/v1753271887/svg/star.svg'
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const dummyProblemData = [
  {
    id: 1018,
    title: '체스판 다시 칠하기',
    tags: ['구현', '브루트포스'],
    isBookmarked: true,
  },
  {
    id: 2557,
    title: 'Hello World',
    tags: ['구현'],
    isBookmarked: false,
  },
  {
    id: 1920,
    title: '수 찾기',
    tags: ['자료 구조', '정렬'],
    isBookmarked: true,
  },
  {
    id: 9012,
    title: '괄호',
    tags: ['자료 구조', '스택'],
    isBookmarked: false,
  },
  {
    id: 1921,
    title: '수 찾기',
    tags: ['자료 구조', '정렬'],
    isBookmarked: true,
  },
  {
    id: 9013,
    title: '괄호',
    tags: ['자료 구조', '스택'],
    isBookmarked: false,
  },
  {
    id: 1922,
    title: '수 찾기',
    tags: ['자료 구조', '정렬'],
    isBookmarked: true,
  },
  {
    id: 9016,
    title: '괄호',
    tags: ['자료 구조', '스택'],
    isBookmarked: false,
  },
];
