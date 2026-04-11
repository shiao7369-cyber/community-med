import { modules } from "@/lib/modules";
import ModulePage from "@/components/ModulePage";
import CommunityHealthIcon from "@/components/icons/CommunityHealthIcon";

const module = modules.find((m) => m.id === "community-health")!;

export const metadata = {
  title: `${module.name} — 敏盛I社區醫學管理平台`,
};

export default function CommunityHealthPage() {
  return <ModulePage module={module} IconComponent={CommunityHealthIcon} />;
}
