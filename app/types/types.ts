import { User } from '@/app/generated/prisma/client';

export interface Option {
  value: string;
  label: string;
}

export type UserWithoutPassword = Omit<User, 'password'>;

export interface ActionResponse<T> {
  message: string;
  values?: Partial<T>;
  errors?: Partial<Record<keyof T, string[]>>;
  success: boolean;
}
