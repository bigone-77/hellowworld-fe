'use client';

import { Button, Checkbox, TextField } from '@repo/ui/components';

export default function LoginForm() {
  return (
    <form>
      <div className='flex-center-col gap-y-5 pb-[31]'>
        <TextField label='아이디' placeholder='Helloworld@Hello.com' />
        <TextField
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

      <Button className='w-full'>로그인</Button>
    </form>
  );
}
