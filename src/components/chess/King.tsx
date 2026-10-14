interface KingProps {
  className?: string;
}

/** Faceted, minimalist king-piece silhouette — line art only. */
export default function King({ className }: KingProps) {
  return (
    <svg viewBox="0 0 320 420" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="70" y="370" width="140" height="36" rx="16" stroke="currentColor" strokeWidth="2" />
      <polygon
        points="95,370 225,370 205,300 180,250 200,210 200,180 120,180 120,210 140,250 115,300"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="160" cy="163" r="11" stroke="currentColor" strokeWidth="2" />
      <rect x="153" y="95" width="14" height="55" fill="currentColor" stroke="none" />
      <rect x="135" y="113" width="50" height="14" fill="currentColor" stroke="none" />
    </svg>
  );
}
