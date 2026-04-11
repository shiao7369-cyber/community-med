import { modules } from "@/lib/modules";
import ModulePage from "@/components/ModulePage";
import CancerScreeningIcon from "@/components/icons/CancerScreeningIcon";

const module = modules.find((m) => m.id === "cancer-screening")!;

export const metadata = {
  title: `${module.name} — 敏盛I社區醫學管理平台`,
};

export default function CancerScreeningPage() {
  return <ModulePage module={module} IconComponent={CancerScreeningIcon} />;
}
