import { Widget } from '@/types/Widget';

// 1. 그리드 전체 크기 변경 (3x9)
export const GRID_COLS = 3;
export const GRID_ROWS = 9;
export const GAP = 16;

// 2. 새로운 3x9 그리드 구성에 맞춘 초기 레이아웃
export const initialWidgets: Widget[] = [
  {
    id: 'problemStatus', // 나의 문제풀이 현황
    col: 1,
    row: 1,
    width: 2,
    height: 2,
    translateX: 0,
    translateY: 0,
  },
  {
    id: 'calendar', // 캘린더
    col: 3,
    row: 1,
    width: 1,
    height: 3,
    translateX: 0,
    translateY: 0,
  },
  {
    id: 'recommendedProblems', // 오늘의 추천문제
    col: 1,
    row: 3,
    width: 1,
    height: 3,
    translateX: 0,
    translateY: 0,
  },
  {
    id: 'bookmarkedProblems', // 북마크 문제
    col: 2,
    row: 3,
    width: 1,
    height: 3,
    translateX: 0,
    translateY: 0,
  },
  {
    id: 'customQuestions', // 오늘의 맞춤 질문
    col: 1,
    row: 6,
    width: 1,
    height: 3,
    translateX: 0,
    translateY: 0,
  },
  {
    id: 'achievements', // 나의 업적
    col: 2,
    row: 6,
    width: 1,
    height: 3,
    translateX: 0,
    translateY: 0,
  },
  {
    id: 'myPosts', // 내 포스트
    col: 3,
    row: 4,
    width: 1,
    height: 3,
    translateX: 0,
    translateY: 0,
  },
  {
    id: 'monthlyTop', // 이번 달 TOPS
    col: 3,
    row: 7,
    width: 1,
    height: 2, // 이미지에 맞게 높이 수정
    translateX: 0,
    translateY: 0,
  },
  {
    id: 'myBadges', // 내 뱃지
    col: 1,
    row: 9,
    width: 2,
    height: 1,
    translateX: 0,
    translateY: 0,
  },
];
export const WIDGET_HEIGHT_MAP = {
  1: 263,
  2: 512,
  3: 798,
};
