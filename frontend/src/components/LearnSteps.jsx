"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  PiEyeDuotone,
  PiHandPalmDuotone,
  PiBuildingsDuotone,
} from "react-icons/pi";
import { gsap, useGSAP, useReveal } from "@/utils/motion";

const STEPS = [
  {
    icon: PiEyeDuotone,
    title: "Watch the technique",
    text: "Live demonstrations by your mentor, close enough to see every stroke.",
    image:
      "https://res.cloudinary.com/dh87x8i37/image/upload/v1794310259/learn-1_qttpll.png",
    alt: "A mentor working with a model while students watch in the training room",
    position: "object-[50%_55%]",
  },
  {
    icon: PiHandPalmDuotone,
    title: "Practice on real models",
    text: "Work on live models with one-to-one correction as you go.",
    image:
      "https://res.cloudinary.com/dh87x8i37/image/upload/v1794376707/IMG_0355.JPG_uywvlj.jpg",
    alt: "A student painting a floral design on a model's face",
    position: "object-[50%_45%]",
  },
  {
    icon: PiBuildingsDuotone,
    title: "Visit the academy",
    text: "Walk in, meet our team and see the academy before you enrol.",
    image:
      "https://res.cloudinary.com/dh87x8i37/image/upload/v1794310257/academy-1_vmfo65.jpg",
    alt: "The entrance to The Big Tree Academy",
    position: "object-[50%_55%]",
  },
];

export default function LearnSteps() {
  const root = useRef(null);
  useReveal(root);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray("[data-zoom]", root.current).forEach((img) => {
          gsap.fromTo(
            img,
            { scale: 1.12 },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: img.parentElement,
                start: "top bottom",
                end: "bottom 40%",
                scrub: true,
              },
            },
          );
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="section bg-surface">
      <div className="frame flex flex-col gap-10">
        <div data-reveal className="flex flex-col gap-3 max-w-2xl">
          <h2 className="h2">Learn the craft at our academy</h2>
          <p className="lead">
            Watch, practice and see the academy for yourself.
          </p>
        </div>

        <div
          data-reveal-children
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {STEPS.map(({ icon: Icon, title, text, image, alt, position }) => (
            <article key={title} className="flex flex-col gap-4">
              <div className="crop relative aspect-4/5 sm:aspect-4/3 md:aspect-4/5">
                <Image
                  data-zoom
                  src={image}
                  alt={alt}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className={`object-cover ${position}`}
                />
                <span className="absolute left-3 bottom-3 grid place-items-center size-11 rounded-xl bg-secondary text-primary">
                  <Icon aria-hidden="true" className="size-5" />
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="h3">{title}</h3>
                <p className="text-sm text-muted leading-relaxed">{text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
