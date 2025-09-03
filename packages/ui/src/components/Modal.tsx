'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../lib/utils';

interface ModalContextProps {
  onClose: () => void;
}

const ModalContext = createContext<ModalContextProps>({
  onClose: () => {},
});

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

function Modal({ isOpen, onClose, children }: ModalProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
    }
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isMounted || !isOpen) {
    return null;
  }

  return createPortal(
    <ModalContext.Provider value={{ onClose }}>
      <div data-state={isOpen ? 'open' : 'closed'}>
        <div
          onClick={onClose}
          className='data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out fixed inset-0 z-50 bg-black/50'
        />
        {children}
      </div>
    </ModalContext.Provider>,
    document.body,
  );
}

const ModalContent = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        'rounded-M shadow-modal-l fixed left-1/2 top-1/2 z-50 w-[405] -translate-x-1/2 -translate-y-1/2 bg-white px-6 py-12',
        'data-[state=open]:animate-in data-[state=closed]:animate-out',
        className,
      )}
      {...props}
    >
      <div className='flex flex-col items-center text-center'>{children}</div>
    </div>
  );
};

const ModalHeader = (props: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('mb-6 flex flex-col gap-1.5', props.className)}
    {...props}
  />
);
const ModalTitle = (props: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h2
    className={cn(
      'text-card-foreground text-lg font-semibold',
      props.className,
    )}
    {...props}
  />
);
const ModalDescription = (
  props: React.HTMLAttributes<HTMLParagraphElement>,
) => (
  <p
    className={cn('text-muted-foreground text-sm', props.className)}
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
