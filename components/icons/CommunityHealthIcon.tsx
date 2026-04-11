export default function CommunityHealthIcon({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* People circle */}
      <circle cx="40" cy="40" r="28" fill="#FDF2E9" stroke="#E67E22" strokeWidth="2" strokeDasharray="4 3"/>

      {/* Center heart */}
      <path d="M40 35C40 35 35 30 32 33C29 36 32 40 40 46C48 40 51 36 48 33C45 30 40 35 40 35Z" fill="#E67E22" opacity="0.7"/>

      {/* People around */}
      <circle cx="40" cy="14" r="5" fill="#E67E22" opacity="0.6"/>
      <path d="M35 22H45" stroke="#E67E22" strokeWidth="2" strokeLinecap="round" opacity="0.4"/>

      <circle cx="62" cy="24" r="5" fill="#E67E22" opacity="0.5"/>
      <path d="M58 31H66" stroke="#E67E22" strokeWidth="2" strokeLinecap="round" opacity="0.3"/>

      <circle cx="66" cy="46" r="5" fill="#E67E22" opacity="0.6"/>
      <path d="M62 53H70" stroke="#E67E22" strokeWidth="2" strokeLinecap="round" opacity="0.4"/>

      <circle cx="18" cy="24" r="5" fill="#E67E22" opacity="0.5"/>
      <path d="M14 31H22" stroke="#E67E22" strokeWidth="2" strokeLinecap="round" opacity="0.3"/>

      <circle cx="14" cy="46" r="5" fill="#E67E22" opacity="0.6"/>
      <path d="M10 53H18" stroke="#E67E22" strokeWidth="2" strokeLinecap="round" opacity="0.4"/>

      <circle cx="28" cy="64" r="5" fill="#E67E22" opacity="0.5"/>
      <circle cx="52" cy="64" r="5" fill="#E67E22" opacity="0.5"/>

      {/* Pulse line */}
      <path d="M30 50L35 50L37 46L40 54L43 46L45 50L50 50" stroke="#E67E22" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
