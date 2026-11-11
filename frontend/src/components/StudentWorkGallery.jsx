"use client";

import { useEffect, useRef, useState } from "react";
import { PiCaretLeft, PiCaretRight } from "react-icons/pi";
import { useReveal } from "@/utils/motion";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000";

function PhotoCard({ photo }) {
  const src = photo.imageUrl || photo.url || photo.src || photo.image;
  const alt = photo.alt || photo.title || photo.label || "Student work";
  const tag = photo.tag || photo.category;
  const label = photo.label || photo.title || photo.alt;

  return (
    <figure className="group crop relative aspect-4/5 w-64 sm:w-72 shrink-0 snap-start">
      {src && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          loading="lazy"
          draggable={false}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      )}
      {(tag || label) && (
        <figcaption className="absolute inset-x-0 bottom-0 bg-primary text-white p-4 translate-y-full invisible group-hover:visible group-focus-within:visible group-hover:translate-y-0 transition-transform duration-500">
          {tag && <p className="text-xs font-bold text-gold">{tag}</p>}
          {label && <p className="text-sm font-bold leading-snug">{label}</p>}
        </figcaption>
      )}
    </figure>
  );
}

function SkeletonRow() {
  return (
    <div className="flex gap-4 overflow-hidden">
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className="aspect-4/5 w-64 sm:w-72 shrink-0 rounded-2xl bg-white animate-pulse"
        />
      ))}
    </div>
  );
}

/** Horizontal carousel: snap scrolling, arrows, gentle autoplay that pauses on hover or touch. */
function PhotoCarousel({ photos }) {
  const trackRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [canScroll, setCanScroll] = useState(true);
  const [maxIdx, setMaxIdx] = useState(Math.max(photos.length - 1, 0));

  const measure = () => {
    const track = trackRef.current;
    const first = track?.children[0];
    if (!track || !first) return;
    const gap = parseFloat(getComputedStyle(track).columnGap || "16");
    const step = first.offsetWidth + gap;
    const overflow = track.scrollWidth - track.clientWidth;
    setCanScroll(overflow > 8);
    setMaxIdx(Math.max(0, Math.ceil((overflow - 8) / step)));
  };

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [photos.length]);

  const goTo = (i) => {
    const track = trackRef.current;
    const card = track?.children[i];
    if (!card) return;
    track.scrollTo({
      left: card.offsetLeft - track.offsetLeft,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    const track = trackRef.current;
    const first = track?.children[0];
    if (!first) return;
    const gap = parseFloat(getComputedStyle(track).columnGap || "16");
    const i = Math.round(track.scrollLeft / (first.offsetWidth + gap));
    setIndex(Math.min(Math.max(i, 0), photos.length - 1));
  };

  const next = () => goTo(Math.min(index + 1, maxIdx));
  const prev = () => goTo(Math.max(index - 1, 0));

  useEffect(() => {
    if (paused || !canScroll) return;
    const t = setInterval(() => {
      goTo(index >= maxIdx ? 0 : index + 1);
    }, 4000);
    return () => clearInterval(t);
  }, [paused, canScroll, index, maxIdx]);

  return (
    <div
      className="flex flex-col gap-6"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
    >
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth pb-1"
      >
        {photos.map((photo, i) => (
          <PhotoCard key={photo._id || photo.id || i} photo={photo} />
        ))}
      </div>

      {canScroll && (
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={prev}
            disabled={index === 0}
            aria-label="Previous photos"
            className="size-11 grid place-items-center rounded-full border border-line bg-white text-primary disabled:opacity-35 hover:bg-primary hover:text-white transition-colors"
          >
            <PiCaretLeft />
          </button>
          <button
            type="button"
            onClick={next}
            disabled={index >= maxIdx}
            aria-label="Next photos"
            className="size-11 grid place-items-center rounded-full border border-line bg-white text-primary disabled:opacity-35 hover:bg-primary hover:text-white transition-colors"
          >
            <PiCaretRight />
          </button>
          <p className="ml-2 text-sm font-semibold text-muted tabular-nums">
            {Math.min(index + 1, photos.length)} of {photos.length}
          </p>
        </div>
      )}
    </div>
  );
}

export default function GallerySection() {
  const root = useRef(null);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/v1/gallery/active`, {
          method: "GET",
          cache: "no-store",
        });
        const result = await response.json();
        if (response.ok) {
          const data = Array.isArray(result) ? result : result.data || [];
          setPhotos(data);
        } else {
          setError("Failed to load gallery.");
        }
      } catch (err) {
        setError("Failed to load gallery.");
        console.error("Error fetching gallery:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPhotos();
  }, []);

  useReveal(root, [loading]);

  if (!loading && photos.length === 0 && !error) return null;

  return (
    <section ref={root} id="gallery" className="section bg-surface">
      <div className="frame flex flex-col gap-10">
        <div data-reveal className="flex flex-col gap-3 max-w-2xl">
          <h2 className="h2">Student work</h2>
          <p className="lead">
            Looks created by our students, straight from the academy floor.
          </p>
        </div>

        {loading ? (
          <SkeletonRow />
        ) : error ? (
          <p className="text-muted">{error}</p>
        ) : (
          <div data-reveal>
            <PhotoCarousel photos={photos} />
          </div>
        )}
      </div>
    </section>
  );
}
