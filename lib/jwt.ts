/**
 * JWT 工具函式（純 Edge Runtime 相容）
 * proxy.ts 使用此模組，不引入 fs 依賴
 */
import { SignJWT, jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "default-secret-change-me-in-production"
);

const SESSION_DURATION = 30 * 60; // 30 minutes

export interface SessionPayload {
  username: string;
  displayName: string;
  role: "admin" | "user";
  loginTime: string;
  exp?: number;
}

export async function createSession(
  username: string,
  displayName: string,
  role: "admin" | "user" = "admin"
): Promise<string> {
  const now = new Date().toISOString();
  return new SignJWT({
    username,
    displayName,
    role,
    loginTime: now,
  } as SessionPayload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION}s`)
    .sign(JWT_SECRET);
}

export async function verifySession(
  token: string
): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

export async function refreshSession(token: string): Promise<string | null> {
  const payload = await verifySession(token);
  if (!payload) return null;
  return createSession(payload.username, payload.displayName, payload.role);
}
