'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { customFetch } from '@/config/customFetch';

export async function loginFn(formData: FormData) {
  const id = formData.get('id') as string;
  const password = formData.get('password') as string;

  if (!id || !password) {
    console.error('ID or password was not provided.');
    return;
  }

  try {
    const responseData = await customFetch<{
      accessToken: string;
      refreshToken: string;
    }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email: id, password }),
    });

    (await cookies()).set('accessToken', responseData.accessToken, {
      maxAge: 3600,
      httpOnly: true,
    });
  } catch (err) {
    console.error('Login API Error:', err);
    return;
  }

  redirect('/home');
}
