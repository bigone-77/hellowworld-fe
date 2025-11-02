'use client';

import { useSearchParams } from 'next/navigation';

import { useEffect } from 'react';
import { useAuthQueries } from '@/hooks';

export default function Page() {
  const searchParams = useSearchParams();

  const { mutate, isPending } = useAuthQueries().oauthGoogleLoginMutate;

  useEffect(() => {
    const code = searchParams.get('code');

    if (code) {
      mutate(code);
    }
  }, []);

  console.log('google 성공 리다이렉트 페이지');

  return <></>;
}
