export default function CancerScreeningIcon({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Magnifying glass */}
      <circle cx="34" cy="34" r="20" fill="#EAFAF1" stroke="#27AE60" strokeWidth="2.5"/>
      <line x1="48" y1="48" x2="66" y2="66" stroke="#27AE60" strokeWidth="4" strokeLinecap="round"/>
      {/* Cells inside magnifier */}
      <circle cx="28" cy="30" r="5" fill="#27AE60" opacity="0.2" stroke="#27AE60" strokeWidth="1.5"/>
      <circle cx="38" cy="28" r="4" fill="#27AE60" opacity="0.3" stroke="#27AE60" strokeWidth="1.5"/>
      <circle cx="32" cy="40" r="4.5" fill="#27AE60" opacity="0.2" stroke="#27AE60" strokeWidth="1.5"/>
      <circle cx="42" cy="38" r="3" fill="#27AE60" opacity="0.25" stroke="#27AE60" strokeWidth="1.5"/>
      {/* Checkmark badge */}
      <circle cx="60" cy="20" r="10" fill="#27AE60"/>
      <path d="M55 20L58 23L65 16" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
