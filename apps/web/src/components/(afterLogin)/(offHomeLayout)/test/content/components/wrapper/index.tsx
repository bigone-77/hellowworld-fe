// 추후 문제 난이도, 문제 번호, 문제 제목 받기

import { Button, InlineSvg, Label } from '@repo/ui/components';

interface Props {
  children: React.ReactNode;
}

export default function TestContentWrapper({ children }: Props) {
  return (
    <div className='rounded-L bg-secondary-box-var2 mb-[43] flex w-full flex-col px-5'>
      <div className='flex-center gap-x-3 py-5'>
        <Label variant='positive'>보통</Label>
        <span className='text-body-l2 text-surface1'>1. 개발상식</span>
      </div>

      <div className='min-h-0 flex-1'>{children}</div>

      <div className='flex-between my-5 h-[58] flex-shrink-0'>
        <Button variant='secondary' className='px-6'>
          <InlineSvg alias='play' />
          넘어가기
        </Button>
        <div className='flex-center gap-x-6'>
          <Button variant='secondary' className='px-6'>
            <InlineSvg alias='hint' />
            힌트
          </Button>
          <Button variant='primary'>다음으로</Button>
        </div>
      </div>
    </div>
  );
}
