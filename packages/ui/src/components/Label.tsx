import { LabelHTMLAttributes } from 'react';
import { cn } from '../lib/utils';

type LabelVariant =
  | 'primary'
  | 'secondary'
  | 'neutral'
  | 'negative'
  | 'positive'
  | 'warning';

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  variant?: LabelVariant;
  className?: string;
  children: React.ReactNode;
}

const Label = ({
  variant = 'neutral',
  className,
  children,
  ...props
}: LabelProps) => {
  const baseStyle =
    '!text-label-l2 py-[3.5] px-2 inline-flex items-center justify-center rounded-XS';

  const styles: Record<LabelVariant, string> = {
    primary: 'text-primary-line bg-primary-box-var1',
    secondary: 'text-secondary-line bg-secondary-box',
    neutral: 'text-text1 bg-text-box',
    negative: 'text-error-on bg-error-box',
    positive: 'text-success-on bg-success-box',
    warning: 'text-warning-on bg-warning-box',
  };

  const variantStyle = styles[variant] || '';

  const finalClassName = cn(baseStyle, variantStyle, className);

  return (
    <label className={finalClassName.trim()} {...props}>
      {children}
    </label>
  );
};

export { Label };
