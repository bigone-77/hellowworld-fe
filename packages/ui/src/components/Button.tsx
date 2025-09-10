'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';

import { cn } from '../lib/utils';

// Props 타입 정의
type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'primary_icon'
  | 'secondary_icon'
  | 'outline_s'
  | 'outline_m'
  | 'text'
  | 'date_picker';

type ButtonSize = 'xl' | 'l' | 'm' | 's' | 'xs';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
}

const Button = ({
  variant = 'primary',
  size = 'm',
  children,
  className: propsClassName,
  ...props
}: ButtonProps) => {
  const baseStyle =
    'inline-flex items-center justify-center gap-1 cursor-pointer shrink-0 border-2 whitespace-nowrap rounded-M transition-colors';

  const styles: Record<
    ButtonVariant,
    Partial<Record<ButtonSize | 'base', string>>
  > = {
    primary: {
      base: `
          text-primary-on bg-primary-box border-primary-line shadow-[0_6px_0_0_var(--color-primary-line)] btn-press-effect
          hover:bg-primary-box-var2
          active:bg-primary-box-var3 active:text-primary-on active:border-primary-line active:shadow-[0_2px_0_0_var(--color-primary-line)]
          disabled:bg-text-box disabled:text-text2/30 disabled:border-text-line disabled:shadow-[0_2px_0_0_var(--color-text-line)] disabled:cursor-default
        `,
      xl: 'px-[375] py-3 text-title-l',
      l: 'px-[161] py-3 text-title-l',
      m: 'px-[70] py-3 text-title-l',
      xs: 'px-3 py-[5] text-body-l2 gap-0',
    },
    secondary: {
      base: `
          text-secondary-box-on bg-secondary-box border-secondary-line shadow-[0_6px_0_0_var(--color-secondary-line)] btn-press-effect
          hover:bg-secondary-box-var1 
          active:bg-secondary-box-var2 active:text-secondary-box-on active:border-secondary-line active:shadow-[0_2px_0_0_var(--color-secondary-line)]
          disabled:bg-text-box disabled:text-text2/30 disabled:border-text-line disabled:shadow-[0_2px_0_0_var(--color-text-line)] disabled:cursor-default
        `,
      xl: 'px-[375] py-3 text-title-l',
      l: 'px-[161] py-3 text-title-l',
      m: 'px-[70] py-3 text-title-l',
      xs: 'px-3 py-[5] text-body-l2 gap-0',
    },
    primary_icon: {
      base: `
          bg-primary-box border-primary-line rounded-S btn-press-effect
          hover:bg-primary-box-var2 shadow-[0_2px_0_0_var(--color-primary-line)]
          active:bg-primary-box-var3 active:text-primary-on active:border-primary-line active:shadow-[0_0px_0_0_var(--color-primary-line)]
          disabled:bg-primary-box-var3 disabled:text-primary-on disabled:border-primary-line disabled:shadow-[0_0px_0_0_var(--color-primary-line)] disabled:cursor-default
        `,
      m: 'w-14 h-14',
      s: 'w-11 h-11',
    },
    secondary_icon: {
      base: `
          bg-secondary-box border-secondary-line rounded-S shadow-[0_2px_0_0_var(--color-primary-line)] btn-press-effect
          hover:bg-secondary-box-var1
          active:bg-secondary-box-var2 active:text-secondary-box-on active:border-secondary-line active:shadow-[0_2px_0_0_var(--color-secondary-line)]
          disabled:bg-secondary-box-var2 active:text-secondary-box-on active:border-secondary-line active:shadow-[0_2px_0_0_var(--color-secondary-line)] disabled:cursor-default
        `,
      m: 'w-14 h-14',
      s: 'w-11 h-11',
    },
    outline_s: {
      base: `
        border-text-box-var text-body-s1 text-text1 px-3 py-[6] 
        hover:bg-text-box 
        active:bg-text-box-var active:border-text-line
        disabled:bg-text-box-var disabled:border-text-line disabled:cursor-default
      `,
    },
    outline_m: {
      base: `
        border-text-box-var text-body-l2 text-text1 px-3 py-[6] 
        hover:bg-text-box 
        active:bg-text-box-var active:border-text-line
        disabled:bg-text-box-var disabled:border-text-line disabled:cursor-default
      `,
    },
    text: {
      base: `
        border-none text-body-s1 text-text1 px-4 py-[6] 
        hover:bg-text-box 
        active:bg-text-box-var
        disabled:bg-text-box disabled:text-text1 disabled:cursor-default
      `,
    },
    date_picker: {
      base: `
        rounded-FULL relative flex cursor-pointer text-body-l1 text-text1 items-center justify-center px-[12.5] py-[14] transition-colors
        hover:border hover:bg-secondary-box 
        active:bg-secondary-box-var1 active:text-secondary-box-on  active:border-secondary-box-line
      `,
    },
  };

  const variantStyle = styles[variant]?.base || '';
  const sizeStyle = styles[variant]?.[size] || '';

  const finalClassName = cn(baseStyle, variantStyle, sizeStyle, propsClassName);

  return (
    <button className={finalClassName.trim()} {...props}>
      {children}
    </button>
  );
};

export default Button;
