import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { verifyCodeFormSchema, VerifyCodeFormValues } from '@/schemas';

import { Button, TextField } from '@repo/ui/components';

interface Props {
  joinId: string;
  tempCode: string;
}

export default function SecondStep({ joinId, tempCode }: Props) {
  console.log(joinId);
  const {
    register,
    trigger,
    getValues,
    setError,
    formState: { errors, isValid },
  } = useForm<VerifyCodeFormValues>({
    resolver: zodResolver(verifyCodeFormSchema),
    mode: 'onChange',
    defaultValues: {
      tempCode: '',
    },
  });

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
        <Button variant='outline_s' className='w-fit place-items-start'>
          인증번호 다시 받기
        </Button>
      </div>
      <Button className='w-full'>다음으로</Button>
    </section>
  );
}
