import { HTMLAttributes } from 'react';
import { cn } from '../lib/utils';

interface EduButtonProps extends HTMLAttributes<HTMLDivElement> {
  step: string;
  title: string;
  progress?: number;
  className?: string;
  isActive?: boolean;
}

const EduButton = ({
  step,
  title,
  progress = 0,
  className,
  isActive = false,
  ...props
}: EduButtonProps) => {
  const baseStyle = `
    rounded-S p-3 bg-primary-box border-primary-line flex flex-1 items-center justify-between border
    ${!isActive && 'opacity-30'}
  `;

  const finalClassName = cn(baseStyle, className);

  return (
    <div className={finalClassName.trim()} {...props}>
      <div className='text-body-l2 text-primary-on flex items-center gap-x-4'>
        <span>{step}</span>
        <span>{title}</span>
      </div>
      <span className='text-body-l2 text-primary-on'>{progress}%</span>
    </div>
  );
};

export default EduButton;
