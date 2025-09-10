'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

interface PopoverContextProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  triggerRef: React.RefObject<HTMLElement | null>;
  contentRef: React.RefObject<HTMLDivElement | null>;
}

interface PopoverProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

interface PopoverTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
}

interface PopoverContentProps {
  children: React.ReactNode;
  className?: string;
  sideOffset?: number;
  align?: 'center' | 'start' | 'end';
}

const PopoverContext = createContext<PopoverContextProps | null>(null);

const usePopover = () => {
  const popoverContext = useContext(PopoverContext);

  if (!popoverContext) {
    throw new Error(
      'popover를 사용하기 위해선 무조건 popover provider로 감싸줘야합니다.',
    );
  }
  return popoverContext;
};

const Popover = ({
  children,
  open: controlledOpen,
  onOpenChange,
}: PopoverProps) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const triggerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : uncontrolledOpen;

  const setIsOpen = useCallback(
    (value: boolean) => {
      if (isControlled) {
        onOpenChange?.(value);
      } else {
        setUncontrolledOpen(value);
      }
    },
    [isControlled, onOpenChange],
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!event.target || !document.contains(event.target as Node)) {
        return;
      }

      if (
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node) &&
        contentRef.current &&
        !contentRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  const contextValue = useMemo(
    () => ({
      isOpen,
      setIsOpen,
      triggerRef,
      contentRef,
    }),
    [isOpen, setIsOpen],
  );

  return (
    <PopoverContext.Provider value={contextValue}>
      {children}
    </PopoverContext.Provider>
  );
};

const PopoverTrigger = ({ children, asChild = false }: PopoverTriggerProps) => {
  const { isOpen, setIsOpen, triggerRef } = usePopover();

  const handleClick = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen, setIsOpen]);

  if (asChild) {
    const child = React.Children.only(children);

    if (React.isValidElement(child)) {
      return React.cloneElement(child as any, {
        ref: triggerRef,
        onClick: (e: React.MouseEvent<HTMLElement>) => {
          handleClick();

          (
            child.props as { onClick?: (e: React.MouseEvent) => void }
          )?.onClick?.(e);
        },
        'aria-expanded': isOpen,
        'aria-haspopup': 'dialog',
      });
    }
  }

  return (
    <button
      ref={triggerRef as React.RefObject<HTMLButtonElement>}
      onClick={handleClick}
      aria-expanded={isOpen}
      aria-haspopup='dialog'
    >
      {children}
    </button>
  );
};

const PopoverContent = ({
  children,
  className = '',
  sideOffset = 8,
  align = 'center',
}: PopoverContentProps) => {
  const { isOpen, triggerRef, contentRef } = usePopover();
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // document 객체는 브라우저에서만 사용 가능하므로,
    // 클라이언트에 마운트된 후에만 true로 설정합니다.
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen && triggerRef.current && contentRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const contentRect = contentRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      let top = triggerRect.bottom + window.scrollY + sideOffset;
      let left;

      if (align === 'center') {
        left =
          triggerRect.left +
          window.scrollX +
          triggerRect.width / 2 -
          contentRect.width / 2;
      } else if (align === 'start') {
        left = triggerRect.left + window.scrollX;
      } else {
        left = triggerRect.right + window.scrollX - contentRect.width;
      }

      if (left < 8) {
        left = 8;
      }
      if (left + contentRect.width > viewportWidth - 8) {
        left = viewportWidth - contentRect.width - 8;
      }
      if (top + contentRect.height > viewportHeight - 8) {
        top =
          triggerRect.top + window.scrollY - contentRect.height - sideOffset;
      }

      setPosition({ top, left });
    }
  }, [isOpen, triggerRef, contentRef, sideOffset, align]);

  if (!isMounted || !isOpen) {
    return null;
  }

  return createPortal(
    <div
      ref={contentRef}
      className={`absolute z-50 ${className} data-[state=open]:animate-in data-[state=closed]:animate-out`}
      style={{ top: `${position.top}px`, left: `${position.left}px` }}
      data-state={isOpen ? 'open' : 'closed'}
      role='dialog'
    >
      {children}
    </div>,
    document.body,
  );
};

Popover.Trigger = PopoverTrigger;
Popover.Content = PopoverContent;

export default Popover;
