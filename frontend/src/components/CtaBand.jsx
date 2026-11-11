"use client";

import { useRef } from "react";
import Image from "next/image";
import { PiArrowRight } from "react-icons/pi";
import { scrollTo } from "@/utils/scroll.utils";
import { useReveal } from "@/utils/motion";

export default function CtaBand({ onContactClick }) {
  const root = useRef(null);
  useReveal(root);

  return (
    <section ref={root} className="bg-white pt-14 pb-[clamp(3.5rem,8vw,6.5rem)] has-[+#articles]:pb-0">
      <div className="frame">
        <div
          data-reveal
          className="grid grid-cols-1 md:grid-cols-12 items-center gap-8 rounded-3xl bg-secondary p-6 sm:p-10 lg:p-12"
        >
          <div className="md:col-span-7 flex flex-col gap-5">
            <h2 className="h2">Ready to start your beauty career?</h2>
            <p className="text-primary/80 leading-relaxed max-w-lg">
              Tell us what you want to learn and an advisor will help you pick
              the right course and batch.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onContactClick}
                className="btn btn-primary"
              >
                Enquire now <PiArrowRight aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => scrollTo("courses")}
                className="btn btn-quiet"
              >
                See courses
              </button>
            </div>
          </div>

          <div className="md:col-span-5">
            <div className="crop relative aspect-4/3 md:aspect-square lg:aspect-4/3">
              <Image
                src="https://res.cloudinary.com/dh87x8i37/image/upload/v1794310259/hair-lab_qfbnzg.jpg"
                alt="Students and a mentor during a live makeup class"
                fill
                sizes="(min-width: 768px) 35vw, 90vw"
                className="object-cover object-[58%_50%]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
