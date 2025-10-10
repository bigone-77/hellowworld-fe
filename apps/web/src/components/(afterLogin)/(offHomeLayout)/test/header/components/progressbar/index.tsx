'use client';

import { Problem } from '@/types/pre-test';
import { cn } from '@repo/ui/lib/utils';

export interface TestHeaderProgressBarProps {
  problems: Problem[];
  currentStep: number;
  onStepClick: (stepNumber: number) => void;
}

export default function TestHeaderProgressBar({
  problems,
  currentStep,
  onStepClick,
}: TestHeaderProgressBarProps) {
  const getStepClasses = (status: Problem['status'], isCurrent: boolean) => {
    if (isCurrent) {
      if (status === 'solved') return 'bg-pink-300';
      return 'bg-primary-box';
    }
    switch (status) {
      case 'solved':
        return 'bg-primary-box';
      case 'passed':
        return 'bg-yellow-200';
      case 'passed':
      default:
        return 'bg-gray-200';
    }
  };

  return (
    <div
      className='grid h-full w-full items-center gap-x-1'
      style={{ gridTemplateColumns: `repeat(${problems.length}, 1fr)` }}
    >
      {problems.map((problem, i) => {
        const stepNumber = i + 1;
        const isCurrent = stepNumber === currentStep;
        return (
          <button
            key={problem.id}
            onClick={() => onStepClick(stepNumber)}
            className={cn(
              'rounded-S h-11 w-full transition-all duration-200',
              `${getStepClasses(problem.status, isCurrent)}`,
            )}
          />
        );
      })}
    </div>
  );
}
