import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const transformToOptions = (obj: Record<string, string>) => {
  return Object.entries(obj).map(([key, value]) => ({ label: value, value: key }));
};

export const getTotalPagesCount = ({
  totalCount,
  limit,
}: {
  totalCount: number;
  limit: number;
}) => {
  return Math.ceil(totalCount / limit);
};
