import {
  Achievement,
  BookmarkedProblem,
  Calendar,
  CustomQuestion,
  MonthlyTop,
  MyBadges,
  MyPosts,
  ProblemStatus,
  RecommendedProblems,
} from '@/components/(afterLogin)/home/widgets';
import { Widget } from '@/types/Widget';

// 1. 그리드 설정 상수
export const GRID_COLS = 3;
export const GRID_ROWS = 9;
export const GAP = 16;

// 2. 위젯의 높이 정보 (픽셀 단위)
export const WIDGET_HEIGHT_MAP = {
  1: 473,
  2: 971,
};

// 3. 모든 위젯의 설정과 기본 레이아웃을 정의하는 단일 객체
export const WIDGET_CONFIG = {
  problemStatus: {
    id: 'problemStatus',
    Component: ProblemStatus,
    defaultLayout: { col: 1, row: 1, width: 2, height: 1 },
  },
  calendar: {
    id: 'calendar',
    Component: Calendar,
    defaultLayout: { col: 3, row: 1, width: 1, height: 2 },
  },
  recommendedProblems: {
    id: 'recommendedProblems',
    Component: RecommendedProblems,
    defaultLayout: { col: 1, row: 2, width: 1, height: 1 },
  },
  bookmarkedProblems: {
    id: 'bookmarkedProblems',
    Component: BookmarkedProblem,
    defaultLayout: { col: 2, row: 3, width: 1, height: 1 },
  },
  customQuestions: {
    id: 'customQuestions',
    Component: CustomQuestion,
    defaultLayout: { col: 1, row: 6, width: 1, height: 1 },
  },
  achievements: {
    id: 'achievements',
    Component: Achievement,
    defaultLayout: { col: 2, row: 6, width: 1, height: 1 },
  },
  myPosts: {
    id: 'myPosts',
    Component: MyPosts,
    defaultLayout: { col: 3, row: 4, width: 1, height: 1 },
  },
  monthlyTop: {
    id: 'monthlyTop',
    Component: MonthlyTop,
    defaultLayout: { col: 3, row: 7, width: 1, height: 2 },
  },
  myBadges: {
    id: 'myBadges',
    Component: MyBadges,
    defaultLayout: { col: 1, row: 9, width: 1, height: 1 },
  },
} as const;

export type WidgetId = keyof typeof WIDGET_CONFIG;

export const initialWidgets: Widget[] = Object.values(WIDGET_CONFIG).map(
  (config) => ({
    id: config.id as WidgetId,
    ...config.defaultLayout,
    translateX: 0,
    translateY: 0,
  }),
);
