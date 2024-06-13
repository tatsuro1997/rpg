'use server';

import { unstable_noStore as noStore } from 'next/cache';
import { sql } from '@vercel/postgres';
import { z } from 'zod';
import { Experience } from '@/types/Experience';

const ExperienceSchema = z.object({
  userId: z.string().uuid(),
  date: z.string().refine(val => !isNaN(Date.parse(val)), { message: "Invalid date format" }),
  title: z.string(),
  point: z.number(),
});

type ExperienceData = z.infer<typeof ExperienceSchema>;


export const getExperiences = async (user_id: string): Promise<Experience> => {
  console.log("getExperiences", user_id);

  noStore();
  try {
    const user = await sql<Experience>`SELECT *
      FROM wm_experiences
      WHERE user_id=${user_id}`;
    return user.rows[0];
  } catch (error) {
    throw new Error('Database Error: Failed to get user for calender.');
  }
};

export const postExperience = async (data: ExperienceData) => {
  const validatedFields = ExperienceSchema.safeParse(data);

  if (!validatedFields.success) {
    console.error(validatedFields.error);
    return 'FailedCreateExperience: Validation Failed';
  }

  const { userId, date, title, point } = validatedFields.data;

  try {
    await sql`
      INSERT INTO wm_experiences (user_id, date, title, point)
      VALUES (${userId}, ${date}, ${title}, ${point})`;
  } catch (error) {
    console.error('Database Error: Failed to save record.', error);
    return 'FailedCreateExperience: Insert Failed';
  }
};
