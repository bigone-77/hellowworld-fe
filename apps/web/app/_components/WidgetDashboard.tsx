'use client';

import { DndContext, DragOverlay, rectIntersection } from '@dnd-kit/core';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';
import { useWidgetGrid } from '../../hooks/useWidgetGrid';
import { Widget } from './Widget';
import { WIDGET_CONFIG } from './Widgets.config'; // 위젯 설정 파일 임포트

export default function WidgetDashboard() {
  // 1. useWidgetGrid 훅에서 모든 상태와 핸들러를 가져옵니다.
  const {
    widgets,
    activeWidget,
    gridRef,
    snapToGridModifier,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  } = useWidgetGrid();

  // 2. DragOverlay에서 사용할 활성 위젯의 컨텐츠 컴포넌트를 찾습니다.
  const ActiveComponent = activeWidget
    ? WIDGET_CONFIG[activeWidget.id]?.Component
    : null;

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      modifiers={[snapToGridModifier]}
      collisionDetection={rectIntersection}
    >
      <div
        ref={gridRef}
        className='grid h-[600px] w-full grid-cols-3 grid-rows-3 gap-4 rounded-lg bg-white p-4 shadow-lg'
        style={{ gridTemplateRows: 'repeat(3, minmax(0, 1fr))' }}
      >
        {/* 3. 위젯 배열을 순회하며 각 위젯에 맞는 컨텐츠를 렌더링합니다. */}
        {widgets.map((widget) => {
          const ComponentToRender = WIDGET_CONFIG[widget.id]?.Component;
          if (!ComponentToRender) return null;

          return (
            <Widget key={widget.id} widget={widget}>
              <ComponentToRender />
            </Widget>
          );
        })}
      </div>

      <DragOverlay modifiers={[restrictToWindowEdges]}>
        {/* 4. DragOverlay 내부에서도 올바른 컨텐츠를 렌더링합니다. */}
        {activeWidget && ActiveComponent ? (
          <Widget widget={activeWidget} isOverlay>
            <ActiveComponent />
          </Widget>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
