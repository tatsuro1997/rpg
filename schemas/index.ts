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
