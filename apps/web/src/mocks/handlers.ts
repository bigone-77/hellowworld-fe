import { EmailFormValues as SendCodeRequestBody } from '@/schemas';
import { http, HttpResponse } from 'msw';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const handlers = [
  // http.post(`${baseUrl}/api/users`, async ({ request }) => {
  //   console.log('회원가입');
  //   // return HttpResponse.text(JSON.stringify('user_exists'), {
  //   //   status: 403,
  //   // });
  //   return HttpResponse.text(JSON.stringify('ok'), {
  //     headers: {
  //       'Set-Cookie': 'connect.sid=msw-cookie;HttpOnly;Path=/',
  //     },
  //   });
  // }),

  http.post(`${baseUrl}/api/auth/send-code`, async ({ request }) => {
    const { email } = (await request.json()) as SendCodeRequestBody;

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
];
