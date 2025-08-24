import { z } from 'zod';

export const emailSchema = z
  .string()
  .min(1, '이메일을 입력해주세요.')
  .email('올바른 이메일 형식이 아닙니다.');

export const passwordSchema = z
  .string()
  .min(8, '최소 8자리 이상 입력해주세요.');

// (beforeLogin)/member-join firstStep [이메일 인증번호 호출]
export const emailFormSchema = z.object({
  email: emailSchema,
});
export const emailFormResponseSchema = z.object({
  authCode: z.string(),
});

export type EmailFormValues = z.infer<typeof emailFormSchema>;
export type emailFormResponse = z.infer<typeof emailFormResponseSchema>;

//

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
