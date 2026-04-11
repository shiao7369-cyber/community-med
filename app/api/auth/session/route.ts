import { NextRequest, NextResponse } from "next/server";
import { verifySession, refreshSession } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("session")?.value;

  if (!token) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  const session = await verifySession(token);
  if (!session) {
    const response = NextResponse.json(
      { authenticated: false },
      { status: 401 }
    );
    response.cookies.set("session", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    });
    return response;
  }

  return NextResponse.json({
    authenticated: true,
    username: session.username,
    displayName: session.displayName,
    role: session.role || "admin",
    loginTime: session.loginTime,
  });
}

// Refresh session (extend expiry)
export async function POST(request: NextRequest) {
  const token = request.cookies.get("session")?.value;

  if (!token) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  const newToken = await refreshSession(token);
  if (!newToken) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  const session = await verifySession(newToken);
  const response = NextResponse.json({
    authenticated: true,
    refreshed: true,
    username: session?.username,
    displayName: session?.displayName,
    role: session?.role || "admin",
    loginTime: session?.loginTime,
  });

  response.cookies.set("session", newToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 30 * 60,
  });

  return response;
}
