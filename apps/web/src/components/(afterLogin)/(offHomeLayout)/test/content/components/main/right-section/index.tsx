'use client';

import { useState } from 'react';

import { Button, TextField } from '@repo/ui/components';

import { Problem } from '@/types/pre-test';
import { cn } from '@repo/ui/lib/utils';

interface Props {
  format: Problem['format'];
  options: Problem['options'];
  flag: 'Y' | 'N' | '';
}

export default function TestContentMainRightSection({
  format,
  options,
  flag,
}: Props) {
  const [inputValue, setInputValue] = useState('');

  switch (format) {
    case 'multiple-choice': {
      return options?.map((option) => {
        const isSelected = inputValue === option.text;

        const secondaryDisabledStyles = `
          disabled:bg-secondary-box 
          disabled:border-secondary-box-line 
          disabled:text-secondary-box-on 
          disabled:shadow-[0_6px_0_0_var(--color-secondary-line)]
          disabled:cursor-default
        `;

        return (
          <Button
            key={option.id}
            variant='secondary'
            className={cn('!text-title-l text-secondary-box-on', {
              'border-blue-40 bg-blue-10 hover:bg-blue-10 text-blue-50 shadow-[0_6px_0_0_var(--color-blue-40)]':
                isSelected || flag === 'Y',
              'disabled:border-blue-40 disabled:bg-blue-10 disabled:text-blue-50 disabled:shadow-[0_6px_0_0_var(--color-blue-40)]':
                isSelected || flag === 'Y',
              'border-red-40 bg-red-10 hover:bg-red-10 text-red-50':
                isSelected && flag === 'N',
              'disabled:border-red-40 disabled:bg-red-10 disabled:text-red-50 disabled:shadow-[0_6px_0_0_var(--color-red-40)]':
                isSelected && flag === 'N',
              [secondaryDisabledStyles]: !isSelected && flag !== '',
            })}
            onClick={() => setInputValue(option.text)}
            disabled={flag !== ''}
          >
            {option.text}
          </Button>
        );
      });
    }
    case 'subjective': {
      return (
        <div className='w-[360]'>
          <TextField
            variant='test'
            isCorrectYn={flag}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={flag !== ''}
          />
        </div>
      );
    }
    default:
      return null;
  }
}
