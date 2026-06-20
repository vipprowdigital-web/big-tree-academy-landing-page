// "use client";

// import { useEffect, useState } from "react";

// const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000";

// // ─── SUB-COMPONENTS ────────────────────────────────────────────────────────────

// function CardOverlay({ tag, label }) {
//   return (
//     <div className="absolute inset-0 bg-primary/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
//       <div className="translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-40">
//         {tag && (
//           <span className="inline-block text-[10px] font-sans-clean font-semibold tracking-widest uppercase bg-secondary text-primary px-2.5 py-1 rounded-[3px] mb-1.5">
//             {tag}
//           </span>
//         )}
//         {label && (
//           <p className="font-serif-editorial text-[18px] font-normal text-secondary leading-snug">
//             {label}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }

// function PhotoCard({ photo, className, featured = false }) {
//   const src = photo.imageUrl || photo.url || photo.src || photo.image;
//   const alt = photo.alt || photo.title || photo.label || "Gallery photo";
//   const tag = photo.tag || photo.category;
//   const label = photo.label || photo.title || photo.alt;

//   return (
//     <div
//       className={`group relative rounded-md overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform duration-300 bg-primary/10 ${className}`}
//     >
//       {src && (
//         // eslint-disable-next-line @next/next/no-img-element
//         <img src={src} alt={alt} className="object-cover w-full h-full" />
//       )}
//       {featured && (
//         <span className="absolute top-2.5 right-2.5 z-10 text-[9px] font-sans-clean font-semibold tracking-widest uppercase bg-primary text-secondary px-2.5 py-1 rounded-[3px]">
//           Featured
//         </span>
//       )}
//       <CardOverlay tag={tag} label={label} />
//     </div>
//   );
// }

// function SkeletonCard({ className }) {
//   return (
//     <div className={`rounded-md bg-primary/10 animate-pulse ${className}`} />
//   );
// }

// // ─── MAIN COMPONENT ────────────────────────────────────────────────────────────
// export default function GallerySection() {
//   const [photos, setPhotos] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchPhotos = async () => {
//       try {
//         const response = await fetch(`${baseUrl}/api/v1/gallery/active`, {
//           method: "GET",
//           cache: "no-store",
//         });
//         // console.log("response: ", response);
//         const result = await response.json();
//         if (response.ok) {
//           const data = Array.isArray(result) ? result : result.data || [];
//           setPhotos(data);
//         } else {
//           setError("Failed to load gallery.");
//         }
//       } catch (err) {
//         setError("Failed to load gallery.");
//         console.error("Error fetching gallery:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPhotos();
//   }, []);

//   const [p1, p2, p3, p4, p5, ...rest] = photos;

//   if (photos.length === 0) return null;

//   return (
//     <section
//       className="w-full bg-secondary text-primary overflow-hidden py-12"
//       id="gallery"
//     >
//       {/* Google Fonts — same as HeroSection */}
//       <style jsx global>{`
//         @import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap");
//         .font-serif-editorial {
//           font-family: "Cormorant Garamond", serif;
//         }
//         .font-sans-clean {
//           font-family: "Plus Jakarta Sans", sans-serif;
//         }
//       `}</style>

//       {/* ── HEADER ── */}
//       <div className="text-center px-4 mb-8">
//         <p className="font-sans-clean text-[11px] font-medium tracking-[0.18em] uppercase opacity-55 mb-2">
//           Our students&rsquo; work
//         </p>
//         <h2 className="font-serif-editorial text-[clamp(2rem,4vw,3.25rem)] font-normal leading-[1.1] text-primary">
//           Where Skill Meets <em className="font-light italic">Art</em>
//         </h2>
//         <div className="w-10 h-px bg-primary opacity-30 mx-auto mt-3" />
//       </div>

//       {/* ── MASONRY GRID ── */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-3 px-4 md:px-8 mt-8">
//         {loading ? (
//           <>
//             <SkeletonCard className="aspect-3/4" />
//             <div className="flex flex-col gap-3">
//               <SkeletonCard className="flex-1 aspect-4/3" />
//               <SkeletonCard className="flex-1 aspect-4/3" />
//             </div>
//             <SkeletonCard className="self-center aspect-square" />
//             <SkeletonCard className="aspect-3/4" />
//           </>
//         ) : error ? (
//           <p className="col-span-2 md:col-span-4 text-center opacity-50 font-sans-clean text-sm py-12">
//             {error}
//           </p>
//         ) : photos.length === 0 ? (
//           <p className="col-span-2 md:col-span-4 text-center opacity-50 font-sans-clean text-sm py-12">
//             No photos available.
//           </p>
//         ) : (
//           <>
//             {/* Col 1 — tall, featured */}
//             {p1 && <PhotoCard photo={p1} className="aspect-3/4" featured />}

