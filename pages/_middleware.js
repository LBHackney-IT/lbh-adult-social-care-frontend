import { NextResponse } from 'next/server';
import { APP_SERVICE_ROUTES } from 'routes/RouteConstants';

export function middleware (req) {
  const { pathname } = req.nextUrl;
  const { hackneyToken } = req.cookies;

  if ([APP_SERVICE_ROUTES.login, '/api/user', '/api/logout', '/api/login', '/favicon.ico'].includes(pathname)) {
    return NextResponse.next();
  }

  if (!hackneyToken) {
    return NextResponse.redirect(APP_SERVICE_ROUTES.login);
  }

  return NextResponse.next();
}