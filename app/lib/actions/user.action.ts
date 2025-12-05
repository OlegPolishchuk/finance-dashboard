'use server';

import { getSession } from '@/app/lib/utils/auth_utils';
import prisma from '@/app/lib/utils/prisma';

export const getUserById = async (userId: string) => {
  return prisma.user.findUnique({
    where: { id: userId },
    omit: { password: true },
  });
};

export const getUserSession = async () => {
  const session = await getSession();

  if (!session || !session.user?.id) {
    throw new Error('Not authenticated');
  }

  const user = await getUserById(session.user.id);
  return user;
};
