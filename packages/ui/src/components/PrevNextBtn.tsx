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
  prevButtonProps?: ExtraButtonProps;
  nextButtonProps?: ExtraButtonProps;
  iconSize?: number;
  className?: string;
}

const PrevNextBtn = ({
  onPrevClick,
  onNextClick,
  prevButtonProps,
  nextButtonProps,
  iconSize = 24,
  className,
}: PrevNextBtnProps) => {
  return (
    <div className={cn('flex items-center justify-center gap-2', className)}>
      <Button
        variant='primary_icon'
        size='s'
        onClick={onPrevClick}
        {...prevButtonProps}
        className={cn('!rounded-FULL', prevButtonProps?.className)}
      >
        <InlineSvg alias='prevArrow' width={iconSize} height={iconSize} />
      </Button>

      <Button
        variant='primary_icon'
        size='s'
        onClick={onNextClick}
        {...nextButtonProps}
        className={cn('!rounded-FULL', nextButtonProps?.className)}
      >
        <InlineSvg alias='nextArrow' width={iconSize} height={iconSize} />
      </Button>
    </div>
  );
};

export default PrevNextBtn;
