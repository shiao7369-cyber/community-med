export default function HomeNursingIcon({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Nurse cap */}
      <path d="M24 30H56L52 20H28L24 30Z" fill="#F5EEF8" stroke="#8E44AD" strokeWidth="2" strokeLinejoin="round"/>
      <line x1="36" y1="22" x2="36" y2="28" stroke="#8E44AD" strokeWidth="2" strokeLinecap="round"/>
      <line x1="33" y1="25" x2="39" y2="25" stroke="#8E44AD" strokeWidth="2" strokeLinecap="round"/>

      {/* Person */}
      <circle cx="40" cy="38" r="8" fill="#F5EEF8" stroke="#8E44AD" strokeWidth="2"/>
      <circle cx="37" cy="36" r="1.5" fill="#8E44AD"/>
      <circle cx="43" cy="36" r="1.5" fill="#8E44AD"/>
      <path d="M36 41C36 41 38 43 40 43C42 43 44 41 44 41" stroke="#8E44AD" strokeWidth="1.5" strokeLinecap="round"/>

      {/* House */}
      <path d="M16 52L40 42L64 52V70H16V52Z" fill="#F5EEF8" stroke="#8E44AD" strokeWidth="2" strokeLinejoin="round"/>
      <rect x="34" y="56" width="12" height="14" rx="2" fill="#8E44AD" opacity="0.3"/>
      <circle cx="43" cy="63" r="1.5" fill="#8E44AD" opacity="0.6"/>

      {/* Medical cross on house */}
      <line x1="24" y1="56" x2="24" y2="64" stroke="#8E44AD" strokeWidth="2.5" strokeLinecap="round" opacity="0.5"/>
      <line x1="20" y1="60" x2="28" y2="60" stroke="#8E44AD" strokeWidth="2.5" strokeLinecap="round" opacity="0.5"/>
    </svg>
  );
}
