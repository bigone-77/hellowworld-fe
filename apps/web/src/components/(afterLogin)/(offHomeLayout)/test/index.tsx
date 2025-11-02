'use client';

import { parseAsInteger, useQueryState } from 'nuqs';

import { dummyProblems } from '@/types/pre-test';

import PreTest from './pre-test';
import StepTest from './step-test';
import { useState } from 'react';
import { SplashScreen } from '@/components/(afterLogin)/(offHomeLayout)/test/components/splash-screen';

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

  const [showSplashScreen, setShowSplashScreen] = useState(true);

  const handleGameStart = () => {
    setShowSplashScreen(false);
  };

  {
    showSplashScreen && <SplashScreen onTestStart={handleGameStart} />;
  }

  const renderTest = () => {
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
      default:
        return null; // 예외 처리
    }
  };

  return (
    <>
      {showSplashScreen && <SplashScreen onTestStart={handleGameStart} />}

      {!showSplashScreen && renderTest()}
    </>
  );
}
