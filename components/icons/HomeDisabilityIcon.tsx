export default function HomeDisabilityIcon({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* House */}
      <path d="M40 12L12 32V68H68V32L40 12Z" fill="#FDEDEC" stroke="#E74C3C" strokeWidth="2.5" strokeLinejoin="round"/>
      <path d="M40 12L12 32H68L40 12Z" fill="#E74C3C" opacity="0.2"/>
      {/* Door */}
      <rect x="33" y="46" width="14" height="22" rx="2" fill="#E74C3C" opacity="0.6"/>
      <circle cx="44" cy="57" r="1.5" fill="white"/>
      {/* Heart */}
      <path d="M40 30C40 30 33 24 29 28C25 32 29 38 40 44C51 38 55 32 51 28C47 24 40 30 40 30Z" fill="#E74C3C" opacity="0.8"/>
      {/* Person with wheelchair hint */}
      <circle cx="56" cy="52" r="4" fill="#E74C3C" opacity="0.5"/>
      <path d="M56 56V62M52 60H60" stroke="#E74C3C" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}
