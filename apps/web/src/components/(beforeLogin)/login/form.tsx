'use client';

import { Button, Checkbox, TextField } from '@repo/ui/components';
import { loginFn } from '@/lib/(beforeLogin)/[server]';
import { useFormStatus } from 'react-dom';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type='submit' className='w-full' disabled={pending}>
      {pending ? '로그인 중...' : '로그인'}
    </Button>
  );
}

export default function LoginForm() {
  return (
    <form action={loginFn}>
      <div className='flex-center-col gap-y-5 pb-[31]'>
        <TextField
          id='id'
          name='id'
          label='아이디'
          placeholder='Helloworld@Hello.com'
          required
        />
        <TextField
          id='password'
          name='password'
          label='비밀번호'
          placeholder='비밀번호를 입력해주세요'
          type='password'
        />
        <div className='flex-center gap-x-11 pt-1'>
          <Checkbox onChange={() => {}}>로그인 유지</Checkbox>
          <Checkbox checked={true} onChange={() => {}}>
            아이디 저장
          </Checkbox>
        </div>
      </div>

      <SubmitButton />
    </form>
  );
}
