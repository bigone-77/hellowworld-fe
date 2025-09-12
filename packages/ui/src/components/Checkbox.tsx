'use client';

import { InputHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';
import InlineSvg from './InlineSvg';

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  children: ReactNode;
}

const Checkbox = ({
  children,
  className,
  checked,
  ...props
}: CheckboxProps) => {
  return (
    <label
      className={clsx(
        'inline-flex cursor-pointer items-center gap-x-1',
        className,
      )}
    >
      <input type='checkbox' className='sr-only' checked={checked} {...props} />

      <div
        className={clsx(
          'flex-center rounded-XS border-text-box-var size-4 border transition-all',
          {
            '!border-primary-box bg-primary-box': checked,
          },
        )}
      >
        {/* checked 상태일 때만 체크 아이콘을 보여줍니다. */}
        {checked && (
          <InlineSvg
            alias='check'
            width={9.5}
            height={6.5}
            className='text-white'
          />
        )}
      </div>

      {/* 라벨 텍스트 */}
      <span className='text-body-s2 text-text1 select-none'>{children}</span>
    </label>
  );
};

export default Checkbox;
