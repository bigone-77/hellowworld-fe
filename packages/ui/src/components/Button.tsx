import { ButtonHTMLAttributes, ReactNode } from 'react';

// Props 타입 정의
type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'primary_icon'
  | 'secondary_icon'
  | 'outline'
  | 'text';
type ButtonSize = 'xl' | 'l' | 'm' | 's' | 'xs';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
}

const Button = ({
  variant = 'primary',
  size = 'm',
  children,
  ...props
}: ButtonProps) => {
  // 기본 스타일: 모든 버튼에 공통 적용
  const baseStyle =
    'inline-flex items-center justify-center gap-1 cursor-pointer shrink-0 border-2 whitespace-nowrap rounded-m transition-colors';

  const styles: Record<
    ButtonVariant,
    Partial<Record<ButtonSize | 'base', string>>
  > = {
    primary: {
      base: `
          text-primary-on bg-primary-box border-primary-line shadow-[0_6px_0_0_var(--color-primary-line)] btn-press-effect
          hover:bg-primary-box-var2 
          focus:border-primary-on 
          active:bg-primary-box-var3 active:text-primary-on active:border-primary-line active:shadow-[0_2px_0_0_var(--color-primary-line)]
          disabled:bg-primary-box-var3 disabled:text-primary-on disabled:border-primary-line disabled:shadow-[0_2px_0_0_var(--color-primary-line)]
        `,
      xl: 'px-[375] py-3 text-title-l',
      l: 'px-[161] py-3 text-title-l',
      m: 'px-[70] py-3 text-title-l',
      xs: 'px-3 py-[5] text-body-l2 !gap-0',
    },
    secondary: {
      base: `
          text-secondary-box-on bg-secondary-box border-secondary-line shadow-[0_6px_0_0_var(--color-secondary-line)] btn-press-effect
          hover:bg-secondary-box-var1 
          focus:border-secondary-box-on 
          active:bg-secondary-box-var2 active:text-secondary-box-on active:border-secondary-line active:shadow-[0_2px_0_0_var(--color-secondary-line)]
          disabled:bg-secondary-box-var2 active:text-secondary-box-on active:border-secondary-line active:shadow-[0_2px_0_0_var(--color-secondary-line)]
        `,
      xl: 'px-[375] py-3 text-title-l',
      l: 'px-[161] py-3 text-title-l',
      m: 'px-[70] py-3 text-title-l',
      xs: 'px-3 py-[5] text-body-l2 !gap-0',
    },
    primary_icon: {
      base: `
          bg-primary-box border-primary-line !rounded-icon hover:bg-primary-box-var2 shadow-[0_2px_0_0_var(--color-primary-line)] btn-press-effect
          focus:border-primary-on 
          active:bg-primary-box-var3 active:text-primary-on active:border-primary-line active:shadow-[0_0px_0_0_var(--color-primary-line)]
          disabled:bg-primary-box-var3 disabled:text-primary-on disabled:border-primary-line disabled:shadow-[0_0px_0_0_var(--color-primary-line)]
        `,
      m: 'w-14 h-14',
      s: 'w-11 h-11',
    },
    secondary_icon: {
      base: `
          bg-secondary-box border-secondary-line !rounded-icon shadow-[0_2px_0_0_var(--color-primary-line)] btn-press-effect
          hover:bg-secondary-box-var1
          focus:border-secondary-box-on 
          active:bg-secondary-box-var2 active:text-secondary-box-on active:border-secondary-line active:shadow-[0_2px_0_0_var(--color-secondary-line)]
          disabled:bg-secondary-box-var2 active:text-secondary-box-on active:border-secondary-line active:shadow-[0_2px_0_0_var(--color-secondary-line)]
        `,
      m: 'w-14 h-14',
      s: 'w-11 h-11',
    },
    outline: {
      base: `
        border-text-box-var text-body-s1 text-text1 px-3 py-[6] 
        hover:bg-text-box 
        focus:border-text1 
        active:bg-text-box-var active:border-text-line
        disabled:bg-text-box-var active:border-text-line
      `,
    },
    text: {
      base: `
        border-none text-body-s1 text-text1 px-4 py-[6] 
        hover:bg-text-box 
        focus:border-text1 focus:bg-text-box 
        active:bg-text-box-var
        disabled:bg-text-box-var
      `,
    },
  };

  const variantStyle = styles[variant]?.base || '';
  const sizeStyle = styles[variant]?.[size] || '';

  const className = `${baseStyle} ${variantStyle} ${sizeStyle}`;

  return (
    <button className={className.trim()} {...props}>
      {children}
    </button>
  );
};

export default Button;
