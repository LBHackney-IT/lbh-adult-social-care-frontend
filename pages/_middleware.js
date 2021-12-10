import { NextResponse } from 'next/server';
import { APP_SERVICE_ROUTES, APP_SERVICE_ROUTES_MAP } from 'routes/RouteConstants';

export function middleware (req) {
  const { pathname } = req.nextUrl;
  const { hackneyToken } = req.cookies;

  // if route is (/login or /logout or /404) then just continue
  if (APP_SERVICE_ROUTES_MAP.includes(pathname)) {
    return NextResponse.next();
  }

  if (!hackneyToken) {
    return NextResponse.redirect(APP_SERVICE_ROUTES.login);
  }

  return NextResponse.next();
}