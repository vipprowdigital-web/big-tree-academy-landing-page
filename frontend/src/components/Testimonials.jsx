"use client";

import { useState, useEffect, useRef } from "react";
import { IoStarSharp } from "react-icons/io5";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import Image from "next/image";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000";

const cleanHtmlText = (html = "") => {
  if (!html) return "";
  if (typeof window === "undefined") {
    return html.replace(/<[^>]*>/g, "");
  }
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;
  return tempDiv.textContent || tempDiv.innerText || "";
};

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, inView];
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sectionRef, inView] = useInView(0.1);

  useEffect(() => {
    const fetchTestimonials = async () => {
      const apiUrl = `${baseUrl}/api/v1/testimonial/public?limit=10`;
      try {
        const response = await fetch(apiUrl, {
          method: "GET",
          cache: "no-store",
        });
        // console.log("testimonial: ", response);

        const result = await response.json();

        if (response.ok && Array.isArray(result.data)) {
          const formatted = result.data.map((item) => ({
            id: item._id,
            name: item.name,
            role: item.designation || "Student",
            photo: item.avatar || null,
            rating: item.rating || 5,
            review: cleanHtmlText(item.description || ""),
          }));
          console.log("formatted: ", formatted);

          setTestimonials(formatted);
        }
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (!loading && testimonials.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      className="w-full bg-secondary text-primary py-24 px-4 sm:px-8 lg:px-16 overflow-hidden relative selection:bg-primary selection:text-secondary"
    >
      {(loading || !testimonials.length) && (
        <p className="text-center text-primary/40 font-sans-clean text-xs uppercase tracking-widest">
          {loading
            ? "Choreographing student profiles..."
            : "Voices of excellence coming soon."}
        </p>
      )}
      {!loading && testimonials.length > 0 && (
        <>
          {/* Editorial Embedded Stylesheets */}
          <style jsx global>{`
            @import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300&family=Montserrat:wght@300;400;500;600;700&display=swap");
            .font-serif-editorial {
              font-family: "Cormorant Garamond", Georgia, serif;
            }
            .font-sans-clean {
              font-family: "Montserrat", sans-serif;
            }
            .no-scrollbar::-webkit-scrollbar {
              display: none;
            }
            .no-scrollbar {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
            .line-clamp-5 {
              display: -webkit-box;
              -webkit-line-clamp: 5;
              -webkit-box-orient: vertical;
              overflow: hidden;
            }
          `}</style>

          {/* Atmospheric Multi-stop Soft Canvas Light Ring */}
          <div className="absolute left-[50%] top-[40%] -translate-x-1/2 -translate-y-1/2 w-175 h-100 bg-primary/5 rounded-full blur-[100px] pointer-events-none select-none" />

          {/* Top Frame Structural Line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/20 to-transparent" />

          <div
            className={`max-w-7xl mx-auto transition-all duration-1000 relative z-10 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {/* ── HEADER INTRO BLOCK ── */}
            <div className="flex flex-col items-center text-center gap-3 mb-16">
              <div className="flex items-center gap-3 text-[10px] font-sans-clean uppercase font-bold tracking-[0.28em] text-primary/80">
                <span className="w-8 h-px bg-primary/40" />
                Student Stories
                <span className="w-8 h-px bg-primary/40" />
              </div>

              <h2 className="font-serif-editorial text-[clamp(2.4rem,5.5vw,4.2rem)] font-light leading-[1.05] tracking-tight text-primary">
                What Our <span className="italic font-normal">Students</span>{" "}
                Say
              </h2>
              <div className="w-12 h-0.5 bg-primary/40 rounded-full mt-1" />
            </div>

            {/* ── TESTIMONIAL CARDS: GRID OR CAROUSEL ── */}
            {testimonials.length > 3 ? (
              <TestimonialSlider testimonials={testimonials} />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {testimonials.map((t) => (
                  <TestimonialCard key={t.id} testimonial={t} />
                ))}
              </div>
            )}
          </div>

          {/* Bottom Frame Structural Line */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/10 to-transparent" />
        </>
      )}
    </section>
  );
}

/* ── SLIDER WRAPPER FOR 4+ TESTIMONIALS ── */
function TestimonialSlider({ testimonials }) {
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const scrollToIndex = (index) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[index];
    if (card) {
      const trackRect = track.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();
      track.scrollBy({
        left: cardRect.left - trackRect.left,
        behavior: "smooth",
      });
    }
  };

  const handleScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const first = track.children[0];
    if (!first) return;
    const gap = parseFloat(getComputedStyle(track).columnGap || "32");
    const step = first.offsetWidth + gap;
    const index = Math.round(track.scrollLeft / step);
    setActiveIndex(Math.min(Math.max(index, 0), testimonials.length - 1));
  };

  const next = () =>
    scrollToIndex(Math.min(activeIndex + 1, testimonials.length - 1));
  const prev = () => scrollToIndex(Math.max(activeIndex - 1, 0));

  // Gentle autoplay, paused on hover/touch
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      const isLast = activeIndex === testimonials.length - 1;
      scrollToIndex(isLast ? 0 : activeIndex + 1);
    }, 5000);
    return () => clearInterval(t);
  }, [paused, activeIndex, testimonials.length]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="flex gap-8 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-2 scroll-smooth"
      >
        {testimonials.map((t) => (
          <div key={t.id} className="snap-start shrink-0 w-[85%] sm:w-72 lg:w-80 xl:w-96">
            <TestimonialCard testimonial={t} />
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-6 mt-10 font-sans-clean">
        <button
          onClick={prev}
          disabled={activeIndex === 0}
          aria-label="Previous testimonial"
          className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center text-primary disabled:opacity-30 hover:border-primary hover:bg-primary/5 transition-all"
        >
          <BsChevronLeft className="text-xs" />
        </button>

        <div className="flex items-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToIndex(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activeIndex ? "w-6 bg-primary" : "w-1.5 bg-primary/20"
              }`}
            />
          ))}
        </div>

        <button
          onClick={next}
          disabled={activeIndex === testimonials.length - 1}
          aria-label="Next testimonial"
          className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center text-primary disabled:opacity-30 hover:border-primary hover:bg-primary/5 transition-all"
        >
          <BsChevronRight className="text-xs" />
        </button>
      </div>
    </div>
  );
}

/* ── TESTIMONIAL CARD: DARK ON CREAM FOR CONTRAST ── */
function TestimonialCard({ testimonial }) {
  return (
    <div className="relative flex flex-col h-full bg-primary text-secondary rounded-[24px] sm:rounded-[28px] p-5 sm:p-6 lg:p-8 overflow-hidden shadow-[0_24px_48px_-24px_rgba(40,8,46,0.4)] transition-transform duration-500 hover:-translate-y-1.5">
      {/* Oversized watermark quote mark, subtle on the dark surface */}
      <span className="absolute -top-8 -left-2 font-serif-editorial text-[8rem] text-secondary/10 leading-none pointer-events-none select-none">
        “
      </span>

      <div className="flex items-center gap-1 mb-3 sm:mb-4 lg:mb-5 relative z-10">
        {[...Array(Number(testimonial.rating) || 5)].map((_, idx) => (
          <IoStarSharp key={idx} className="text-secondary text-xs" />
        ))}
      </div>

      <p className="font-serif-editorial text-base sm:text-lg lg:text-xl font-light italic leading-relaxed text-secondary/95 relative z-10 line-clamp-5 flex-1">
        &quot;{testimonial.review}&quot;
      </p>

      <div className="flex items-center gap-3 mt-4 pt-4 sm:mt-5 sm:pt-5 lg:mt-6 lg:pt-6 border-t border-secondary/15 relative z-10">
        <div className="w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11 rounded-full overflow-hidden border border-secondary/30 shrink-0 bg-secondary/20 flex items-center justify-center">
          {testimonial.photo ? (
            <Image
              src={testimonial.photo}
              alt={testimonial.name}
              width={44}
              height={44}
              className="object-cover w-full h-full"
            />
          ) : (
            <span className="font-sans-clean text-sm font-bold text-secondary">
              {testimonial.name?.charAt(0).toUpperCase()}
            </span>
          )}
        </div>
        <div className="flex flex-col">
          <h4 className="font-sans-clean text-xs sm:text-sm font-bold text-secondary">
            {testimonial.name}
          </h4>
          <p className="font-sans-clean text-[10px] font-semibold tracking-[0.12em] text-secondary/60 uppercase">
            {testimonial.role}
          </p>
        </div>
      </div>
    </div>
  );
}
