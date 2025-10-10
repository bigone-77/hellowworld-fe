'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { motion, AnimatePresence, HTMLMotionProps } from 'framer-motion';

import { cn } from '../lib/utils';
import InlineSvg from './InlineSvg';

interface ModalContextProps {
  onClose: () => void;
}
const ModalContext = createContext<ModalContextProps>({
  onClose: () => {},
});

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode; // 다시 React.ReactNode로 변경해도 안전합니다.
}

function Modal({ isOpen, onClose, children }: ModalProps) {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isMounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <ModalContext.Provider value={{ onClose }}>
          <motion.div
            onClick={onClose}
            className='fixed inset-0 z-50 bg-black/50'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
          {children}
        </ModalContext.Provider>
      )}
    </AnimatePresence>,
    document.body,
  );
}

interface ModalContentProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
}

const ModalContent = ({ className, children, ...props }: ModalContentProps) => {
  const { onClose } = useContext(ModalContext);

  return (
    <motion.div
      className={cn(
        'rounded-M fixed left-1/2 top-1/2 z-50 w-[405px] -translate-x-1/2 -translate-y-1/2 bg-white px-6 py-12',
        'shadow-modal-l',
        className,
      )}
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.98 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      {...props}
    >
      <div className='flex flex-col items-center text-center'>{children}</div>
      <button
        onClick={onClose}
        className='absolute right-4 top-4 cursor-pointer opacity-80 transition-opacity hover:opacity-100'
        aria-label='Close'
      >
        <InlineSvg alias='close' className='text-text-line' />
      </button>
    </motion.div>
  );
};

const ModalHeader = (props: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('mb-6 flex flex-col gap-1.5', props.className)}
    {...props}
  />
);
const ModalTitle = (props: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h2 className={cn('text-headline-s', props.className)} {...props} />
);
const ModalDescription = (
  props: React.HTMLAttributes<HTMLParagraphElement>,
) => (
  <p
    className={cn(
      'text-body-l1 text-text1 whitespace-pre-wrap text-center',
      props.className,
    )}
    {...props}
  />
);
const ModalFooter = (props: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('flex w-full justify-center gap-3', props.className)}
    {...props}
  />
);

Modal.Content = ModalContent;
Modal.Header = ModalHeader;
Modal.Title = ModalTitle;
Modal.Description = ModalDescription;
Modal.Footer = ModalFooter;

export default Modal;
