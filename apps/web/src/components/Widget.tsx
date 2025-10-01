'use client';

import React from 'react';
import { useDraggable, useDroppable, useDndContext } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Widget as WidgetType } from '@/types/Widget';
import { WIDGET_HEIGHT_MAP } from '@/config/widget';

interface Props {
  widget: WidgetType & { pixelWidth?: number; pixelHeight?: number };
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

  const dndContext = useDndContext();
  const ariaDescribedBy = dndContext?.active
    ? dndContext.active.data.current?.ariaDescribedBy
    : undefined;

  const { setNodeRef: setDroppableRef } = useDroppable({
    id: widget.id,
  });

  const dragTransform = isOverlay
    ? CSS.Translate.toString(transform)
    : undefined;
  const slideTransform =
    widget.translateX !== undefined && widget.translateY !== undefined
      ? `translate(${widget.translateX}px, ${widget.translateY}px)`
      : undefined;

  const style: React.CSSProperties = {
    gridColumnStart: widget.col,
    gridRowStart: widget.row,
    gridColumnEnd: `span ${widget.width}`,
    gridRowEnd: `span ${widget.height}`,
    height: `${WIDGET_HEIGHT_MAP[widget.height as keyof typeof WIDGET_HEIGHT_MAP]}px`,
    transform: dragTransform || slideTransform,
    opacity: isDragging && !isOverlay ? 0.5 : 1,
  };

  if (isOverlay && widget.pixelWidth && widget.pixelHeight) {
    style.width = `${widget.pixelWidth}px`;
    style.height = `${widget.pixelHeight}px`;
  }

  const draggableAttributes = isOverlay
    ? { ...attributes, 'aria-describedby': ariaDescribedBy }
    : attributes;

  return (
    <div
      ref={(node) => {
        setNodeRef(node);
        setDroppableRef(node);
      }}
      style={style}
      className={`rounded-L grid touch-none place-items-stretch shadow-md ${isEditMode ? 'cursor-grab transition-all hover:scale-[1.02]' : 'cursor-default'} ${
        isOverlay
          ? 'shadow-2xl'
          : 'transition-transform duration-300 ease-in-out'
      }`}
      {...draggableAttributes}
      {...listeners}
    >
      {children}
    </div>
  );
}
