import Image from "next/image";

// the-big-tree-logo.png has generous transparent padding around the artwork.
// These numbers crop the box to the artwork so the logo can sit at a real size.
const FULL = { w: 3375, h: 4219 };
const ART = { x: 295, y: 792, w: 2785, h: 2519 };

/**
 * The Big Tree logo with no background. `className` sets the height,
 * e.g. "h-12"; the width follows the artwork's proportions.
 */
export default function BrandLogo({
  alt,
  className = "h-12",
  priority = false,
}) {
  return (
    <span
      className={`relative block shrink-0 overflow-hidden ${className}`}
      style={{ aspectRatio: `${ART.w} / ${ART.h}` }}
    >
      <Image
        src="/assets/images/logos/the-big-tree-logo.png"
        alt={alt}
        width={FULL.w}
        height={FULL.h}
        priority={priority}
        sizes="240px"
        className="absolute max-w-none"
        style={{
          width: `${(FULL.w / ART.w) * 100}%`,
          height: `${(FULL.h / ART.h) * 100}%`,
          left: `${(-ART.x / ART.w) * 100}%`,
          top: `${(-ART.y / ART.h) * 100}%`,
        }}
      />
    </span>
  );
}
