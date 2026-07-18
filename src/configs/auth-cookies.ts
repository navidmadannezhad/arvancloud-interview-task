import { NextResponse } from "next/server";

export const REFRESH_TOKEN_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;
export const DEFAULT_ACCESS_TOKEN_EXPIRES_MINS = 60;

const authCookieOptions = {
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "lax" as const,
};

export const setAuthCookies = (
    response: NextResponse,
    tokens: { accessToken: string; refreshToken: string },
    expiresInMins: number = DEFAULT_ACCESS_TOKEN_EXPIRES_MINS,
) => {
    if (!tokens.accessToken || !tokens.refreshToken) {
        return;
    }

    response.cookies.set("refreshToken", tokens.refreshToken, {
        ...authCookieOptions,
        maxAge: REFRESH_TOKEN_MAX_AGE_SECONDS,
    });
    response.cookies.set("accessToken", tokens.accessToken, {
        ...authCookieOptions,
        maxAge: expiresInMins * 60,
    });
};

export const clearAuthCookies = (response: NextResponse) => {
    response.cookies.set("accessToken", "", {
        ...authCookieOptions,
        maxAge: 0,
    });
    response.cookies.set("refreshToken", "", {
        ...authCookieOptions,
        maxAge: 0,
    });
};
