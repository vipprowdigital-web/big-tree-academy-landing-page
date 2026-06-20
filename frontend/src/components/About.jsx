// "use client";

// import { useEffect, useRef, useState } from "react";
// import Image from "next/image";

// const stats = [
//   { number: "500+", label: "Students Trained" },
//   { number: "8+", label: "Years of Excellence" },
//   { number: "40+", label: "Expert Instructors" },
//   { number: "96%", label: "Placement Rate" },
// ];

// const pillars = [
//   { icon: "✦", text: "Premium hands-on training with real-world practice" },
//   { icon: "✦", text: "Modern curriculum aligned with industry standards" },
//   {
//     icon: "✦",
//     text: "Expert mentorship from experienced beauty professionals",
//   },
//   { icon: "✦", text: "Certification and career-focused learning approach" },
//   {
//     icon: "✦",
//     text: "Support for freelancing, salon careers, and entrepreneurship",
//   },
// ];

// // ── Intersection Observer Hook ──
// function useInView(threshold = 0.15) {
//   const ref = useRef(null);
//   const [inView, setInView] = useState(false);

//   useEffect(() => {
//     const el = ref.current;
//     if (!el) return;
//     const obs = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) setInView(true);
//       },
//       { threshold },
//     );
//     obs.observe(el);
//     return () => obs.disconnect();
//   }, [threshold]);

//   return [ref, inView];
// }

// // ── Smooth Incremental Counter Component ──
// function Counter({ target, inView }) {
//   const [count, setCount] = useState(0);
//   const numeric = parseInt(target.replace(/\D/g, ""), 10);
//   const suffix = target.replace(/[0-9]/g, "");

//   useEffect(() => {
//     if (!inView) return;
//     let start = 0;
//     const duration = 1500;
//     const frameRate = 1000 / 60;
//     const totalFrames = Math.round(duration / frameRate);
//     const step = numeric / totalFrames;
//     let frame = 0;

//     const timer = setInterval(() => {
//       frame++;
//       start += step;
//       if (frame >= totalFrames) {
//         setCount(numeric);
//         clearInterval(timer);
//       } else {
//         setCount(Math.floor(start));
//       }
//     }, frameRate);

//     return () => clearInterval(timer);
//   }, [inView, numeric]);

//   return (
//     <>
//       {count}
//       {suffix}
//     </>
//   );
// }

// export default function AboutAcademy({ onCourseClick }) {
//   const [sectionRef, sectionInView] = useInView(0.1);
//   const [statsRef, statsInView] = useInView(0.2);

//   return (
//     <section
//       ref={sectionRef}
//       className="relative w-full mx-auto overflow-hidden bg-linear-to-r from-secondary to-white text-primary font-sans-clean"
//       id="about"
//     >
//       {/* Structural Top Accent Line */}
//       <div className="h-px w-full bg-linear-to-r from-transparent via-primary/20 to-transparent" />

//       {/* ── CONTENT GRID SYSTEM ── */}
//       <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[75vh]">
//         {/* LEFT COLUMN: Asymmetrical Framed Portrait & Floating Vignette */}
//         <div
//           className={`lg:col-span-5 relative p-6 md:p-12 lg:p-16 flex items-center justify-center transition-all duration-1000 ease-out ${
//             sectionInView
//               ? "opacity-100 translate-x-0"
//               : "opacity-0 -translate-x-12"
//           }`}
//         >
//           <div className="relative w-full aspect-4/5 max-w-105 rounded-[30px] overflow-hidden shadow-xl bg-primary/5">
//             <Image
//               src="/assets/images/gaura/gaura-about.png"
//               alt="Live Masterclass Session at Gaura Academy"
//               fill
//               className="object-cover transition-transform duration-700 hover:scale-105"
//               priority
//             />
//             {/* Soft inner shadow shade overlay */}
//             <div className="absolute inset-0 bg-linear-to-tr from-primary/20 via-transparent to-transparent pointer-events-none" />
//           </div>

