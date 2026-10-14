interface RookProps {
  className?: string;
}

/** Faceted, minimalist rook-piece silhouette — line art only. */
export default function Rook({ className }: RookProps) {
  return (
    <svg viewBox="0 0 320 420" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="70" y="370" width="140" height="36" rx="16" stroke="currentColor" strokeWidth="2" />
      <polygon
        points="100,370 220,370 208,320 200,230 210,180 110,180 120,230 112,320"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <polygon
        points="110,180 110,140 132,140 132,160 150,160 150,140 170,140 170,160 188,160 188,140 210,140 210,180"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}
