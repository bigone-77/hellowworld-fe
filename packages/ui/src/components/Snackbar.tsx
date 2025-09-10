'use client';

import React, { useEffect } from 'react';

interface Props {
  open: boolean;
  onOpenChange: (onOpen: boolean) => void;
  duration?: number;
  children: React.ReactNode;
  strategy?: 'fixed' | 'absolute';
}

const Snackbar = ({
  open,
  onOpenChange,
  duration = 3000,
  children,
  strategy = 'fixed',
}: Props) => {
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        onOpenChange(false);
      }, duration);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [open, duration, onOpenChange]);

  return (
    <div
      className={`${strategy} rounded-M bg-text2 bottom-10 left-1/2 w-fit -translate-x-1/2 whitespace-nowrap px-24 py-[18] text-center text-white transition-all duration-300 ease-in-out ${open ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'} ${open ? 'pointer-events-auto' : 'pointer-events-none'} `}
    >
      {children}
    </div>
  );
};

export default Snackbar;
