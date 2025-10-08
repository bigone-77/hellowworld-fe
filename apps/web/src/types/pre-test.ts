/**
 * 문제의 상태를 나타내는 타입
 * 'solved': 해결 완료
 * 'unsolved': 미해결
 * 'passed': 패스함
 */
export type ProblemStatus = 'solved' | 'unsolved' | 'passed';

/**
 * 개별 문제 데이터의 타입을 정의합니다.
 */
export type Problem = {
  id: string;
  title: string;
  point: number;
  status: ProblemStatus;
  description: string;
};

export const dummyProblems = [
  {
    id: 'prob-001',
    title: '문자열 뒤집기',
    point: 3,
    status: 'solved',
    description:
      '주어진 문자열을 거꾸로 뒤집는 함수를 작성하세요. 예: "hello" -> "olleh"',
  },
  {
    id: 'prob-002',
    title: '두 수의 합',
    point: 5,
    status: 'solved',
    description:
      '배열과 목표값이 주어졌을 때, 두 수의 합이 목표값과 같은 두 숫자의 인덱스를 찾으세요.',
  },
  {
    id: 'prob-003',
    title: '가장 긴 팰린드롬 부분 문자열',
    point: 10,
    status: 'passed',
    description:
      '주어진 문자열에서 가장 긴 팰린드롬(앞뒤가 같은 단어) 부분 문자열을 찾으세요.',
  },
  {
    id: 'prob-004',
    title: '피보나치 수열',
    point: 5,
    status: 'unsolved',
    description: 'n번째 피보나치 수를 반환하는 함수를 효율적으로 작성하세요.',
  },
  {
    id: 'prob-005',
    title: '배열에서 중복된 요소 찾기',
    point: 3,
    status: 'unsolved',
    description:
      '1부터 n까지의 숫자가 포함된 길이 n+1의 배열에서 중복된 숫자를 찾으세요.',
  },
  {
    id: 'prob-006',
    title: '괄호 짝 맞추기',
    point: 5,
    status: 'passed',
    description:
      '주어진 문자열의 괄호 쌍이 올바르게 짝지어졌는지 확인하세요. 예: "()[]{}" -> true',
  },
];