//             {/* Col 2 — stacked pair */}
//             {(p2 || p3) && (
//               <div className="flex flex-col gap-3">
//                 {p2 && <PhotoCard photo={p2} className="flex-1 aspect-4/3" />}
//                 {p3 && <PhotoCard photo={p3} className="flex-1 aspect-4/3" />}
//               </div>
//             )}

//             {/* Col 3 — square */}
//             {p4 && (
//               <PhotoCard photo={p4} className="self-center aspect-square" />
//             )}

//             {/* Col 4 — tall */}
//             {p5 && <PhotoCard photo={p5} className="aspect-3/4" />}
//           </>
//         )}
//       </div>

//       {/* Additional photos (beyond first 5) */}
//       {!loading && rest.length > 0 && (
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-3 px-4 md:px-8 mt-3">
//           {rest.map((photo, i) => (
//             <PhotoCard
//               key={photo._id || photo.id || i}
//               photo={photo}
//               className="aspect-square"
//             />
//           ))}
//         </div>
//       )}

//       {/* ── STATS STRIP ── */}

//     </section>
//   );
// }

"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000";

// depth 0 = front/center, depth 1 = right peek, depth 2 = far right (hidden)
// zIndex is intentionally excluded — controlled via style prop so it's never animated
// Update this near the top of your file
const DEPTH_STYLE = {
  0: { x: "-50%", y: 0, rotate: 0, scale: 1, opacity: 1 }, // Center / Front
  1: { x: "-120%", y: 15, rotate: -10, scale: 0.85, opacity: 0.7 }, // Left Peek
  2: { x: "20%", y: 15, rotate: 10, scale: 0.85, opacity: 0.7 }, // Right Peek
};

// Depth 0 (Center) stays on top of both flanks
const DEPTH_Z = { 0: 30, 1: 20, 2: 20 };

// Smooth exit animation drifting off-screen
const EXIT_STYLE = { x: "80%", y: 30, rotate: 20, scale: 0.6, opacity: 0 };

// One full cycle: every card glides to its next position over this whole
// duration, with no resting/static period — that's what makes the loop
// read as continuous rather than "snap, then pause".
const SHIFT_SECONDS = 2.2;
const SHIFT_EASE = [0.45, 0, 0.2, 1];

// ─── SUB-COMPONENTS ────────────────────────────────────────────────────────────

function CardOverlay({ tag, label }) {
  return (
    <div className="absolute inset-0 bg-primary/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
      <div className="translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-40">
        {tag && (
          <span className="inline-block text-[10px] font-sans-clean font-semibold tracking-widest uppercase bg-secondary text-primary px-2.5 py-1 rounded-[3px] mb-1.5">
            {tag}
          </span>
        )}
        {label && (
          <p className="font-serif-editorial text-[18px] font-normal text-secondary leading-snug">
            {label}
          </p>
        )}
      </div>
    </div>
  );
}

function StackCard({ photo, depth, onClick, reduceMotion }) {
  const src = photo.imageUrl || photo.url || photo.src || photo.image;
  const alt = photo.alt || photo.title || photo.label || "Gallery photo";
  const tag = photo.tag || photo.category;
  const label = photo.label || photo.title || photo.alt;
  const target = DEPTH_STYLE[depth] ?? DEPTH_STYLE[2];
  const zIndex = DEPTH_Z[depth] ?? 10;

  return (
    <motion.div
      onClick={onClick}
      initial={
        reduceMotion
          ? target
          : depth === 0
            ? { ...DEPTH_STYLE[1], opacity: 0 }
            : target
      }
      animate={target}
      exit={
        reduceMotion
          ? { opacity: 0 }
          : {
              ...EXIT_STYLE,
              transition: { duration: SHIFT_SECONDS, ease: SHIFT_EASE },
            }
      }
      transition={{ duration: SHIFT_SECONDS, ease: SHIFT_EASE }}
      // Inside the StackCard component, update the class string:
      className="absolute top-0 left-1/2 w-55 h-72.5 md:w-67.5 md:h-87.5 rounded-xl overflow-hidden shadow-xl cursor-pointer group bg-primary/10 select-none origin-bottom"
      style={{ zIndex }}
    >
      {src && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} className="object-cover w-full h-full" />
      )}
      <CardOverlay tag={tag} label={label} />
    </motion.div>
  );
}

