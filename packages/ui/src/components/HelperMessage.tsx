import clsx from 'clsx';
import { HTMLAttributes } from 'react';

interface HelperMessageProps extends HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
  variant?: 'default' | 'error' | 'success';
  className?: string;
}

const HelperMessage = ({
  children,
  variant = 'default',
  className,
  ...props
}: HelperMessageProps) => {
  if (!children) {
    return null;
  }

  const variantClasses = {
    default: 'text-text1',
    error: 'text-error-on',
    success: 'text-success-on',
  };

  return (
    <p
      className={clsx('text-label-l2', variantClasses[variant], className)}
      {...props}
    >
      {children}
    </p>
  );
};

export { HelperMessage };
