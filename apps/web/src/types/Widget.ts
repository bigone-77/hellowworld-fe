import { WidgetId } from '@/config/widget';

export interface Widget {
  id: WidgetId;
  width: number;
  height: number;
  translateX?: number;
  translateY?: number;
}

// activeWidget의 타입에 픽셀 크기를 추가
export type ActiveWidget = Widget & {
  pixelWidth: number;
  pixelHeight: number;
};
