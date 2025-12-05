import prisma from '@/app/lib/utils/prisma';

export const fetchCategories = async (userId: string) => {
  const categories = await prisma.category.findMany({
    where: {
      user_id: userId,
    },
  });

  return categories;
};
