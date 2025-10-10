'use client';

import Image from 'next/image';
import Link from 'next/link';

import FormWrapper from '@/components/(beforeLogin)/FormWrapper';
import LoginForm from '@/components/(beforeLogin)/login/form';

import { Button } from '@repo/ui/components';

export default function Login() {
  return (
    <FormWrapper title={`게임처럼 쉽게, \n 코딩을 배워보세요.`}>
      <div className='w-full px-6 pt-[55]'>
        <LoginForm />
        <div className='h-6' />

        <div className='flex-center text-body-l2 text-text1 gap-x-9'>
          <Link href='/find-pw'>비밀번호 찾기</Link>
          <Link href='/member-join'>회원가입</Link>
        </div>

        <p className="text-body-s1 text-text1 before:bg-text-box after:bg-text-box flex-center w-full py-6 before:mr-3 before:h-px before:flex-1 before:content-[''] after:ml-3 after:h-px after:flex-1 after:content-['']">
          또는
        </p>

        <Link
          href={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/login/oauth2/code/google`}
        >
          <Button
            variant='outline_s'
            className='border-text-box-var w-full border-[0.5] py-[11] text-black'
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_CLOUDINARY_URL}/v1755539308/svg/google.svg`}
              alt='구글 로그인'
              width={20}
              height={20}
            />
            구글로 로그인
          </Button>
        </Link>

        <p className='text-body-s0 text-text1 pt-[59] text-center'>
          <span>회원가입시 </span>
          <span className='underline'>개인정보 수집 이용 동의</span>
          <span> 및</span>
          <br />
          <span className='underline'>서비스 이용약관</span>
          <span>에 동의한 것으로 간주합니다</span>
        </p>
      </div>
    </FormWrapper>
  );
}