function SkeletonStack() {
  return (
    <div className="relative h-85 md:h-100 flex items-center justify-center mt-8">
      <div className="absolute w-45 h-65 md:w-55 md:h-77.5 -translate-x-27.5 rotate-[-10deg] rounded-xl bg-primary/10 animate-pulse opacity-50" />
      <div className="absolute w-55 h-72.5 md:w-67.5 md:h-87.5 rounded-xl bg-primary/10 animate-pulse" />
      <div className="absolute w-45 h-65 md:w-55 md:h-77.5 translate-x-27.5 rotate-10 rounded-xl bg-primary/10 animate-pulse opacity-50" />
    </div>
  );
}

// Builds the small visible window of cards around the current index,
// without duplicating an index if the photo set is too small.
// Change this function right above the GallerySection component
// Replace the helper function right above your main component
function getVisible(photos, index) {
  const length = photos.length;
  if (length === 0) return [];

  // 0 = Center, 1 = Left side, 2 = Right side
  const depths = length >= 3 ? [0, 1, 2] : length === 2 ? [0, 1] : [0];

  return depths.map((d) => {
    let i = index;
    if (d === 1) i = (index - 1 + length) % length; // Card that just passed (Left)
    if (d === 2) i = (index + 1) % length; // Upcoming card (Right)

    return { depth: d, photo: photos[i], idx: i };
  });
}

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────────
export default function GallerySection() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [index, setIndex] = useState(0);
  const pausedRef = useRef(false);
  const reduceMotion = useReducedMotion();

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

  // Continuous auto-advance through the stack — fires exactly when the
  // previous shift's transition finishes, so motion never idles.
  useEffect(() => {
    if (photos.length === 0 || reduceMotion) return;
    const id = setInterval(() => {
      if (!pausedRef.current) {
        setIndex((i) => (i + 1) % photos.length);
      }
    }, SHIFT_SECONDS * 1000);
    return () => clearInterval(id);
  }, [photos.length, reduceMotion]);

  if (!loading && photos.length === 0 && !error) return null;

  return (
    <section
      className="w-full bg-secondary text-primary overflow-hidden pb-7 sm:py-12"
      id="gallery"
    >
      {/* Google Fonts — same as HeroSection */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap");
        .font-serif-editorial {
          font-family: "Cormorant Garamond", serif;
        }
        .font-sans-clean {
          font-family: "Plus Jakarta Sans", sans-serif;
        }
      `}</style>

      {/* ── HEADER ── */}
      <div className="text-center px-4 mb-8">
        <p className="font-sans-clean text-[11px] font-medium tracking-[0.18em] uppercase opacity-55 mb-2">
          Our students&rsquo; work
        </p>
        <h2 className="font-serif-editorial text-[clamp(2rem,4vw,3.25rem)] font-normal leading-[1.1] text-primary">
          Where Skill Meets <em className="font-light italic">Art</em>
        </h2>
        <div className="w-10 h-px bg-primary opacity-30 mx-auto mt-3" />
      </div>

      {/* ── STACKED CARD CAROUSEL ── */}
      {loading ? (
        <SkeletonStack />
      ) : error ? (
        <p className="text-center opacity-50 font-sans-clean text-sm py-12">
          {error}
        </p>
      ) : (
        <div
          className="relative h-[340px] md:h-[400px] flex items-center justify-center mt-8"
          onMouseEnter={() => (pausedRef.current = true)}
          onMouseLeave={() => (pausedRef.current = false)}
        >
          <AnimatePresence initial={false}>
            {getVisible(photos, index).map(({ depth, photo, idx }) => (
              <StackCard
                key={photo._id || photo.id || idx}
                photo={photo}
                depth={depth}
                reduceMotion={reduceMotion}
                onClick={() => setIndex(idx)}
              />
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* ── DOT INDICATORS (only when the set is small enough to read at a glance) ── */}
      {!loading && !error && photos.length > 1 && photos.length <= 8 && (
        <div className="flex justify-center gap-2 mt-6">
          {photos.map((photo, i) => (
            <button
              key={photo._id || photo.id || i}
              type="button"
              aria-label={`Show photo ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index ? "w-6 bg-primary" : "w-1.5 bg-primary/25"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
