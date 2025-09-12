import { http, HttpResponse } from 'msw';

import {
  HandleMemberJoinPayload,
  SendCodePayload,
  VerifyCodePayload,
} from '@/schemas';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const handlers = [
  http.post(`${baseUrl}/api/auth/login`, async ({ request }) => {
    const { email, password } = (await request.json()) as {
      email: string;
      password: string;
    };

    if (email && password) {
      const accessToken = 'mock-jwt-access-token-from-msw-12345';
      const refreshToken = 'mock-jwt-refresh-token-from-msw-67890';

      const responseBody = {
        code: 200,
        message: '로그인이 성공적으로 완료되었습니다.',
        data: {
          accessToken,
          refreshToken,
        },
      };

      return HttpResponse.json(responseBody, {
        status: 200,
        headers: {
          'Set-Cookie': `refreshToken=${refreshToken}; HttpOnly; Path=/; Max-Age=604800; SameSite=Strict`,
        },
      });
    }
  }),

  http.post(`${baseUrl}/api/auth/send-code`, async ({ request }) => {
    const { email } = (await request.json()) as SendCodePayload;

    console.log(`[성공] 인증번호 발송 API 요청 이메일: ${email}`);
    const authCode = Math.floor(100000 + Math.random() * 900000).toString();

    return HttpResponse.json({
      code: 200,
      data: {
        authCode,
      },
      message: `${email}으로 인증번호가 발송되었습니다.`,
    });
  }),

  http.post(`${baseUrl}/api/auth/verify-code`, async ({ request }) => {
    const { tempCode } = (await request.json()) as VerifyCodePayload;

    if (tempCode) {
      return HttpResponse.json({
        code: 200,
        message: '유효한 인증번호입니다.',
      });
    }
  }),

  http.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/member-join`,
    async ({ request }) => {
      const { email, password } =
        (await request.json()) as HandleMemberJoinPayload;

      if (email && password) {
        return HttpResponse.json({
          code: 200,
          message: '회원가입에 성공했습니다.',
        });
      }
    },
  ),
];
