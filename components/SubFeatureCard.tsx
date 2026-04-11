import type { SubFeature } from "@/lib/modules";

export default function SubFeatureCard({
  feature,
  color,
  bgColor,
  index,
}: {
  feature: SubFeature;
  color: string;
  bgColor: string;
  index: number;
}) {
  return (
    <div
      className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg border border-gray-100 hover:border-transparent transition-all duration-300 hover:-translate-y-1 cursor-pointer"
      style={{
        animationDelay: `${index * 80}ms`,
      }}
    >
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-110"
          style={{ backgroundColor: bgColor }}
        >
          {feature.icon}
        </div>

        <div className="flex-1 min-w-0">
          {/* Title */}
          <h4 className="text-base font-bold text-gray-800 mb-1 group-hover:text-gray-900">
            {feature.name}
          </h4>

          {/* Description */}
          <p className="text-sm text-gray-500 leading-relaxed">
            {feature.description}
          </p>
        </div>

        {/* Status indicator */}
        <div
          className="w-3 h-3 rounded-full shrink-0 mt-1.5 opacity-60 group-hover:opacity-100 transition-opacity"
          style={{ backgroundColor: color }}
        />
      </div>

      {/* Bottom accent */}
      <div
        className="mt-4 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ backgroundColor: color }}
      />
    </div>
  );
}
