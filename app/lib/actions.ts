'use server';

import { redirect } from 'next/navigation';
import { sql } from '@vercel/postgres';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';
import { auth, signIn, signOut } from '../../auth';
import { UserSession } from '@/types/UserSession';

const CreateUser = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  birthday: z.string(),
});

export const getSession = async (): Promise<UserSession> => {
  const session = await auth();
  let userSession: UserSession = {
    expired: '',
    userName: '',
    email: '',
  };

  if (session && session.user) {
    userSession.expired = session.expires;
    if (session.user.name) userSession.userName = session.user.name;
    if (session.user.email) userSession.email = session.user.email;

    return userSession;
  } else {
    await signOut();
  }
  return userSession;
};

export async function authenticate(prevState: string | undefined, formData: FormData) {
  try {
    await signIn('credentials', Object.fromEntries(formData));
  } catch (error) {
    if ((error as Error).message.includes('CredentialsLogin')) {
      return 'CredentialLogin';
    }
    throw error;
  }
}

export async function createAccount(prevState: string | undefined, formData: FormData) {
  const validatedFields = CreateUser.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    birthday: formData.get('birthday'),
  });

  if (!validatedFields.success) {
    console.error(validatedFields.error);
    return 'FailedRegister: Validation Failed';
  }

  const id = uuidv4();
  const { name, email, password, birthday } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await sql`
      INSERT INTO wm_users (id, name, email, password, birthday)
      VALUES (${id}, ${name}, ${email}, ${hashedPassword}, ${birthday})`;
  } catch (error) {
    console.error(error);
    return 'FailedRegister: Insert Failed';
  }

  redirect('/top');
}

export async function logout() {
  await signOut();
  redirect('/');
}
