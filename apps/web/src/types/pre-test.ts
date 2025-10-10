export type ProblemFormat = 'multiple-choice' | 'subjective';

export type Option = {
  id: string;
  text: string;
};

export type ProblemStatus = 'solved' | 'unsolved' | 'passed';

export type Problem = {
  id: string;
  title: string;
  point: number;
  difficulty: '초급' | '중급' | '고급';
  status: ProblemStatus;
  description: string;
} & (
  | {
      format: 'multiple-choice';
      options: Option[];
    }
  | {
      format: 'subjective';
      options?: never;
    }
);

export const dummyProblems: Problem[] = [
  {
    id: 'prob-001',
    title: '문자열 뒤집기',
    point: 20,
    difficulty: '초급',
    status: 'unsolved',
    description:
      '주어진 문자열을 거꾸로 뒤집는 함수를 작성하세요.\n 예: "hello" -> "olleh"',
    format: 'multiple-choice',
    options: [
      { id: 'opt-1', text: 'string x = ‘hello’' },
      { id: 'opt-2', text: 'x = ‘hello1' },
      { id: 'opt-3', text: 'x = ‘hello2' },
      { id: 'opt-4', text: 'x = ‘hello3' },
    ],
  },
  {
    id: 'prob-002',
    title: '두 수의 합',
    point: 20,
    difficulty: '초급',
    status: 'unsolved',
    description:
      '배열과 목표값이 주어졌을 때, 두 수의 합이 목표값과 같은 두 숫자의 인덱스를 찾으세요.',
    format: 'subjective',
  },
  {
    id: 'prob-003',
    title: '가장 긴 팰린드롬 부분 문자열',
    point: 20,
    difficulty: '초급',
    status: 'unsolved',
    description:
      '주어진 문자열에서 가장 긴 팰린드롬(앞뒤가 같은 단어) 부분 문자열을 찾으세요.',
    format: 'subjective',
  },
  {
    id: 'prob-004',
    title: '피보나치 수열',
    point: 20,
    difficulty: '중급',
    status: 'unsolved',
    description: 'n번째 피보나치 수를 반환하는 함수를 효율적으로 작성하세요.',
    format: 'subjective',
  },
  {
    id: 'prob-005',
    title: '배열에서 중복된 요소 찾기',
    point: 20,
    difficulty: '중급',
    status: 'unsolved',
    description:
      '1부터 n까지의 숫자가 포함된 길이 n+1의 배열에서 중복된 숫자를 찾으세요.',
    format: 'subjective',
  },
  {
    id: 'prob-006',
    title: '괄호 짝 맞추기',
    point: 20,
    difficulty: '고급',
    status: 'unsolved',
    description:
      '주어진 문자열의 괄호 쌍이 올바르게 짝지어졌는지 확인하세요. 예: "()[]{}" -> true',
    format: 'subjective',
  },
];
