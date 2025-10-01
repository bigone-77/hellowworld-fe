'use client';

// 임시 스텝업 타입

import { Button, InlineSvg, Label, ToggleButton } from '../../../components';
import { cn } from '../../../lib/utils';

interface StepInfo {
  /** 각 스텝을 식별하는 고유 ID */
  id: number;
  /** 스텝의 이름 (예: '왕초보 Python 입문') */
  name: string;
  /** 해당 스텝의 전체 문제 수 */
  totalProblemCnt: number;
  /** 현재까지 푼 문제 수 */
  solvedProblemCnt: number;
  /** 스텝에 연관된 태그 목록 */
  tags: string[];
  /** 북마크 여부 */
  isBookmarked: boolean;
}

interface Props {
  steps: StepInfo[];
}

function StepItem({ step }: { step: StepInfo }) {
  const progressText = `(${step.solvedProblemCnt}/${step.totalProblemCnt})`;

  // const activeStep = step.solvedProblemCnt > 0;

  return (
    <div>
      <p className='flex items-center gap-x-2'>
        <span className='text-label-l2 text-primary-line'>STEP{step.id}</span>
        <span className='text-body-l2 text-text2'>
          {step.name} {progressText}
        </span>
      </p>

      <div className='h-[10]' />

      <div className='grid grid-cols-[2fr_1fr] items-start gap-x-4'>
        <div className='flex items-center gap-x-1'>
          {step.tags.map((tag) => (
            <Button key={tag} variant='outline_s'>
              #{tag}
            </Button>
          ))}
        </div>

        <div className='flex h-full items-center justify-end'>
          <div className='flex h-11 items-stretch gap-x-2'>
            <Button variant='primary_icon' className='size-11'>
              <InlineSvg alias='play' />
            </Button>
            <ToggleButton
              variant='primary_icon'
              isOn={false}
              alias='star'
              className='size-11'
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function StepUpLayout({ steps }: Props) {
  return (
    <aside className='rounded-L shadow-modal-l flex h-full min-h-0 flex-col bg-white p-6'>
      <h2 className='text-headline-s mb-4 shrink-0 text-black'>스텝 선택</h2>

      <div className='flex-1 overflow-y-auto'>
        {steps.map((step, index) => (
          <div
            className={cn(
              'border-text-box-var border-b pb-3',
              index > 0 && 'pt-6',
            )}
            key={step.id}
          >
            <StepItem step={step} />
          </div>
        ))}
      </div>
    </aside>
  );
}

export const dummyStepData: StepInfo[] = [
  // 1번 스텝: 모든 문제를 완료하고 북마크함
  {
    id: 1,
    name: '변수와 자료형',
    totalProblemCnt: 20,
    solvedProblemCnt: 20,
    tags: ['기초', '변수', '자료형'],
    isBookmarked: true,
  },
  // 2번 스텝: 절반 이상 진행했으며 북마크함
  {
    id: 2,
    name: '조건문 (if, else)',
    totalProblemCnt: 20,
    solvedProblemCnt: 12,
    tags: ['흐름제어', 'if', 'boolean'],
    isBookmarked: true,
  },
  // 3번 스텝: 조금 진행함
  {
    id: 3,
    name: '반복문 (for, while)',
    totalProblemCnt: 15,
    solvedProblemCnt: 0,
    tags: ['반복', 'for', 'while'], // '#' 제거됨
    isBookmarked: false,
  },
  {
    id: 4,
    name: '함수 선언과 호출',
    totalProblemCnt: 25,
    solvedProblemCnt: 0,
    tags: ['함수', '재사용', '파라미터'], // '#' 제거됨
    isBookmarked: false,
  },
  {
    id: 5,
    name: '객체와 클래스 기초',
    totalProblemCnt: 30,
    solvedProblemCnt: 0,
    tags: ['객체지향', '클래스', 'OOP'], // '#' 제거됨
    isBookmarked: false,
  },
  {
    id: 6,
    name: '상속과 다형성',
    totalProblemCnt: 25,
    solvedProblemCnt: 0,
    tags: ['객체지향', '상속', '다형성'], // '#' 제거됨
    isBookmarked: false,
  },
  {
    id: 7,
    name: '예외 처리 (try, except)',
    totalProblemCnt: 15,
    solvedProblemCnt: 0,
    tags: ['에러', '예외처리', '디버깅'], // '#' 제거됨
    isBookmarked: false,
  },
  {
    id: 8,
    name: '모듈과 패키지',
    totalProblemCnt: 20,
    solvedProblemCnt: 0,
    tags: ['모듈', 'import', '코드구조'], // '#' 제거됨
    isBookmarked: false,
  },
  {
    id: 9,
    name: '비동기 프로그래밍 (async/await)',
    totalProblemCnt: 30,
    solvedProblemCnt: 0,
    tags: ['비동기', 'async', '성능'], // '#' 제거됨
    isBookmarked: false,
  },
  {
    id: 10,
    name: '자료구조 심화 (리스트, 딕셔너리)',
    totalProblemCnt: 25,
    solvedProblemCnt: 0,
    tags: ['자료구조', '알고리즘', '심화'], // '#' 제거됨
    isBookmarked: false,
  },
];
