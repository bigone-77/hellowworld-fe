import { cn } from '../lib/utils';
import Button from './Button';
import InlineSvg from './InlineSvg';

type ExtraButtonProps = Omit<
  React.ComponentProps<typeof Button>,
  'onClick' | 'children'
>;

interface PrevNextBtnProps {
  onPrevClick: () => void;
  onNextClick: () => void;
  prevBtnProps?: ExtraButtonProps;
  nextBtnProps?: ExtraButtonProps;
  iconSize?: number;
  className?: string;
  children?: React.ReactNode;
}

const PrevNextBtn = ({
  onPrevClick,
  onNextClick,
  prevBtnProps,
  nextBtnProps,
  iconSize = 24,
  className,
  children,
}: PrevNextBtnProps) => {
  return (
    <div className={cn('flex items-center justify-center gap-2', className)}>
      <Button
        variant='primary_icon'
        size='s'
        onClick={onPrevClick}
        {...prevBtnProps}
        className={cn('!rounded-FULL', prevBtnProps?.className)}
      >
        <InlineSvg alias='prevArrow' width={iconSize} height={iconSize} />
      </Button>

      {children && <div className='h-full w-full flex-grow'>{children}</div>}

      <Button
        variant='primary_icon'
        size='s'
        onClick={onNextClick}
        {...nextBtnProps}
        className={cn('!rounded-FULL', nextBtnProps?.className)}
      >
        <InlineSvg alias='nextArrow' width={iconSize} height={iconSize} />
      </Button>
    </div>
  );
};

export default PrevNextBtn;
