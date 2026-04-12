import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "@/lib/jwt";

export async function POST(request: NextRequest) {
  // Verify the user is logged in
  const sessionToken = request.cookies.get("session")?.value;
  if (!sessionToken) {
    return NextResponse.json({ error: "未登入" }, { status: 401 });
  }

  const session = await verifySession(sessionToken);
  if (!session) {
    return NextResponse.json({ error: "Session 無效" }, { status: 401 });
  }

  const ssoSecret = process.env.SSO_SECRET;
  if (!ssoSecret) {
    return NextResponse.json({ error: "SSO 未設定" }, { status: 500 });
  }

  // Create HMAC-signed SSO token
  const payload = {
    username: session.username,
    displayName: session.displayName,
    role: session.role,
    iat: Date.now(),
  };

  const payloadB64 = Buffer.from(JSON.stringify(payload)).toString("base64url");

  // Sign with HMAC-SHA256 using Web Crypto API (Edge compatible)
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(ssoSecret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signatureBuffer = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(payloadB64)
  );

  // Convert to base64url
  const signature = Buffer.from(signatureBuffer).toString("base64url");
  const token = `${payloadB64}.${signature}`;

  return NextResponse.json({ token });
}
