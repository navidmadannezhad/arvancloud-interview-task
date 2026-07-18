import { NextRequest, NextResponse } from "next/server";
import { getServerUrl } from "@/src/configs/server-url";
import { GetAuthUserResponse } from "@/src/types";

export async function GET(request: NextRequest) {
    const accessToken = request.cookies.get("accessToken")?.value;

    if (!accessToken) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const upstream = await fetch(`${getServerUrl()}/auth/me`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Cookie: `accessToken=${accessToken}`,
        },
    });

    const payload = await upstream.json().catch(() => ({}));

    // Do not forward upstream Set-Cookie headers — they can overwrite our refresh cookie.
    return NextResponse.json(payload as GetAuthUserResponse, {
        status: upstream.status,
    });
}
