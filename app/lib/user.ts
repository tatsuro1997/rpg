'use server';

import { unstable_noStore as noStore } from 'next/cache';
import prisma from '@/lib/prisma';
import { User } from '@/types/User';

export const getUser = async (email: string): Promise<User> => {
  noStore();
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  } catch (error) {
    console.error('Database Error: Failed to get user for calendar.', error);
    throw new Error('Database Error: Failed to get user for calendar.');
  }
};
