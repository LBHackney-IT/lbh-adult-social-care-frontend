import { NextResponse } from 'next/server';

export const middleware = (req) => {
  const url = req.nextUrl.pathname;

  if (url.startsWith('/api') || url.startsWith('/service-worker')) return NextResponse.next();

  const isLoggedIn = req.cookies.adultSocialCare;

  if (isLoggedIn) {
    return NextResponse.next();
  }

  if (url !== '/login') {
    return NextResponse.redirect('/login');
  }

  return NextResponse.next();
};
