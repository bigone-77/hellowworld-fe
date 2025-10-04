import { useRef, useState, useEffect } from 'react';

import { DragEndEvent, DragStartEvent } from '@dnd-kit/core';

import { ActiveWidget } from '@/types/Widget';
import { GAP, GRID_COLS, WIDGET_HEIGHT_MAP } from '@/config/widget';
import { useWidgetStore } from '@/store/widget-store';

export function useWidgetGrid() {
  const { widgets, reorderWidgets } = useWidgetStore();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const [activeWidget, setActiveWidget] = useState<ActiveWidget | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  function handleDragStart(event: DragStartEvent) {
    if (!gridRef.current || !widgets) return;
    const { active } = event;
    const widget = widgets.find((w) => w.id === active.id);
    if (!widget) return;

    const gridCellWidth =
      (gridRef.current.offsetWidth - (GRID_COLS - 1) * GAP) / GRID_COLS;
    const pixelWidth = widget.width * gridCellWidth + (widget.width - 1) * GAP;
    const pixelHeight =
      WIDGET_HEIGHT_MAP[widget.height as keyof typeof WIDGET_HEIGHT_MAP];

    setActiveWidget({ ...widget, pixelWidth, pixelHeight });
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveWidget(null);

    if (over && active.id !== over.id && widgets) {
      const oldIndex = widgets.findIndex((w) => w.id === active.id);
      const newIndex = widgets.findIndex((w) => w.id === over.id);

      reorderWidgets(oldIndex, newIndex);
    }
  }

  return {
    widgets: isMounted ? widgets : [],
    activeWidget,
    gridRef,
    handleDragStart,
    handleDragEnd,
  };
}
