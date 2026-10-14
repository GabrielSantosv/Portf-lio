interface BishopProps {
  className?: string;
}

/** Faceted, minimalist bishop-piece silhouette — line art only. */
export default function Bishop({ className }: BishopProps) {
  return (
    <svg viewBox="0 0 320 420" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="70" y="370" width="140" height="36" rx="16" stroke="currentColor" strokeWidth="2" />
      <polygon
        points="110,370 210,370 195,300 170,250 190,210 160,175 190,150 160,120 130,150 160,175 130,210 150,250 125,300"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <line x1="138" y1="158" x2="178" y2="172" stroke="currentColor" strokeWidth="2" />
      <circle cx="160" cy="100" r="10" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
