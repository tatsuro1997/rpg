'use server';

import { z } from 'zod';
import { experienceSchema } from '@/schemas';
import { ActionsResult } from '@/types/ActionResult';
import { db } from '@/lib/db';
import { handleError } from '@/lib/utils';

export const createExperience = async (
  values: z.infer<typeof experienceSchema>
): Promise<ActionsResult> => {
  const validatedFields = experienceSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      isSuccess: false,
      error: {
        message: validatedFields.error.message,
      },
    };
  }

  const { userId, date, title, point } = validatedFields.data;

  try {
    await db.experience.create({
      data: {
        userId: parseInt(userId),
        date,
        title,
        point: parseInt(point),
      },
    });

    return {
      isSuccess: true,
      message: '経験値登録に成功しました。',
    };
  } catch (error) {
    handleError(error);

    return {
      isSuccess: false,
      error: {
        message: '経験値登録に失敗しました。',
      },
    };
  }
};

export const updateExperience = async (
  id: number,
  values: z.infer<typeof experienceSchema>
): Promise<ActionsResult> => {
  const validatedFields = experienceSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      isSuccess: false,
      error: {
        message: validatedFields.error.message,
      },
    };
  }

  const { userId, date, title, point } = validatedFields.data;

  try {
    await db.experience.update({
      where: { id },
      data: {
        userId: parseInt(userId),
        date,
        title,
        point: parseInt(point),
      },
    });

    return {
      isSuccess: true,
      message: '経験値更新に成功しました。',
    };
  } catch (error) {
    handleError(error);

    return {
      isSuccess: false,
      error: {
        message: '経験値更新に失敗しました。',
      },
    };
  }
};
