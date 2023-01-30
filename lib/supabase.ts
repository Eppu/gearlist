import { createClient } from '@supabase/supabase-js';
import { unstable_getServerSession } from 'next-auth/next';
import { Session } from 'next-auth';
import { NextApiRequest, NextApiResponse } from 'next';
import { authOptions } from '../pages/api/auth/[...nextauth]';

// TODO: Figure out how to get JWT from session and pass it to supabase client as header

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    global: {
      headers: {
        // Authorization: `Bearer ${session.supabaseAccessToken}`,
      },
    },
  }
);
