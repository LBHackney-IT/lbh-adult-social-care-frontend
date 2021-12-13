import { NextResponse } from 'next/server';
import { APP_SERVICE_ROUTES } from 'routes/RouteConstants';

const APP_ROUTES = [APP_SERVICE_ROUTES.login, '/api/user', '/api/logout', '/api/login', '/favicon.ico'];

export function middleware (req) {
  const { pathname } = req.nextUrl;
  const { hackneyToken } = req.cookies;

  if (!hackneyToken && !APP_ROUTES.includes(pathname)) return NextResponse.redirect(APP_SERVICE_ROUTES.login);

  return NextResponse.next();
}