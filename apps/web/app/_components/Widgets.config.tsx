import { Widget } from '../../types/Widget';

// 1. 개별 컨텐츠 컴포넌트 정의 (또는 다른 파일에서 import)
function Widget1() {
  return <div className='h-full w-full bg-red-200 p-2'>안녕 나는 위젯1</div>;
}
function Widget2() {
  return <div className='h-full w-full bg-orange-200 p-2'>안녕 나는 위젯2</div>;
}
function Widget3() {
  return <div className='h-full w-full bg-yellow-200 p-2'>안녕 나는 위젯3</div>;
}
function Widget4() {
  return <div className='h-full w-full bg-green-200 p-2'>안녕 나는 위젯4</div>;
}
function Widget5() {
  return <div className='h-full w-full bg-blue-200 p-2'>안녕 나는 위젯5</div>;
}

// 2. 위젯의 모든 정보를 하나로 묶어서 관리
export const WIDGET_CONFIG = {
  'widget-1': {
    id: 'widget-1',
    Component: Widget1,
    defaultLayout: { col: 1, row: 1, width: 2, height: 1 },
  },
  'widget-2': {
    id: 'widget-2',
    Component: Widget2,
    defaultLayout: { col: 3, row: 1, width: 1, height: 2 },
  },
  'widget-3': {
    id: 'widget-3',
    Component: Widget3,
    defaultLayout: { col: 1, row: 2, width: 1, height: 2 },
  },
  'widget-4': {
    id: 'widget-4',
    Component: Widget4,
    defaultLayout: { col: 2, row: 2, width: 1, height: 1 },
  },
  'widget-5': {
    id: 'widget-5',
    Component: Widget5,
    defaultLayout: { col: 2, row: 3, width: 1, height: 1 },
  },
} as const;

export type WidgetId = keyof typeof WIDGET_CONFIG;

// 3. 초기 위젯 레이아웃 상태 생성
export const initialWidgets: Widget[] = Object.values(WIDGET_CONFIG).map(
  (config) => ({
    id: config.id,
    ...config.defaultLayout,
    translateX: 0,
    translateY: 0,
  }),
);
