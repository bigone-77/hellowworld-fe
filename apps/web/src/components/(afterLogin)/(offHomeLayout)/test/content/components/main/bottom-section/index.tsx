'use client';

import { useState } from 'react';

import { Button, InlineSvg, Modal } from '@repo/ui/components';

interface Props {
  flag: 'Y' | 'N' | 'H' | 'V' | '';
  setFlag: React.Dispatch<React.SetStateAction<'Y' | 'N' | 'H' | 'V' | ''>>;
  isSubmit: boolean;
  setIsSubmit: React.Dispatch<React.SetStateAction<boolean>>;
}

const HintOrViewToggleBtn = ({
  isBeforeSubmit,
  flag,
  setFlag,
}: {
  isBeforeSubmit: boolean;
  flag: 'Y' | 'N' | 'H' | 'V' | '';
  setFlag: React.Dispatch<React.SetStateAction<'Y' | 'N' | 'H' | 'V' | ''>>;
}) => {
  const [isHint, setIsHint] = useState(true);
  if (!isBeforeSubmit) {
    return isHint ? (
      <Button
        variant='secondary'
        className='px-6'
        onClick={() => {
          setIsHint(false);
          setFlag('H');
        }}
      >
        <InlineSvg alias='hint' />
        힌트
      </Button>
    ) : (
      <Button
        variant='secondary'
        className='px-6'
        onClick={() => {
          setIsHint(true);
          setFlag('V');
        }}
      >
        <InlineSvg alias='pwOn' />
        문제보기
      </Button>
    );
  }
};

export default function TestContentBottomSection({
  flag,
  setFlag,
  isSubmit,
  setIsSubmit,
}: Props) {
  const [showPassModal, setShowPassModal] = useState(false);

  const isBeforeSubmit = !isSubmit;

  return (
    <div className='flex w-full items-center justify-between'>
      <div>
        {isBeforeSubmit && (
          <Button
            variant='secondary'
            className='px-6'
            onClick={() => setShowPassModal(true)}
          >
            <InlineSvg alias='play' />
            넘어가기
          </Button>
        )}
      </div>

      <div className='flex-center gap-x-6'>
        <HintOrViewToggleBtn
          isBeforeSubmit={isBeforeSubmit}
          flag={flag}
          setFlag={setFlag}
        />

        <Button variant='primary' onClick={() => setIsSubmit(!isSubmit)}>
          {isBeforeSubmit ? '정답내기' : '다음으로'}
        </Button>
      </div>

      <Modal isOpen={showPassModal} onClose={() => setShowPassModal(false)}>
        <Modal.Content>
          <Modal.Header>
            <Modal.Title>넘어가기</Modal.Title>
            <Modal.Description>
              넘어가면 사전테스트 결과에 반영 돼요
            </Modal.Description>
          </Modal.Header>
          <Modal.Footer>
            <div className='flex-center-col gap-y-3'>
              <Button
                // 임시 onClick
                onClick={() => setShowPassModal(false)}
              >
                나가기
              </Button>
              <Button variant='text' onClick={() => setShowPassModal(false)}>
                취소
              </Button>
            </div>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </div>
  );
}
