'use client';

import { parseAsInteger, useQueryState } from 'nuqs';

import TestHeader from '@/components/(afterLogin)/(offHomeLayout)/test/header';

import TestContentWrapper from '@/components/(afterLogin)/(offHomeLayout)/test/content/components/wrapper';
import TestContentMain from '@/components/(afterLogin)/(offHomeLayout)/test/content/components/main';

import { dummyProblems } from '@/types/pre-test';

export default function Test() {
  const [currentStep, setCurrentStep] = useQueryState(
    'lesson',
    parseAsInteger.withDefault(1),
  );

  const problemsData = dummyProblems; // 사전문제가 될수도 있고, 스텝업 문제가 될 수도 있다.

  const currentProblem = problemsData[currentStep - 1]; // currentStep번째 문제 데이터

  return (
    <div className='flex min-h-screen flex-col'>
      <TestHeader
        problems={problemsData}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
      />

      {currentProblem && (
        <main className='flex flex-1 overflow-hidden pb-[43] pt-[26]'>
          {/* TestContent 부분 */}
          <TestContentWrapper
            currentStep={currentStep}
            title={currentProblem.title}
            difficulty={currentProblem.difficulty}
            point={currentProblem.point}
          >
            <TestContentMain
              description={currentProblem.description}
              format={currentProblem.format}
              options={currentProblem.options}
            />
          </TestContentWrapper>
        </main>
      )}
    </div>
  );
}
