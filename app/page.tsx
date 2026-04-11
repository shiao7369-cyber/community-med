import { modules } from "@/lib/modules";
import ModuleCard from "@/components/ModuleCard";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Hero section */}
      <div className="text-center mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 rounded-full text-sm text-amber-700 font-medium mb-6 border border-amber-100">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          </svg>
          社區醫學整合管理平台
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 tracking-tight">
          為了您的<span className="relative inline-block mx-1">
            <span className="relative z-10">「社區醫學」</span>
            <span className="absolute bottom-1 left-0 right-0 h-3 bg-amber-200/60 -z-0 rounded"></span>
          </span>
        </h2>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
          七大業務模組，涵蓋居家失能、出院準備、癌症篩檢、轉診管理到社區健康促進，
          <br className="hidden sm:block" />
          一站式整合您的社區醫學業務流程
        </p>
        <div className="flex items-center justify-center gap-6 mt-6 text-sm text-gray-400">
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
            </svg>
            內網安全
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
            即時同步
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            零紙本
          </span>
        </div>
      </div>

      {/* Module grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {modules.map((module, index) => (
          <div
            key={module.id}
            className="animate-fade-in-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <ModuleCard module={module} />
          </div>
        ))}
      </div>

      {/* Stats section */}
      <div className="mt-16 sm:mt-20 grid grid-cols-2 sm:grid-cols-4 gap-6">
        {[
          { label: "業務模組", value: "7", suffix: "大" },
          { label: "子功能", value: "38", suffix: "項" },
          { label: "作業流程", value: "100", suffix: "%" },
          { label: "紙本需求", value: "0", suffix: "" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 shadow-sm"
          >
            <div className="text-3xl sm:text-4xl font-bold text-gray-800">
              {stat.value}
              <span className="text-lg text-gray-400 ml-0.5">{stat.suffix}</span>
            </div>
            <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
