import { User } from '@/app/generated/prisma/client';

export interface Option {
  value: string;
  label: string;
}

export type UserWithoutPassword = Omit<User, 'password'>;
