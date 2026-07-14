import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const normalizedPathname = pathname !== '/' ? pathname.replace(/\/+$/, '') : pathname;

    if (normalizedPathname === '/') {
        const destinationUrl = request.nextUrl.clone();
        destinationUrl.pathname = '/articles';
        return NextResponse.redirect(destinationUrl, 301);
    }

    const access_token = request.cookies.get('access_token')?.value;
    const refresh_token = request.cookies.get('refresh_token')?.value;
    const isAuthenticated = !!access_token && !!refresh_token;

    if (pathname.startsWith('/articles')) {
        if (!isAuthenticated) {
            const loginUrl = new URL('/login', request.url);
            loginUrl.searchParams.set('from', pathname);
            return NextResponse.redirect(loginUrl);
        }
    }

    return NextResponse.next();
}

export const config = {
  matcher: [
    '/articles/:path*', 
  ],
};