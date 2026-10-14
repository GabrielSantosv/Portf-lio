interface KnightProps {
  className?: string;
}

/** Faceted, minimalist knight-piece silhouette — line art only. */
export default function Knight({ className }: KnightProps) {
  return (
    <svg
      viewBox="0 0 320 420"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="70" y="370" width="140" height="36" rx="16" stroke="currentColor" strokeWidth="2" />
      <polygon
        points="85,370 85,300 70,230 95,165 80,120 105,70 120,105 100,140 140,100 190,80 245,110 230,150 195,165 175,145 160,190 185,225 165,260 190,370"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="150" cy="118" r="4" fill="currentColor" stroke="none" opacity="0.8" />
    </svg>
  );
}
