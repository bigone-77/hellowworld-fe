'use client';

import React from 'react';
import { useDraggable, useDroppable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Widget as WidgetType } from '@/types/Widget';
import { WIDGET_HEIGHT_MAP } from '@/config/widget';

// Props 타입에 픽셀 크기를 받을 수 있도록 추가
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
    minHeight: `${WIDGET_HEIGHT_MAP[widget.height as keyof typeof WIDGET_HEIGHT_MAP]}px`, // ✨ min-height 적용
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
      className={`rounded-L grid touch-none place-items-stretch shadow-md ${isEditMode ? 'cursor-grab transition-all hover:scale-[1.02]' : 'cursor-default'} ${
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
