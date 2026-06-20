import { useEffect, useState } from "react";

const SIZES = {
  sm: { cardWidth: 150, cardHeight: 230, spread: 12, arc: 10 },
  md: { cardWidth: 170, cardHeight: 270, spread: 14, arc: 13 },
  lg: { cardWidth: 220, cardHeight: 350, spread: 16, arc: 16 },
};

function useCardSize(defaults) {
  const [size, setSize] = useState(defaults);
  useEffect(() => {
    function update() {
      const w = window.innerWidth;
      setSize(w < 640 ? SIZES.sm : w < 1024 ? SIZES.md : SIZES.lg);
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return size;
}

export default function CardFan({
  images = [],
  spread,
  cardWidth,
  cardHeight,
  arc,
  className = "",
}) {
  const resolved = useCardSize(SIZES.lg);
  const cw = cardWidth ?? resolved.cardWidth;
  const ch = cardHeight ?? resolved.cardHeight;
  const sp = spread ?? resolved.spread;
  const ar = arc ?? resolved.arc;
  const count = images.length;
  const mid = (count - 1) / 2;

  if (count === 0) return null;

  return (
    <div
      className={`relative flex justify-center ${className}`}
      style={{ height: ch + ar }}
    >
      {images.map((image, i) => {
        const src =
          typeof image === "string"
            ? image
            : image.src || image.url || image.imageUrl || image.image;
        const alt =
          typeof image === "string"
            ? `Card ${i + 1}`
            : image.alt || `Card ${i + 1}`;

        const angle = (i - mid) * sp;
        const offsetX = (i - mid) * (cw * 0.55);
        const offsetY = Math.abs(i - mid) * ar;

        return (
          <div
            key={i}
            className={`group absolute left-1/2 bottom-0 origin-bottom rounded-xl overflow-hidden border-2 border-secondary shadow-xl bg-secondary transition-transform duration-300 ease-out hover:-translate-y-6! hover:z-50!`}
            style={{
              width: cw,
              height: ch,
              zIndex: i,
              transform: `translateX(-50%) translateX(${offsetX}px) translateY(${offsetY}px) rotate(${angle}deg)`,
            }}
          >
            {src && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={src} alt={alt} className="w-full h-full object-cover" />
            )}
          </div>
        );
      })}
    </div>
  );
}
