'use client';

import { InputHTMLAttributes, useId, useState, ChangeEvent, Ref } from 'react';
import clsx from 'clsx';
import InlineSvg from './InlineSvg';
import HelperMessage from './HelperMessage';

import { useTimer } from '@repo/utils';

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  onClear?: () => void;
  label?: string;
  className?: string;
  ref?: Ref<HTMLInputElement>;
  error?: string | null;
  success?: boolean | string;

  isTimer?: boolean;
  timerDuration?: number;
  onTimeUp?: () => void;
  iconLeft?: React.ReactNode;
}

const TextField = ({
  className,
  onClear,
  label,
  value,
  defaultValue,
  onChange,
  type,
  ref,
  error,
  success,

  isTimer,
  timerDuration,
  onTimeUp,
  iconLeft,
  ...props
}: TextFieldProps) => {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue ?? '');
  const displayValue = isControlled ? value : internalValue;

  const showClearIcon = !!displayValue && !props.disabled;

  const uniqueId = useId();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const isPasswordInput = type === 'password';

  const handleClear = () => {
    if (onClear) {
      onClear();
    }
    if (!isControlled) {
      setInternalValue('');
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setInternalValue(e.target.value);
    }
    onChange?.(e);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const { formattedTime } = useTimer({
    initialTime: timerDuration || 0,
    onTimeUp,
  });

  return (
    <div className={clsx('w-full', className)}>
      {label && (
        <label
          htmlFor={uniqueId}
          className='text-body-s2 text-text1 mb-2 block'
        >
          {label}
        </label>
      )}
      <div className='relative'>
        {iconLeft && (
          <div className='absolute left-5 top-1/2 -translate-y-1/2'>
            {iconLeft}
          </div>
        )}
        <input
          ref={ref}
          id={uniqueId}
          type={
            isPasswordInput ? (isPasswordVisible ? 'text' : 'password') : type
          }
          value={displayValue}
          onChange={handleChange}
          disabled={props.disabled}
          className={clsx(
            'rounded-M border-text-box-var text-body-l1 text-text2 w-full border py-4 pl-5 transition-all',
            { 'pl-[50]': !!iconLeft, 'pl-5': !iconLeft },
            {
              'pr-20': isPasswordInput && showClearIcon,
              'pr-12': !isPasswordInput && showClearIcon,
              'pr-5': !showClearIcon,
              '!border-error-on focus:!border-error-on': !!error,
            },
            'placeholder:text-text-line',
            'hover:bg-surface2 hover:border-text-line hover:cursor-text',
            'focus:bg-surface1 focus:border-text2 focus:outline-none',
            {
              'bg-surface2 border-text-box !text-text-line cursor-not-allowed':
                props.disabled,
            },
          )}
          {...props}
        />

        <div className='absolute right-4 top-1/2 flex -translate-y-1/2 items-center gap-x-2'>
          <button
            type='button'
            onClick={togglePasswordVisibility}
            aria-label={isPasswordVisible ? '비밀번호 보기' : '비밀번호 숨기기'}
            className={clsx(
              'size-6 cursor-pointer text-gray-400 transition-colors hover:text-gray-700',
              {
                invisible: !(isPasswordInput && showClearIcon),
              },
            )}
            disabled={!(isPasswordInput && showClearIcon)}
          >
            {isPasswordVisible ? (
              <InlineSvg alias='pwOn' />
            ) : (
              <InlineSvg alias='pwOff' />
            )}
          </button>

          {isTimer && (
            <HelperMessage variant='error'>{formattedTime}</HelperMessage>
          )}

          <button
            type='button'
            onClick={!error && !success ? handleClear : undefined}
            aria-label={
              error
                ? '입력값 오류'
                : success
                  ? '입력값 확인'
                  : '입력 내용 지우기'
            }
            className={clsx('size-6 transition-all', {
              'cursor-pointer text-gray-400 hover:text-gray-700':
                !error && !success,
              hidden: !showClearIcon,
            })}
            disabled={!showClearIcon || !!error || !!success}
          >
            {error ? (
              <InlineSvg alias='error' />
            ) : success ? (
              <InlineSvg alias='success' />
            ) : (
              <InlineSvg alias='cancel' />
            )}
          </button>
        </div>
      </div>
      <>
        {(error ||
          typeof success === 'string' ||
          (isTimer && !error && !success)) && (
          <div className='pl-5 pt-2'>
            {error ? (
              <HelperMessage variant='error'>{error}</HelperMessage>
            ) : typeof success === 'string' ? (
              <HelperMessage variant='success'>{success}</HelperMessage>
            ) : isTimer && !error && !success ? (
              <HelperMessage>
                도착한 인증번호 6자리를 입력해주세요
              </HelperMessage>
            ) : null}
          </div>
        )}
      </>
    </div>
  );
};

export default TextField;