//           {/* Minimal Geometric Outline Bracket Accent */}
//           <div className="absolute top-10 left-10 w-16 h-16 border-t-2 border-l-2 border-primary/20 rounded-tl-xl pointer-events-none hidden md:block" />
//           <div className="absolute bottom-10 right-10 w-16 h-16 border-b-2 border-r-2 border-primary/20 rounded-br-xl pointer-events-none hidden md:block" />
//         </div>

//         {/* RIGHT COLUMN: Editorial Narrative, Testimonial Quote Block, & Pillars */}
//         <div
//           className={`lg:col-span-7 flex flex-col justify-center px-6 sm:px-12 lg:px-16 xl:px-24 py-12 lg:py-20 transition-all duration-1000 ease-out delay-150 ${
//             sectionInView
//               ? "opacity-100 translate-x-0"
//               : "opacity-0 translate-x-12"
//           }`}
//         >
//           {/* Micro-Header Tag */}
//           <div className="flex items-center gap-3 mb-4">
//             <div className="w-8 h-px bg-primary/40" />
//             <p className="text-[10px] uppercase font-bold tracking-[0.25em] text-primary/70">
//               TRUST • QUALITY • CAREER GROWTH
//             </p>
//           </div>

//           {/* Main Display Typography */}
//           <h2 className="font-serif-editorial text-[clamp(2.25rem,4vw,3.75rem)] font-light leading-[1.1] tracking-tight">
//             About <span className="italic font-normal">Gaura Makeup</span>
//             <br />
//             Academy
//           </h2>

//           {/* Solid Split Accent Marker bar */}
//           <div className="w-12 h-0.5 bg-primary my-6 rounded-full" />

//           {/* Body Prose Paragraphs */}
//           <div className="space-y-4 max-w-xl text-sm md:text-base text-primary/80 leading-relaxed font-light">
//             <p>
//               Big Tree Beauty Academy empowers aspiring artists with
//               professional skills, hands-on training, and industry knowledge to
//               confidently build their future in beauty.
//             </p>
//             <p>
//               Our programs blend personalized mentorship with the latest trends,
//               so every student graduates ready to succeed.
//             </p>
//           </div>

//           {/* Pillars Checklist Loop Blocks */}
//           <div className="flex flex-col gap-2.5 max-w-xl mb-8">
//             {pillars.map((pillar, index) => (
//               <div
//                 key={index}
//                 className="group flex items-center gap-4 p-3 rounded-xl border border-primary/5 bg-primary/1 hover:bg-primary/3 hover:border-primary/10 transition-all duration-300 cursor-default"
//               >
//                 <span className="text-sm font-semibold text-primary/40 group-hover:text-primary group-hover:rotate-45 transition-transform duration-300 shrink-0">
//                   {pillar.icon}
//                 </span>
//                 <span className="text-xs md:text-sm font-medium text-primary/80 group-hover:text-primary transition-colors duration-300">
//                   {pillar.text}
//                 </span>
//               </div>
//             ))}
//           </div>

//           {/* Secondary Level CTA Button Row Group */}
//           <div className="flex flex-wrap gap-4">
//             <button
//               onClick={onCourseClick}
//               className="px-8 py-3.5 bg-primary text-secondary rounded-full font-semibold text-xs uppercase tracking-widest shadow-md hover:shadow-lg hover:opacity-95 active:scale-95 transition-all duration-300"
//             >
//               Explore Courses
//             </button>
//             <button className="px-8 py-3.5 bg-transparent text-primary border border-primary/20 rounded-full font-semibold text-xs uppercase tracking-widest hover:bg-primary/5 active:scale-95 transition-all duration-300">
//               Learn More
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* ── STATS COUNT ROW ── */}
//       {/* <div
//         ref={statsRef}
//         className="w-full grid grid-cols-2 lg:grid-cols-4 border-t border-primary/10 bg-transparent"
//       >
//         {stats.map((stat, i) => (
//           <div
//             key={i}
//             className={`group p-8 md:p-12 text-center border-primary/5 transition-all duration-500 hover:bg-secondary ${
//               i < stats.length - 1 ? "sm:border-r" : ""
//             } ${i < 2 ? "border-b lg:border-b-0" : ""} ${
//               statsInView
//                 ? "opacity-100 translate-y-0"
//                 : "opacity-0 translate-y-8"
//             }`}
//             style={{ transitionDelay: `${i * 100}ms` }}
//           >
//             <p className="font-serif-editorial text-[clamp(2.5rem,5vw,4rem)] font-light text-primary leading-none tracking-tight transition-transform duration-300 group-hover:scale-105">
//               <Counter target={stat.number} inView={statsInView} />
//             </p>
//             <p className="text-[10px] md:text-xs font-bold tracking-widest text-primary/50 uppercase mt-3">
//               {stat.label}
//             </p>
//           </div>
//         ))}
//       </div> */}

