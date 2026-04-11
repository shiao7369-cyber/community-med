export default function ReferralCenterIcon({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Hospital left */}
      <rect x="6" y="28" width="24" height="32" rx="3" fill="#FEF9E7" stroke="#F39C12" strokeWidth="2"/>
      <path d="M14 28V22H22V28" stroke="#F39C12" strokeWidth="2"/>
      <line x1="18" y1="34" x2="18" y2="42" stroke="#F39C12" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="14" y1="38" x2="22" y2="38" stroke="#F39C12" strokeWidth="2.5" strokeLinecap="round"/>
      <rect x="12" y="48" width="5" height="12" rx="1" fill="#F39C12" opacity="0.3"/>
      <rect x="21" y="48" width="5" height="12" rx="1" fill="#F39C12" opacity="0.3"/>

      {/* Hospital right */}
      <rect x="50" y="28" width="24" height="32" rx="3" fill="#FEF9E7" stroke="#F39C12" strokeWidth="2"/>
      <path d="M58 28V22H66V28" stroke="#F39C12" strokeWidth="2"/>
      <line x1="62" y1="34" x2="62" y2="42" stroke="#F39C12" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="58" y1="38" x2="66" y2="38" stroke="#F39C12" strokeWidth="2.5" strokeLinecap="round"/>
      <rect x="56" y="48" width="5" height="12" rx="1" fill="#F39C12" opacity="0.3"/>
      <rect x="65" y="48" width="5" height="12" rx="1" fill="#F39C12" opacity="0.3"/>

      {/* Arrows */}
      <path d="M32 38L48 38" stroke="#F39C12" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M44 34L48 38L44 42" stroke="#F39C12" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M48 48L32 48" stroke="#F39C12" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M36 44L32 48L36 52" stroke="#F39C12" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>

      {/* Connection dots */}
      <circle cx="40" cy="22" r="6" fill="#F39C12" opacity="0.2"/>
      <circle cx="40" cy="22" r="3" fill="#F39C12"/>
    </svg>
  );
}
