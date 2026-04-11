"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";

const SESSION_CHECK_INTERVAL = 60 * 1000; // Check every 1 minute
const WARNING_THRESHOLD = 5 * 60 * 1000; // Show warning at 5 min remaining
const SESSION_DURATION = 30 * 60 * 1000; // 30 minutes

export default function SessionGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [showWarning, setShowWarning] = useState(false);
  const [lastActivity, setLastActivity] = useState(Date.now());
  const [remainingMinutes, setRemainingMinutes] = useState(30);

  const isLoginPage = pathname === "/login";

  const refreshSession = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/session", { method: "POST" });
      if (res.ok) {
        setLastActivity(Date.now());
        setShowWarning(false);
        setRemainingMinutes(30);
      } else {
        router.push("/login");
      }
    } catch {
      router.push("/login");
    }
  }, [router]);

  // Track user activity
  useEffect(() => {
    if (isLoginPage) return;

    const updateActivity = () => setLastActivity(Date.now());
    const events = ["mousedown", "keydown", "scroll", "touchstart"];
    events.forEach((e) => window.addEventListener(e, updateActivity));
    return () =>
      events.forEach((e) => window.removeEventListener(e, updateActivity));
  }, [isLoginPage]);

  // Session timeout checker
  useEffect(() => {
    if (isLoginPage) return;

    const interval = setInterval(() => {
      const elapsed = Date.now() - lastActivity;
      const remaining = SESSION_DURATION - elapsed;

      if (remaining <= 0) {
        // Session expired
        fetch("/api/auth/logout", { method: "POST" }).then(() => {
          router.push("/login");
        });
      } else if (remaining <= WARNING_THRESHOLD) {
        setShowWarning(true);
        setRemainingMinutes(Math.ceil(remaining / 60000));
      }
    }, SESSION_CHECK_INTERVAL);

    return () => clearInterval(interval);
  }, [isLoginPage, lastActivity, router]);

  // Periodic session validation
  useEffect(() => {
    if (isLoginPage) return;

    const checkSession = async () => {
      try {
        const res = await fetch("/api/auth/session");
        if (!res.ok) {
          router.push("/login");
        }
      } catch {
        // Network error, don't redirect
      }
    };

    checkSession();
    const interval = setInterval(checkSession, 5 * 60 * 1000); // Every 5 minutes
    return () => clearInterval(interval);
  }, [isLoginPage, router]);

  if (isLoginPage) return <>{children}</>;

  return (
    <>
      {children}

      {/* Session timeout warning modal */}
      {showWarning && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md mx-4 animate-fade-in-up">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800">Session 即將到期</h3>
                <p className="text-sm text-gray-500">
                  剩餘 {remainingMinutes} 分鐘自動登出
                </p>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-6">
              為保護您的帳號安全，系統閒置超過 30 分鐘將自動登出。
              請確認是否要繼續使用系統？
            </p>

            <div className="flex gap-3">
              <button
                onClick={refreshSession}
                className="flex-1 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                繼續使用
              </button>
              <button
                onClick={() => {
                  fetch("/api/auth/logout", { method: "POST" }).then(() => {
                    router.push("/login");
                  });
                }}
                className="flex-1 py-2.5 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors"
              >
                登出系統
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
