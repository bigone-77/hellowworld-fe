import { Widget } from '../types/Widget';

export const initialWidgets: Widget[] = [
  {
    id: 'widget-1',
    col: 1,
    row: 1,
    width: 2,
    height: 1,
    translateX: 0,
    translateY: 0,
  },
  {
    id: 'widget-2',
    col: 3,
    row: 1,
    width: 1,
    height: 2,
    translateX: 0,
    translateY: 0,
  },
  {
    id: 'widget-3',
    col: 1,
    row: 2,
    width: 1,
    height: 2,
    translateX: 0,
    translateY: 0,
  },
  {
    id: 'widget-4',
    col: 2,
    row: 2,
    width: 1,
    height: 1,
    translateX: 0,
    translateY: 0,
  },
  {
    id: 'widget-5',
    col: 2,
    row: 3,
    width: 1,
    height: 1,
    translateX: 0,
    translateY: 0,
  },
];

export const GRID_COLS = 3;
export const GRID_ROWS = 3;
export const GAP = 16; // 1rem = 16px (tailwind gap-4)
