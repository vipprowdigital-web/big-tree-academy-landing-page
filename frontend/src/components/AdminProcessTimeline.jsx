"use client";

import { useRef } from "react";
import {
  PiChatCircleDotsDuotone,
  PiBookOpenTextDuotone,
  PiClipboardTextDuotone,
  PiUserCheckDuotone,
  PiSparkleDuotone,
} from "react-icons/pi";
import { gsap, ScrollTrigger, useGSAP, useReveal } from "@/utils/motion";

const STEPS = [
  {
    icon: PiChatCircleDotsDuotone,
    label: "Career consultation",
    desc: "Talk to our team about your goals and the right course.",
  },
  {
    icon: PiBookOpenTextDuotone,
    label: "Course selection",
    desc: "Choose the course that suits your skill level.",
  },
  {
    icon: PiClipboardTextDuotone,
    label: "Enrolment",
    desc: "Complete registration and secure your seat.",
  },
  {
    icon: PiUserCheckDuotone,
    label: "Onboarding",
    desc: "Get your course details and support before day one.",
  },
  {
    icon: PiSparkleDuotone,
    label: "Start training",
    desc: "Join your batch and begin hands-on learning.",
  },
];

export default function AdmissionTimeline() {
  const root = useRef(null);
  useReveal(root);

  // The path fills in as the visitor scrolls through the steps.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const steps = gsap.utils.toArray("[data-step]", root.current);
        const fill = root.current.querySelector("[data-path-fill]");
        const paint = (self) => {
          const horizontal = window.matchMedia("(min-width: 1024px)").matches;
          gsap.set(fill, {
            scaleX: horizontal ? self.progress : 1,
            scaleY: horizontal ? 1 : self.progress,
          });
          steps.forEach((step, i) =>
            step.classList.toggle(
              "is-on",
              self.progress >= i / (steps.length - 1) - 0.02,
            ),
          );
        };
        ScrollTrigger.create({
          trigger: "[data-steps]",
          start: "top 70%",
          end: "bottom 60%",
          onUpdate: paint,
          onRefresh: paint,
        });
        return () => steps.forEach((s) => s.classList.remove("is-on"));
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="admission" className="section bg-surface">
      <div className="frame flex flex-col gap-12">
        <div data-reveal className="flex flex-col gap-3 max-w-2xl">
          <h2 className="h2">Join in five simple steps</h2>
          <p className="lead">From first conversation to first class.</p>
        </div>

        <ol data-steps className="relative grid gap-8 lg:grid-cols-5 lg:gap-6">
          {/* the path: vertical on phones, horizontal on desktop */}
          <span
            aria-hidden="true"
            className="absolute left-5.5 top-6 bottom-6 w-0.5 bg-line lg:left-6 lg:right-6 lg:top-5.5 lg:bottom-auto lg:w-auto lg:h-0.5"
          >
            <span
              data-path-fill
              className="absolute inset-0 bg-primary origin-top lg:origin-left"
            />
          </span>

          {STEPS.map(({ icon: Icon, label, desc }) => (
            <li
              key={label}
              data-step
              className="step relative flex lg:flex-col gap-4 lg:gap-5"
            >
              <span className="step-dot relative z-10 grid place-items-center size-12 shrink-0 rounded-full border border-line bg-white text-primary transition-colors duration-500">
                <Icon aria-hidden="true" className="size-5" />
              </span>
              <div className="flex flex-col gap-1">
                <h3 className="h3">{label}</h3>
                <p className="text-sm text-muted leading-relaxed">{desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
