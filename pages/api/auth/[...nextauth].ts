import NextAuth from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import type { NextAuthOptions } from 'next-auth';
import { prisma } from '../../../lib/prisma';
import jwt from 'jsonwebtoken';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async session({ session, token, user }) {
      const supabaseSigningSecret = process.env.SUPABASE_JWT_SECRET;

      if (supabaseSigningSecret) {
        const payload = {
          // sub: 'usr' + user.id,
          email: user.email,
          aud: 'authenticated',
          role: 'authenticated',
          exp: Math.floor(new Date(session.expires).getTime() / 1000),
        };
        session.supabaseAccessToken = jwt.sign(payload, supabaseSigningSecret);
      }

      // Send properties to the client, like an access_token from a provider.
      if (!session.user.id) {
        session.userId = user.id;
        session.user = user;
      }
      return session;
    },
  },
  pages: {
    newUser: '/onboarding',
  },
  // debug: true,
};

export default NextAuth(authOptions);
