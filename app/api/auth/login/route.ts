import { NextRequest, NextResponse } from "next/server";
import {
  validateCredentials,
  createSession,
  checkRateLimit,
  recordFailedAttempt,
  clearAttempts,
} from "@/lib/auth";

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  // Check rate limit
  const rateCheck = checkRateLimit(ip);
  if (!rateCheck.allowed) {
    const unlockTime = new Date(rateCheck.lockedUntil!).toLocaleTimeString(
      "zh-TW"
    );
    console.log(
      `[AUTH] 登入鎖定 - IP: ${ip}, 解鎖時間: ${unlockTime}`
    );
    return NextResponse.json(
      {
        error: "登入嘗試次數過多，帳號已暫時鎖定",
        locked: true,
        lockedUntil: rateCheck.lockedUntil,
        remaining: 0,
      },
      { status: 429 }
    );
  }

  const body = await request.json();
  const { username, password } = body;

  if (!username || !password) {
    return NextResponse.json(
      { error: "請輸入帳號和密碼" },
      { status: 400 }
    );
  }

  const { valid, displayName, role } = await validateCredentials(username, password);

  if (!valid) {
    const result = recordFailedAttempt(ip);
    console.log(
      `[AUTH] 登入失敗 - IP: ${ip}, 帳號: ${username}, 剩餘次數: ${result.remaining}`
    );
    return NextResponse.json(
      {
        error: "帳號或密碼錯誤",
        remaining: result.remaining,
        locked: result.locked,
      },
      { status: 401 }
    );
  }

  // Successful login
  clearAttempts(ip);
  const token = await createSession(username, displayName, role);

  console.log(
    `[AUTH] 登入成功 - IP: ${ip}, 帳號: ${username}, 時間: ${new Date().toISOString()}`
  );

  const response = NextResponse.json({
    success: true,
    displayName,
    loginTime: new Date().toISOString(),
  });

  response.cookies.set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 30 * 60, // 30 minutes
  });

  return response;
}
