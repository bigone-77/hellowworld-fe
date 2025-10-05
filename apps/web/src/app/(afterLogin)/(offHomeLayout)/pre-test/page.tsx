'use client';

import { useState } from 'react';

import { parseAsInteger, useQueryState } from 'nuqs';

import { Progressbar } from '@repo/ui/components';

const questions = [
  '1번 문제 내용',
  '2번 문제 내용',
  '3번 문제 내용',
  '4번 문제 내용',
  '5번 문제 내용',
];
const TOTAL_LESSONS = 10;

export default function Page() {
  // ✨ 1. nuqs 로직을 부모 컴포넌트에서 관리합니다.
  const [currentLesson, setCurrentLesson] = useQueryState(
    'lesson',
    parseAsInteger.withDefault(1),
  );

  const [solvedSteps, setSolvedSteps] = useState(
    Array(TOTAL_LESSONS).fill(false),
  );

  const handleSolve = () => {
    const newSolved = [...solvedSteps];
    newSolved[currentLesson - 1] = true;
    setSolvedSteps(newSolved);
  };

  // ✨ 2. TestProgressBar에 전달할 핸들러 함수들을 정의합니다.
  const handleStepClick = (stepNumber: number) => {
    setCurrentLesson(stepNumber);
  };

  const handlePrevClick = () => {
    setCurrentLesson(currentLesson > 1 ? currentLesson - 1 : 1);
  };

  const handleNextClick = () => {
    setCurrentLesson(
      currentLesson < TOTAL_LESSONS ? currentLesson + 1 : TOTAL_LESSONS,
    );
  };

  return (
    <div className='space-y-8 p-10'>
      {/* ✨ 3. TestProgressBar에 필요한 모든 데이터와 함수를 props로 전달합니다. */}
      {/* <Progressbar
        variant='test'
        totalSteps={TOTAL_STEPS}
        solvedSteps={solvedSteps}
        currentStep={currentStep}
        onStepClick={handleStepClick}
        onPrevClick={handlePrevClick}
        onNextClick={handleNextClick}
      /> */}
    </div>
  );
}
