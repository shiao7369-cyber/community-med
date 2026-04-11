"use client";

import { usePathname } from "next/navigation";

export default function BackgroundPattern() {
  const pathname = usePathname();
  if (pathname === "/login") return null;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="diamonds" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <rect width="60" height="60" fill="transparent"/>
            <rect x="0" y="0" width="30" height="30" fill="#FFF9C4" opacity="0.3"/>
            <rect x="30" y="30" width="30" height="30" fill="#FFF9C4" opacity="0.3"/>
            <rect x="0" y="30" width="30" height="30" fill="#FFFDE7" opacity="0.2"/>
            <rect x="30" y="0" width="30" height="30" fill="#FFFDE7" opacity="0.2"/>
          </pattern>
          <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="white" stopOpacity="0.1"/>
            <stop offset="50%" stopColor="white" stopOpacity="0"/>
            <stop offset="100%" stopColor="white" stopOpacity="0.3"/>
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#diamonds)"/>
        <rect width="100%" height="100%" fill="url(#fade)"/>
      </svg>
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-amber-100/40 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-50/40 to-transparent rounded-full blur-3xl"></div>
    </div>
  );
}
