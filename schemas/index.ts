import * as z from 'zod';

export const registerSchema = z.object({
  email: z.string().email({
    message: 'メールアドレスは必須です。',
  }),
  password: z.string().min(8, {
    message: 'パスワードは8文字以上です。',
  }),
  nickname: z.string().min(1, {
    message: 'ニックネームは必須です。',
  }),
});

export const logInSchema = z.object({
  email: z.string().email({
    message: 'メールアドレスは必須です。',
  }),
  password: z.string().min(8, {
    message: 'パスワードは8文字以上です。',
  }),
  code: z.optional(z.string()),
});

export const experienceSchema = z.object({
  userId: z.string(),
  date: z.string().datetime().min(1, {
    message: '日付は必須です。',
  }),
  title: z.string().min(1, {
    message: 'タイトルは必須です。',
  }),
  point: z.string().min(1, {
    message: 'ポイントは必須です。',
  })
});
