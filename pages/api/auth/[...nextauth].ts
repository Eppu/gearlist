import NextAuth from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import type { NextAuthOptions } from 'next-auth';
import { prisma } from '../../../lib/prisma';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    }),
  ],
  session: {},

  callbacks: {
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      if (!session.user.id) {
        session.userId = user.id;
        session.user = user;
      }

      return session;
    },
  },
  debug: true,
};

export default NextAuth(authOptions);
