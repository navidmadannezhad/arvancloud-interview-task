import { NextRequest, NextResponse } from "next/server";
import {
    setAuthCookies,
} from "@/src/utils/auth-utils";
import { DEFAULT_ACCESS_TOKEN_EXPIRES_MINS } from "@/src/configs/constants";
import { getServerUrl } from "@/src/configs/server-url";
import { RefreshAuthResponse } from "@/src/types";

export async function POST(request: NextRequest) {
    const refreshToken = request.cookies.get("refreshToken")?.value;

    if (!refreshToken) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const upstream = await fetch(`${getServerUrl()}/auth/refresh`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({
            refreshToken,
            expiresInMins: DEFAULT_ACCESS_TOKEN_EXPIRES_MINS,
        }),
    });

    const payload = await upstream.json().catch(() => ({}));

    if (!upstream.ok) {
        return NextResponse.json(payload, { status: upstream.status });
    }

    const data = payload as RefreshAuthResponse;

    if (!data.accessToken || !data.refreshToken) {
        return NextResponse.json(
            { message: "Invalid refresh response" },
            { status: 502 },
        );
    }

    const response = NextResponse.json(data);

    setAuthCookies(
        response,
        {
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
        },
        DEFAULT_ACCESS_TOKEN_EXPIRES_MINS,
    );

    return response;
}
