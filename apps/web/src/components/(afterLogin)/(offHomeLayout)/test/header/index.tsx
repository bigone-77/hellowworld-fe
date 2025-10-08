'use client';

import { useState } from 'react';
import { parseAsInteger, useQueryState } from 'nuqs';
import { cn } from '@repo/ui/lib/utils';
import { TestHeaderHeight } from '@/config/layout';

import TestHeaderMileStone from './components/mile-stone';
import TestHeaderPointAndClose from './components/point-and-close';
import TestHeaderProgressBar from './components/progressbar';

import { dummyProblems, Problem } from '@/types/pre-test';
import { PrevNextBtn } from '@repo/ui/components';

export default function TestHeader() {
  const [currentStep, setCurrentStep] = useQueryState(
    'lesson',
    parseAsInteger.withDefault(1),
  );
  const [problems, setProblems] = useState<Problem[]>(dummyProblems); // 실제로는 props나 다른 상태로 관리될 수 있음

  const TOTAL_STEPS = problems.length;
  const currentProblemStatus = problems[currentStep - 1]?.status;

  return (
    <header
      className={cn(
        'flex w-full items-center justify-between gap-x-6',
        `h-${TestHeaderHeight}`,
      )}
    >
      {/* 왼쪽 & 중앙 그룹 */}
      <div className='flex min-w-0 flex-1 items-center gap-x-4'>
        <TestHeaderMileStone />
        <PrevNextBtn
          className='w-full'
          iconSize={20}
          onPrevClick={() =>
            setCurrentStep(currentStep > 1 ? currentStep - 1 : 1)
          }
          onNextClick={() =>
            setCurrentStep(
              currentStep < TOTAL_STEPS ? currentStep + 1 : TOTAL_STEPS,
            )
          }
          prevBtnProps={{ disabled: currentStep <= 1 }}
          nextBtnProps={{
            disabled:
              currentProblemStatus === 'passed' && currentStep < TOTAL_STEPS,
          }}
        >
          <TestHeaderProgressBar
            problems={problems}
            currentStep={currentStep}
            onStepClick={(step) => setCurrentStep(step)}
          />
        </PrevNextBtn>
      </div>

      {/* 오른쪽 그룹 */}
      <div>
        <TestHeaderPointAndClose />
      </div>
    </header>
  );
}
