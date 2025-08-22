interface ProgressBarProps {
  progress: number;
}

const Progressbar = ({ progress }: ProgressBarProps) => {
  const currentProgress = Math.max(0, Math.min(100, progress));

  const LABEL_INSIDE_THRESHOLD = 10;

  const isLabelInside = currentProgress > LABEL_INSIDE_THRESHOLD;

  return (
    <div className='bg-primary-line rounded-L flex h-7 w-full items-center'>
      <div
        className={`relative flex items-center ${!isLabelInside ? 'justify-center' : 'justify-end'} ${currentProgress === 0 ? 'bg-transparent' : 'bg-primary-box px-[10] py-[1]'} rounded-L mx-[2] h-6 transition-all duration-300 ease-out`}
        style={{ width: `${currentProgress}%` }}
      >
        <span
          className={`${
            progress < LABEL_INSIDE_THRESHOLD / 2
              ? '!text-primary-box absolute left-full top-1/2 ml-2 -translate-y-1/2'
              : 'text-primary-line'
          } ${currentProgress === 0 && '!text-white'} text-body-l2 whitespace-nowrap transition-all duration-300 ease-out`}
        >
          {`${currentProgress}%`}
        </span>
      </div>
    </div>
  );
};

export { Progressbar };
