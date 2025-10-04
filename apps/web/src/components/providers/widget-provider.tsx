'use client';

import React from 'react';

import { DndContext, DragOverlay, rectIntersection } from '@dnd-kit/core';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';

import { Widget } from '@/components/Widget';
import { WIDGET_CONFIG } from '@/config/widget';
import { useWidgetGrid } from '@/hooks/useWidgetGrid';
import { Widget as WidgetType } from '@/types/Widget';

interface Props {
  isEditMode: boolean;
  children: (widgets: WidgetType[]) => React.ReactNode;
}

export default function WidgetProvider({ isEditMode, children }: Props) {
  const { widgets, activeWidget, gridRef, handleDragStart, handleDragEnd } =
    useWidgetGrid();

  const ActiveComponent = activeWidget
    ? WIDGET_CONFIG[activeWidget.id as keyof typeof WIDGET_CONFIG]?.Component
    : null;

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      collisionDetection={rectIntersection}
    >
      <div
        ref={gridRef}
        className='grid w-full grid-flow-row-dense grid-cols-3 gap-8'
      >
        {React.Children.map(children(widgets), (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, { isEditMode } as {
              isEditMode: boolean;
            });
          }
          return child;
        })}
      </div>

      <DragOverlay modifiers={[restrictToWindowEdges]}>
        {activeWidget && ActiveComponent ? (
          <Widget widget={activeWidget} isOverlay isEditMode={isEditMode}>
            <ActiveComponent />
          </Widget>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
