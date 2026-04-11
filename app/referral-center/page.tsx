import { modules } from "@/lib/modules";
import ModulePage from "@/components/ModulePage";
import ReferralCenterIcon from "@/components/icons/ReferralCenterIcon";

const module = modules.find((m) => m.id === "referral-center")!;

export const metadata = {
  title: `${module.name} — 敏盛I社區醫學管理平台`,
};

export default function ReferralCenterPage() {
  return <ModulePage module={module} IconComponent={ReferralCenterIcon} />;
}
