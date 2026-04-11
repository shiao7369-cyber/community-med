import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "@/lib/auth";
import { getUsersForAdmin, createUser } from "@/lib/users";

// Check admin permission
async function checkAdmin(request: NextRequest) {
  const token = request.cookies.get("session")?.value;
  if (!token) return null;
  const session = await verifySession(token);
  if (!session || (session.role !== "admin")) return null;
  return session;
}

// GET: List all users
export async function GET(request: NextRequest) {
  const session = await checkAdmin(request);
  if (!session) {
    return NextResponse.json({ error: "權限不足" }, { status: 403 });
  }

  const users = await getUsersForAdmin();

  // Include the env super admin in the list
  const envAdmin = process.env.ADMIN_USERNAME || "admin";
  const envDisplayName = process.env.ADMIN_DISPLAY_NAME || "系統管理員";

  const allUsers = [
    {
      username: envAdmin,
      displayName: envDisplayName,
      role: "admin" as const,
      enabled: true,
      createdAt: "系統預設",
      createdBy: "system",
      isSystem: true,
    },
    ...users.map((u) => ({ ...u, isSystem: false })),
  ];

  return NextResponse.json({ users: allUsers });
}

// POST: Create new user
export async function POST(request: NextRequest) {
  const session = await checkAdmin(request);
  if (!session) {
    return NextResponse.json({ error: "權限不足" }, { status: 403 });
  }

  const body = await request.json();
  const { username, password, displayName, role } = body;

  const result = await createUser(
    {
      username,
      password,
      displayName,
      role: role || "user",
    },
    session.username
  );

  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
