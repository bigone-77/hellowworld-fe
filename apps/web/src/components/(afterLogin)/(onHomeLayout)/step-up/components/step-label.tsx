import { Label } from '@repo/ui/components';

import { cn } from '@repo/ui/lib/utils';

interface Props {
  stepNo: number;
  title: string;
  status: 'prev' | 'current' | 'next';
  currentCnt: number;
  totalCnt: number;
  titleSize?: 'l' | 's';
}

export default function StepLabel({
  stepNo,
  title,
  status,
  currentCnt,
  totalCnt,
  titleSize = 's',
}: Props) {
  return (
    <div
      className={cn(
        'flex-between gap-x-2',
        titleSize === 'l' && 'justify-start',
      )}
    >
      <div className='flex-center gap-x-2'>
        <Label
          className={cn(
            '',
            status === 'current'
              ? 'bg-primary-box text-text2'
              : status === 'prev'
                ? 'bg-text2 text-surface1'
                : 'bg-text-line text-surface1',
          )}
        >
          STEP {stepNo}
        </Label>
        <span
          className={`text-text2 ${titleSize === 's' ? 'text-body-l2' : 'text-title-l'}`}
        >
          {title}
        </span>
      </div>

      <span
        className={`text-text2 ${titleSize === 's' ? 'text-body-l2' : 'text-title-l'}`}
      >
        ({currentCnt}/{totalCnt})
      </span>
    </div>
  );
}
