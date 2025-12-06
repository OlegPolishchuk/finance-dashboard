import { CategoryCreateInput } from '@/app/generated/prisma/models/Category';
import prisma from '@/app/lib/utils/prisma';

export const fetchCategories = async (userId: string) => {
  const categories = await prisma.category.findMany({
    where: {
      user_id: userId,
    },
  });

  return categories;
};

export const createCategory = async (data: CategoryCreateInput) => {
  const newCategory = await prisma.category.create({
    data,
  });

  return newCategory;
};

export const deleteCategory = async (id: string) => {
  const deletedCategory = await prisma.category.delete({
    where: { id },
  });

  return deletedCategory;
};
