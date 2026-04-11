"use client";

import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  if (pathname === "/login") return null;

  return (
    <footer className="bg-gray-50 border-t border-gray-100 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} 敏盛I社區醫學管理平台
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Powered by AI-Driven Healthcare Innovation
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              系統運行中
            </span>
            <span>內部網路專用</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
