// 추후 문제 난이도, 문제 번호, 문제 제목 받기

import { Button, InlineSvg, Label } from '@repo/ui/components';

import { Problem } from '@/types/pre-test';

interface Props {
  currentStep: number;
  title: Problem['title'];
  difficulty: Problem['difficulty'];
  point: Problem['point'];
  children: React.ReactNode;
}

export default function TestContentWrapper({
  currentStep,
  title,
  difficulty,
  point,
  children,
}: Props) {
  return (
    <div className='rounded-L bg-secondary-box-var2 mb-[43] flex w-full flex-col px-5'>
      <div className='flex-center gap-x-3 py-5'>
        <Label variant='positive'>{difficulty}</Label>
        <span className='text-surface1'>
          {currentStep}. {title}
        </span>
        <span className='text-text-box-var text-body-l2'>+{point}pt</span>
      </div>

      <div className='min-h-0 flex-1'>{children}</div>
      <div className='h-[102]' aria-hidden />
    </div>
  );
}
