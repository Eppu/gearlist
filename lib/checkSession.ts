import { authOptions } from '../pages/api/auth/[...nextauth]';
import { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { Session } from 'next-auth';

export default async function checkSession(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  // Get the session from the Next.js API
  const session: Session | null = await unstable_getServerSession(
    req,
    res,
    authOptions
  );

  // TODO: Send relevant error message as response if session is invalid

  // Make sure the session is valid
  if (!session) {
    return;
  }
  // Get the user from the session
  const user = session.user;
  // Make sure the user is valid
  if (!user) {
    return;
  }
  // Get the user's ID from the session
  const userId = user.id;
  // Make sure the user's ID is valid
  if (!userId) {
    return;
  }

  return session;
}
