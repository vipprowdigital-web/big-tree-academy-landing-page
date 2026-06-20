"use client";

import { services } from "@/seeds/services";
import { useRef, useState, useEffect } from "react";

export default function Services() {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Update button visibility states based on scrolling position
  const checkScrollBounds = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  const handleScroll = (direction) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const scrollAmount = 340; // Card width + gap
    el.scrollBy({
      left: direction === "next" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (el) {
      el.addEventListener("scroll", checkScrollBounds);
      window.addEventListener("resize", checkScrollBounds);
      checkScrollBounds();
    }
    return () => {
      if (el) el.removeEventListener("scroll", checkScrollBounds);
      window.removeEventListener("resize", checkScrollBounds);
    };
  }, []);

  return (
    <section className="w-full bg-primary text-primary py-10 sm:py-24 pl-4 sm:pl-8 lg:pl-16 pr-0 overflow-hidden relative selection:bg-primary selection:text-secondary">
      {/* Font Sheet */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300&family=Montserrat:wght@400;500;600;700;800&display=swap");
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
      `}</style>

      {/* Editorial Watermark Asset */}
      {/* <div className="absolute right-0 top-[10%] text-[18rem] lg:text-[26rem] font-serif-editorial font-light tracking-tighter select-none pointer-events-none uppercase opacity-5 text-primary">
        Elite
      </div> */}

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 ">
        {/* ── LEFT PANEL: TEXT CONTEXT & PAGINATION CONTROLLERS ── */}
        <div className="lg:col-span-4 flex flex-col items-start text-left gap-4 pr-4 sm:pr-8 lg:pr-0">
          <div className="flex items-center gap-3 text-[10px] font-sans-clean uppercase font-bold tracking-[0.26em] text-secondary/80 sm:mx-0 mx-auto">
            <span className="w-7 h-px bg-secondary/50" />
            The Big Tree Difference
          </div>

          <h2 className="font-serif-editorial text-[clamp(2.5rem,4.5vw,3.8rem)] font-light leading-[1.1] tracking-tight text-secondary text-center sm:text-left">
            Why Choose <br />
            <span className="italic font-normal text-secondary">
              The Big Tree Beauty Academy?
            </span>
          </h2>

          <p className="text-xs md:text-sm font-sans-clean font-light leading-[1.8] max-w-sm mt-1 text-secondary/70 text-center sm:text-left">
            At The Big Tree Beauty Academy, we combine expert training,
            practical experience, and modern beauty education to help students
            build successful careers. Our focus is not just on teaching
            techniques, but on developing confident professionals ready for the
            real beauty industry.
          </p>

          {/* ── PAGINATION CONTROLLERS (Direct alignment with reference layout) ── */}
          <div className="flex flex-row sm:justify-start justify-center items-center gap-3 mt-6 font-sans-clean w-full">
            <button
              onClick={() => handleScroll("prev")}
              disabled={!canScrollLeft}
              className={`w-11 h-11 rounded-full flex items-center justify-center border transition-all duration-300 transform active:scale-95 ${
                canScrollLeft
                  ? "border-secondary bg-primary text-secondary cursor-pointer"
                  : "border-secondary/20 text-secondary/30 cursor-not-allowed"
              }`}
            >
              ←
            </button>
            <button
              onClick={() => handleScroll("next")}
              disabled={!canScrollRight}
              className={`w-11 h-11 rounded-full flex items-center justify-center border transition-all duration-300 transform active:scale-95 ${
                canScrollRight
                  ? "border-secondary bg-primary text-secondary cursor-pointer"
                  : "border-secondary/20 text-secondary/30 cursor-not-allowed"
              }`}
            >
              →
            </button>
          </div>
        </div>

        {/* ── RIGHT PANEL: HORIZONTALLY SCROLLABLE CARDS TRACK ── */}
        <div className="lg:col-span-8 relative w-full ">
          <div
            ref={scrollContainerRef}
            className="w-full flex overflow-x-auto no-scrollbar snap-x snap-mandatory py-4"
          >
            {services.map((service, index) => (
              <div
                key={service.title || index}
                className={`w-72.5 sm:w-[320px] shrink-0 snap-start pl-7 ${index === services.length - 1 ? "mr-3" : ""}`}
              >
                <ServiceCard service={service} index={index} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service, index }) {
  const displayIndex = String(index + 1).padStart(2, "0");

  return (
    <div className="group relative flex flex-col justify-center sm:gap-0 gap-5 sm:justify-between items-start p-5 sm:p-8 rounded-2xl transition-all duration-500 ease-out h-77.5 bg-linear-to-tl from-secondary to-white border border-primary/10 shadow-[0_4px_24px_rgba(0,0,0,0.3)] hover:border-primary hover:shadow-[0_12px_36px_rgba(var(--primary-rgb),0.1)]">
      {/* Top Shimmer Track Line */}
      {/* <div className="absolute top-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-linear-to-r from-transparent via-primary/30 to-transparent" /> */}

      {/* Card Header */}
      <div className="w-full flex justify-between items-start">
        <div className="px-3 bg-white/2 border border-white/5 rounded-xl group-hover:scale-105 transition-transform duration-500 ease-out text-primary">
          {service.icon}
        </div>

        <span className="font-serif-editorial text-2xl font-light italic transition-colors duration-500 select-none text-primary">
          -{displayIndex}-
        </span>
      </div>

      {/* Card Content Data */}
      <div className="flex flex-col gap-2 font-sans-clean w-full sm:mt-auto">
        <h3 className="font-bold sm:text-md tracking-tight transition-colors duration-300 text-primary uppercase">
          {service.title}
        </h3>

        <div className="h-px group-hover:w-12 transition-all duration-500 ease-out my-1 w-6 bg-primary/40" />

        <p className="text-xs font-normal leading-relaxed tracking-wide text-primary">
          {service.description}
        </p>
      </div>

      {/* Footer Interface Hook */}
      {/* <div className="w-full flex justify-start items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 mt-4">
        <span className="text-[9px] font-sans-clean font-bold tracking-widest uppercase text-primary underline underline-offset-4 cursor-pointer">
          WANT TO BOOK
        </span>
      </div> */}
    </div>
  );
}
