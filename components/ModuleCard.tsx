import Link from "next/link";
import type { Module } from "@/lib/modules";
import HomeDisabilityIcon from "./icons/HomeDisabilityIcon";
import DischargePlanningIcon from "./icons/DischargePlanningIcon";
import AUnitIcon from "./icons/AUnitIcon";
import CancerScreeningIcon from "./icons/CancerScreeningIcon";
import ReferralCenterIcon from "./icons/ReferralCenterIcon";
import HomeNursingIcon from "./icons/HomeNursingIcon";
import CommunityHealthIcon from "./icons/CommunityHealthIcon";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "home-disability": HomeDisabilityIcon,
  "discharge-planning": DischargePlanningIcon,
  "a-unit": AUnitIcon,
  "cancer-screening": CancerScreeningIcon,
  "referral-center": ReferralCenterIcon,
  "home-nursing": HomeNursingIcon,
  "community-health": CommunityHealthIcon,
};

export default function ModuleCard({ module }: { module: Module }) {
  const IconComponent = iconMap[module.id];

  return (
    <Link href={module.path} className="group block h-full">
      <div
        className="relative bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl transition-all duration-300 ease-out border border-gray-100 hover:border-transparent hover:-translate-y-2 overflow-hidden h-full flex flex-col"
      >
        {/* Color accent bar */}
        <div
          className="absolute top-0 left-0 right-0 h-1.5 rounded-t-2xl transition-all duration-300 group-hover:h-2"
          style={{ backgroundColor: module.color }}
        />

        {/* Icon */}
        <div
          className="w-20 h-20 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 shadow-sm"
          style={{ backgroundColor: module.lightBg }}
        >
          {IconComponent && <IconComponent className="w-14 h-14" />}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-gray-900">
          {module.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-500 mb-4 leading-relaxed flex-grow">
          {module.description}
        </p>

        {/* Feature tags */}
        <div className="flex flex-wrap gap-1.5">
          {module.features.slice(0, 4).map((feature) => (
            <span
              key={feature.name}
              className="px-2.5 py-1 text-xs rounded-full font-medium transition-colors"
              style={{
                backgroundColor: module.bgColor,
                color: module.color,
              }}
            >
              {feature.name}
            </span>
          ))}
          {module.features.length > 4 && (
            <span
              className="px-2.5 py-1 text-xs rounded-full font-medium"
              style={{
                backgroundColor: module.bgColor,
                color: module.color,
              }}
            >
              +{module.features.length - 4} more
            </span>
          )}
        </div>

        {/* Arrow indicator */}
        <div
          className="absolute bottom-4 right-4 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0"
          style={{ backgroundColor: module.color }}
        >
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
