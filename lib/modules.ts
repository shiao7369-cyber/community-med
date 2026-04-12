export interface SubFeature {
  name: string;
  description: string;
  icon: string; // emoji for sub-features
  ssoLink?: string; // external system URL for SSO redirect
}

export interface Module {
  id: string;
  name: string;
  description: string;
  color: string;
  bgColor: string;
  lightBg: string;
  path: string;
  features: SubFeature[];
}

export const modules: Module[] = [
  {
    id: "home-disability",
    name: "居家失能",
    description: "失能個案評估、照護計畫與長照資源整合管理",
    color: "#E74C3C",
    bgColor: "#FDEDEC",
    lightBg: "#FDF2F2",
    path: "/home-disability",
    features: [
      { name: "失能等級評估", description: "CMS / 巴氏量表管理與自動分級", icon: "📋" },
      { name: "個案管理追蹤", description: "個案狀態、訪視紀錄與進度追蹤", icon: "👤", ssoLink: "https://web-production-e61f8.up.railway.app" },
      { name: "照護計畫制定", description: "依評估結果產出照護計畫書", icon: "📝" },
      { name: "輔具需求評估", description: "輔具申請與配置追蹤管理", icon: "🦽" },
      { name: "長照 ABC 資源連結", description: "串聯社區長照 A/B/C 級單位", icon: "🔗" },
    ],
  },
  {
    id: "discharge-planning",
    name: "出院準備",
    description: "跨團隊出院準備服務與社區銜接照護",
    color: "#1ABC9C",
    bgColor: "#E8F8F5",
    lightBg: "#F0FDF9",
    path: "/discharge-planning",
    features: [
      { name: "出院準備評估表", description: "標準化出院準備需求篩檢", icon: "📄" },
      { name: "跨團隊照會紀錄", description: "醫師、護理、社工、治療師照會", icon: "👥" },
      { name: "轉介資源媒合", description: "自動媒合社區照護資源", icon: "🤝" },
      { name: "出院後追蹤排程", description: "出院後 3/7/14/30 天追蹤排程", icon: "📅" },
      { name: "病人衛教資料派發", description: "客製化衛教單張與影音連結", icon: "📚" },
    ],
  },
  {
    id: "a-unit",
    name: "A 單位",
    description: "居家醫療整合照護計畫收案與管理",
    color: "#2980B9",
    bgColor: "#EBF5FB",
    lightBg: "#F0F8FF",
    path: "/a-unit",
    features: [
      { name: "居家醫療服務", description: "醫師到宅診療服務管理", icon: "🏠" },
      { name: "居家護理訪視", description: "護理師居家訪視排程與紀錄", icon: "💊" },
      { name: "居家藥事照護", description: "藥師居家用藥指導與管理", icon: "💉" },
      { name: "收案/結案管理", description: "個案收案評估與結案審核", icon: "📂" },
      { name: "訪視排程與紀錄", description: "行事曆整合訪視排程管理", icon: "🗓️" },
    ],
  },
  {
    id: "cancer-screening",
    name: "四癌篩檢",
    description: "大腸癌、口腔癌、子宮頸癌、乳癌篩檢管理",
    color: "#27AE60",
    bgColor: "#EAFAF1",
    lightBg: "#F0FFF4",
    path: "/cancer-screening",
    features: [
      { name: "大腸癌篩檢管理", description: "糞便潛血檢查追蹤與陽性轉介", icon: "🔬" },
      { name: "口腔癌篩檢管理", description: "口腔黏膜檢查與高風險追蹤", icon: "👄" },
      { name: "子宮頸癌篩檢管理", description: "抹片檢查排程與結果管理", icon: "🩺" },
      { name: "乳癌篩檢管理", description: "乳房攝影排程與異常追蹤", icon: "🎀" },
      { name: "篩檢績效儀表板", description: "即時統計各癌症篩檢達成率", icon: "📊" },
      { name: "陽性個案追蹤", description: "陽性結果追蹤至確診與治療", icon: "🔍" },
    ],
  },
  {
    id: "referral-center",
    name: "轉診中心",
    description: "雙向轉診管理與合作醫院資源整合",
    color: "#F39C12",
    bgColor: "#FEF9E7",
    lightBg: "#FFFEF5",
    path: "/referral-center",
    features: [
      { name: "上轉/下轉管理", description: "轉診流程電子化與進度追蹤", icon: "🔄" },
      { name: "轉診單電子化", description: "電子轉診單製作與傳送", icon: "📨" },
      { name: "合作醫院聯繫", description: "合作醫院窗口與排程管理", icon: "🏥" },
      { name: "轉診績效統計", description: "轉診量、回轉率與時效分析", icon: "📈" },
      { name: "雙向轉診追蹤", description: "病人轉診後狀態回饋追蹤", icon: "🔁" },
    ],
  },
  {
    id: "home-nursing",
    name: "居護所長居家醫療",
    description: "居護所與所長居家醫療整合管理系統",
    color: "#8E44AD",
    bgColor: "#F5EEF8",
    lightBg: "#FAF5FF",
    path: "/home-nursing",
    features: [
      { name: "居護所收案管理", description: "居家護理所個案收案與評估", icon: "📑" },
      { name: "所長巡診排程", description: "所長醫師巡診行程規劃", icon: "🗺️" },
      { name: "護理訪視紀錄", description: "居家護理訪視紀錄電子化", icon: "✍️" },
      { name: "居家醫療醫囑管理", description: "醫囑開立、修改與執行追蹤", icon: "💊" },
      { name: "耗材與藥品管理", description: "居家醫療耗材庫存與領用", icon: "📦" },
    ],
  },
  {
    id: "community-health",
    name: "社區經營 & 健康促進",
    description: "社區健康營造、活動規劃與志工管理",
    color: "#E67E22",
    bgColor: "#FDF2E9",
    lightBg: "#FFF8F0",
    path: "/community-health",
    features: [
      { name: "社區活動規劃", description: "社區健康促進活動企劃與執行", icon: "🎯" },
      { name: "健康講座管理", description: "講座排程、講師邀約與成效評估", icon: "🎤" },
      { name: "篩檢活動排程", description: "社區整合式篩檢活動管理", icon: "📆" },
      { name: "社區資源盤點", description: "社區健康資源地圖與盤點", icon: "🗂️" },
      { name: "健康促進方案追蹤", description: "各方案執行進度與成效追蹤", icon: "📉" },
      { name: "志工管理", description: "志工招募、訓練與服務時數", icon: "🙋" },
    ],
  },
];
