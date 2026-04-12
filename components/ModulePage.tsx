import Link from "next/link";
import type { Module } from "@/lib/modules";
import SortableFeatureGrid from "./SortableFeatureGrid";

export default function ModulePage({
  module,
  IconComponent,
}: {
  module: Module;
  IconComponent: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumb */}
      <nav className="mb-8">
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

      {/* Module header */}
      <div className="flex items-center gap-6 mb-10">
        <div
          className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center shadow-lg"
          style={{ backgroundColor: module.lightBg }}
        >
          <IconComponent className="w-14 h-14 sm:w-16 sm:h-16" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
            {module.name}
          </h1>
          <p className="text-gray-500 text-base sm:text-lg">
            {module.description}
          </p>
          <div className="flex items-center gap-2 mt-3">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: module.color }}
            />
            <span className="text-sm text-gray-400">
              {module.features.length} 項子功能
            </span>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-1 rounded-full mb-10" style={{ backgroundColor: module.bgColor }}>
        <div
          className="h-full w-1/3 rounded-full"
          style={{ backgroundColor: module.color }}
        />
      </div>

      {/* Feature grid — draggable */}
      <SortableFeatureGrid
        moduleId={module.id}
        features={module.features}
        color={module.color}
        bgColor={module.bgColor}
      />

      {/* Bottom info */}
      <div
        className="mt-12 rounded-2xl p-6 border-2 border-dashed text-center"
        style={{ borderColor: module.bgColor, backgroundColor: module.lightBg }}
      >
        <p className="text-sm text-gray-500">
          此模組正在建置中，如需使用請聯繫系統管理員
        </p>
      </div>
    </div>
  );
}
