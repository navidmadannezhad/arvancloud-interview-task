import { getQueryClient } from "@/src/configs/queryClient";
import { RefreshAuthResponse } from "@/src/types";
import { NextResponse } from "next/server";
import { DEFAULT_ACCESS_TOKEN_EXPIRES_MINS, REFRESH_TOKEN_MAX_AGE_SECONDS } from "@/src/configs/constants";

const PROTECTED_PATH_PREFIX = "/articles";

export const getLoginRedirectPath = (from: string | null | undefined): string => {
    if (!from) {
        return PROTECTED_PATH_PREFIX;
    }

    if (!from.startsWith("/") || from.startsWith("//")) {
        return PROTECTED_PATH_PREFIX;
    }

    if (!from.startsWith(PROTECTED_PATH_PREFIX)) {
        return PROTECTED_PATH_PREFIX;
    }

    return from;
};

export const buildLoginUrl = (from?: string): string => {
    const safeFrom = getLoginRedirectPath(from);
    return `/login?from=${encodeURIComponent(safeFrom)}`;
};

const GET_USER_DATA_QUERY_KEY = ["getUserData"] as const;

const AUTH_REFRESH_URL = "/api/auth/refresh";
const AUTH_LOGOUT_URL = "/api/auth/logout";

const AUTH_SKIP_REFRESH_URLS = [
    "/api/auth/login",
    "/api/auth/refresh",
    "/api/auth/logout",
];

let refreshPromise: Promise<boolean> | null = null;
let isRedirectingToLogin = false;

const runRefreshAccessToken = async (): Promise<boolean> => {
    try {
        const response = await fetch(AUTH_REFRESH_URL, {
            method: "POST",
            credentials: "include",
        });

        if (!response.ok) {
            return false;
        }

        await response.json() as RefreshAuthResponse;
        return true;
    } catch {
        return false;
    }
};

const refreshAccessToken = async (): Promise<boolean> => {
    if (!refreshPromise) {
        refreshPromise = runRefreshAccessToken().finally(() => {
            refreshPromise = null;
        });
    }

    return refreshPromise;
};

export const clearAuthSession = async () => {
    try {
        await fetch(AUTH_LOGOUT_URL, {
            method: "POST",
            credentials: "include",
        });
    } catch {
        // Best-effort cookie cleanup before redirecting to login.
    }

    const queryClient = getQueryClient();
    queryClient.removeQueries({ queryKey: GET_USER_DATA_QUERY_KEY });
};

export const redirectToLogin = (from?: string) => {
    if (typeof window === "undefined" || isRedirectingToLogin) {
        return;
    }

    const currentPath = `${window.location.pathname}${window.location.search}`;
    const authPages = ["/login", "/register"];

    if (authPages.includes(window.location.pathname)) {
        return;
    }

    isRedirectingToLogin = true;
    window.location.assign(buildLoginUrl(from ?? currentPath));
};

export const shouldSkipAuthRefresh = (url: string) =>
    AUTH_SKIP_REFRESH_URLS.some((authUrl) => url.includes(authUrl));

export const handleUnauthorizedSession = async () => {
    if (typeof window === "undefined" || isRedirectingToLogin) {
        return;
    }

    if (refreshPromise) {
        const refreshed = await refreshPromise;
        if (refreshed) {
            return;
        }
    }

    await clearAuthSession();
    redirectToLogin();
};

export const tryRefreshAccessToken = () => refreshAccessToken();

export const waitForPendingRefresh = async () => {
    if (!refreshPromise) {
        return null;
    }

    return refreshPromise;
};

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
