import { modules } from "@/lib/modules";
import ModulePage from "@/components/ModulePage";
import AUnitIcon from "@/components/icons/AUnitIcon";

const module = modules.find((m) => m.id === "a-unit")!;

export const metadata = {
  title: `${module.name} — 敏盛I社區醫學管理平台`,
};

export default function AUnitPage() {
  return <ModulePage module={module} IconComponent={AUnitIcon} />;
}
