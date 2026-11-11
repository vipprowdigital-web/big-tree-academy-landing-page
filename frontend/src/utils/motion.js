"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export { gsap, ScrollTrigger, useGSAP };

/**
 * Scroll entrances for everything inside `scope`.
 *   data-reveal            -> the element rises and fades in once
 *   data-reveal-children   -> its direct children enter one after another
 * Elements are hidden by GSAP itself, so without script the content stays visible.
 * Pass `deps` when the section's content arrives later (fetched data).
 */
export function useReveal(scope, deps = []) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray("[data-reveal]", scope.current).forEach((el) => {
          gsap.from(el, {
            y: 24,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          });
        });
        gsap.utils
          .toArray("[data-reveal-children]", scope.current)
          .forEach((el) => {
            gsap.from(el.children, {
              y: 20,
              opacity: 0,
              duration: 0.8,
              ease: "power3.out",
              stagger: 0.08,
              scrollTrigger: { trigger: el, start: "top 85%", once: true },
            });
          });
      });
    },
    { scope, dependencies: deps, revertOnUpdate: true },
  );
}