//       {/* Bottom Accent Line */}
//       {/* <div className="h-px w-full bg-linear-to-r from-transparent via-primary/10 to-transparent" /> */}
//     </section>
//   );
// }

"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { scrollTo } from "@/utils/scroll.utils";

const stats = [
  { number: "500+", label: "Students Trained" },
  { number: "8+", label: "Years of Excellence" },
  { number: "40+", label: "Expert Instructors" },
  { number: "96%", label: "Placement Rate" },
];

const pillars = [
  { icon: "✦", text: "Premium hands-on training with real-world practice" },
  { icon: "✦", text: "Modern curriculum aligned with industry standards" },
  {
    icon: "✦",
    text: "Expert mentorship from experienced beauty professionals",
  },
  { icon: "✦", text: "Certification and career-focused learning approach" },
  {
    icon: "✦",
    text: "Support for freelancing, salon careers, and entrepreneurship",
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, inView];
}

function Counter({ target, inView }) {
  const [count, setCount] = useState(0);
  const numeric = parseInt(target.replace(/\D/g, ""), 10);
  const suffix = target.replace(/[0-9]/g, "");

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1500;
    const frameRate = 1000 / 60;
    const totalFrames = Math.round(duration / frameRate);
    const step = numeric / totalFrames;
    let frame = 0;

    const timer = setInterval(() => {
      frame++;
      start += step;
      if (frame >= totalFrames) {
        setCount(numeric);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, frameRate);

    return () => clearInterval(timer);
  }, [inView, numeric]);

  return (
    <>
      {count}
      {suffix}
    </>
  );
}

