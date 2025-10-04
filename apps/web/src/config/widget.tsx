// apps/web/src/config/widget.tsx

import {
  Achievement,
  BookmarkedProblem,
  Calendar,
  TodayProblem,
  MonthlyTop,
  MyBadges,
  MyPosts,
  ProblemStatus,
  RecommendedProblems,
} from '@/components/(afterLogin)/home/components/widgets';

export const GRID_COLS = 3;
export const GAP = 16;

export const WIDGET_HEIGHT_MAP = {
  1: 473,
  2: 971,
};

export const WIDGET_CONFIG = {
  problemStatus: {
    id: 'problemStatus',
    Component: ProblemStatus,
    defaultLayout: { width: 2, height: 1 },
  },
  calendar: {
    id: 'calendar',
    Component: Calendar,
    defaultLayout: { width: 1, height: 2 },
  },
  recommendedProblems: {
    id: 'recommendedProblems',
    Component: RecommendedProblems,
    defaultLayout: { width: 1, height: 1 },
  },
  bookmarkedProblems: {
    id: 'bookmarkedProblems',
    Component: BookmarkedProblem,
    defaultLayout: { width: 1, height: 1 },
  },
  todayProblem: {
    id: 'todayProblem',
    Component: TodayProblem,
    defaultLayout: { width: 1, height: 1 },
  },
  achievements: {
    id: 'achievements',
    Component: Achievement,
    defaultLayout: { width: 1, height: 1 },
  },
  myPosts: {
    id: 'myPosts',
    Component: MyPosts,
    defaultLayout: { width: 1, height: 1 },
  },
  myBadges: {
    id: 'myBadges',
    Component: MyBadges,
    defaultLayout: { width: 1, height: 1 },
  },
  monthlyTop: {
    id: 'monthlyTop',
    Component: MonthlyTop,
    defaultLayout: { width: 1, height: 2 },
  },
} as const;

export type WidgetId = keyof typeof WIDGET_CONFIG;

export const defaultWidgetIds = [
  'problemStatus',
  'monthlyTop',
  'recommendedProblems',
  'todayProblem',
];
