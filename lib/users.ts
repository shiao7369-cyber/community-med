/**
 * 使用者管理模組
 * - 雲端模式（Vercel）：使用 Upstash Redis
 * - 本地模式（開發/PM2）：使用 JSON 檔案
 * 自動偵測環境切換
 */

export interface User {
  username: string;
  passwordHash: string;
  displayName: string;
  role: "admin" | "user";
  enabled: boolean;
  createdAt: string;
  createdBy: string;
  lastLoginAt?: string;
}

// ============ Detect storage mode ============

const isRedisMode = !!(
  process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN
);

// ============ SHA-256 hash (Edge compatible) ============

export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  const inputHash = await hashPassword(password);
  return inputHash === hash;
}

// ============ Redis Storage (Vercel/Cloud) ============

async function getRedis() {
  const { Redis } = await import("@upstash/redis");
  return new Redis({
    url: process.env.KV_REST_API_URL!,
    token: process.env.KV_REST_API_TOKEN!,
  });
}

const REDIS_KEY = "community-med:users";

async function redisGetUsers(): Promise<User[]> {
  const redis = await getRedis();
  const data = await redis.get<User[]>(REDIS_KEY);
  return data || [];
}

async function redisSaveUsers(users: User[]) {
  const redis = await getRedis();
  await redis.set(REDIS_KEY, users);
}

// ============ File Storage (Local/PM2) ============

function fileGetUsers(): User[] {
  try {
    const { readFileSync, existsSync, mkdirSync, writeFileSync } = require("fs");
    const { join } = require("path");
    const dataDir = join(process.cwd(), "data");
    const filePath = join(dataDir, "users.json");

    if (!existsSync(dataDir)) {
      mkdirSync(dataDir, { recursive: true });
    }
    if (!existsSync(filePath)) {
      writeFileSync(filePath, "[]", "utf-8");
      return [];
    }
    const raw = readFileSync(filePath, "utf-8");
    return JSON.parse(raw) as User[];
  } catch {
    return [];
  }
}

function fileSaveUsers(users: User[]) {
  const { writeFileSync, existsSync, mkdirSync } = require("fs");
  const { join } = require("path");
  const dataDir = join(process.cwd(), "data");
  const filePath = join(dataDir, "users.json");

  if (!existsSync(dataDir)) {
    mkdirSync(dataDir, { recursive: true });
  }
  writeFileSync(filePath, JSON.stringify(users, null, 2), "utf-8");
}

// ============ Unified API ============

export async function getUsers(): Promise<User[]> {
  return isRedisMode ? redisGetUsers() : fileGetUsers();
}

async function saveUsers(users: User[]) {
  return isRedisMode ? redisSaveUsers(users) : fileSaveUsers(users);
}

export async function findUser(username: string): Promise<User | undefined> {
  const users = await getUsers();
  const normalized = username.normalize("NFC").trim();
  return users.find((u) => u.username.normalize("NFC").trim() === normalized);
}

export async function createUser(
  data: {
    username: string;
    password: string;
    displayName: string;
    role: "admin" | "user";
  },
  createdBy: string
): Promise<{ success: boolean; error?: string }> {
  const users = await getUsers();

  const envAdmin = process.env.ADMIN_USERNAME || "蕭輝哲";
  if (data.username === envAdmin) {
    return { success: false, error: "此帳號名稱已被系統保留" };
  }
  if (users.find((u) => u.username === data.username)) {
    return { success: false, error: "帳號名稱已存在" };
  }
  if (!data.username || data.username.length < 3) {
    return { success: false, error: "帳號名稱至少 3 個字元" };
  }
  if (!data.password || data.password.length < 6) {
    return { success: false, error: "密碼至少 6 個字元" };
  }
  if (!data.displayName) {
    return { success: false, error: "請輸入顯示名稱" };
  }

  const passwordHash = await hashPassword(data.password);

  const newUser: User = {
    username: data.username,
    passwordHash,
    displayName: data.displayName,
    role: data.role,
    enabled: true,
    createdAt: new Date().toISOString(),
    createdBy,
  };

  users.push(newUser);
  await saveUsers(users);

  console.log(
    `[ADMIN] 新增帳號 - ${data.username} (${data.role}), 建立者: ${createdBy}`
  );
  return { success: true };
}

export async function updateUser(
  username: string,
  updates: {
    displayName?: string;
    password?: string;
    role?: "admin" | "user";
    enabled?: boolean;
  },
  updatedBy: string
): Promise<{ success: boolean; error?: string }> {
  const users = await getUsers();
  const index = users.findIndex((u) => u.username === username);

  if (index === -1) {
    return { success: false, error: "找不到此帳號" };
  }

  if (updates.displayName !== undefined) users[index].displayName = updates.displayName;
  if (updates.role !== undefined) users[index].role = updates.role;
  if (updates.enabled !== undefined) users[index].enabled = updates.enabled;
  if (updates.password) {
    if (updates.password.length < 6) {
      return { success: false, error: "密碼至少 6 個字元" };
    }
    users[index].passwordHash = await hashPassword(updates.password);
  }

  await saveUsers(users);

  console.log(
    `[ADMIN] 修改帳號 - ${username}, 修改者: ${updatedBy}, 變更: ${Object.keys(updates).join(", ")}`
  );
  return { success: true };
}

export async function recordLogin(username: string) {
  const users = await getUsers();
  const index = users.findIndex((u) => u.username === username);
  if (index !== -1) {
    users[index].lastLoginAt = new Date().toISOString();
    await saveUsers(users);
  }
}

export async function getUsersForAdmin(): Promise<Omit<User, "passwordHash">[]> {
  const users = await getUsers();
  return users.map(({ passwordHash, ...rest }) => rest);
}
