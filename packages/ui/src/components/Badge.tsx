import { HTMLAttributes } from 'react';
import InlineSvg from './InlineSvg';

interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  isOn?: boolean;
  imgUrl: string;
  imgSize?: number;
  className?: string;
}

const Badge = ({
  title,
  isOn = false,
  imgUrl,
  imgSize = 24,
  ...props
}: BadgeProps) => {
  return (
    <div
      data-state={isOn ? 'on' : 'off'}
      className='rounded-L border-primary-line bg-primary-box-var1 data-[state=on]:border-secondary-box-line data-[state=on]:bg-secondary-box flex w-fit flex-col items-center gap-y-3 border-2 px-3 py-4'
      {...props}
    >
      <InlineSvg
        srcUrl={imgUrl}
        width={imgSize}
        height={imgSize}
        className='rounded-M border-primary-line group-data-[state=on]:border-secondary-box-on border-2'
      />
      <span className='text-body-l2 text-primary-line group-data-[state=on]:text-secondary-box-on'>
        {title}
      </span>
    </div>
  );
};

export default Badge;

{
  /* <InlineSvg
        srcUrl={imgUrl}
        width={imgSize}
        height={imgSize}
        className='rounded-M border-primary-line border-2'
      /> */
}

// https://res.cloudinary.com/dl31hx4rn/image/upload/v1753371466/svg/check.svg
