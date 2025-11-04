'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// import { customFetch } from '@/config/customFetch';

export async function loginFn(formData: FormData) {
  const id = formData.get('id') as string;
  const password = formData.get('password') as string;

  if (!id || !password) {
    console.error('ID or password was not provided.');
    return;
  }

  const isProd = process.env.NODE_ENV === 'production';

  if (isProd) {
    // 임시 배포된 환경용 -> 추후 실제 api로 변경예정
    (await cookies()).set('accessToken', 'DUMMY_ACCESS_TOKEN_PROD', {
      maxAge: 3600,
      httpOnly: true,
      secure: true,
    });
  } else {
    // try {
    //   const responseData = await customFetch<{
    //     accessToken: string;
    //     refreshToken: string;
    //   }>('/api/auth/login', {
    //     method: 'POST',
    //     body: JSON.stringify({ email: id, password }),
    //   });

    //   (await cookies()).set('accessToken', responseData.accessToken, {
    //     maxAge: 3600,
    //     httpOnly: true,
    //   });
    // } catch (err) {
    //   console.error('Login API Error:', err);
    //   // catch 블록에서는 return만 하거나, 다른 오류 핸들링을 수행합니다.
    //   return;
    // }
    (await cookies()).set('accessToken', 'DUMMY_ACCESS_TOKEN_PROD', {
      maxAge: 3600,
      httpOnly: true,
      secure: true,
    });
  }

  // 성공 시, try...catch 블록 밖에서 redirect를 호출합니다.
  redirect('/home');
}
