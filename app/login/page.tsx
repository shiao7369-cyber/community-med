"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import PrivacyNotice from "@/components/PrivacyNotice";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [error, setError] = useState("");
  const [remaining, setRemaining] = useState<number | null>(null);
  const [locked, setLocked] = useState(false);
  const [lockedUntil, setLockedUntil] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!agreedToTerms) {
      setError("請先閱讀並同意個人資料保護聲明及使用條款");
      return;
    }

    if (!username.trim() || !password.trim()) {
      setError("請輸入帳號和密碼");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        router.push("/");
        router.refresh();
      } else {
        setError(data.error || "登入失敗");
        if (data.remaining !== undefined) {
          setRemaining(data.remaining);
        }
        if (data.locked) {
          setLocked(true);
          setLockedUntil(data.lockedUntil || null);
        }
      }
    } catch {
      setError("網路連線錯誤，請確認是否已連線至院內網路");
    } finally {
      setLoading(false);
    }
  };

  const lockRemainingMinutes = lockedUntil
    ? Math.max(1, Math.ceil((lockedUntil - Date.now()) / 60000))
    : 15;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50/30 to-teal-50/20">
      {/* Top security bar */}
      <div className="bg-slate-800 text-white px-4 py-2 text-center text-xs flex items-center justify-center gap-2">
        <svg className="w-3.5 h-3.5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        <span>Tailscale 私有網路加密連線</span>
        <span className="mx-2 text-slate-500">|</span>
        <span className="text-slate-400">院內專用系統 — 未經授權禁止存取</span>
      </div>

      <div className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0">
          {/* Left: Branding */}
          <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-blue-600 to-teal-500 rounded-l-3xl p-12 text-white relative overflow-hidden">
            {/* Pattern overlay */}
            <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)"/>
              </svg>
            </div>

            <div className="relative z-10">
              {/* Logo */}
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-8">
                <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" fill="currentColor" opacity="0.3"/>
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor"/>
                  <line x1="12" y1="12" x2="12" y2="22" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              </div>

              <h1 className="text-3xl font-bold mb-2">敏盛I社區醫學</h1>
              <h2 className="text-xl font-light text-white/80 mb-8">管理平台</h2>

              <div className="space-y-4 text-white/90 text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">HIPAA 等級資安防護</p>
                    <p className="text-white/60 text-xs mt-0.5">所有資料加密傳輸，病患資料不出院區</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">私有網路存取控制</p>
                    <p className="text-white/60 text-xs mt-0.5">Tailscale VPN 隧道，僅授權裝置可連線</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">完整稽核軌跡</p>
                    <p className="text-white/60 text-xs mt-0.5">登入/登出、操作紀錄完整保留</p>
                  </div>
                </div>
              </div>

              {/* Security badges */}
              <div className="mt-10 flex items-center gap-3">
                <div className="px-3 py-1.5 bg-white/10 rounded-full text-xs border border-white/20">
                  個資法合規
                </div>
                <div className="px-3 py-1.5 bg-white/10 rounded-full text-xs border border-white/20">
                  ISO 27001
                </div>
                <div className="px-3 py-1.5 bg-white/10 rounded-full text-xs border border-white/20">
                  醫院評鑑
                </div>
              </div>
            </div>
          </div>

          {/* Right: Login form */}
          <div className="bg-white rounded-3xl lg:rounded-l-none lg:rounded-r-3xl shadow-2xl p-8 sm:p-12 flex flex-col justify-center">
            {/* Mobile logo */}
            <div className="lg:hidden flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-400 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" fill="currentColor" opacity="0.3"/>
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor"/>
                  <line x1="12" y1="12" x2="12" y2="22" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-800">敏盛I社區醫學</h1>
                <p className="text-xs text-gray-400">管理平台</p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-1">系統登入</h2>
            <p className="text-sm text-gray-500 mb-8">請輸入您的帳號密碼以存取系統</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Username */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  帳號
                </label>
                <div className="relative">
                  <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm bg-gray-50 focus:bg-white"
                    placeholder="請輸入帳號"
                    autoComplete="username"
                    disabled={locked}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  密碼
                </label>
                <div className="relative">
                  <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                  </svg>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-11 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm bg-gray-50 focus:bg-white"
                    placeholder="請輸入密碼"
                    autoComplete="current-password"
                    disabled={locked}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.79 6.79M9.878 9.878l-3.12-3.12m7.364 7.364l3.12 3.12M14.121 14.12L17.21 17.21m0 0L21 21M3 3l3.79 3.79"/>
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Terms agreement */}
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500/20 cursor-pointer"
                />
                <span className="text-xs text-gray-500 leading-relaxed group-hover:text-gray-700 transition-colors">
                  我已閱讀並同意<span className="text-blue-600 font-medium">個人資料保護聲明</span>及
                  <span className="text-blue-600 font-medium">系統使用條款</span>，
                  瞭解系統將記錄存取日誌供資安稽核使用
                </span>
              </label>

              {/* Error message */}
              {error && (
                <div className="bg-red-50 border border-red-100 text-red-700 px-4 py-3 rounded-xl text-sm flex items-start gap-2">
                  <svg className="w-5 h-5 shrink-0 mt-0.5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"/>
                  </svg>
                  <div>
                    <p>{error}</p>
                    {remaining !== null && remaining > 0 && (
                      <p className="text-xs mt-1 text-red-500">
                        剩餘嘗試次數：{remaining} 次
                      </p>
                    )}
                    {locked && (
                      <p className="text-xs mt-1 text-red-500">
                        帳號已鎖定，請於 {lockRemainingMinutes} 分鐘後再試
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading || locked}
                className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium rounded-xl hover:from-blue-700 hover:to-blue-600 focus:ring-4 focus:ring-blue-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/25 text-sm"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                    </svg>
                    驗證中...
                  </span>
                ) : locked ? (
                  "帳號已鎖定"
                ) : (
                  "登入系統"
                )}
              </button>
            </form>

            {/* Privacy notice */}
            <div className="mt-8">
              <PrivacyNotice />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="text-center py-4 text-xs text-gray-400">
        &copy; {new Date().getFullYear()} 敏盛I社區醫學管理平台 — 內部系統，未經授權禁止存取
      </div>
    </div>
  );
}
