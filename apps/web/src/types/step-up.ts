export type StepUp = {
  id: number;
  name: string;
  totalProblemCnt: number;
  solvedProblemCnt: number;
  status: 'prev' | 'current' | 'next';
  tags: string[];
  isBookmarked: boolean;
};

export const dummyStepData: StepUp[] = [
  {
    id: 1,
    name: '변수와 자료형',
    status: 'prev',
    totalProblemCnt: 20,
    solvedProblemCnt: 20,
    tags: ['기초', '변수', '자료형'],
    isBookmarked: true,
  },
  {
    id: 2,
    name: '조건문 (if, else)',
    status: 'current',
    totalProblemCnt: 20,
    solvedProblemCnt: 12,
    tags: ['흐름제어', 'if', 'boolean'],
    isBookmarked: true,
  },
  {
    id: 3,
    name: '반복문 (for, while)',
    status: 'next',
    totalProblemCnt: 15,
    solvedProblemCnt: 0,
    tags: ['반복', 'for', 'while'],
    isBookmarked: false,
  },
  {
    id: 4,
    name: '함수 선언과 호출',
    status: 'next',
    totalProblemCnt: 25,
    solvedProblemCnt: 0,
    tags: ['함수', '재사용', '파라미터'],
    isBookmarked: false,
  },
  {
    id: 5,
    name: '객체와 클래스 기초',
    status: 'next',
    totalProblemCnt: 30,
    solvedProblemCnt: 0,
    tags: ['객체지향', '클래스', 'OOP'],
    isBookmarked: false,
  },
  {
    id: 6,
    name: '상속과 다형성',
    status: 'next',
    totalProblemCnt: 25,
    solvedProblemCnt: 0,
    tags: ['객체지향', '상속', '다형성'],
    isBookmarked: false,
  },
  {
    id: 7,
    name: '예외 처리 (try, except)',
    status: 'next',
    totalProblemCnt: 15,
    solvedProblemCnt: 0,
    tags: ['에러', '예외처리', '디버깅'],
    isBookmarked: false,
  },
  {
    id: 8,
    name: '모듈과 패키지',
    status: 'next',
    totalProblemCnt: 20,
    solvedProblemCnt: 0,
    tags: ['모듈', 'import', '코드구조'],
    isBookmarked: false,
  },
  {
    id: 9,
    name: '비동기 프로그래밍 (async/await)',
    status: 'next',
    totalProblemCnt: 30,
    solvedProblemCnt: 0,
    tags: ['비동기', 'async', '성능'],
    isBookmarked: false,
  },
  {
    id: 10,
    name: '자료구조 심화 (리스트, 딕셔너리)',
    status: 'next',
    totalProblemCnt: 25,
    solvedProblemCnt: 0,
    tags: ['자료구조', '알고리즘', '심화'],
    isBookmarked: false,
  },
];
