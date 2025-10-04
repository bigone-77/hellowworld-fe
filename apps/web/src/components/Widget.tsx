'use client';

import React from 'react';
import { useDraggable, useDroppable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

import { Widget as WidgetType } from '@/types/Widget';
import { WIDGET_HEIGHT_MAP } from '@/config/widget';

interface Props {
  widget: Omit<WidgetType, 'col' | 'row'> & {
    pixelWidth?: number;
    pixelHeight?: number;
  };
  children: React.ReactNode;
  isOverlay?: boolean;
  isEditMode?: boolean;
}

export function Widget({ widget, children, isOverlay, isEditMode }: Props) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: widget.id,
      data: widget,
      disabled: !isEditMode,
    });

  const { setNodeRef: setDroppableRef } = useDroppable({
    id: widget.id,
  });

  const dragTransform = isOverlay
    ? CSS.Translate.toString(transform)
    : undefined;

  const style: React.CSSProperties = {
    gridColumnEnd: `span ${widget.width}`,
    gridRowEnd: `span ${widget.height}`,
    height: `${WIDGET_HEIGHT_MAP[widget.height as keyof typeof WIDGET_HEIGHT_MAP]}px`,
    transform: dragTransform,
    opacity: isDragging && !isOverlay ? 0.5 : 1,
    boxShadow:
      '0px 4px 10px 2px rgba(0, 0, 0, 0.06), 0px 0px 4px 0px rgba(0, 0, 0, 0.1)',
  };

  if (isOverlay && widget.pixelWidth && widget.pixelHeight) {
    style.width = `${widget.pixelWidth}px`;
    style.height = `${widget.pixelHeight}px`;
  }

  return (
    <div
      ref={(node) => {
        setNodeRef(node);
        setDroppableRef(node);
      }}
      style={style}
      className={`rounded-L grid touch-none place-items-stretch shadow-md ${isEditMode ? 'cursor-grab transition-all hover:scale-[1.02]' : 'cursor-default'} ${
        isOverlay ? 'shadow-2xl' : ''
      }`}
      {...attributes}
      {...listeners}
    >
      {children}
    </div>
  );
}
