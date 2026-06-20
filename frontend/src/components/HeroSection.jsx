"use client";

import Image from "next/image";
import {
  BotanicalBranch,
  CompactPowder,
  Lipstick,
  MakeupBrush,
  NailPolish,
  PerfumeBottle,
  RoseBloom,
} from "./ui/Decoratives";
import { scrollTo } from "@/utils/scroll.utils";
import CardFan from "./ui/CardFan";

export default function HeroSection({ onShopNowClick }) {
  return (
    <section className="relative w-full min-h-screen sm:bg-linear-to-br from-primary via-secondary to-white text-primary px-4 py-8 md:px-12 md:py-12 overflow-hidden flex flex-col justify-between">
      {/* Google Font Injections for Luxurious Editorial Typography */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap");

        .font-serif-editorial {
          font-family: "Cormorant Garamond", serif;
        }
        .font-sans-clean {
          font-family: "Plus Jakarta Sans", sans-serif;
        }
      `}</style>

      {/* ── BACKGROUND WATERMARK LEAF EMBELLISHMENTS ── */}
      <div className="absolute top-0 left-0 w-32 h-32 opacity-20 pointer-events-none md:w-48 md:h-48 rotate-45">
        {/* Decorative Leaf outline mimicking the reference background top-left */}
        <PerfumeBottle className="text-primary sm:text-secondary w-20 sm:w-80" />
      </div>
      <div className="absolute bottom-20 right-14 w-40 h-40 opacity-20 pointer-events-none md:w-64 md:h-64 -rotate-25">
        {/* Decorative Leaf outline mimicking the reference background top-right */}
        <Lipstick className="w-100 mt-10" />
      </div>

      {/* ── TOP HERO HEADER SECTION ── */}
      <div className="w-full max-w-5xl mx-auto text-center mt-6 z-10">
        <h1 className="font-serif-editorial text-[clamp(2rem,5vw,4.25rem)] font-normal leading-[1.15] tracking-tight max-w-4xl mx-auto capitalize">
          The Big Tree Academy <br className="hidden sm:inline" /> Build Skills.
          <span className="inline-block align-middle mx-3 w-14 h-8 sm:w-20 sm:h-20 relative overflow-hidden">
            {/* Inline Product Thumbnail Jar within title heading */}
            <Image
              src="/assets/images/hero-icon-image.png"
              alt="Cosmetic product"
              fill
              className="object-cover"
            />
          </span>
          Create Success.
        </h1>
      </div>

      {/* ── MIDDLE GRID ASYMMETRICAL WRAPPER ── */}
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-8 z-10 relative">
        {/* LEFT COMPARTMENT: Rating & Feature Card Thumbnail */}
        <div className="lg:col-span-3 flex flex-col space-y-6 justify-self-start w-full max-w-60">
          {/* Micro Rating Row */}
          {/* <div className="flex items-center justify-between text-sm font-sans-clean font-medium tracking-wide border-b border-primary/10 pb-2 text-primary">
            <span className="opacity-60">Rating</span>
            <div className="grow mx-3 border-t border-dashed border-primary/30" />
            <span className="font-bold">4.8 ★</span>
          </div> */}

          {/* Square Feature Snapshot Box */}
          <div className="space-y-4">
            {/* <div className="relative aspect-square w-full rounded-sm overflow-hidden">
              <Image
                src="/assets/images/hero-cosmetic.png"
                alt="Best Selling Product Showcase"
                fill
                className="object-cover"
              />
            </div> */}
            <h3 className="font-serif-editorial text-xl font-medium leading-tight">
              Step into the world of professional beauty education with
              expert-led training, hands-on practical experience, and
              industry-focused learning.
            </h3>
          </div>
        </div>

        {/* CENTERPIECE HERO IMAGE: Fluid Liquid Splashes with Spilled Nail Polish Bottles */}
        <div className="lg:col-span-6 relative flex justify-center items-center w-full min-h-80 md:min-h-110">
          {/* <div className="relative w-full aspect-4/3 max-w-130">
            <Image
              src="/assets/images/hero-image4.png"
              alt="Liquid spills and bottles art composition"
              fill
              className="object-contain"
              priority
            />
          </div> */}
          <CardFan
            images={[
              "/assets/images/hero-image-1.jpg",
              "/assets/images/hero-image-2.jpg",
              "/assets/images/hero-image-3.jpg",
            ]}
          />
        </div>

        {/* RIGHT COMPARTMENT: Short Review Highlight Paragraph & Circular Shop CTA Button */}
        <div className="lg:col-span-3 flex flex-col space-y-12 lg:items-end lg:text-right w-full">
          <div className="max-w-60 space-y-2 lg:ml-auto">
            <span className="inline-block text-lg">✦</span>
            <p className="font-sans-clean text-xs leading-relaxed opacity-80 font-medium">
              Master Makeup, Hair, Beauty, Nails, and Cosmetology in a premium
              academy environment designed to help you grow with confidence.
            </p>
          </div>

          {/* Authentic Shop Now Floating Action Core Circle */}
          <button
            onClick={() => scrollTo("courses")}
            className="group relative flex items-center gap-3 lg:self-end bg-primary text-secondary w-28 h-28 rounded-full shadow-lg transition-transform duration-300 hover:scale-105 active:scale-95 justify-center flex-col"
          >
            {/* Horizontal Arrow Pointer Icon element */}
            <span className="absolute -left-5 text-primary group-hover:translate-x-1 transition-transform duration-300 hidden lg:inline">
              ──→
            </span>
            <span className="font-sans-clean text-xs tracking-wider uppercase font-semibold leading-tight text-center">
              Start your
              <br />
              journey
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
