import { WidgetId } from '../components/Widgets.config';

export interface Widget {
  id: WidgetId;
  col: number;
  row: number;
  width: number;
  height: number;
  // 시각적 이동을 위한 픽셀 값 (optional)
  translateX?: number;
  translateY?: number;
}

// activeWidget의 타입에 픽셀 크기를 추가
export type ActiveWidget = Widget & {
  pixelWidth: number;
  pixelHeight: number;
};
