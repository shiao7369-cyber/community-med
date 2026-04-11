import { modules } from "@/lib/modules";
import ModulePage from "@/components/ModulePage";
import HomeDisabilityIcon from "@/components/icons/HomeDisabilityIcon";

const module = modules.find((m) => m.id === "home-disability")!;

export const metadata = {
  title: `${module.name} — 敏盛I社區醫學管理平台`,
};

export default function HomeDisabilityPage() {
  return <ModulePage module={module} IconComponent={HomeDisabilityIcon} />;
}
