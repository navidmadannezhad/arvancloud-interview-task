import { NextResponse } from "next/server";
import { clearAuthCookies } from "@/src/configs/auth-cookies";

export async function POST() {
    const response = NextResponse.json({ ok: true });
    clearAuthCookies(response);
    return response;
}
