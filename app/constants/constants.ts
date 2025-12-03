export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000';

export const ROUTES = {
  home: { title: 'Главная', href: '/' },
  signup: { title: 'Регистрация', href: '/signup' },
  login: { title: 'Вход', href: '/login' },
};
