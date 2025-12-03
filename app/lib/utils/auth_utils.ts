import { compare } from 'bcrypt';
import { AuthOptions, getServerSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import prisma from '@/app/lib/utils/prisma';

const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        const user = await prisma.user.findUnique({
          where: { email: credentials?.email },
        });

        if (!user) return null;

        const isPasswordCorrect = await compare(credentials?.password ?? '', user.password);

        if (!isPasswordCorrect) return null;

        return { id: user.id, email: user.email };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      // при логине user есть — сохраним id в токен
      if (user) {
        token.id = (user as any).id;
      }
      return token;
    },
    async session({ session, token }) {
      // здесь уже только token, поэтому достаём id из него
      if (session.user) {
        (session.user as any).id = token.id as string;
      }
      return session;
    },
  },
};

const getSession = () => getServerSession(authOptions);

export { authOptions, getSession };
