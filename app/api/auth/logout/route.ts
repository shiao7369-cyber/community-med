import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const token = request.cookies.get("session")?.value;

  if (token) {
    const session = await verifySession(token);
    console.log(
      `[AUTH] 登出 - 帳號: ${session?.username || "unknown"}, 時間: ${new Date().toISOString()}`
    );
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set("session", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return response;
}
