"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  PiArrowRight,
  PiCertificateDuotone,
  PiPaintBrushDuotone,
  PiUsersThreeDuotone,
} from "react-icons/pi";
import { scrollTo } from "@/utils/scroll.utils";
import { gsap, useGSAP } from "@/utils/motion";

const HERO_IMAGE =
  "https://res.cloudinary.com/dh87x8i37/image/upload/v1794377247/IMG_1302_2_qjjaje.jpg";

const FACTS = [
  { icon: PiPaintBrushDuotone, label: "Hands-on practice on live models" },
  { icon: PiUsersThreeDuotone, label: "Mentors who work in the industry" },
  { icon: PiCertificateDuotone, label: "Certificate on completion" },
];

function Facts({ className = "" }) {
  return (
    <ul
      data-hero-in
      className={`gap-3 sm:grid-cols-3 sm:gap-x-8 sm:gap-y-4 ${className}`}
    >
      {FACTS.map(({ icon: Icon, label }) => (
        <li
          key={label}
          className="flex items-center justify-center gap-3 text-sm font-semibold leading-snug text-left"
        >
          <span className="grid place-items-center size-9 shrink-0 rounded-full bg-secondary text-primary">
            <Icon aria-hidden="true" className="size-5" />
          </span>
          {label}
        </li>
      ))}
    </ul>
  );
}

export default function HeroSection({ appName }) {
  const root = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.from("[data-hero-in]", {
          y: 22,
          opacity: 0,
          duration: 0.8,
          stagger: 0.09,
        });

        // The photo settles in, then drifts slowly as the hero scrolls away.
        gsap.from("[data-hero-bg]", {
          scale: 1.12,
          duration: 1.6,
          ease: "power3.out",
        });
        gsap.to("[data-hero-bg]", {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="relative isolate overflow-hidden bg-primary text-white on-plum pt-16 sm:pt-18"
    >
      {/* The academy photo, under a flat deep-plum wash (light enough to show the photo) so the text stays readable. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <Image
          data-hero-bg
          src={HERO_IMAGE}
          alt=""
          fill
          priority
          // The photo is cropped to fill a tall, narrow hero on phones, so the browser
          // needs a much wider file than the element's own width suggests.
          sizes="(min-width: 1024px) 100vw, (min-width: 640px) 190vw, 340vw"
          quality={85}
          className="object-cover object-[50%_45%]"
        />
        <div className="absolute inset-0 bg-primary/55" />
      </div>

      <div className="frame grid grid-cols-1 items-center gap-10 py-14 sm:py-20 min-h-[calc(100svh-4rem)] sm:min-h-[calc(100svh-4.5rem)] lg:py-24">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-7 text-center [text-shadow:0_1px_14px_rgb(27_7_23/0.5)]">
          <h1 data-hero-in className="h1">
            Train for a career in beauty, hands on.
          </h1>
          <p
            data-hero-in
            className="max-w-xl text-[1.0625rem] leading-relaxed text-white/85"
          >
            {appName ? `${appName} teaches` : "Learn"} makeup, hair, nails and
            skin care in a working academy, with expert mentors and a
            certificate at the end.
          </p>

          <div
            data-hero-in
            className="flex flex-wrap items-center justify-center gap-3"
          >
            <button
              type="button"
              onClick={() => scrollTo("courses")}
              className="btn btn-light"
            >
              Explore courses <PiArrowRight aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => scrollTo("contact")}
              className="btn btn-quiet text-white!"
            >
              Enquire now
            </button>
          </div>

          {/* <Facts className="grid pt-2" /> */}
        </div>

        {/* The three-photo collage, kept here in case it comes back.
        <div className="lg:col-span-6">
          <div className="relative mx-auto w-full max-w-xl lg:max-w-none aspect-[1/1.02] sm:aspect-[1.1/1]">
            <div
              aria-hidden="true"
              data-tile
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[104%] aspect-square rounded-full bg-secondary"
            />
            <div
              data-tile
              data-drift="-3"
              className="crop absolute left-0 top-[6%] w-[58%] h-[88%]"
            >
              <Image
                src="https://res.cloudinary.com/dh87x8i37/image/upload/v1794310259/learn-2_xluzs1.png"
                alt="A mentor explaining a technique to a student model at a makeup station"
                fill
                priority
                sizes="(min-width: 1024px) 30vw, 60vw"
                className="object-cover object-[50%_40%]"
              />
            </div>
            <div
              data-tile
              data-drift="4"
              className="crop absolute right-0 top-0 w-[38%] h-[44%]"
            >
              <Image
                src="https://res.cloudinary.com/dh87x8i37/image/upload/v1794310259/academy-3_bvsaps.jpg"
                alt="The reception area at the academy"
                fill
                priority
                sizes="(min-width: 1024px) 20vw, 40vw"
                className="object-cover object-[50%_50%]"
              />
            </div>
            <div
              data-tile
              data-drift="-5"
              className="crop absolute right-0 bottom-[2%] w-[38%] h-[48%]"
            >
              <Image
                src="https://res.cloudinary.com/dh87x8i37/image/upload/v1794310259/learn-3_hltkcv.png"
                alt="A mentor styling a model's hair in the academy"
                fill
                sizes="(min-width: 1024px) 20vw, 40vw"
                className="object-cover object-[50%_30%]"
              />
            </div>
          </div>
        </div>
        */}
      </div>
    </section>
  );
}
