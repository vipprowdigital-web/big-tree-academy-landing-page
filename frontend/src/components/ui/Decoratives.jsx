/**
 * DecorativeSVGs.jsx
 * Drop-in decorative SVG components for The Big Tree Beauty Academy.
 * All use currentColor so they inherit whatever text color the parent sets.
 * Usage: <BotanicalBranch className="absolute top-10 left-4 w-40 h-40 opacity-20 pointer-events-none" />
 */

// ── 1. Botanical Branch — top-left corner ──────────────────────────────────────
export function BotanicalBranch({ className = "" }) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      className={className}
      aria-hidden="true"
    >
      {/* Main stem */}
      <path d="M30,170 C50,130 80,90 120,40" strokeWidth="0.8" />
      {/* Side branches */}
      <path d="M60,130 C75,115 95,108 110,100" strokeWidth="0.5" />
      <path d="M80,108 C92,95 105,92 118,88" strokeWidth="0.5" />
      <path d="M95,90 C104,78 114,75 124,70" strokeWidth="0.4" />
      <path d="M55,135 C45,118 42,105 44,90" strokeWidth="0.4" />
      <path d="M44,90 C48,75 56,68 62,60" strokeWidth="0.3" />
      {/* Leaf tips */}
      <ellipse
        cx="62"
        cy="58"
        rx="8"
        ry="14"
        transform="rotate(-40 62 58)"
        strokeWidth="0.4"
        opacity="0.6"
      />
      <ellipse
        cx="112"
        cy="68"
        rx="7"
        ry="12"
        transform="rotate(-20 112 68)"
        strokeWidth="0.4"
        opacity="0.6"
      />
      <ellipse
        cx="120"
        cy="38"
        rx="6"
        ry="11"
        transform="rotate(-55 120 38)"
        strokeWidth="0.4"
        opacity="0.6"
      />
    </svg>
  );
}

// ── 2. Tropical Leaf — top-right corner (mirror of branch) ────────────────────
export function TropicalLeaf({ className = "" }) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M170,30 C130,60 90,100 40,170" strokeWidth="0.8" />
      <path d="M130,55 C118,68 108,72 95,78" strokeWidth="0.5" />
      <path d="M108,78 C98,88 90,92 78,96" strokeWidth="0.5" />
      <path d="M85,100 C78,108 70,112 60,116" strokeWidth="0.4" />
      <path d="M140,48 C148,65 148,80 144,96" strokeWidth="0.4" />
      <path d="M144,96 C140,108 132,116 126,122" strokeWidth="0.3" />
      <ellipse
        cx="170"
        cy="28"
        rx="9"
        ry="16"
        transform="rotate(40 170 28)"
        strokeWidth="0.4"
        opacity="0.6"
      />
      <ellipse
        cx="88"
        cy="98"
        rx="7"
        ry="12"
        transform="rotate(20 88 98)"
        strokeWidth="0.4"
        opacity="0.6"
      />
    </svg>
  );
}

// ── 3. Fern Frond — symmetrical, good for center watermark ───────────────────
export function FernFrond({ className = "" }) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M100,180 C100,140 100,90 100,20" strokeWidth="0.7" />
      <path d="M100,140 C88,128 76,124 64,122" strokeWidth="0.4" />
      <path d="M100,120 C88,108 78,104 68,100" strokeWidth="0.4" />
      <path d="M100,100 C90,90 82,86 72,82" strokeWidth="0.4" />
      <path d="M100,80 C92,72 86,68 78,65" strokeWidth="0.3" />
      <path d="M100,60 C94,54 90,50 84,48" strokeWidth="0.3" />
      <path d="M100,140 C112,128 124,124 136,122" strokeWidth="0.4" />
      <path d="M100,120 C112,108 122,104 132,100" strokeWidth="0.4" />
      <path d="M100,100 C110,90 118,86 128,82" strokeWidth="0.4" />
      <path d="M100,80 C108,72 114,68 122,65" strokeWidth="0.3" />
      <path d="M100,60 C106,54 110,50 116,48" strokeWidth="0.3" />
    </svg>
  );
}

