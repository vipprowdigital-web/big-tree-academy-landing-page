"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { PiCaretLeft, PiCaretRight, PiStarFill } from "react-icons/pi";
import { useReveal } from "@/utils/motion";

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

export default function Testimonials() {
  const root = useRef(null);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      const apiUrl = `${baseUrl}/api/v1/testimonial/public?limit=10`;
      try {
        const response = await fetch(apiUrl, {
          method: "GET",
          cache: "no-store",
        });
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

  useReveal(root, [loading]);

  if (!loading && testimonials.length === 0) return null;

  return (
    <section
      ref={root}
      className="section bg-primary text-white on-plum overflow-hidden"
    >
      <div className="frame flex flex-col gap-10">
        <h2 data-reveal className="h2 max-w-2xl">
          What our students say
        </h2>

        {loading ? (
          <p className="text-white/80">Loading student stories…</p>
        ) : (
          <TestimonialSlider testimonials={testimonials} />
        )}
      </div>
    </section>
  );
}

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
    const gap = parseFloat(getComputedStyle(track).columnGap || "24");
    const step = first.offsetWidth + gap;
    const index = Math.round(track.scrollLeft / step);
    setActiveIndex(Math.min(Math.max(index, 0), testimonials.length - 1));
  };

  const next = () =>
    scrollToIndex(Math.min(activeIndex + 1, testimonials.length - 1));
  const prev = () => scrollToIndex(Math.max(activeIndex - 1, 0));

  // Gentle autoplay, paused on hover/touch
  useEffect(() => {
    if (paused || testimonials.length < 2) return;
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
      onTouchStart={() => setPaused(true)}
    >
      <div
        ref={trackRef}
        onScroll={handleScroll}
        data-reveal-children
        className="flex gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-2 scroll-smooth"
      >
        {testimonials.map((t) => (
          <div
            key={t.id}
            className={`snap-start shrink-0 ${
              testimonials.length === 1 ? "w-full max-w-2xl" : "w-[88%] sm:w-96"
            }`}
          >
            <TestimonialCard testimonial={t} />
          </div>
        ))}
      </div>

      {testimonials.length > 1 && (
        <div className="flex items-center gap-3 mt-8">
          <button
            type="button"
            onClick={prev}
            disabled={activeIndex === 0}
            aria-label="Previous testimonial"
            className="size-11 grid place-items-center rounded-full bg-white/10 hover:bg-secondary hover:text-primary disabled:opacity-35 transition-colors"
          >
            <PiCaretLeft />
          </button>
          <button
            type="button"
            onClick={next}
            disabled={activeIndex === testimonials.length - 1}
            aria-label="Next testimonial"
            className="size-11 grid place-items-center rounded-full bg-white/10 hover:bg-secondary hover:text-primary disabled:opacity-35 transition-colors"
          >
            <PiCaretRight />
          </button>
          <p className="ml-2 text-sm font-semibold tabular-nums text-white/80">
            {activeIndex + 1} of {testimonials.length}
          </p>
        </div>
      )}
    </div>
  );
}

function TestimonialCard({ testimonial }) {
  const stars = Number(testimonial.rating) || 5;
  return (
    <figure className="flex flex-col h-full bg-white text-ink rounded-2xl p-6 gap-5">
      <div
        className="flex items-center gap-0.5 text-amber-400"
        role="img"
        aria-label={`${stars} out of 5 stars`}
      >
        {[...Array(stars)].map((_, idx) => (
          <PiStarFill key={idx} className="fill-current size-4" />
        ))}
      </div>

      <blockquote className="text-base leading-relaxed line-clamp-5 flex-1 wrap-break-word">
        {testimonial.review}
      </blockquote>

      <figcaption className="flex items-center gap-3">
        <div className="size-11 rounded-full overflow-hidden shrink-0 bg-secondary text-primary grid place-items-center">
          {testimonial.photo ? (
            <Image
              src={testimonial.photo}
              alt={testimonial.name}
              width={44}
              height={44}
              className="object-cover w-full h-full"
            />
          ) : (
            <span className="font-extrabold">
              {testimonial.name?.charAt(0).toUpperCase()}
            </span>
          )}
        </div>
        <div className="flex flex-col leading-tight">
          <span className="text-sm font-bold">{testimonial.name}</span>
          <span className="text-sm text-muted">{testimonial.role}</span>
        </div>
      </figcaption>
    </figure>
  );
}
