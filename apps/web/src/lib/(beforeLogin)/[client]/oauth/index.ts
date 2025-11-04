import { customFetch } from '@/config/customFetch';

export const googleLogin = async (code: string) => {
  const responseData = await customFetch('/auth/google/login', {
    method: 'POST',
    body: JSON.stringify({ authorizationCode: code }),
  });

  return responseData;
};
