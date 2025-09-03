import { customFetch } from '@/lib/customFetch';

import {
  SendCodeResponse,
  SendCodePayload,
  VerifyCodePayload,
  HandleMemberJoinPayload,
  HandleMemberJoinResponse,
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

export const handleMemberJoin = async (reqBody: HandleMemberJoinPayload) => {
  const responseData = await customFetch<HandleMemberJoinResponse>(
    '/api/auth/member-join',
    {
      method: 'POST',
      body: JSON.stringify(reqBody),
    },
  );

  return responseData;
};
