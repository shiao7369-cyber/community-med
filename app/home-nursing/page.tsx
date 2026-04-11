import { modules } from "@/lib/modules";
import ModulePage from "@/components/ModulePage";
import HomeNursingIcon from "@/components/icons/HomeNursingIcon";

const module = modules.find((m) => m.id === "home-nursing")!;

export const metadata = {
  title: `${module.name} — 敏盛I社區醫學管理平台`,
};

export default function HomeNursingPage() {
  return <ModulePage module={module} IconComponent={HomeNursingIcon} />;
}
