import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "@/lib/jwt";
import { createHmac } from "crypto";

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

  // Create HMAC-signed SSO token (Node.js crypto — matches homecare server)
  const payload = {
    username: session.username,
    displayName: session.displayName,
    role: session.role,
    iat: Date.now(),
  };

  const payloadB64 = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = createHmac("sha256", ssoSecret)
    .update(payloadB64)
    .digest("base64url");

  const token = `${payloadB64}.${signature}`;

  return NextResponse.json({ token });
}
