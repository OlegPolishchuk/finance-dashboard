// middleware.ts (в корне проекта)
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function proxy(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isLoggedIn = !!token;
  const { pathname } = req.nextUrl;

  const isAuthRoute = pathname === '/login' || pathname === '/signup';

  // 1. Страницы /login и /signup
  if (isAuthRoute) {
    // если уже залогинен — выгоняем на главную
    if (isLoggedIn) {
      return NextResponse.redirect(new URL('/', req.url));
    }

    // если не залогинен — даём зайти
    return NextResponse.next();
  }

  // 2. Все остальные страницы — приватные
  if (!isLoggedIn) {
    // не залогинен — отправляем на /login
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // залогинен — пускаем
  return NextResponse.next();
}

// middleware будет работать на всех страницах,
// кроме api, _next, статики и файлов из public
// (паттерн из док). [web:72][web:77]
export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