export default function AboutAcademy({ onCourseClick }) {
  const [sectionRef, sectionInView] = useInView(0.1);

  return (
    <section
      ref={sectionRef}
      className="relative w-full mx-auto overflow-hidden bg-secondary text-primary"
      id="about"
    >
      {/* Top Accent Line */}
      {/* <div className="h-px w-full bg-linear-to-r from-transparent via-primary/20 to-transparent" /> */}

      {/* Centered Title & Description */}
      <div
        className={`max-w-4xl mx-auto text-center px-6 pt-16 pb-12 transition-all duration-1000 ease-out ${
          sectionInView
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-8"
        }`}
      >
        {/* Micro-Header Tag */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-8 h-px bg-primary/40" />
          <p className="text-[10px] uppercase font-bold tracking-[0.25em] text-primary/70">
            TRUST • QUALITY • CAREER GROWTH
          </p>
          <div className="w-8 h-px bg-primary/40" />
        </div>

        {/* Main Title */}
        <h2 className="font-serif-editorial text-[clamp(2rem,5vw,4.25rem)] font-normal leading-[1.15] tracking-tight max-w-4xl mx-auto capitalize">
          About <span className="italic font-normal">The Big Tree Makeup</span>{" "}
          Academy
        </h2>

        {/* Accent Bar */}
        {/* <div className="w-16 h-0.5 bg-primary mx-auto mb-6 rounded-full" /> */}

        {/* Description */}
        <div className="font-serif-editorial text-lg font-medium leading-tight mt-4">
          <p>
            Big Tree Beauty Academy empowers aspiring artists with professional
            skills, hands-on training, and industry knowledge to confidently
            build their future in beauty.
          </p>
          <p>
            Our programs blend personalized mentorship with the latest trends,
            so every student graduates ready to succeed.
          </p>
        </div>
      </div>

      {/* Image with Pillars Arranged Around It */}
      <div
        className={`relative max-w-6xl mx-auto px-6 pb-16 transition-all duration-1000 ease-out delay-200 ${
          sectionInView ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <div className="relative flex items-center justify-center">
          {/* Central Image Container */}
          <div className="relative w-72 h-96 md:w-80 md:h-105 lg:w-96 lg:h-120 rounded-[30px] overflow-hidden shadow-2xl z-10">
            <Image
              src="/assets/images/about-image.jpg"
              alt="Live Masterclass Session at The Big Tree Academy"
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-tr from-primary/20 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Pillars Arranged Around Image - Desktop */}
          <div className="hidden lg:block absolute inset-0 pointer-events-none ">
            {/* Top Left */}
            <div
              className="absolute top-0 left-0 pointer-events-auto"
              style={{ transform: "translate(-20px, 20px)" }}
            >
              <PillarItem pillar={pillars[0]} index={0} />
            </div>

            {/* Top Right */}
            <div
              className="absolute top-0 right-0 pointer-events-auto"
              style={{ transform: "translate(20px, 20px)" }}
            >
              <PillarItem pillar={pillars[1]} index={1} />
            </div>

            {/* Middle Left */}
            <div
              className="absolute top-1/2 left-0 -translate-y-1/2 pointer-events-auto"
              style={{ transform: "translate(-40px, -50%)" }}
            >
              <PillarItem pillar={pillars[2]} index={2} />
            </div>

            {/* Middle Right */}
            <div
              className="absolute top-1/2 right-0 -translate-y-1/2 pointer-events-auto"
              style={{ transform: "translate(40px, -50%)" }}
            >
              <PillarItem pillar={pillars[3]} index={3} />
            </div>

            {/* Bottom Center */}
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-auto z-10"
              style={{ transform: "translate(-50%, 30px)" }}
            >
              <PillarItem pillar={pillars[4]} index={4} />
            </div>
          </div>

          {/* Decorative Corner Brackets */}
          <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-primary/20 rounded-tl-xl pointer-events-none" />
          <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-2 border-r-2 border-primary/20 rounded-br-xl pointer-events-none" />
        </div>

        {/* Pillars for Mobile/Tablet - Stacked Below Image */}
        <div className="lg:hidden flex flex-col gap-3 mt-8 max-w-xl mx-auto">
          {pillars.map((pillar, index) => (
            <PillarItem key={index} pillar={pillar} index={index} />
          ))}
        </div>
      </div>

      {/* Buttons Below Image */}
      <div
        className={`flex flex-row justify-center gap-0 sm:gap-4 pb-20 transition-all duration-1000 ease-out delay-300 ${
          sectionInView
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-6"
        }`}
      >
        <button
          onClick={() => scrollTo("courses")}
          className="px-5 sm:px-8 py-2.5 mx-2 sm:py-3.5 bg-primary text-secondary rounded-full font-semibold text-[11px] sm:text-xs uppercase tracking-widest shadow-md hover:shadow-lg hover:opacity-90 active:scale-95 transition-all duration-300"
        >
          Explore Courses
        </button>
        <button
          onClick={() => scrollTo("contact")}
          className="px-5 sm:px-8 py-2.5 mx-2 sm:py-3.5 bg-transparent text-primary border border-primary/30 rounded-full font-semibold text-[11px] sm:text-xs uppercase tracking-widest hover:bg-primary/5 active:scale-95 transition-all duration-300"
        >
          Learn More
        </button>
      </div>

      {/* Bottom Accent Line */}
      <div className="h-px w-full bg-linear-to-r from-transparent via-primary/10 to-transparent" />
    </section>
  );
}

function PillarItem({ pillar, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="group flex items-center gap-3 p-3 rounded-xl border border-primary/10 bg-secondary/80 backdrop-blur-sm shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300 cursor-default max-w-xs"
      style={{ animationDelay: `${index * 100}ms` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span
        className={`text-sm font-semibold transition-all duration-300 ${
          hovered ? "text-primary rotate-45" : "text-primary/50"
        }`}
      >
        {pillar.icon}
      </span>
      <span
        className={`text-sm font-medium transition-colors duration-300 ${
          hovered ? "text-primary" : "text-primary/80"
        }`}
      >
        {pillar.text}
      </span>
    </div>
  );
}
