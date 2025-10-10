'use client';

import { useEffect, useState } from 'react';

import TestContentMainLeftSection from '@/components/(afterLogin)/(offHomeLayout)/test/content/components/main/left-section';
import TestContentMainRightSection from '@/components/(afterLogin)/(offHomeLayout)/test/content/components/main/right-section';
import TestContentBottomSection from '@/components/(afterLogin)/(offHomeLayout)/test/content/components/main/bottom-section';

import { Problem } from '@/types/pre-test';

interface Props {
  description: Problem['description'];
  format: Problem['format'];
  options: Problem['options'];
}

export default function TestContentMain({
  description,
  format,
  options,
}: Props) {
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
    <>
      <main className='bg-surface-var2 rounded-L relative grid size-full grid-cols-2 place-items-center items-center gap-8'>
        <section className='flex-center-col'>
          <TestContentMainLeftSection
            description={description}
            flag={answerStatus as 'Y' | 'N' | 'H' | 'V' | ''}
          />
        </section>

        <section className='flex-center-col gap-y-6'>
          <TestContentMainRightSection
            format={format}
            options={options}
            flag={answerStatus as 'Y' | 'N' | ''}
          />
        </section>
        <div
          className='bg-secondary-box absolute left-1/2 top-1/2 h-4/5 w-[5] -translate-x-1/2 -translate-y-1/2'
          aria-hidden='true'
        />
        <div className='absolute -bottom-20 h-[58] w-full flex-shrink-0'>
          <TestContentBottomSection
            flag={answerStatus}
            setFlag={setAnswerStatus}
            isSubmit={isSubmit}
            setIsSubmit={setIsSubmit}
          />
        </div>
      </main>
    </>
  );
}
