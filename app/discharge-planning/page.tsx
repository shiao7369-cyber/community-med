import { modules } from "@/lib/modules";
import ModulePage from "@/components/ModulePage";
import DischargePlanningIcon from "@/components/icons/DischargePlanningIcon";

const module = modules.find((m) => m.id === "discharge-planning")!;

export const metadata = {
  title: `${module.name} — 敏盛I社區醫學管理平台`,
};

export default function DischargePlanningPage() {
  return <ModulePage module={module} IconComponent={DischargePlanningIcon} />;
}
