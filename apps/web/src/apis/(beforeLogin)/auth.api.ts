import { customFetch } from '@/lib/customFetch';

import {
  SendCodeResponse,
  SendCodePayload,
  VerifyCodePayload,
} from '@/schemas';

export const sendVerificationCode = async (email: SendCodePayload) => {
  const responseData = await customFetch<SendCodeResponse>(
    '/api/auth/send-code',
    {
      method: 'POST',
      body: JSON.stringify(email),
    },
  );

  return responseData;
};

export const verifySendCode = async (tempCode: VerifyCodePayload) => {
  const responseData = await customFetch<string>('/api/auth/verify-code', {
    method: 'POST',
    body: JSON.stringify(tempCode),
  });

  return responseData;
};
