import { DEFAULT_CATEGORIES_LIMIT } from '@/app/constants/constants';
import { CategoryCreateInput } from '@/app/generated/prisma/models/Category';
import prisma from '@/app/lib/utils/prisma';
import { PaginatedRequestFields } from '@/app/types/types';

export const fetchCategories = async (userId: string, queryParams?: PaginatedRequestFields) => {
  const rawPage = Number(queryParams?.page) || 1;
  const rawLimit = Number(queryParams?.limit) || DEFAULT_CATEGORIES_LIMIT;

  const page = rawPage < 1 ? 1 : rawPage;
  const take = rawLimit < 1 ? DEFAULT_CATEGORIES_LIMIT : rawLimit;
  const skip = (page - 1) * take;

  const categories = await prisma.category.findMany({
    where: {
      user_id: userId,
    },
    orderBy: { created_at: 'asc' },
    skip,
    take,
  });

  const totalCount = await prisma.category.count({
    where: { user_id: userId },
  });

  return {
    data: categories,
    limit: take,
    totalCount,
    page,
  };
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
