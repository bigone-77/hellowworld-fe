import { z } from 'zod';

// --- 기본(Base) 스키마 ---
export const emailSchema = z
  .string()
  .min(1, '이메일을 입력해주세요.')
  .email('올바른 이메일 형식이 아닙니다.');

// ... passwordSchema 등 ...
export const passwordSchema = z
  .string()
  .min(8, '최소 8자리 이상 입력해주세요.');

// --- 객체 스키마 ---
export const emailFormSchema = z.object({
  email: emailSchema,
});

export const memberJoinSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, '비밀번호를 입력해주세요.'),
});

// --- 타입 추론 ---
export type EmailFormValues = z.infer<typeof emailFormSchema>; // 회원가입 첫 번째 스텝

export type SignUpFormValues = z.infer<typeof memberJoinSchema>;
export type LoginFormValues = z.infer<typeof loginSchema>;
