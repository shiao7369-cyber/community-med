"use client";

import { useState, useEffect, FormEvent } from "react";
import Link from "next/link";

interface UserRow {
  username: string;
  displayName: string;
  role: "admin" | "user";
  enabled: boolean;
  createdAt: string;
  createdBy: string;
  lastLoginAt?: string;
  isSystem: boolean;
}

export default function AdminPage() {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState<string | null>(null);

  // Form state
  const [formUsername, setFormUsername] = useState("");
  const [formPassword, setFormPassword] = useState("");
  const [formDisplayName, setFormDisplayName] = useState("");
  const [formRole, setFormRole] = useState<"admin" | "user">("user");
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  const [formLoading, setFormLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/admin/users");
      if (res.ok) {
        const data = await res.json();
        setUsers(data.users);
      }
    } catch {
      console.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const resetForm = () => {
    setFormUsername("");
    setFormPassword("");
    setFormDisplayName("");
    setFormRole("user");
    setFormError("");
    setFormSuccess("");
    setEditingUser(null);
  };

  const openCreateForm = () => {
    resetForm();
    setShowForm(true);
  };

  const openEditForm = (user: UserRow) => {
    setFormUsername(user.username);
    setFormDisplayName(user.displayName);
    setFormRole(user.role);
    setFormPassword("");
    setFormError("");
    setFormSuccess("");
    setEditingUser(user.username);
    setShowForm(true);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError("");
    setFormSuccess("");
    setFormLoading(true);

    try {
      if (editingUser) {
        // Update
        const body: Record<string, string> = {
          displayName: formDisplayName,
          role: formRole,
        };
        if (formPassword) body.password = formPassword;

        const res = await fetch(`/api/admin/users/${editingUser}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const data = await res.json();
        if (res.ok) {
          setFormSuccess("帳號已更新");
          fetchUsers();
          setTimeout(() => {
            setShowForm(false);
            resetForm();
          }, 1000);
        } else {
          setFormError(data.error || "更新失敗");
        }
      } else {
        // Create
        const res = await fetch("/api/admin/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: formUsername,
            password: formPassword,
            displayName: formDisplayName,
            role: formRole,
          }),
        });
        const data = await res.json();
        if (res.ok) {
          setFormSuccess("帳號已建立");
          fetchUsers();
          setTimeout(() => {
            setShowForm(false);
            resetForm();
          }, 1000);
        } else {
          setFormError(data.error || "建立失敗");
        }
      }
    } catch {
      setFormError("操作失敗，請稍後再試");
    } finally {
      setFormLoading(false);
    }
  };

  const handleToggleEnabled = async (username: string, currentEnabled: boolean) => {
    try {
      const res = await fetch(`/api/admin/users/${username}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enabled: !currentEnabled }),
      });
      if (res.ok) {
        fetchUsers();
      }
    } catch {
      console.error("Toggle failed");
    }
  };

  const enabledCount = users.filter((u) => u.enabled).length;
  const disabledCount = users.filter((u) => !u.enabled).length;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-600 transition-colors group"
        >
          <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          返回首頁
        </Link>
      </nav>

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"/>
              </svg>
            </div>
            帳號管理
          </h1>
          <p className="text-sm text-gray-500 mt-1 ml-13">管理系統使用者帳號、權限與存取狀態</p>
        </div>
        <button
          onClick={openCreateForm}
          className="px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/25 flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/>
          </svg>
          新增帳號
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="text-2xl font-bold text-gray-800">{users.length}</div>
          <div className="text-xs text-gray-500 mt-0.5">帳號總數</div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="text-2xl font-bold text-green-600">{enabledCount}</div>
          <div className="text-xs text-gray-500 mt-0.5">啟用中</div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="text-2xl font-bold text-red-400">{disabledCount}</div>
          <div className="text-xs text-gray-500 mt-0.5">已停用</div>
        </div>
      </div>

      {/* Users table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-800">帳號列表</h3>
        </div>

        {loading ? (
          <div className="p-12 text-center text-gray-400">
            <svg className="animate-spin w-8 h-8 mx-auto mb-3 text-gray-300" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
            </svg>
            載入中...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="px-6 py-3 font-medium text-gray-500">帳號</th>
                  <th className="px-6 py-3 font-medium text-gray-500">顯示名稱</th>
                  <th className="px-6 py-3 font-medium text-gray-500">角色</th>
                  <th className="px-6 py-3 font-medium text-gray-500">狀態</th>
                  <th className="px-6 py-3 font-medium text-gray-500">建立時間</th>
                  <th className="px-6 py-3 font-medium text-gray-500">最後登入</th>
                  <th className="px-6 py-3 font-medium text-gray-500">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {users.map((user) => (
                  <tr key={user.username} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white ${user.role === "admin" ? "bg-blue-500" : "bg-gray-400"}`}>
                          {user.displayName[0]}
                        </div>
                        <div>
                          <span className="font-medium text-gray-800">{user.username}</span>
                          {user.isSystem && (
                            <span className="ml-2 px-1.5 py-0.5 bg-amber-50 text-amber-600 text-xs rounded border border-amber-100">
                              系統
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-700">{user.displayName}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.role === "admin" ? "bg-blue-50 text-blue-700 border border-blue-100" : "bg-gray-50 text-gray-600 border border-gray-200"}`}>
                        {user.role === "admin" ? "管理員" : "一般使用者"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${user.enabled ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${user.enabled ? "bg-green-500" : "bg-red-400"}`}/>
                        {user.enabled ? "啟用" : "停用"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-xs">
                      {user.createdAt === "系統預設"
                        ? "系統預設"
                        : new Date(user.createdAt).toLocaleDateString("zh-TW")}
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-xs">
                      {user.lastLoginAt
                        ? new Date(user.lastLoginAt).toLocaleString("zh-TW", {
                            month: "2-digit",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "—"}
                    </td>
                    <td className="px-6 py-4">
                      {!user.isSystem && (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => openEditForm(user)}
                            className="px-3 py-1.5 text-xs text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            編輯
                          </button>
                          <button
                            onClick={() => handleToggleEnabled(user.username, user.enabled)}
                            className={`px-3 py-1.5 text-xs rounded-lg transition-colors ${user.enabled ? "text-red-600 hover:bg-red-50" : "text-green-600 hover:bg-green-50"}`}
                          >
                            {user.enabled ? "停用" : "啟用"}
                          </button>
                        </div>
                      )}
                      {user.isSystem && (
                        <span className="text-xs text-gray-400">不可修改</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
            {/* Modal header */}
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-800">
                {editingUser ? "編輯帳號" : "新增帳號"}
              </h3>
              <button
                onClick={() => {
                  setShowForm(false);
                  resetForm();
                }}
                className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors"
              >
                <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>

            {/* Modal body */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Username */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  帳號 <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={formUsername}
                  onChange={(e) => setFormUsername(e.target.value)}
                  disabled={!!editingUser}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none disabled:bg-gray-50 disabled:text-gray-500"
                  placeholder="請輸入帳號（至少 3 個字元）"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  密碼 {editingUser ? "(留空不修改)" : ""} <span className="text-red-400">{!editingUser && "*"}</span>
                </label>
                <input
                  type="password"
                  value={formPassword}
                  onChange={(e) => setFormPassword(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                  placeholder={editingUser ? "留空表示不修改密碼" : "請輸入密碼（至少 6 個字元）"}
                />
              </div>

              {/* Display Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  顯示名稱 <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={formDisplayName}
                  onChange={(e) => setFormDisplayName(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                  placeholder="例如：王醫師、陳護理師"
                />
              </div>

              {/* Role */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  角色權限
                </label>
                <div className="flex gap-3">
                  <label className={`flex-1 flex items-center gap-2 px-4 py-3 border rounded-xl cursor-pointer transition-all ${formRole === "user" ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"}`}>
                    <input
                      type="radio"
                      name="role"
                      value="user"
                      checked={formRole === "user"}
                      onChange={() => setFormRole("user")}
                      className="text-blue-500"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-800">一般使用者</p>
                      <p className="text-xs text-gray-500">存取前台功能</p>
                    </div>
                  </label>
                  <label className={`flex-1 flex items-center gap-2 px-4 py-3 border rounded-xl cursor-pointer transition-all ${formRole === "admin" ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"}`}>
                    <input
                      type="radio"
                      name="role"
                      value="admin"
                      checked={formRole === "admin"}
                      onChange={() => setFormRole("admin")}
                      className="text-blue-500"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-800">管理員</p>
                      <p className="text-xs text-gray-500">含後台管理權限</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Error / Success */}
              {formError && (
                <div className="bg-red-50 border border-red-100 text-red-700 px-4 py-2.5 rounded-xl text-sm">
                  {formError}
                </div>
              )}
              {formSuccess && (
                <div className="bg-green-50 border border-green-100 text-green-700 px-4 py-2.5 rounded-xl text-sm">
                  {formSuccess}
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    resetForm();
                  }}
                  className="flex-1 py-2.5 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors"
                >
                  取消
                </button>
                <button
                  type="submit"
                  disabled={formLoading}
                  className="flex-1 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 shadow-lg shadow-blue-500/25"
                >
                  {formLoading
                    ? "處理中..."
                    : editingUser
                    ? "儲存變更"
                    : "建立帳號"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Audit notice */}
      <div className="mt-8 bg-gray-50 border border-gray-200 rounded-xl p-4 text-xs text-gray-500 flex items-start gap-2">
        <svg className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <p>
          所有帳號異動（新增、修改、停用）皆會記錄於系統稽核日誌中，
          符合個資法及醫院資安管控要求。停用帳號採軟刪除方式，保留稽核軌跡。
        </p>
      </div>
    </div>
  );
}
