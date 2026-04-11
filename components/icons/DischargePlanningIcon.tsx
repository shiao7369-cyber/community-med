export default function DischargePlanningIcon({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Clipboard */}
      <rect x="18" y="16" width="44" height="56" rx="4" fill="#E8F8F5" stroke="#1ABC9C" strokeWidth="2.5"/>
      <rect x="30" y="10" width="20" height="12" rx="3" fill="#1ABC9C"/>
      <circle cx="40" cy="16" r="3" fill="white"/>
      {/* Checklist */}
      <rect x="26" y="30" width="8" height="8" rx="2" fill="#1ABC9C" opacity="0.3"/>
      <path d="M28 34L30 36L34 32" stroke="#1ABC9C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="38" y1="34" x2="54" y2="34" stroke="#1ABC9C" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>

      <rect x="26" y="42" width="8" height="8" rx="2" fill="#1ABC9C" opacity="0.3"/>
      <path d="M28 46L30 48L34 44" stroke="#1ABC9C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="38" y1="46" x2="50" y2="46" stroke="#1ABC9C" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>

      <rect x="26" y="54" width="8" height="8" rx="2" fill="#1ABC9C" opacity="0.3"/>
      <line x1="38" y1="58" x2="52" y2="58" stroke="#1ABC9C" strokeWidth="2" strokeLinecap="round" opacity="0.4"/>

      {/* Arrow out */}
      <path d="M58 50L66 42L58 34" stroke="#1ABC9C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="66" y1="42" x2="50" y2="42" stroke="#1ABC9C" strokeWidth="3" strokeLinecap="round" opacity="0.5"/>
    </svg>
  );
}
