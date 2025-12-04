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
