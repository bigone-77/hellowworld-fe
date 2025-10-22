'use client';

import { parseAsInteger, useQueryState } from 'nuqs';

import { dummyProblems } from '@/types/pre-test';

import PreTest from './pre-test';
import StepTest from './step-test';

interface TestProps {
  variant: 'pre-test' | 'step-test';
}

export default function Test({ variant }: TestProps) {
  const [currentStep, setCurrentStep] = useQueryState(
    'lesson',
    parseAsInteger.withDefault(1),
  );

  const problemData = dummyProblems; // 사전문제가 될수도 있고, 스텝업 문제가 될 수도 있다.

  const currentProblem = problemData[currentStep - 1]; // currentStep번째 문제 데이터

  switch (variant) {
    case 'pre-test':
      return (
        <PreTest
          problemData={problemData}
          currentProblem={currentProblem!}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />
      );
    case 'step-test':
      return <StepTest />;
  }
}
