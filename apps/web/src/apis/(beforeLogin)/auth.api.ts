import { customFetch } from '@/lib/customFetch';

import { emailFormResponse, EmailFormValues as requestType } from '@/schemas';

export const sendVerificationCode = async (email: requestType) => {
  const responseData = await customFetch<emailFormResponse>(
    '/api/auth/send-code',
    {
      method: 'POST',
      body: JSON.stringify(email),
    },
  );

  return responseData;
};
