import clsx from 'clsx';
import { InputHTMLAttributes } from 'react';

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  onClear?: () => void;
  className?: string;
  ref?: React.Ref<HTMLInputElement>;
}

export const TextField = ({
  className,
  onClear,
  ref,
  ...props
}: TextFieldProps) => {
  const showClearIcon = !!onClear && !!props.value && !props.disabled;

  return (
    <div className={clsx('relative w-full', className)}>
      <input
        ref={ref}
        value={props.value}
        disabled={props.disabled}
        className={clsx(
          'w-full rounded-md border border-gray-300 px-3 py-2 pr-10 text-sm shadow-sm transition-colors',
          'placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500',
          { 'cursor-not-allowed bg-gray-100': props.disabled },
        )}
        {...props}
      />
      {showClearIcon && (
        <button
          type='button'
          onClick={onClear}
          aria-label='입력 내용 지우기'
          className='absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 transition-colors hover:text-gray-700'
        >
          x
        </button>
      )}
    </div>
  );
};
