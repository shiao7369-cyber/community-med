export default function AUnitIcon({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* House outline */}
      <path d="M40 10L8 34V70H72V34L40 10Z" fill="#EBF5FB" stroke="#2980B9" strokeWidth="2.5" strokeLinejoin="round"/>
      <path d="M40 10L8 34H72L40 10Z" fill="#2980B9" opacity="0.15"/>
      {/* Stethoscope */}
      <path d="M32 38C32 38 28 44 28 50C28 56 34 58 38 54" stroke="#2980B9" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M48 38C48 38 52 44 52 50C52 56 46 58 42 54" stroke="#2980B9" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="40" cy="56" r="4" fill="#2980B9" opacity="0.3" stroke="#2980B9" strokeWidth="2"/>
      <circle cx="32" cy="36" r="3" fill="#2980B9"/>
      <circle cx="48" cy="36" r="3" fill="#2980B9"/>
      {/* A letter */}
      <text x="36" y="68" fontFamily="Arial" fontWeight="bold" fontSize="14" fill="#2980B9" opacity="0.6">A</text>
    </svg>
  );
}
