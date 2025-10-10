'use client';

import { InputHTMLAttributes } from 'react';

import { cn } from '../../../lib/utils';

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  isCorrectYn: 'Y' | 'N' | '';
}

const containerStyleMap = {
  default: 'border-secondary-box-line bg-secondary-box',
  Y: 'border-blue-40 bg-blue-10',
  N: 'border-red-40 bg-red-10',
};

const spanStyleMap = {
  default: 'text-secondary-box-on border-secondary-box-line',
  Y: 'text-blue-50 border-blue-40',
  N: 'text-red-50 border-red-40',
};

export default function TestTextField({ isCorrectYn, ...props }: Props) {
  const state = isCorrectYn || 'default';

  return (
    <div className='relative w-full'>
      <div
        className={cn(
          'flex-center rounded-S relative h-[69] w-full',
          'text-center',
          containerStyleMap[state],
        )}
      >
        <input
          type='text'
          className={cn(
            'absolute inset-0 w-full bg-transparent text-transparent caret-transparent outline-none',
          )}
          {...props}
        />

        <span
          className={cn(
            'text-title-l border-b tracking-widest',
            spanStyleMap[state],
          )}
        >
          {props.value || <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</>}
        </span>
      </div>
    </div>
  );
}
