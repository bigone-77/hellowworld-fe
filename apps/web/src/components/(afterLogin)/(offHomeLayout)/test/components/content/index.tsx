'use client';

// 추후 문제 난이도, 문제 번호, 문제 제목 받기
import { useEffect, useState } from 'react';

import TestContentLeftSection from '@/components/(afterLogin)/(offHomeLayout)/test/components/content/left-section';
import TestContentRightSection from '@/components/(afterLogin)/(offHomeLayout)/test/components/content/right-section';
import TestContentBottomSection from '@/components/(afterLogin)/(offHomeLayout)/test/components/content/bottom-section';

import { Label } from '@repo/ui/components';

import { Problem } from '@/types/pre-test';

interface Props {
  currentStep: number;
  currentProblem: Problem;
}

export default function TestContent({ currentStep, currentProblem }: Props) {
  const [isSubmit, setIsSubmit] = useState(false); // 정답 제출했는지에 대한 임시 상태변수

  // 정답이 맞았는지에 대한 임시 상태 변수
  // 'Y': 정답
  // 'N': 오답
  // 'H': 힌트보기
  // 'V': 문제보기
  const [answerStatus, setAnswerStatus] = useState<'Y' | 'N' | 'H' | 'V' | ''>(
    '',
  );

  // 제출하면 isCorrectAnswer flag값 바꿔주는 임시 effect
  useEffect(() => {
    if (isSubmit) {
      setAnswerStatus('N');
    }
  }, [isSubmit]);

  return (
    <div className='rounded-L bg-secondary-box-var2 flex size-full flex-col px-5'>
      <div className='flex-center gap-x-3 py-5'>
        <Label variant='positive'>{currentProblem.difficulty}</Label>
        <span className='text-surface1'>
          {currentStep}. {currentProblem.title}
        </span>
        <span className='text-text-box-var text-body-l2'>
          +{currentProblem.point}pt
        </span>
      </div>

      <div className='mb-20 min-h-0 flex-1'>
        <main className='bg-surface-var2 rounded-L relative grid size-full grid-cols-2 place-items-center items-center gap-8'>
          <section className='flex-center-col'>
            <TestContentLeftSection
              description={currentProblem.description}
              flag={answerStatus as 'Y' | 'N' | 'H' | 'V' | ''}
            />
          </section>

          <div
            className='bg-secondary-box absolute left-1/2 top-1/2 h-4/5 w-[5] -translate-x-1/2 -translate-y-1/2'
            aria-hidden='true'
          />

          <section className='flex-center-col gap-y-6'>
            <TestContentRightSection
              format={currentProblem.format}
              options={currentProblem.options}
              flag={answerStatus as 'Y' | 'N' | ''}
            />
          </section>
        </main>
      </div>
      <div className='h-[58] -translate-y-8'>
        <TestContentBottomSection
          flag={answerStatus}
          setFlag={setAnswerStatus}
          isSubmit={isSubmit}
          setIsSubmit={setIsSubmit}
        />
      </div>
    </div>
  );
}
