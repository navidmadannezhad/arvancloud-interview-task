import { NextRequest, NextResponse } from "next/server";
import {
    DEFAULT_ACCESS_TOKEN_EXPIRES_MINS,
    setAuthCookies,
} from "@/src/configs/auth-cookies";
import { getServerUrl } from "@/src/configs/server-url";
import { LoginResponse, LoginUserRequestBody } from "@/src/types";

export async function POST(request: NextRequest) {
    const body = (await request.json()) as LoginUserRequestBody;
    const expiresInMins = body.expiresInMins ?? DEFAULT_ACCESS_TOKEN_EXPIRES_MINS;

    const upstream = await fetch(`${getServerUrl()}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({
            ...body,
            expiresInMins,
        }),
    });

    const payload = await upstream.json().catch(() => ({}));

    if (!upstream.ok) {
        return NextResponse.json(payload, { status: upstream.status });
    }

    const data = payload as LoginResponse;

    if (!data.accessToken || !data.refreshToken) {
        return NextResponse.json(
            { message: "Invalid login response" },
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
        expiresInMins,
    );

    return response;
}
