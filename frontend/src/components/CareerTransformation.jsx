"use client";

import { useState } from "react";
import { academyFeatures } from "@/seeds/career-transformation";

const featureIcons = [
  "✦",
  "◈",
  "❋",
  "⟡",
  "✧",
  "◉",
  "⬡",
  "✵",
  "◎",
  "⟢",
  "✴",
  "◇",
  "❂",
  "⬢",
  "✾",
  "◈",
];

export default function CareerTransformation() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="w-full bg-secondary text-primary py-10 sm:py-24 px-4 sm:px-8 lg:px-16 overflow-hidden relative selection:bg-primary selection:text-secondary">
      {/* Font Core Styles */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300&family=Montserrat:wght@300;400;500;600;700&display=swap");
        .font-serif-editorial {
          font-family: "Cormorant Garamond", Georgia, serif;
        }
        .font-sans-clean {
          font-family: "Montserrat", sans-serif;
        }
      `}</style>

      {/* Dynamic Background Fluid Glow Canvas */}
      {/* <div
        className="absolute right-[-10%] top-[20%] w-150 h-150 rounded-full blur-[140px] pointer-events-none opacity-20 transition-all duration-1000 ease-in-out"
        style={{
          background: `radial-gradient(circle, var(--primary) 0%, transparent 70%)`,
          transform: `translateY(${activeIndex * 40}px)`,
        }}
      /> */}

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start relative z-10 ">
        {/* ── LEFT FIXED ASSET: EDITORIAL COVER LOOKBOOK PANEL ── */}
        <div className="lg:col-span-5 lg:sticky lg:top-16 flex flex-col items-start gap-6">
          <div className="flex items-center gap-3 text-[10px] font-sans-clean uppercase font-bold tracking-[0.28em] text-primary/80 mx-auto sm:mx-0">
            <span className="w-8 h-px bg-primary/50 " />
            Empowering Beauty Careers
          </div>

          <h2 className="font-serif-editorial text-[clamp(2.5rem,5vw,4rem)] font-light leading-[1.05] tracking-tight text-primary sm:text-left text-center">
            Transform Your Passion Into{" "}
            <span className="italic font-normal text-primary">
              Professional Excellence
            </span>
          </h2>

          <p className="text-xs md:text-sm font-sans-clean font-light leading-[1.8] text-primary max-w-sm sm:text-left text-center">
            At The Big Tree Beauty Academy, we provide industry-focused
            education, expert mentorship, and practical training designed to
            help aspiring beauty professionals build successful careers with
            confidence.
          </p>

          {/* Large Editorial Dynamic Stage Indicator Accent */}
          <div className="hidden lg:flex items-baseline gap-2 sm:mt-12 font-serif-editorial">
            <span className="text-7xl font-light text-primary">
              {String(activeIndex + 1).padStart(2, "0")}
            </span>
            <span className="text-sm tracking-widest uppercase text-primary font-sans-clean">
              / {String(academyFeatures.length).padStart(2, "0")} Focus Area
            </span>
          </div>
        </div>

        {/* ── RIGHT PANEL: INTERACTIVE STREAMFLOW GRADIENT ACCENTS ── */}
        <div className="lg:col-span-7 flex flex-col w-full border-t border-primary/10">
          {academyFeatures.map((feature, i) => {
            const isSelected = activeIndex === i;
            const paddedIndex = String(i + 1).padStart(2, "0");

            return (
              <div
                key={i}
                onMouseEnter={() => setActiveIndex(i)}
                className="relative w-full flex flex-col sm:flex-row items-start sm:items-center justify-between py-8 px-4 cursor-pointer border-b border-primary/10 transition-all duration-500 ease-out group overflow-hidden"
              >
                {/* Embedded Multi-Stop Interactive Gradient Layer */}
                {/* <div
                  className={`absolute inset-0 -z-10 transition-opacity duration-700 ease-out ${
                    isSelected ? "opacity-100" : "opacity-0"
                  }`}
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(var(--primary-rgb), 0.08) 0%, rgba(var(--primary-rgb), 0.01) 50%, transparent 100%)",
                  }}
                /> */}

                {/* Left metadata marker alignment */}
                <div className="flex items-center gap-6 sm:gap-10 w-full sm:w-auto">
                  {/* Digital Index Trace */}
                  <span className="font-serif-editorial text-sm md:text-lg italic tracking-widest text-primary group-hover:text-primary transition-colors duration-300">
                    {paddedIndex}
                  </span>

                  {/* Icon Emblem Token */}
                  {/* <span
                    className={`text-lg transition-transform duration-500 ${
                      isSelected
                        ? "rotate-45 text-primary scale-125"
                        : "text-primary/40"
                    }`}
                  >
                    {featureIcons[i % featureIcons.length]}
                  </span> */}

                  {/* Main Feature Content Row text */}
                  <div
                    className={`flex flex-col transition-all duration-300 max-w-md ${isSelected ? "translate-x-2" : ""}`}
                  >
                    <h3
                      className={`font-sans-clean text-sm md:text-base font-medium tracking-wide transition-all duration-300 ${
                        isSelected
                          ? "text-primary font-semibold"
                          : "text-primary"
                      }`}
                    >
                      {feature.title}
                    </h3>
                    <p
                      className={`font-sans-clean text-sm font-light leading-relaxed text-primary transition-all duration-500 overflow-hidden ${
                        isSelected
                          ? "max-h-20 opacity-100 mt-1"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      {feature.description}
                    </p>
                  </div>
                </div>

                {/* Right Interactive Structural Indicator Micro-Graphic */}
                {/* <div className="hidden sm:flex items-center gap-4">
                  <div
                    className={`h-px transition-all duration-500 ease-out ${
                      isSelected ? "w-16 bg-primary" : "w-0 bg-transparent"
                    }`}
                  />
                  <span
                    className={`text-[9px] font-sans-clean font-bold tracking-[0.3em] uppercase transition-all duration-500 ${
                      isSelected
                        ? "text-primary opacity-100 translate-x-0"
                        : "text-primary/0 opacity-0 -translate-x-2"
                    }`}
                  >
                    view context
                  </span>
                </div> */}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