// ── 4. Rose Bloom — for feature cards or section accents ─────────────────────
export function RoseBloom({ className = "" }) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M100,90 C100,70 112,58 120,50 C120,68 112,80 100,90Z"
        strokeWidth="0.5"
      />
      <path
        d="M100,90 C118,86 132,92 140,100 C124,108 110,104 100,90Z"
        strokeWidth="0.5"
      />
      <path
        d="M100,90 C100,110 90,122 82,130 C80,112 86,98 100,90Z"
        strokeWidth="0.5"
      />
      <path
        d="M100,90 C82,86 68,90 60,100 C74,112 90,108 100,90Z"
        strokeWidth="0.5"
      />
      <path
        d="M100,90 C90,74 92,60 96,50 C104,58 108,74 100,90Z"
        strokeWidth="0.4"
        opacity="0.6"
      />
      <path
        d="M100,90 C116,98 122,112 122,122 C114,116 104,104 100,90Z"
        strokeWidth="0.4"
        opacity="0.6"
      />
      <path
        d="M100,90 C88,100 76,100 68,96 C74,88 88,84 100,90Z"
        strokeWidth="0.4"
        opacity="0.6"
      />
      <circle cx="100" cy="90" r="6" strokeWidth="0.4" opacity="0.4" />
      <path d="M100,130 C100,145 96,155 92,165" strokeWidth="0.6" />
      <path d="M96,152 C88,148 80,150 74,155" strokeWidth="0.4" />
    </svg>
  );
}

// ── 5. Sparkle Scatter — use as background texture layer ─────────────────────
export function SparkleScatter({ className = "" }) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      stroke="currentColor"
      className={className}
      aria-hidden="true"
    >
      <circle cx="40" cy="40" r="2" fill="currentColor" opacity="0.3" />
      <circle cx="70" cy="25" r="1.5" fill="currentColor" opacity="0.2" />
      <circle cx="160" cy="45" r="2" fill="currentColor" opacity="0.25" />
      <circle cx="145" cy="70" r="1.5" fill="currentColor" opacity="0.2" />
      <circle cx="30" cy="90" r="1.5" fill="currentColor" opacity="0.2" />
      <circle cx="170" cy="120" r="2" fill="currentColor" opacity="0.25" />
      <circle cx="50" cy="160" r="1.5" fill="currentColor" opacity="0.2" />
      <circle cx="155" cy="165" r="2" fill="currentColor" opacity="0.3" />
      {/* 4-point sparkle stars */}
      <path
        d="M100,35 L103,47 L115,50 L103,53 L100,65 L97,53 L85,50 L97,47 Z"
        strokeWidth="0.5"
        opacity="0.5"
      />
      <path
        d="M40,100 L42,108 L50,110 L42,112 L40,120 L38,112 L30,110 L38,108 Z"
        strokeWidth="0.4"
        opacity="0.4"
      />
      <path
        d="M160,90 L162,97 L169,99 L162,101 L160,108 L158,101 L151,99 L158,97 Z"
        strokeWidth="0.4"
        opacity="0.4"
      />
      <path
        d="M70,155 L71.5,161 L78,162.5 L71.5,164 L70,170 L68.5,164 L62,162.5 L68.5,161 Z"
        strokeWidth="0.3"
        opacity="0.35"
      />
      <path
        d="M140,30 L141,34 L145,35 L141,36 L140,40 L139,36 L135,35 L139,34 Z"
        strokeWidth="0.3"
        opacity="0.3"
      />
    </svg>
  );
}

// ── 6. Corner Flourish — radiating arc lines for any corner ──────────────────
export function CornerFlourish({ className = "" }) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M20,180 C20,100 100,20 180,20" strokeWidth="0.6" />
      <path d="M20,180 C30,120 80,70 140,40" strokeWidth="0.4" opacity="0.5" />
      <path d="M20,180 C40,130 90,85 150,60" strokeWidth="0.3" opacity="0.35" />
      <path
        d="M60,145 C70,130 85,120 100,115"
        strokeWidth="0.4"
        opacity="0.5"
      />
      <path d="M95,105 C108,92 122,86 136,82" strokeWidth="0.3" opacity="0.4" />
      <circle cx="180" cy="20" r="4" fill="currentColor" opacity="0.2" />
      <circle cx="20" cy="180" r="4" fill="currentColor" opacity="0.2" />
      <circle cx="100" cy="75" r="2.5" fill="currentColor" opacity="0.15" />
    </svg>
  );
}

