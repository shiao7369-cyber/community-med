"use client";

import { useState } from "react";
import type { SubFeature } from "@/lib/modules";

export default function SubFeatureCard({
  feature,
  color,
  bgColor,
  index,
  isDragging,
}: {
  feature: SubFeature;
  color: string;
  bgColor: string;
  index: number;
  isDragging?: boolean;
}) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (!feature.ssoLink || loading) return;
    setLoading(true);

    try {
      const res = await fetch("/api/auth/sso-token", { method: "POST" });
      if (!res.ok) throw new Error("SSO token 取得失敗");
      const { token } = await res.json();
      window.open(`${feature.ssoLink}?sso=${token}`, "_blank");
    } catch (err) {
      console.error("SSO redirect failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg border border-gray-100 hover:border-transparent transition-all duration-300 hover:-translate-y-1 ${
        isDragging ? "shadow-2xl ring-2 ring-blue-400/50 cursor-grabbing" : "cursor-grab"
      } ${feature.ssoLink ? "cursor-pointer" : ""}`}
      style={{
        animationDelay: `${index * 80}ms`,
      }}
    >
      <div className="flex items-start gap-4">
        {/* Drag handle indicator */}
        <div className="flex flex-col gap-0.5 pt-2 opacity-0 group-hover:opacity-40 transition-opacity shrink-0">
          <div className="flex gap-0.5">
            <span className="w-1 h-1 rounded-full bg-gray-400" />
            <span className="w-1 h-1 rounded-full bg-gray-400" />
          </div>
          <div className="flex gap-0.5">
            <span className="w-1 h-1 rounded-full bg-gray-400" />
            <span className="w-1 h-1 rounded-full bg-gray-400" />
          </div>
          <div className="flex gap-0.5">
            <span className="w-1 h-1 rounded-full bg-gray-400" />
            <span className="w-1 h-1 rounded-full bg-gray-400" />
          </div>
        </div>

        {/* Icon */}
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-110"
          style={{ backgroundColor: bgColor }}
        >
          {feature.icon}
        </div>

        <div className="flex-1 min-w-0">
          {/* Title */}
          <div className="flex items-center gap-2">
            <h4 className="text-base font-bold text-gray-800 mb-1 group-hover:text-gray-900">
              {feature.name}
            </h4>
            {feature.ssoLink && (
              <svg
                className="w-4 h-4 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            )}
          </div>

          {/* Description */}
          <p className="text-sm text-gray-500 leading-relaxed">
            {feature.description}
          </p>
        </div>

        {/* Status indicator */}
        <div
          className={`w-3 h-3 rounded-full shrink-0 mt-1.5 transition-opacity ${
            feature.ssoLink
              ? "opacity-100 animate-pulse bg-green-500"
              : "opacity-60 group-hover:opacity-100"
          }`}
          style={feature.ssoLink ? {} : { backgroundColor: color }}
        />
      </div>

      {/* Bottom accent */}
      <div
        className="mt-4 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ backgroundColor: feature.ssoLink ? "#3B82F6" : color }}
      />

      {/* Loading overlay */}
      {loading && (
        <div className="absolute inset-0 bg-white/60 rounded-2xl flex items-center justify-center">
          <svg className="animate-spin w-6 h-6 text-blue-500" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
          </svg>
        </div>
      )}
    </div>
  );
}
