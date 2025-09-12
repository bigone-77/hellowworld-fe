'use client';

import { useState } from 'react';

import FormWrapper from '@/components/(beforeLogin)/FormWrapper';

import FirstStep from '@/components/(beforeLogin)/member-join/first-step';
import SecondStep from '@/components/(beforeLogin)/member-join/second-step';
import ThirdStep from '@/components/(beforeLogin)/member-join/third-step';

export default function MemberJoin() {
  // 임시 이메일 인증 코드 -> 추후 인증 메일 로직 완료될 시 파기
  const [tempCode, setTempCode] = useState('');

  const [step, setStep] = useState(1);

  const [joinDto, setJoinDto] = useState({
    id: '',
    pw: '',
  });

  return (
    <FormWrapper title='회원가입'>
      <div className='w-full px-6 pt-[98]'>
        {step === 1 && (
          <FirstStep
            setJoinId={(id) => setJoinDto((prev) => ({ ...prev, id }))}
            setTempCode={setTempCode}
            goNextStep={() => setStep(2)}
          />
        )}
        {step === 2 && (
          <SecondStep
            joinId={joinDto.id}
            tempCode={tempCode}
            goNextStep={() => setStep(3)}
          />
        )}
        {step === 3 && <ThirdStep joinId={joinDto.id} />}
      </div>
    </FormWrapper>
  );
}
