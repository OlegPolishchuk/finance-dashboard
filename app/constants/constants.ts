import { transformToOptions } from '@/app/lib/utils';

export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000';

export const ROUTES = {
  home: { title: 'Главная', href: '/' },
  signup: { title: 'Регистрация', href: '/signup' },
  login: { title: 'Вход', href: '/login' },

  dashboard: { title: 'Сводка', href: '/dashboard' },
  transactions: { title: 'Транзакции', href: '/transactions' },
  accounts: { title: 'Счета', href: '/accounts' },
  budgets: { title: 'Бюджеты', href: '/budgets' },
  goals: { title: 'Цели', href: '/goals' },
  settings: { title: 'Настройки', href: '/settings' },
};

export const DEFAULT_DATE_FORMAT = 'MM/dd/yyyy';
export const DEFAULT_CATEGORIES_LIMIT = 10;

const CATEGORY_TYPE = {
  INCOME: 'Доходы',
  EXPENSE: 'Расходы',
  TRANSFER: 'Переводы',
};

export const categoryOptions = transformToOptions(CATEGORY_TYPE);

const ACCOUNT_TYPE = {
  CASH: 'Наличные',
  CARD: 'Карта',
  BANK: 'Счет в банке',
  BROKERAGE: 'Брокерский счет',
  OTHER: 'Другое',
};

export const accountOptions = transformToOptions(ACCOUNT_TYPE);
