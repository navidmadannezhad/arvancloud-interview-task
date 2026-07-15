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

    const accessToken = request.cookies.get('accessToken')?.value;
    const refreshToken = request.cookies.get('refreshToken')?.value;
    const isAuthenticated = !!accessToken && !!refreshToken;

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