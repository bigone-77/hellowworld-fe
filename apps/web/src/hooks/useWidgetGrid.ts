import { useRef, useState } from 'react';
import { ActiveWidget, Widget } from '@/types/Widget';
import {
  GAP,
  GRID_COLS,
  GRID_ROWS,
  initialWidgets,
  WIDGET_HEIGHT_MAP,
} from '@/config/grid';
import {
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  Modifier,
} from '@dnd-kit/core';
import { getNextLayout } from '@/lib/gridUtils';
import { useThrottle } from './useThrottle';

export function useWidgetGrid() {
  const [widgets, setWidgets] = useState<Widget[]>(initialWidgets);
  const [activeWidget, setActiveWidget] = useState<ActiveWidget | null>(null);
  const [cellSize, setCellSize] = useState({ width: 0, height: 0 }); // 셀 크기 state 추가
  const gridRef = useRef<HTMLDivElement>(null); // 그리드 컨테이너 ref
  const initialLayoutRef = useRef<Widget[] | null>(null); // 애니메이션을 위한 시작 레이아웃 ref

  const snapToGridModifier: Modifier = ({ transform }) => {
    if (cellSize.width > 0 && cellSize.height > 0) {
      const x =
        Math.round(transform.x / (cellSize.width + GAP)) *
        (cellSize.width + GAP);
      const y =
        Math.round(transform.y / (cellSize.height + GAP)) *
        (cellSize.height + GAP);
      return { ...transform, x, y };
    }
    // 아직 cellSize가 계산되기 전이면 원래 transform을 반환
    return transform;
  };

  function handleDragStart(event: DragStartEvent) {
    if (!gridRef.current) return;

    const gridWidth = gridRef.current.offsetWidth - (GRID_COLS - 1) * GAP;
    const gridHeight = gridRef.current.offsetHeight - (GRID_ROWS - 1) * GAP;
    const newCellWidth = gridWidth / GRID_COLS;
    const newCellHeight = gridHeight / GRID_ROWS;
    setCellSize({ width: newCellWidth, height: newCellHeight });

    initialLayoutRef.current = widgets.map((w) => ({
      ...w,
      translateX: 0,
      translateY: 0,
    }));

    const widget = event.active.data.current as Widget;
    const pixelWidth = widget.width * newCellWidth + (widget.width - 1) * GAP;
    const pixelHeight =
      WIDGET_HEIGHT_MAP[widget.height as keyof typeof WIDGET_HEIGHT_MAP];
    setActiveWidget({ ...widget, pixelWidth, pixelHeight });
  }

  const handleDragOverLogic = (event: DragOverEvent) => {
    const { active, over } = event;

    if (!over || !initialLayoutRef.current || active.id === over.id) return;

    const nextLogicLayout = getNextLayout(
      initialLayoutRef.current,
      active.id as string,
      over.id as string,
    );

    if (!nextLogicLayout) return;

    setWidgets((currentWidgets) => {
      return currentWidgets.map((widget) => {
        const newPos = nextLogicLayout.find((w) => w.id === widget.id);
        const oldPos = initialLayoutRef.current!.find(
          (w) => w.id === widget.id,
        );
        if (!newPos || !oldPos) return widget;
        const translateX = (newPos.col - oldPos.col) * (cellSize.width + GAP);
        const translateY = (newPos.row - oldPos.row) * (cellSize.height + GAP);
        return { ...widget, translateX, translateY };
      });
    });
  };

  const handleDragOver = useThrottle(handleDragOverLogic, 50);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    const startLayout = initialLayoutRef.current;

    // 최종적으로 결정될 레이아웃을 담을 변수
    let finalLayout: Widget[] | null = null;

    // 드롭 위치가 유효하고, 드래그 시작 시점의 레이아웃이 존재할 경우
    if (over && startLayout) {
      try {
        // 레이아웃 계산 시도
        finalLayout = getNextLayout(
          startLayout,
          active.id as string,
          over.id as string,
        );
      } catch (e) {
        console.error(e);

        finalLayout = null;
      }
    }

    // 계산된 최종 레이아웃이 유효하면 그 상태로 업데이트
    if (finalLayout) {
      setWidgets(
        finalLayout.map((w) => ({ ...w, translateX: 0, translateY: 0 })),
      );
    }
    // 드롭 위치가 유효하지 않거나 계산 중 에러가 발생했다면, 시작 레이아웃으로 복구
    else if (startLayout) {
      setWidgets(startLayout);
    }

    // 모든 로직이 끝난 후 상태와 참조를 안전하게 초기화
    setActiveWidget(null);
    initialLayoutRef.current = null;
  }

  return {
    widgets,
    activeWidget,
    gridRef,
    snapToGridModifier,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  };
}
