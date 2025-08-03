'use client';

import React from 'react';
import { useDraggable, useDroppable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Widget as WidgetType } from '../../types/Widget';

// Props 타입에 픽셀 크기를 받을 수 있도록 추가
interface Props {
  widget: WidgetType & { pixelWidth?: number; pixelHeight?: number };
  children: React.ReactNode;
  isOverlay?: boolean;
}

export function Widget({ widget, children, isOverlay }: Props) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: widget.id,
      data: widget,
    });

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
    transform: dragTransform || slideTransform,
    opacity: isDragging && !isOverlay ? 0.5 : 1,
  };

  // isOverlay일 경우, 계산된 픽셀 크기를 스타일에 추가
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
      className={`flex touch-none items-center justify-center rounded-lg border border-gray-200 text-lg font-bold shadow-md ${
        isOverlay
          ? 'shadow-2xl'
          : 'transition-transform duration-300 ease-in-out'
      }`}
      {...attributes}
      {...listeners}
    >
      {children}
    </div>
  );
}
