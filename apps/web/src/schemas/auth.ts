// schemas/auth.ts (수정 후)
import { z } from 'zod';

export const emailSchema = z
  .string()
  .min(1, '이메일을 입력해주세요.')
  .email('올바른 이메일 형식이 아닙니다.');

export const passwordSchema = z
  .string()
  .min(8, '최소 8자리 이상 입력해주세요.');

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

export type VerifyCodeFormValues = z.infer<typeof verifyCodeFormSchema>;

export const memberJoinSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, '비밀번호를 입력해주세요.'),
});

export type SignUpFormValues = z.infer<typeof memberJoinSchema>;
export type LoginFormValues = z.infer<typeof loginSchema>;
