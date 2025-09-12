import { GRID_COLS, GRID_ROWS } from '@/config/widget';

import { Widget } from '@/types/Widget';

const doWidgetsOverlap = (w1: Widget, w2: Widget) => {
  return !(
    w1.col + w1.width <= w2.col ||
    w2.col + w2.width <= w1.col ||
    w1.row + w1.height <= w2.row ||
    w2.row + w2.height <= w1.row
  );
};

// 특정 위치에 위젯을 놓을 수 있는지 확인하는 함수
const canPlaceWidget = (widget: Widget, allWidgets: Widget[]) => {
  if (
    widget.col + widget.width - 1 > GRID_COLS ||
    widget.row + widget.height - 1 > GRID_ROWS
  ) {
    return false; // 그리드 경계를 벗어나는 경우
  }
  return !allWidgets.some(
    (w) => w.id !== widget.id && doWidgetsOverlap(widget, w),
  );
};

// 다음 빈 공간을 찾는 함수
const findNextAvailableSpot = (
  widget: Widget,
  allWidgets: Widget[],
): { col: number; row: number } | null => {
  for (let r = 1; r <= GRID_ROWS; r++) {
    for (let c = 1; c <= GRID_COLS; c++) {
      const newPosWidget = { ...widget, col: c, row: r };
      if (canPlaceWidget(newPosWidget, allWidgets)) {
        return { col: c, row: r };
      }
    }
  }
  return null; // 빈 공간 없음
};

/**
 * 스마트 재배치 로직을 실행하여 새로운 레이아웃을 계산합니다.
 * @param currentLayout 현재 위젯 레이아웃 배열
 * @param activeId 드래그 중인 위젯의 ID
 * @param overId 드래그 중인 위젯 아래에 있는 위젯의 ID
 * @returns 충돌이 해결된 새로운 위젯 레이아웃 배열, 또는 해결 불가 시 null
 */
export function getNextLayout(
  currentLayout: Widget[],
  activeId: string,
  overId: string,
): Widget[] | null {
  const activeWidget = currentLayout.find((w) => w.id === activeId);
  const overWidget = currentLayout.find((w) => w.id === overId);

  if (!activeWidget || !overWidget) {
    return null;
  }

  // 1. 드래그 중인 위젯을 목표 위치로 임시 이동시킨 가상 레이아웃 생성
  let newLayout = currentLayout.map((w) => {
    if (w.id === activeWidget.id) {
      // 목표 위젯의 위치로 이동. 단, 그리드 경계를 넘지 않도록 위치 보정
      return {
        ...w,
        col: Math.min(overWidget.col, GRID_COLS - w.width + 1),
        row: Math.min(overWidget.row, GRID_ROWS - w.height + 1),
      };
    }
    return w;
  });

  // 2. 겹치는 위젯들을 찾아 연쇄적으로 재배치 (Push 로직)
  let layoutChanged = true;
  while (layoutChanged) {
    layoutChanged = false;

    // 드래그된 위젯과 겹치는 다른 위젯들을 찾음
    const draggedWidgetInstance = newLayout.find((w) => w.id === activeId)!;
    const widgetsToMove = newLayout.filter(
      (w) => w.id !== activeId && doWidgetsOverlap(w, draggedWidgetInstance),
    );

    if (widgetsToMove.length > 0) {
      // 가장 먼저 찾은 겹치는 위젯을
      const widgetToPush = widgetsToMove[0];
      if (widgetToPush) {
        // 들어갈 수 있는 다음 빈 공간을 찾아서
        const availableSpot = findNextAvailableSpot(
          widgetToPush,
          newLayout.filter((w) => w.id !== widgetToPush.id),
        );

        if (availableSpot) {
          // 해당 위젯을 빈 공간으로 이동시킴
          newLayout = newLayout.map((w) =>
            w.id === widgetToPush.id ? { ...w, ...availableSpot } : w,
          );
          layoutChanged = true; // 레이아웃이 변경되었으므로, 또 다른 충돌이 있는지 처음부터 다시 검사
        } else {
          // 더 이상 밀어낼 공간이 없으면 루프 중단
          layoutChanged = false;
        }
      }
    }
  }

  // 3. 최종적으로 드래그된 위젯이 놓일 수 있는지 한 번 더 확인 (안전장치)
  const finalActiveWidget = newLayout.find((w) => w.id === activeId)!;
  if (!canPlaceWidget(finalActiveWidget, newLayout)) {
    return null; // 변경이 불가능하면 null을 반환하여 변경 취소
  }

  // 4. 성공적으로 재배치된 레이아웃 반환
  return newLayout;
}
