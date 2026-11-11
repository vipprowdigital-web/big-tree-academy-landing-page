"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/utils/motion";

export default function StatsBand({ stats }) {
  const root = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray("[data-count]", root.current).forEach((el) => {
          const target = parseInt(el.dataset.count, 10);
          const suffix = el.dataset.suffix || "";
          if (Number.isNaN(target)) return;
          const state = { n: 0 };
          el.textContent = `0${suffix}`;
          gsap.to(state, {
            n: target,
            duration: 1.6,
            ease: "power2.out",
            onUpdate: () => {
              el.textContent = `${Math.round(state.n)}${suffix}`;
            },
            scrollTrigger: { trigger: el, start: "top 92%", once: true },
          });
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="bg-primary text-white on-plum">
      <div className="frame py-10 sm:py-14 grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8">
        {stats.map((s) => {
          const num = parseInt(s.num, 10);
          const suffix = s.num.replace(/[0-9]/g, "");
          return (
            <div
              key={s.label}
              className="flex flex-col items-center gap-1 text-center"
            >
              <p
                data-count={num}
                data-suffix={suffix}
                className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gold tabular-nums"
              >
                {s.num}
              </p>
              <p className="text-sm font-semibold text-white/80">{s.label}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
