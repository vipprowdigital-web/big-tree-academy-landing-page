"use client";

import { useEffect, useRef, useState } from "react";

const STEPS = [
  {
    num: "Step 01",
    icon: "ti-messages",
    label: "Career Consultation",
    desc: "Speak with our team and discover the course that best matches your interests and career goals.",
  },
  {
    num: "Step 02",
    icon: "ti-book-2",
    label: "Course Selection",
    desc: "Choose the program that aligns with your passion, skill level, and future aspirations.",
  },
  {
    num: "Step 03",
    icon: "ti-clipboard-check",
    label: "Enrollment Confirmation",
    desc: "Complete your registration and secure your seat in your preferred course.",
  },
  {
    num: "Step 04",
    icon: "ti-user-check",
    label: "Student Onboarding",
    desc: "Receive complete course information, guidance, and support before your classes begin.",
  },
  {
    num: "Step 05",
    icon: "ti-sparkles",
    label: "Start Your Training",
    desc: "Join your batch, begin hands-on learning, and take the first step toward becoming a beauty professional.",
  },
];

export default function AdmissionTimeline() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-primary text-secondary relative overflow-hidden px-6 py-10 md:px-12 md:py-20"
      id="admission"
    >
      {/* Google Fonts */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap");
        @import url("https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css");
        .font-serif-editorial {
          font-family: "Cormorant Garamond", serif;
        }
        .font-sans-clean {
          font-family: "Plus Jakarta Sans", sans-serif;
        }
      `}</style>

      {/* Watermark number */}
      <span
        aria-hidden="true"
        className="font-serif-editorial pointer-events-none select-none absolute -top-5 -right-2.5 text-secondary/4 leading-none"
        style={{ fontSize: "220px" }}
      >
        5
      </span>

      {/* ── HEADER ── */}
      <p className="font-sans-clean text-[11px] font-medium tracking-[0.18em] uppercase text-secondary/45 mb-2.5">
        Admission Journey
      </p>
      <h2 className="font-serif-editorial text-[clamp(2rem,4vw,3.2rem)] font-normal leading-[1.1] text-secondary">
        Your path to
        <br />
        <em className="font-light italic">beauty career</em> success
      </h2>
      <div className="w-9 h-px bg-secondary/25 my-3" />
      <p className="font-sans-clean text-[13px] leading-relaxed text-secondary/60 max-w-120 mb-12">
        Take the first step toward a professional future with a simple and
        guided admission process designed to help you start your learning
        journey with confidence.
      </p>

      {/* ── TIMELINE ── */}
      <div className="relative">
        {/* Connector line */}
        <div className="hidden md:block absolute top-7 left-[10%] right-[10%] h-px bg-secondary/15 z-0">
          <div
            className="h-px bg-secondary/35 transition-all duration-[1400ms] ease-in-out"
            style={{ width: visible ? "100%" : "0%" }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-4 relative z-10">
          {STEPS.map((step, i) => (
            <div
              key={step.num}
              className={`flex flex-col md:items-center md:text-center transition-all duration-500 ease-out ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: visible ? `${i * 120}ms` : "0ms" }}
            >
              {/* Node circle */}
              <div className="group w-14 h-14 rounded-full border border-secondary/25 bg-secondary/[0.06] flex items-center justify-center mb-4 shrink-0 hover:bg-secondary/[0.14] hover:border-secondary/50 transition-colors duration-300">
                <i
                  className={`ti ${step.icon} text-[22px] text-secondary/70 group-hover:text-secondary/100 transition-opacity duration-300`}
                  aria-hidden="true"
                />
              </div>

              {/* Step number */}
              <span className="font-serif-editorial text-[11px] tracking-[0.12em] text-secondary/35 mb-1.5">
                {step.num}
              </span>

              {/* Label */}
              <p className="font-sans-clean text-[13px] font-medium text-secondary leading-snug mb-2">
                {step.label}
              </p>

              {/* Description */}
              <p className="font-sans-clean text-[11.5px] leading-[1.65] text-secondary/50 max-w-32.5 hidden md:block">
                {step.desc}
              </p>
              {/* Mobile desc — full width */}
              <p className="font-sans-clean text-[12px] leading-[1.65] text-secondary/50 md:hidden">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
