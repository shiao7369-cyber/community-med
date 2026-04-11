import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "@/lib/auth";
import { updateUser, findUser } from "@/lib/users";

async function checkAdmin(request: NextRequest) {
  const token = request.cookies.get("session")?.value;
  if (!token) return null;
  const session = await verifySession(token);
  if (!session || session.role !== "admin") return null;
  return session;
}

// PUT: Update user
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await checkAdmin(request);
  if (!session) {
    return NextResponse.json({ error: "權限不足" }, { status: 403 });
  }

  const { id: username } = await params;

  // Prevent editing env admin
  const envAdmin = process.env.ADMIN_USERNAME || "admin";
  if (username === envAdmin) {
    return NextResponse.json(
      { error: "系統預設管理員無法透過後台修改" },
      { status: 400 }
    );
  }

  const body = await request.json();
  const { displayName, password, role, enabled } = body;

  const result = await updateUser(
    username,
    { displayName, password, role, enabled },
    session.username
  );

  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}

// DELETE: Disable user (soft delete)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await checkAdmin(request);
  if (!session) {
    return NextResponse.json({ error: "權限不足" }, { status: 403 });
  }

  const { id: username } = await params;

  const envAdmin = process.env.ADMIN_USERNAME || "admin";
  if (username === envAdmin) {
    return NextResponse.json(
      { error: "系統預設管理員無法停用" },
      { status: 400 }
    );
  }

  const result = await updateUser(
    username,
    { enabled: false },
    session.username
  );

  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
