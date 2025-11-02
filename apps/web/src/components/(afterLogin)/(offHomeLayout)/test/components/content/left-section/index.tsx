import { InlineSvg } from '@repo/ui/components';

import { Problem } from '@/types/pre-test';

interface Props {
  description: Problem['description'];
  flag: 'Y' | 'N' | 'H' | 'V' | '';
}

export default function TestContentLeftSection({ description, flag }: Props) {
  switch (flag) {
    case 'Y':
      return (
        <div className='flex-center-col'>
          <div className='flex-center-col'>
            <InlineSvg
              alias='correctAnswer'
              width={100}
              height={100}
              className='text-success-on'
            />
            <p className='text-display-l text-success-on mb-3 mt-1'>
              잘했어요!
            </p>
          </div>
          <p className='text-title-s max-w-[327] text-center'>
            파이썬에서는 변수명, 등호(=), 그리고 값으로 변수를 선언하고
            할당하며, 데이터 타입은 값이 할당될 때 자동으로 결정됩니다.
          </p>
          <div className='h-5' />
          <InlineSvg alias='win' width={240} height={240} />
        </div>
      );

    case 'N':
      return (
        <div className='flex-center-col'>
          <div className='flex-center-col'>
            <InlineSvg
              alias='wrongAnswer'
              width={100}
              height={100}
              className='text-error-on'
            />
            <p className='text-display-l text-error-on mb-3 mt-1'>오답이에요</p>
          </div>
          <p className='text-title-s'>다시 한번 생각해볼까요?</p>
          <div className='h-5' />
          <InlineSvg alias='panic' width={240} height={240} />
        </div>
      );

    case 'H':
      return <>힌트등장</>;

    case 'V':
    default:
      return (
        <p className='text-title-l whitespace-pre-wrap text-center'>
          {description}
        </p>
      );
  }
}
