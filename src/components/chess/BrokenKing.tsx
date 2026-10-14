interface BrokenKingProps {
  className?: string;
}

/**
 * Stylized Staunton king silhouette, split at the crown — the king falls,
 * the structure underneath still holds.
 */
export default function BrokenKing({ className }: BrokenKingProps) {
  return (
    <svg
      viewBox="0 0 400 700"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Body — base, stem, shoulders, neck */}
      <g stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
        <rect x="120" y="620" width="160" height="40" rx="18" />
        <polygon points="140,620 260,620 232,562 168,562" />
        <ellipse cx="200" cy="558" rx="68" ry="20" />
        <rect x="186" y="384" width="28" height="176" />
        <ellipse cx="200" cy="384" rx="52" ry="16" />
        <polygon points="132,384 268,384 238,248 162,248" />
        <ellipse cx="200" cy="248" rx="42" ry="13" />
      </g>

      {/* Fracture line */}
      <polyline
        points="150,252 172,236 158,214 190,196 168,174"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeDasharray="1 7"
        strokeLinecap="round"
      />

      {/* Crown — displaced, mid-fall */}
      <g
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        transform="translate(34 -22) rotate(11 200 150)"
      >
        <rect x="174" y="168" width="52" height="78" rx="4" />
        <ellipse cx="200" cy="168" rx="39" ry="12" />
        <circle cx="200" cy="124" r="42" />
        <rect x="190" y="38" width="20" height="68" />
        <rect x="165" y="58" width="70" height="20" />
      </g>

      {/* Fragments scattering off the break */}
      <g stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
        <polygon points="118,268 138,258 132,286" opacity="0.6" />
        <polygon points="280,300 296,288 294,314" opacity="0.4" />
        <polygon points="104,330 116,322 118,342" opacity="0.3" />
      </g>
    </svg>
  );
}
