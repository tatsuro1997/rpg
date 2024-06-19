import bcrypt from 'bcryptjs';
import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { logInSchema } from './schemas';
import { getUserByEmail } from './db/user';

export default {
  providers: [
    // TODO: Google,Github認証を追加する

    Credentials({
      async authorize(credentials) {
        const validatedFields = logInSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) {
            return {
              ...user,
              id: user.id.toString()
            };
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub ?? '';
      return session;
    },
  },
} satisfies NextAuthConfig;
