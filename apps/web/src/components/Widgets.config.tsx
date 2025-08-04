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
} from '@/components/widgets';

import { Widget } from '@/types/Widget';

export const WIDGET_CONFIG = {
  problemStatus: {
    id: 'problemStatus',
    Component: ProblemStatus,
    defaultLayout: { col: 1, row: 1, width: 2, height: 2 },
  },
  calendar: {
    id: 'calendar',
    Component: Calendar,
    defaultLayout: { col: 3, row: 1, width: 1, height: 3 },
  },
  recommendedProblems: {
    id: 'recommended-problems',
    Component: RecommendedProblems,
    defaultLayout: { col: 1, row: 3, width: 1, height: 3 },
  },
  bookmarkedProblems: {
    id: 'bookmarked-problem',
    Component: BookmarkedProblem,
    defaultLayout: { col: 2, row: 3, width: 1, height: 3 },
  },
  customQuestions: {
    id: 'custom-questions',
    Component: CustomQuestion,
    defaultLayout: { col: 1, row: 6, width: 1, height: 3 },
  },
  achievements: {
    id: 'achievement',
    Component: Achievement,
    defaultLayout: { col: 2, row: 6, width: 1, height: 3 },
  },
  myPosts: {
    id: 'my-posts',
    Component: MyPosts,
    defaultLayout: { col: 3, row: 4, width: 1, height: 3 },
  },
  monthlyTop: {
    id: 'monthly-top',
    Component: MonthlyTop,
    defaultLayout: { col: 3, row: 7, width: 1, height: 2 },
  },
  myBadges: {
    id: 'my-badges',
    Component: MyBadges,
    defaultLayout: { col: 1, row: 9, width: 2, height: 1 },
  },
} as const;

export type WidgetId = keyof typeof WIDGET_CONFIG;

// 3. 초기 위젯 레이아웃 상태 생성 (자동으로 9개 위젯에 맞게 생성됨)
export const initialWidgets: Widget[] = Object.values(WIDGET_CONFIG).map(
  (config) => ({
    id: config.id as WidgetId,
    ...config.defaultLayout,
    translateX: 0,
    translateY: 0,
  }),
);
