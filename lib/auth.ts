/**
 * 認證模組 — 帳號驗證 + 速率限制
 * 此模組會引入 users.ts（含 fs/Redis），不可在 Edge Runtime 使用
 * Edge Runtime（proxy.ts）請直接使用 lib/jwt.ts
 */
import { findUser, verifyPassword, recordLogin } from "./users";

// Re-export JWT functions for API routes
export {
  createSession,
  verifySession,
  refreshSession,
  type SessionPayload,
} from "./jwt";

// Rate limiting store (in-memory, resets on server restart)
const loginAttempts = new Map<string, { count: number; lockedUntil: number }>();

const MAX_ATTEMPTS = 5;
const LOCK_DURATION = 15 * 60 * 1000; // 15 minutes

export function checkRateLimit(ip: string): {
  allowed: boolean;
  remaining: number;
  lockedUntil?: number;
} {
  const now = Date.now();
  const record = loginAttempts.get(ip);

  if (record) {
    if (record.lockedUntil > now) {
      return { allowed: false, remaining: 0, lockedUntil: record.lockedUntil };
    }
    if (record.lockedUntil > 0 && record.lockedUntil <= now) {
      loginAttempts.delete(ip);
      return { allowed: true, remaining: MAX_ATTEMPTS };
    }
  }

  return {
    allowed: true,
    remaining: record ? MAX_ATTEMPTS - record.count : MAX_ATTEMPTS,
  };
}

export function recordFailedAttempt(ip: string): {
  remaining: number;
  locked: boolean;
} {
  const record = loginAttempts.get(ip) || { count: 0, lockedUntil: 0 };
  record.count += 1;

  if (record.count >= MAX_ATTEMPTS) {
    record.lockedUntil = Date.now() + LOCK_DURATION;
    loginAttempts.set(ip, record);
    return { remaining: 0, locked: true };
  }

  loginAttempts.set(ip, record);
  return { remaining: MAX_ATTEMPTS - record.count, locked: false };
}

export function clearAttempts(ip: string) {
  loginAttempts.delete(ip);
}

export async function validateCredentials(
  username: string,
  password: string
): Promise<{ valid: boolean; displayName: string; role: "admin" | "user" }> {
  // 1. Check env var super admin first
  const adminUser = process.env.ADMIN_USERNAME || "蕭輝哲";
  const adminPass = process.env.ADMIN_PASSWORD || "admin123";
  const adminDisplayName = process.env.ADMIN_DISPLAY_NAME || "蕭輝哲";

  if (username === adminUser && password === adminPass) {
    return { valid: true, displayName: adminDisplayName, role: "admin" };
  }

  // 2. Check stored users (Redis or JSON)
  const user = await findUser(username);
  if (!user) {
    return { valid: false, displayName: "", role: "user" };
  }

  if (!user.enabled) {
    return { valid: false, displayName: "", role: "user" };
  }

  const passwordMatch = await verifyPassword(password, user.passwordHash);
  if (!passwordMatch) {
    return { valid: false, displayName: "", role: "user" };
  }

  // Record login time
  await recordLogin(username);

  return { valid: true, displayName: user.displayName, role: user.role };
}
