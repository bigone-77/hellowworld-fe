// schemas/auth.ts (수정 후)
import { z } from 'zod';

export const emailSchema = z
  .string()
  .min(1, '이메일을 입력해주세요.')
  .email('올바른 이메일 형식이 아닙니다.');

export const passwordSchema = z.string();

export const tempCodeSchema = z
  .string()
  .length(6, '인증번호는 6자리여야 합니다.');

// (beforeLogin)/member-join firstStep [이메일 인증 요청]
export const sendCodePayloadSchema = z.object({
  email: emailSchema,
});
export const sendCodeResponseSchema = z.object({
  authCode: z.string(),
});

export type SendCodePayload = z.infer<typeof sendCodePayloadSchema>;
export type SendCodeResponse = z.infer<typeof sendCodeResponseSchema>;

// (beforeLogin)/member-join secondStep [이메일 인증번호 확인]
export const verifyCodeFormSchema = z.object({
  tempCode: tempCodeSchema,
});

export type VerifyCodePayload = z.infer<typeof verifyCodeFormSchema>;

// (beforeLogin)/member-join thirdStep [비밀번호, 비밀번호 확인 -> 최종 회원가입]
export const joinMemberPayloadSchema = z.object({
  password: passwordSchema,
  passwordConfirm: z.string(),
});

export type JoinMemberPayload = z.infer<typeof joinMemberPayloadSchema>;

export const joinMemberFormSchema = z
  .object({
    password: z.string(),
    passwordConfirm: z.string().min(1, '비밀번호를 다시 입력해주세요.'),
  })
  .superRefine(({ password, passwordConfirm }, ctx) => {
    if (password !== passwordConfirm) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: '비밀번호가 일치하지 않습니다.',
        path: ['passwordConfirm'],
      });
    }
  });

export const handleJoinMemberSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const handleMemberJoinResponseSchema = z.object({
  accessToken: z.string().min(1, 'Access token cannot be empty.'),
  refreshToken: z.string().min(1, 'Refresh token cannot be empty.'),
});

export type HandleMemberJoinPayload = z.infer<typeof handleJoinMemberSchema>;

export type HandleMemberJoinResponse = z.infer<
  typeof handleMemberJoinResponseSchema
>;
