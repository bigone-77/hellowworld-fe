interface Props {
  step: number;
  title: string;
  currentIdx: number;
  totalCnt: number;
  stepTextColor?: string;
  titleSize: 'l' | 's';
}

export default function StepLabel({
  step,
  title,
  currentIdx,
  totalCnt,
  stepTextColor = 'text-primary-line',
  titleSize = 's',
}: Props) {
  return (
    <p className='flex items-center gap-x-2'>
      <span className={`text-label-l2 ${stepTextColor}`}>STEP{step}</span>

      <span
        className={`text-text2 ${titleSize === 's' ? 'text-body-l2' : 'text-title-l'}`}
      >
        {title} ({currentIdx}/{totalCnt})
      </span>
    </p>
  );
}
