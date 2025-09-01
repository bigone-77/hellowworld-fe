'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { verifyCodeFormSchema, VerifyCodePayload } from '@/schemas';

import { Button, Snackbar, TextField } from '@repo/ui/components';
import { useMemberJoinQueries } from '@/hooks';

interface Props {
  joinId: string;
  tempCode: string;
  goNextStep: () => void;
}

export default function SecondStep({ joinId, tempCode, goNextStep }: Props) {
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const { mutate: verifyMutate } =
    useMemberJoinQueries().memberJoinStepTwoMutate;

  const {
    register,
    trigger,
    getValues,
    formState: { errors, isValid },
  } = useForm<VerifyCodePayload>({
    resolver: zodResolver(verifyCodeFormSchema),
    mode: 'onChange',
    defaultValues: {
      tempCode: '',
    },
  });

  const btnDisabled = !isValid;

  const handleNextStep = async () => {
    const isFormValid = await trigger();

    if (isFormValid) {
      verifyMutate(
        { tempCode: getValues('tempCode') },
        {
          onSuccess: goNextStep,
        },
      );
    }
  };

  return (
    <section>
      <div className='mb-10 flex flex-col gap-y-1'>
        <TextField
          label='아이디'
          placeholder='이메일 주소를 입력해주세요.'
          defaultValue={joinId}
          disabled={true}
        />
        <TextField
          label='인증번호'
          placeholder='인증번호를 입력해주세요.'
          error={errors.tempCode?.message}
          isTimer
          timerDuration={180}
          {...register('tempCode')}
        />
        <div className='h-4' />
        <Button
          variant='outline_s'
          className='w-fit place-items-start'
          onClick={() => setIsSnackbarOpen(true)}
        >
          인증번호 다시 받기
        </Button>
      </div>
      <Button
        className='w-full'
        disabled={btnDisabled}
        onClick={handleNextStep}
      >
        다음으로
      </Button>

      <Snackbar open={isSnackbarOpen} onOpenChange={setIsSnackbarOpen}>
        인증번호를 다시 보냈어요.
      </Snackbar>
    </section>
  );
}
