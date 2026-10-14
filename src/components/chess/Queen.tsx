interface QueenProps {
  className?: string;
}

/** Faceted, minimalist queen-piece silhouette — line art only. */
export default function Queen({ className }: QueenProps) {
  return (
    <svg viewBox="0 0 320 420" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="70" y="370" width="140" height="36" rx="16" stroke="currentColor" strokeWidth="2" />
      <polygon
        points="95,370 225,370 205,300 180,250 200,210 200,180 120,180 120,210 140,250 115,300"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <polygon
        points="120,180 120,150 140,170 160,118 180,170 200,150 200,180"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="120" cy="150" r="8" fill="currentColor" stroke="none" />
      <circle cx="160" cy="118" r="8" fill="currentColor" stroke="none" />
      <circle cx="200" cy="150" r="8" fill="currentColor" stroke="none" />
    </svg>
  );
}
