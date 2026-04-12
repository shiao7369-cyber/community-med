import { modules } from "@/lib/modules";
import ModuleCard from "@/components/ModuleCard";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
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
