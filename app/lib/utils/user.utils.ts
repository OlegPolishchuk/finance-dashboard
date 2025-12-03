'use server';

import prisma from '@/app/lib/utils/prisma';

export const getUserById = async (userId: string) => {
  return prisma.user.findUnique({
    where: { id: userId },
    omit: { password: true },
  });
};
