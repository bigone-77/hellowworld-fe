'use client';

import { Options } from 'nuqs';

import TestHeader from '@/components/(afterLogin)/(offHomeLayout)/test/components/header';
import TestContent from '@/components/(afterLogin)/(offHomeLayout)/test/components/content';

import { Problem } from '@/types/pre-test';

export interface Props {
  problemData: Problem[]; // 사전 테스트 문제 데이터 타입
  currentProblem: Problem;
  currentStep: number;
  setCurrentStep: (
    value: number | ((old: number) => number | null) | null,
    options?: Options,
  ) => Promise<URLSearchParams>;
}

export default function PreTest({
  problemData,
  currentProblem,
  currentStep,
  setCurrentStep,
}: Props) {
  return (
    <div className='flex h-full flex-col'>
      <TestHeader
        problems={problemData}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
      />
      <div className='mt-[26] min-h-0 flex-1'>
        <TestContent
          currentStep={currentStep}
          currentProblem={currentProblem}
        />
      </div>
    </div>
  );
}
