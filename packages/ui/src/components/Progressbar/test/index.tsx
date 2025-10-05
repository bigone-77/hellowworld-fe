'use client';

import PrevNextBtn from '../../PrevNextBtn';

export interface Props {
  itemArr: [];
  solvedLessons: boolean[];
  currentLesson: number;

  onLessonClick: (stepNumber: number) => void;
  onPrevClick: () => void;
  onNextClick: () => void;
}

export default function TestProgressBar({
  itemArr,
  onStepClick,
  onPrevClick,
  onNextClick,
}: Props) {
  const steps = Array.from({ length: itemArr?.length }, (_, i) => {
    const stepNumber = i + 1;
    let state: 'current' | 'solved' | 'unseen' = 'unseen';

    // props로 받은 currentStep을 사용합니다.
    if (stepNumber === currentStep) state = 'current';
    else if (solvedSteps[i]) state = 'solved';

    const stateClasses = {
      current: 'bg-blue-500 scale-110 shadow-lg',
      solved: 'bg-yellow-400',
      unseen: 'bg-gray-200',
    };

    return (
      <button
        key={stepNumber}
        onClick={() => onStepClick(stepNumber)}
        className={`h-4 w-8 rounded-full transition-all duration-200 ${stateClasses[state]}`}
      />
    );
  });

  return (
    <div className='flex h-16 w-full items-center justify-between rounded-lg bg-purple-200/50 px-4 shadow-inner'>
      <PrevNextBtn
        iconSize={20}
        onPrevClick={onPrevClick}
        prevBtnProps={{
          disabled: currentStep <= 1,
        }}
        onNextClick={onNextClick}
        nextBtnProps={{
          disabled: !solvedSteps[currentStep - 1] && currentStep < totalCnt,
        }}
      >
        <div className='flex items-center gap-2'>{steps}</div>
        <div className='flex items-center gap-2'>
          <span className='font-bold'>250 pt</span>
          <button className='text-2xl text-gray-500'>&times;</button>
        </div>
      </PrevNextBtn>
    </div>
  );
}
