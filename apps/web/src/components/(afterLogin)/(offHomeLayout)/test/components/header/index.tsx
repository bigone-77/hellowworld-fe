'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Options } from 'nuqs';

import TestHeaderMileStone from './mile-stone';
import TestHeaderProgressBar from './progressbar';

import { Button, InlineSvg, Modal, PrevNextBtn } from '@repo/ui/components';

import { cn } from '@repo/ui/lib/utils';

import { TestHeaderHeight } from '@/config/layout';

import { Problem as ProblemType } from '@/types/pre-test';

interface Props {
  problems: ProblemType[];
  currentStep: number; // 현재 몇 index 단계인지 알려주는 변수
  setCurrentStep: (
    value: number | ((old: number) => number | null) | null,
    options?: Options,
  ) => Promise<URLSearchParams>;
}

export default function TestHeader({
  problems,
  currentStep,
  setCurrentStep,
}: Props) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  return (
    <header
      className={cn(
        'flex w-full items-center justify-between gap-x-6',
        `h-${TestHeaderHeight}`,
      )}
    >
      {/* 왼쪽 & 중앙 그룹 */}
      <div className='flex min-w-0 flex-1 items-center gap-x-4'>
        <TestHeaderMileStone />
        <PrevNextBtn
          className='w-full'
          iconSize={20}
          onPrevClick={() => {}}
          onNextClick={() => {}}
          prevBtnProps={{ disabled: currentStep <= 1 }}
        >
          <TestHeaderProgressBar
            problems={problems}
            currentStep={currentStep}
            onStepClick={(step) => setCurrentStep(step)}
          />
        </PrevNextBtn>
      </div>

      {/* 오른쪽 그룹 */}
      <div className='flex items-center gap-x-[9.5]'>
        <div className='text-title-s text-secondary-box-on flex items-center gap-x-[6]'>
          <p className='bg-secondary-box rounded-S inline-flex items-center justify-center px-5 py-[7.5]'>
            250
          </p>
          <span>pt</span>
        </div>
        <Button
          variant='outline_m'
          className='rounded-S size-11'
          onClick={() => setShowModal(true)}
        >
          <InlineSvg alias='close' />
        </Button>
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content>
          <Modal.Header>
            <Modal.Title>
              <div className='flex-center-col'>
                <div className='flex-center size-[200]'>
                  <InlineSvg alias='error' width={80} height={80} />
                </div>
                <span>사전 테스트 나가기</span>
              </div>
            </Modal.Title>
            <Modal.Description>
              지금 나가면 진행중인 내용은 저장되지 않아요
            </Modal.Description>
          </Modal.Header>
          <Modal.Footer>
            <div className='flex-center-col gap-y-3'>
              <Button
                variant='danger'
                className='px-12'
                onClick={() => router.replace('/home')}
              >
                나가기
              </Button>
              <Button variant='text' onClick={() => setShowModal(false)}>
                취소
              </Button>
            </div>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </header>
  );
}
