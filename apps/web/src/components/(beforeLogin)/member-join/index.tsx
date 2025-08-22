'use client';

import { useState } from 'react';

import FormWrapper from '@/components/(beforeLogin)/FormWrapper';

import FirstStep from '@/components/(beforeLogin)/member-join/first-step';
import SecondStep from '@/components/(beforeLogin)/member-join/second-step';
import ThirdStep from '@/components/(beforeLogin)/member-join/third-step';

export default function MemberJoin() {
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
            goNextStep={() => setStep(2)}
          />
        )}
        {step === 2 && <SecondStep joinId={joinDto.id} />}
        {step === 3 && <ThirdStep />}
      </div>
    </FormWrapper>
  );
}
