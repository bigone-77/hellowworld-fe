'use client';

import { useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

export interface Props {
  progress: number;
}

export default function EduProgressBar({ progress }: Props) {
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
  const isLabelInside = count.get() > LABEL_INSIDE_THRESHOLD;

  return (
    <div className='bg-primary-line rounded-L flex h-7 w-full items-center'>
      <motion.div
        className={`relative flex items-center ${!isLabelInside ? 'justify-center' : 'justify-end'} ${currentProgress === 0 ? 'bg-transparent' : 'bg-primary-box px-[10] py-[1]'} rounded-L mx-[2] h-6`}
        initial={{ width: '0%' }}
        animate={{ width: `${currentProgress}%` }}
        transition={{ duration: 1.5, ease: 'circOut' }}
      >
        <div
          className={`${progress < LABEL_INSIDE_THRESHOLD / 2 ? '!text-primary-box absolute left-full top-1/2 ml-2 -translate-y-1/2' : 'text-primary-line'} ${currentProgress === 0 && '!text-white'} text-body-l2 whitespace-nowrap`}
        >
          <motion.span>{rounded}</motion.span>%
        </div>
      </motion.div>
    </div>
  );
}
