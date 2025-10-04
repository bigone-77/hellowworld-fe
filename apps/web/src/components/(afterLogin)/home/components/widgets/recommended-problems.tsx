import WidgetWrapper from '@/components/(afterLogin)/home/components/widgets/layout/Wrapper';
import { Button, InlineSvg, Label } from '@repo/ui/components';
import { IconAlias } from '@repo/ui/config/icon';
import { formatDate } from '@repo/utils';

export default function RecommendedProblems() {
  return (
    <WidgetWrapper title='오늘의 추천 질문'>
      <div className='h-5' />
      <div className='flex-between'>
        <div className='flex items-center gap-x-1'>
          <Label variant='secondary'>해결완료</Label>
          <Label variant='primary'>+3pt</Label>
        </div>
        <span className='text-label-l1 text-text1'>
          {formatDate(new Date(), 'M.d aaaa HH:mm')}
        </span>
      </div>
      <div className='h-3' />
      <p className='text-title-s'>{dummyData.title}</p>
      <div className='rounded-S bg-surface-var1 mb-3 mt-2 h-60 p-4'>
        <p className='text-body-l1 whitespace-pre-wrap'>{dummyData.content}</p>
      </div>
      <div className='flex-between'>
        <div className='flex items-center gap-x-1'>
          {dummyData.tags.map((tag) => (
            <Button key={tag} variant='outline_s'>
              #{tag}
            </Button>
          ))}
        </div>
        <div className='text-text1 flex items-center gap-x-2'>
          <div className='flex items-center gap-x-[2]'>
            <InlineSvg alias='eye' width={20} height={20} />
            <span className='text-text-label-l1'>{dummyData.viewCnt}</span>
          </div>
          <div className='flex items-center gap-x-[2]'>
            <InlineSvg alias='thumbsup' width={20} height={20} />
            <span className='text-text-label-l1'>{dummyData.likeCnt}</span>
          </div>
          <div className='flex items-center gap-x-[2]'>
            <InlineSvg alias='comment' width={20} height={20} />
            <span className='text-text-label-l1'>{dummyData.commentCnt}</span>
          </div>
        </div>
      </div>
    </WidgetWrapper>
  );
}

const dummyData = {
  title: '문자열 뒤집기가 헷갈려요',
  content: `문자열을 거꾸로 출력하는 문제를 풀고 있는데, 슬라이싱이랑 for문 방법이 헷갈립니다.\n 예를 들어 "apple"을 입력하면 "elppa"가 나와야 하는데,  제가 아래처럼 코드를 짜면 원하는 결과가 안 나오네요.`,
  tags: ['변수1', '변수2'],
  viewCnt: 100,
  likeCnt: 12,
  commentCnt: 32,
};
