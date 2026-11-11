"use client";

import { useRef } from "react";
import Image from "next/image";
import { PiCheckBold, PiArrowRight } from "react-icons/pi";
import { services } from "@/seeds/services";
import { scrollTo } from "@/utils/scroll.utils";
import { useReveal } from "@/utils/motion";

export default function Services({ appName }) {
  const root = useRef(null);
  useReveal(root);

  return (
    <section ref={root} id="about" className="section bg-white">
      <div className="frame grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        <div data-reveal className="lg:col-span-5">
          <div className="relative max-w-md mx-auto lg:max-w-none pb-10 pr-10 sm:pr-14">
            <div className="crop relative aspect-4/5">
              <Image
                src="https://res.cloudinary.com/dh87x8i37/image/upload/v1794376707/IMG_1156.jpg_wvvsty.jpg"
                alt="A student getting certificated after completing a course at The Big Tree Beauty Academy"
                fill
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-cover object-[50%_30%]"
              />
            </div>
            <div className="crop absolute right-0 bottom-0 w-[46%] aspect-square border-4 border-white">
              <Image
                src="https://res.cloudinary.com/dh87x8i37/image/upload/v1794376710/IMG_1228_1.jpg_q8i9wu.jpg"
                alt="Applying makeup on a model at The Big Tree Beauty Academy"
                fill
                sizes="20vw"
                className="object-cover object-[64%_50%]"
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 flex flex-col gap-7">
          <div data-reveal className="flex flex-col gap-3">
            <h2 className="h2">
              Why students choose {appName || "our academy"}
            </h2>
            <p className="lead">
              Training that is practical from the first week and aimed at a real
              career.
            </p>
          </div>

          <ul data-reveal-children className="grid gap-3 sm:grid-cols-2">
            {services.map((service) => (
              <li
                key={service.title}
                className="flex items-start gap-3 bg-surface rounded-xl p-4"
              >
                <span className="grid place-items-center size-7 shrink-0 rounded-full bg-secondary text-primary mt-0.5">
                  <PiCheckBold aria-hidden="true" className="size-4" />
                </span>
                <span className="font-bold leading-snug">{service.title}</span>
              </li>
            ))}
          </ul>

          <div data-reveal>
            <button
              type="button"
              onClick={() => scrollTo("contact")}
              className="btn btn-primary"
            >
              Talk to an advisor <PiArrowRight aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
