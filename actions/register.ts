'use server';

import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { registerSchema } from '@/schemas';
import { ActionsResult } from '@/types/ActionResult';
import { getUserByEmail } from '@/db/user';
import { db } from '@/lib/db';
import { handleError } from '@/lib/utils';

export const register = async (
  values: z.infer<typeof registerSchema>
): Promise<ActionsResult> => {
  const validatedFields = registerSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      isSuccess: false,
      error: {
        message: validatedFields.error.message,
      },
    };
  }

  const { email, password, nickname } = validatedFields.data;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return {
        isSuccess: false,
        error: {
          message: 'このメールアドレスは既に登録されています。',
        },
      };
    }

    await db.user.create({
      data: {
        nickname: nickname,
        email,
        password: hashedPassword,
      },
    });

    return {
      isSuccess: true,
      message: 'サインアップに成功しました。',
    };
  } catch (error) {
    handleError(error);

    return {
      isSuccess: false,
      error: {
        message: 'サインアップに失敗しました。',
      },
    };
  }
};
