'use client';

import PrevNextBtn from '../../PrevNextBtn';

export interface Props {
  problems: any[]; // 임시로 any 처리
  currentStep: number;
  onStepClick: (stepNumber: number) => void;
  onPrevClick: () => void;
  onNextClick: () => void;
}

export default function TestProgressBar({
  problems,
  currentStep,
  onStepClick,
  onPrevClick,
  onNextClick,
}: Props) {
  // 상태에 따른 Tailwind 클래스를 반환하는 헬퍼 함수
  const getStepClasses = (
    status: 'solved' | 'unsolved' | 'passed',
    isCurrent: boolean,
  ) => {
    if (isCurrent) {
      // 현재 스텝이면서 이미 푼 문제일 경우 (이미지 상의 분홍색)
      if (status === 'solved') {
        return 'bg-pink-300 border-2 border-pink-500 shadow-lg';
      }
      // 현재 스텝이지만 아직 풀지 않은 문제
      return 'bg-blue-400 border-2 border-blue-600 shadow-lg';
    }
    // 현재 스텝이 아닐 경우
    switch (status) {
      case 'solved':
        return 'bg-yellow-400';
      case 'passed':
        return 'bg-yellow-200'; // 옅은 노란색
      case 'unsolved':
      default:
        return 'bg-gray-200';
    }
  };

  const totalSteps = problems.length;

  const currentProblemStatus = problems[currentStep - 1]?.status;

  return (
    <PrevNextBtn
      iconSize={20}
      prevBtnProps={{
        disabled: currentStep <= 1,
      }}
      onPrevClick={onPrevClick}
      nextBtnProps={{
        disabled: currentProblemStatus === 'unseen' && currentStep < totalSteps,
      }}
      onNextClick={onNextClick}
    >
      <div className='flex items-center gap-x-1 px-6'>
        {problems.map((problem, i) => {
          const stepNumber = i + 1;
          const isCurrent = stepNumber === currentStep;
          return (
            <div key={problem.id} className='h-full'>
              <button
                onClick={() => onStepClick(stepNumber)}
                className={`rounded-S h-10 w-[130.4] transition-all duration-200 ${getStepClasses(problem.status, isCurrent)}`}
              />
            </div>
          );
        })}
      </div>
    </PrevNextBtn>
  );
}
