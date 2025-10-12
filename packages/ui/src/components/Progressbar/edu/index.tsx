'use client';

import { useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { cn } from '../../../lib/utils';

export interface Props {
  progress: number;
  height?: number;
}

export default function EduProgressBar({ progress, height = 28 }: Props) {
  const currentProgress = Math.max(0, Math.min(100, progress));
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    const controls = animate(count, currentProgress, {
      duration: 1.5,
      ease: 'circOut',
    });
    return controls.stop;
  }, [currentProgress]);

  const LABEL_INSIDE_THRESHOLD = 10;
  const justifyContent = useTransform(count, (latest) => {
    return latest > LABEL_INSIDE_THRESHOLD ? 'flex-end' : 'center';
  });

  return (
    <div
      className='bg-text-box rounded-L flex w-full items-center'
      style={{ height: `${height}px` }}
    >
      <motion.div
        className={cn(
          'rounded-L relative mx-[2px] flex items-center',
          currentProgress === 0
            ? 'bg-transparent'
            : 'bg-primary-box px-[10px] py-[1px]',
        )}
        style={{
          height: `${height - 4}px`,
          justifyContent,
        }}
        initial={{ width: '0%' }}
        animate={{ width: `${currentProgress}%` }}
        transition={{ duration: 1.5, ease: 'circOut' }}
      >
        <div
          className={`${
            progress < LABEL_INSIDE_THRESHOLD / 2
              ? '!text-primary-box absolute left-full top-1/2 ml-2 -translate-y-1/2'
              : 'text-primary-on'
          } ${currentProgress === 0 && '!text-white'} text-body-l2 whitespace-nowrap`}
        >
          <motion.span>{rounded}</motion.span>%
        </div>
      </motion.div>
    </div>
  );
}
