'use client';

import StepLabel from '@/components/(afterLogin)/(onHomeLayout)/step-up/components/step-label';
import { StepUp } from '@/types/step-up';
import { Button, InlineSvg, ToggleButton } from '@repo/ui/components';
import { cn } from '@repo/ui/lib/utils';

interface Props {
  steps: StepUp[];
}

function StepItem({ idx, step }: { idx: number; step: StepUp }) {
  return (
    <div>
      <StepLabel
        stepNo={idx}
        title={step.name}
        status={step.status}
        currentCnt={step.solvedProblemCnt}
        totalCnt={step.totalProblemCnt}
      />

      <div className='h-[10]' />

      <div className='grid grid-cols-[2fr_1fr] items-start gap-x-4'>
        <div className='flex items-center gap-x-1'>
          {step.tags.map((tag) => (
            <Button key={tag} variant='outline_s'>
              #{tag}
            </Button>
          ))}
        </div>

        <div className='flex h-full items-center justify-end'>
          <div className='flex h-11 items-stretch gap-x-2'>
            <Button
              variant='primary_icon'
              className={cn(
                'size-11',
                step.status === 'next' &&
                  'disabled:bg-text-box disabled:text-text-line disabled:border-text-line',
              )}
              disabled={step.status === 'next'}
            >
              <InlineSvg alias='play' />
            </Button>

            <ToggleButton
              variant='primary_icon'
              isOn={false}
              alias='star'
              className={cn(
                'size-11',
                step.status === 'next' &&
                  'disabled:bg-text-box disabled:text-text-line disabled:border-text-line',
              )}
              disabled={step.status === 'next'}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function StepUpLayout({ steps }: Props) {
  return (
    <aside className='rounded-L shadow-modal-l flex h-full min-h-0 flex-col bg-white p-6'>
      <h2 className='text-headline-s mb-4 shrink-0 text-black'>스텝 선택</h2>

      <div className='flex-1 overflow-y-auto'>
        {steps.map((step, index) => (
          <div
            className={cn(
              'border-text-box-var border-b pb-3',
              index > 0 && 'pt-6',
            )}
            key={step.id}
          >
            <StepItem idx={index} step={step} />
          </div>
        ))}
      </div>
    </aside>
  );
}