export function PerfumeBottle({ className = "" }) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* cap */}
      <rect x="78" y="35" width="44" height="32" rx="6" strokeWidth="1" />
      {/* neck */}
      <rect x="85" y="65" width="30" height="28" strokeWidth="0.8" />
      {/* body */}
      <rect x="70" y="90" width="60" height="80" rx="10" strokeWidth="1.2" />
      {/* liquid level */}
      <line
        x1="78"
        y1="130"
        x2="122"
        y2="130"
        strokeWidth="0.5"
        strokeDasharray="2 3"
        opacity="0.5"
      />
      {/* label */}
      <rect
        x="80"
        y="140"
        width="40"
        height="18"
        rx="2"
        strokeWidth="0.5"
        opacity="0.7"
      />
      <line
        x1="86"
        y1="146"
        x2="114"
        y2="146"
        strokeWidth="0.4"
        opacity="0.6"
      />
      <line
        x1="86"
        y1="151"
        x2="106"
        y2="151"
        strokeWidth="0.4"
        opacity="0.6"
      />
    </svg>
  );
}

export function Lipstick({ className = "" }) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* tube */}
      <rect x="80" y="110" width="40" height="70" rx="8" strokeWidth="1.2" />
      <line x1="80" y1="121" x2="120" y2="121" strokeWidth="0.8" />
      {/* bullet */}
      <path
        d="M86,110 L86,72 Q86,58 100,52 Q114,58 114,72 L114,110 Z"
        strokeWidth="1.2"
      />
      <path d="M93,107 L93,70" strokeWidth="0.4" opacity="0.5" />
    </svg>
  );
}

export function MakeupBrush({ className = "" }) {
  return (
    <svg
      viewBox="0 0 240 240"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* 1. Fluffy, dense bristle head (flares out gently from ferrule then arches beautifully at tip) */}
      <path
        d="M 96,78 
           C 82,78 72,55 72,36 
           C 72,16 94,10 120,10 
           C 146,10 168,16 168,36 
           C 168,55 158,78 144,78 
           Z"
        strokeWidth="4"
      />

      {/* Bristle inner texture lines for organic depth & flow */}
      <path d="M 108,76 C 102,60 102,40 108,20" strokeWidth="1" opacity="0.4" />
      <path
        d="M 120,76 C 120,55 120,35 120,14"
        strokeWidth="1.2"
        opacity="0.4"
      />
      <path d="M 132,76 C 138,60 138,40 132,20" strokeWidth="1" opacity="0.4" />

      {/* 2. Premium Metal Ferrule (perfect alignment link between bristles and handle) */}
      <path d="M 96,78 L 144,78 L 141,114 L 99,114 Z" strokeWidth="3.5" />
      {/* Horizontal style ridges reflecting glossy metallic surfaces */}
      <line
        x1="97.5"
        y1="90"
        x2="142.5"
        y2="90"
        strokeWidth="1.5"
        opacity="0.6"
      />
      <line
        x1="98.5"
        y1="102"
        x2="141.5"
        y2="102"
        strokeWidth="1.5"
        opacity="0.6"
      />

      {/* 3. Sleek Ergonomic Handle (slims gracefully down, dropping into a weighted tip) */}
      <path
        d="M 99,114 
           L 105,190 
           C 106,215 110,230 120,230 
           C 130,230 134,215 135,190 
           L 141,114"
        strokeWidth="4"
      />
      {/* Elegant light-catching ridge along the handle stem */}
      <path d="M 115,124 L 115,195" strokeWidth="1" opacity="0.3" />
    </svg>
  );
}

export function NailPolish({ className = "" }) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* cap */}
      <rect x="84" y="85" width="32" height="38" rx="6" strokeWidth="1" />
      {/* brush stick */}
      <line
        x1="100"
        y1="85"
        x2="100"
        y2="123"
        strokeWidth="0.5"
        opacity="0.6"
      />
      {/* bottle */}
      <rect x="80" y="120" width="40" height="50" rx="10" strokeWidth="1.2" />
      <line
        x1="86"
        y1="135"
        x2="114"
        y2="135"
        strokeWidth="0.4"
        strokeDasharray="2 3"
        opacity="0.5"
      />
    </svg>
  );
}

export function CompactPowder({ className = "" }) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="100" cy="100" r="48" strokeWidth="1.2" />
      <circle cx="100" cy="100" r="34" strokeWidth="0.5" opacity="0.6" />
      <circle cx="100" cy="100" r="7" strokeWidth="0.5" opacity="0.8" />
      <path d="M70,72 C80,80 85,90 84,100" strokeWidth="0.4" opacity="0.4" />
    </svg>
  );
}
