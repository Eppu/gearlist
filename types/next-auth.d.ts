import NextAuth from 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    userId: string;
    // Authorization header used with supabase-js for RLS.
    supabaseAccessToken: string;
    user: {
      id: number;
    } & DefaultSession['user'];
  }
}
