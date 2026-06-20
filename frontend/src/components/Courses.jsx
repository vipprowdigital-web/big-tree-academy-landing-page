// "use client";

// import Image from "next/image";
// import { useEffect, useState } from "react";
// import { BsStar } from "react-icons/bs";

// const SUMMARY_LIMIT = 3;
// const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000";

// const cleanHtmlText = (html) => {
//   if (!html) return "";
//   if (typeof window === "undefined") {
//     return html.replace(/<[^>]*>/g, "");
//   }
//   const div = document.createElement("div");
//   div.innerHTML = html;
//   return div.textContent || div.innerText || "";
// };

// export default function Courses({ onContactClick }) {
//   const [active, setActive] = useState("offline");
//   const [activeSubCategory, setActiveSubCategory] = useState("All");
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchCourses = async () => {
//       const apiUrl = `${baseUrl}/api/v1/course?limit=100`;
//       try {
//         const response = await fetch(apiUrl, {
//           method: "GET",
//           cache: "no-store",
//         });
//         const result = await response.json();

//         if (response.ok && Array.isArray(result.data)) {
//           const formattedCourses = result.data.map((course) => {
//             const categoryName =
//               course.category?.name ||
//               course.category?.title ||
//               "Uncategorized";

//             return {
//               id: course._id,
//               name: course.title || "",
//               category: categoryName.toLowerCase(),
//               categoryLabel: categoryName,
//               image: course.thumbnail || "/assets/images/gaura/images.png",
//               desc: cleanHtmlText(
//                 course.description || course.short_description || "",
//               ),
//               shortDesc: cleanHtmlText(course.short_description || ""),
//               level: course.level || "beginner",
//               duration: course.duration || "",
//               price: course.price || 0,
//               sale_price: course.sale_price || 0,
//               lessons_count: course.lessons_count || 0,
//               summary: [
//                 course.level ? `Level: ${course.level}` : "",
//                 course.duration ? `Duration: ${course.duration}` : "",
//                 course.lessons_count
//                   ? `${course.lessons_count} lessons included`
//                   : "",
//                 course.sale_price
//                   ? `Offer Price: ₹${course.sale_price}`
//                   : course.price
//                     ? `Price: ₹${course.price}`
//                     : "",
//               ].filter(Boolean),
//             };
//           });
//           setCourses(formattedCourses);
//         }
//       } catch (error) {
//         console.error("Error fetching courses:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchCourses();
//   }, []);

//   const filteredCourses = courses.filter((course) => {
//     if (activeSubCategory === "All") return true;
//     return course.category === activeSubCategory.toLowerCase();
//   });

//   const dynamicCategories = [
//     "All",
//     ...Array.from(
//       new Set(courses.map((course) => course.categoryLabel).filter(Boolean)),
//     ),
//   ];

//   return (
//     <section className="w-full bg-linear-to-tr from-secondary via-secondary to-white text-primary py-16 px-4 md:px-12">
//       {/* Font & Global Reset Injection */}
//       <style jsx global>{`
//         @import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap");
//         .font-serif-editorial {
//           font-family: "Cormorant Garamond", serif;
//         }
//         .font-sans-clean {
//           font-family: "Plus Jakarta Sans", sans-serif;
//         }
//         .no-scrollbar::-webkit-scrollbar {
//           display: none;
//         }
//         .no-scrollbar {
//           -ms-overflow-style: none;
//           scrollbar-width: none;
//         }
//       `}</style>

//       {/* ── CENTRAL HUB PLATFORM TOGGLE ── */}
//       <div className="max-w-xl mx-auto mb-12 flex justify-center p-1.5 bg-primary/3 border border-primary/10 rounded-full font-sans-clean">
//         <button
//           onClick={() => setActive("offline")}
//           className={`w-1/2 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
//             active === "offline"
//               ? "bg-primary text-secondary shadow-md"
//               : "text-primary/60 hover:text-primary"
//           }`}
//         >
//           Studio Classrooms
//         </button>
//         <button
//           onClick={() => setActive("online")}
//           className={`w-1/2 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
//             active === "online"
//               ? "bg-primary text-secondary shadow-md"
//               : "text-primary/60 hover:text-primary"
//           }`}
//         >
//           Digital Classes
//         </button>
//       </div>

//       {/* ── FILTER CHIPS TRACK ── */}
//       <div className="w-full border-b border-primary/10 pb-4 mb-16">
//         <div className="max-w-4xl mx-auto flex items-center gap-2 overflow-x-auto no-scrollbar px-2 justify-start md:justify-center">
//           {dynamicCategories.map((cat) => {
//             const isActive = activeSubCategory === cat;
//             return (
//               <button
//                 key={cat}
//                 onClick={() => setActiveSubCategory(cat)}
//                 className={`px-5 py-2 rounded-full text-xs font-sans-clean font-medium transition-all duration-300 border whitespace-nowrap ${
//                   isActive
//                     ? "bg-primary/10 border-primary text-primary font-bold"
//                     : "border-primary/10 text-primary/60 hover:border-primary/30 hover:text-primary"
//                 }`}
//               >
//                 {cat}
//               </button>
//             );
//           })}
//         </div>
//       </div>

//       {/* ── SECTION HEADER TEXT ── */}
//       <div className="flex flex-col items-center gap-3 px-6 text-center max-w-3xl mx-auto mb-16 z-10 relative">
//         <div className="flex items-center gap-2 text-[10px] font-sans-clean uppercase font-bold tracking-[0.3em] text-primary/60">
//           <span className="w-6 h-px bg-primary/30" />
//           Curriculum Portfolios
//           <span className="w-6 h-px bg-primary/30" />
//         </div>
//         <h2 className="font-serif-editorial text-[clamp(2.25rem,5vw,3.75rem)] font-light leading-none tracking-tight">
//           Master Your Beauty <span className="italic font-normal">Craft</span>
//         </h2>
//         <p className="text-xs md:text-sm font-sans-clean leading-relaxed text-primary/70 max-w-xl">
//           Immerse yourself within industry programs architected by master makeup
//           directors to launch real professions.
//         </p>
//       </div>

//       {/* ── CARDS LOOP VIEWPORT ── */}
//       <div className="max-w-7xl mx-auto">
//         {active === "offline" ? (
//           loading ? (
//             <div className="w-full py-24 flex justify-center items-center font-sans-clean text-sm tracking-wider opacity-60">
//               Syncing Masterclass Portfolios...
//             </div>
//           ) : filteredCourses.length > 0 ? (
//             <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-12 items-start">
//               {filteredCourses.map((course, index) => (
//                 <div
//                   key={course.id}
//                   className="even:mt-0 md:even:mt-12 transition-all duration-500"
//                 >
//                   <CourseCard course={course} onContactClick={onContactClick} />
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="w-full py-24 flex justify-center items-center font-sans-clean text-sm text-primary/40">
//               No academy tracks are active in this tier currently.
//             </div>
//           )
//         ) : (
//           <div className="w-full py-32 flex flex-col justify-center items-center text-center">
//             <h3 className="font-serif-editorial text-4xl italic font-light tracking-wide">
//               The Digital Suite
//             </h3>
//             <div className="w-8 h-px bg-primary/40 my-4" />
//             <p className="font-sans-clean text-xs uppercase tracking-[0.2em] text-primary/50">
//               Launching Soon • Global Access
//             </p>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }

// function CourseCard({ course, onContactClick }) {
//   const [expanded, setExpanded] = useState(false);
//   const [showFullDesc, setShowFullDesc] = useState(false);

//   const hasMore = course.summary.length > SUMMARY_LIMIT;
//   const visibleItems = expanded
//     ? course.summary
//     : course.summary.slice(0, SUMMARY_LIMIT);

//   const descriptionLimit = 150;
//   const fullDescription = course.desc || "";
//   const shouldTrimDescription = fullDescription.length > descriptionLimit;
//   const visibleDescription =
//     showFullDesc || !shouldTrimDescription
//       ? fullDescription
//       : `${fullDescription.slice(0, descriptionLimit)}...`;

//   return (
//     <div className="group flex flex-col w-full bg-primary/1 border border-primary/10 rounded-3xl overflow-hidden hover:bg-secondary hover:border-primary hover:shadow-2xl transition-all duration-500 ease-out">
//       {/* Framed Editorial Media Container */}
//       <div className="relative aspect-4/3 bg-primary/5 border-b border-primary/5 overflow-hidden m-2 ml-2 mt-2 w-[calc(100%-16px)] rounded-[18px]">
//         <Image
//           src={course.image}
//           alt={course.name}
//           width={200}
//           height={200}
//           className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
//           onError={(e) => {
//             e.currentTarget.src = "/assets/images/gaura/images.png";
//           }}
//         />
//         {/* Dynamic Category Mini-Pill Badge */}
//         <div className="absolute top-3 left-3">
//           <span className="text-[9px] font-sans-clean uppercase font-bold tracking-widest px-3 py-1.5 rounded-full bg-secondary/90 text-primary border border-primary/10 backdrop-blur-sm">
//             {course.categoryLabel}
//           </span>
//         </div>
//       </div>

//       {/* Content Space Payload */}
//       <div className="flex flex-col p-6 flex-1 font-sans-clean">
//         {/* Rating Metrics Header */}
//         <div className="flex items-center gap-2 mb-3">
//           <div className="flex items-center gap-0.5">
//             {[...Array(4)].map((_, j) => (
//               <BsStar key={j} className="text-primary text-[10px]" />
//             ))}
//             <BsStar className="text-primary/20 text-[10px]" />
//           </div>
//           <span className="text-[10px] font-bold tracking-wider opacity-60">
//             (4.9 Studio Verified)
//           </span>
//         </div>

//         {/* Title Asset */}
//         <h3 className="font-serif-editorial text-2xl font-normal leading-tight tracking-tight text-primary group-hover:text-primary transition-colors duration-300 mb-3">
//           {course.name}
//         </h3>

//         {/* Body Copy Area */}
//         {fullDescription && (
//           <div className="flex flex-col gap-2 mb-4">
//             <p className="text-xs leading-relaxed text-primary/70 font-light">
//               {visibleDescription}
//             </p>
//             {shouldTrimDescription && (
//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   setShowFullDesc(!showFullDesc);
//                 }}
//                 className="text-[10px] font-bold text-primary underline underline-offset-4 w-fit hover:opacity-70 transition-opacity"
//               >
//                 {showFullDesc ? "Collapse Context" : "Read Full Scope"}
//               </button>
//             )}
//           </div>
//         )}

//         {/* Thin Divider Rule */}
//         <div className="w-full h-px bg-primary/10 my-2" />

//         {/* Summary Parameters Highlights */}
//         {visibleItems.length > 0 && (
//           <ul className="flex flex-col gap-2 my-2">
//             {visibleItems.map((sum, i) => (
//               <li
//                 key={i}
//                 className="flex items-center gap-2 text-xs font-medium text-primary/80"
//               >
//                 <span className="w-1.5 h-1.5 rounded-full bg-primary/30 shrink-0" />
//                 {sum}
//               </li>
//             ))}
//           </ul>
//         )}

//         {/* Dynamic Expand Track Toggle */}
//         {hasMore && (
//           <button
//             onClick={(e) => {
//               e.stopPropagation();
//               setExpanded(!expanded);
//             }}
//             className="text-[10px] font-bold uppercase tracking-wider text-primary/40 hover:text-primary transition-colors mt-1 mb-4 w-fit"
//           >
//             {expanded
//               ? "← Wrap Details"
//               : `+ Reveal ${course.summary.length - SUMMARY_LIMIT} Track Items`}
//           </button>
//         )}

//         {/* Push Content Anchor layout hook */}
//         <div className="flex-1 min-h-4" />

//         {/* Monolithic Action Button Trigger */}
//         <button
//           onClick={onContactClick}
//           className="w-full py-3.5 rounded-xl font-bold uppercase tracking-widest text-[10px] bg-primary text-secondary transition-all duration-300 shadow-sm group-hover:shadow-md group-hover:scale-[1.01] active:scale-95"
//         >
//           Secure Seat Allocation
//         </button>
//       </div>
//     </div>
//   );
// }

"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { BsStar, BsChevronLeft, BsChevronRight } from "react-icons/bs";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000";

const cleanHtmlText = (html) => {
  if (!html) return "";
  if (typeof window === "undefined") {
    return html.replace(/<[^>]*>/g, "");
  }
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
};

export default function Courses({ onContactClick }) {
  const [active, setActive] = useState("offline");
  const [activeSubCategory, setActiveSubCategory] = useState("All");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      const apiUrl = `${baseUrl}/api/v1/course?limit=100`;
      try {
        const response = await fetch(apiUrl, {
          method: "GET",
          cache: "no-store",
        });
        const result = await response.json();

        if (response.ok && Array.isArray(result.data)) {
          const formattedCourses = result.data.map((course) => {
            const categoryName =
              course.category?.name ||
              course.category?.title ||
              "Uncategorized";

            return {
              id: course._id,
              name: course.title || "",
              category: categoryName.toLowerCase(),
              categoryLabel: categoryName,
              image: course.thumbnail || "/assets/logo/big-tree-logo.png",
              desc: cleanHtmlText(
                course.description || course.short_description || "",
              ),
              shortDesc: cleanHtmlText(course.short_description || ""),
              level: course.level || "",
              duration: course.duration || "",
              price: course.price || 0,
              sale_price: course.sale_price || 0,
              lessons_count: course.lessons_count || 0,
            };
          });
          setCourses(formattedCourses);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const filteredCourses = courses.filter((course) => {
    if (activeSubCategory === "All") return true;
    return course.category === activeSubCategory.toLowerCase();
  });

  const dynamicCategories = [
    "All",
    ...Array.from(
      new Set(courses.map((course) => course.categoryLabel).filter(Boolean)),
    ),
  ];

  return (
    <section
      className="w-full bg-linear-to-tr from-secondary via-secondary to-white text-primary py-16 px-4 md:px-12"
      id="courses"
    >
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap");
        .font-serif-editorial {
          font-family: "Cormorant Garamond", serif;
        }
        .font-sans-clean {
          font-family: "Plus Jakarta Sans", sans-serif;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>

      {/* ── CENTRAL HUB PLATFORM TOGGLE ── */}
      <div className="max-w-xl mx-auto mb-12 flex justify-center p-1.5 bg-primary/3 border border-primary/10 rounded-full font-sans-clean">
        <button
          onClick={() => setActive("offline")}
          className={`w-1/2 py-2 sm:py-3 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
            active === "offline"
              ? "bg-primary text-secondary shadow-md"
              : "text-primary/60 hover:text-primary"
          }`}
        >
          Classrooms
        </button>
        <button
          onClick={() => setActive("online")}
          className={`w-1/2 py-2 sm:py-3 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
            active === "online"
              ? "bg-primary text-secondary shadow-md"
              : "text-primary/60 hover:text-primary"
          }`}
        >
          Online / Digital Classes
        </button>
      </div>

      {/* ── FILTER CHIPS TRACK ── */}
      <div className="w-full border-b border-primary/10 pb-4 mb-16">
        <div className="max-w-4xl mx-auto flex items-center gap-2 overflow-x-auto no-scrollbar px-2 flex-nowrap justify-center">
          {dynamicCategories.map((cat) => {
            const isActive = activeSubCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveSubCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs font-sans-clean font-medium transition-all duration-300 border whitespace-nowrap ${
                  isActive
                    ? "bg-primary/10 border-primary text-primary font-bold"
                    : "border-primary/10 text-primary/60 hover:border-primary/30 hover:text-primary"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── SECTION HEADER TEXT ── */}
      <div className="flex flex-col items-center gap-3 px-6 text-center max-w-3xl mx-auto mb-16 z-10 relative">
        <div className="flex items-center gap-2 text-[10px] font-sans-clean uppercase font-bold tracking-[0.3em] text-primary/60">
          <span className="w-6 h-px bg-primary/30" />
          Curriculum Portfolios
          <span className="w-6 h-px bg-primary/30" />
        </div>
        <h2 className="font-serif-editorial text-[clamp(2.25rem,5vw,3.75rem)] font-light leading-none tracking-tight">
          Master Your Beauty <span className="italic font-normal">Craft</span>
        </h2>
        <p className="text-xs md:text-sm font-sans-clean leading-relaxed text-primary/70 max-w-xl">
          Immerse yourself within industry programs architected by master makeup
          directors to launch real professions.
        </p>
      </div>

      {/* ── CARDS LOOP VIEWPORT ── */}
      <div className="max-w-7xl mx-auto">
        {active === "offline" ? (
          loading ? (
            <div className="w-full py-24 flex justify-center items-center font-sans-clean text-sm tracking-wider opacity-60">
              Syncing Masterclass Portfolios...
            </div>
          ) : filteredCourses.length > 0 ? (
            filteredCourses.length > 3 ? (
              <CourseSlider
                key={activeSubCategory}
                courses={filteredCourses}
                onContactClick={onContactClick}
              />
            ) : filteredCourses.length === 1 ? (
              <div className="flex justify-center">
                <div className="w-full max-w-sm">
                  <CourseCard
                    course={filteredCourses[0]}
                    onContactClick={onContactClick}
                  />
                </div>
              </div>
            ) : (
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-12 items-start">
                {filteredCourses.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    onContactClick={onContactClick}
                  />
                ))}
              </div>
            )
          ) : (
            <div className="w-full py-24 flex justify-center items-center font-sans-clean text-sm text-primary/40">
              No academy tracks are active in this tier currently.
            </div>
          )
        ) : (
          <div className="w-full py-10 flex flex-col justify-center items-center text-center">
            <h3 className="font-serif-editorial text-4xl italic font-light tracking-wide">
              The Digital Suite
            </h3>
            <div className="w-8 h-px bg-primary/40 my-4" />
            <p className="font-sans-clean text-xs uppercase tracking-[0.2em] text-primary/50">
              Launching Soon • Global Access
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

/* ── SLIDER WRAPPER FOR 4+ COURSES ── */
function CourseSlider({ courses, onContactClick }) {
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToIndex = (index) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[index];
    if (card) {
      const trackRect = track.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();
      track.scrollBy({
        left: cardRect.left - trackRect.left,
        behavior: "smooth",
      });
    }
  };

  const handleScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const first = track.children[0];
    if (!first) return;
    const gap = parseFloat(getComputedStyle(track).columnGap || "32");
    const step = first.offsetWidth + gap;
    const index = Math.round(track.scrollLeft / step);
    setActiveIndex(Math.min(Math.max(index, 0), courses.length - 1));
  };

  const next = () =>
    scrollToIndex(Math.min(activeIndex + 1, courses.length - 1));
  const prev = () => scrollToIndex(Math.max(activeIndex - 1, 0));

  return (
    <div className="relative">
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="flex gap-8 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-2 scroll-smooth"
      >
        {courses.map((course) => (
          <div key={course.id} className="snap-start shrink-0 w-[82%] sm:w-90">
            <CourseCard course={course} onContactClick={onContactClick} />
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-6 mt-8 font-sans-clean">
        <button
          onClick={prev}
          disabled={activeIndex === 0}
          aria-label="Previous courses"
          className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center text-primary disabled:opacity-30 hover:border-primary hover:bg-primary/5 transition-all"
        >
          <BsChevronLeft className="text-xs" />
        </button>

        <div className="flex items-center gap-2">
          {courses.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToIndex(i)}
              aria-label={`Go to course ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activeIndex ? "w-6 bg-primary" : "w-1.5 bg-primary/20"
              }`}
            />
          ))}
        </div>

        <button
          onClick={next}
          disabled={activeIndex === courses.length - 1}
          aria-label="Next courses"
          className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center text-primary disabled:opacity-30 hover:border-primary hover:bg-primary/5 transition-all"
        >
          <BsChevronRight className="text-xs" />
        </button>
      </div>
    </div>
  );
}

/* ── REDESIGNED COURSE CARD (shorter, more editorial) ── */
function CourseCard({ course, onContactClick }) {
  const metaItems = [
    course.level,
    course.duration,
    course.lessons_count ? `${course.lessons_count} lessons` : "",
  ].filter(Boolean);

  const description = course.shortDesc || course.desc || "";

  return (
    <div
      className="group flex flex-col w-full h-full bg-linear-to-tr from-white to-secondary border border-primary/10 rounded-[28px] overflow-hidden hover:border-primary hover:shadow-[0_24px_48px_-16px_rgba(40,8,46,0.2)] transition-all duration-500 ease-out"
      id="about"
    >
      {/* Image with overlay rating, frees up content space below */}
      <div className="relative aspect-4/3 overflow-hidden">
        <Image
          src={course.image}
          alt={course.name}
          width={400}
          height={300}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          onError={(e) => {
            e.currentTarget.src = "/assets/images/logos/big-tree-logo2.png";
          }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-primary/75 via-primary/0 to-primary/0" />

        <span className="absolute top-4 left-4 text-[9px] font-sans-clean uppercase font-bold tracking-[0.2em] px-3 py-1.5 rounded-full bg-primary text-secondary backdrop-blur-sm">
          {course.categoryLabel}
        </span>

        {/* <div className="absolute bottom-3 left-4 flex items-center gap-1">
          {[...Array(course.rating)].map((_, j) => (
            <BsStar
              key={j}
              className={`text-[10px] ${j < 4 ? "text-secondary" : "text-secondary/30"}`}
            />
          ))}
          <span className="text-[10px] font-sans-clean font-bold text-secondary ml-1">
            4.9
          </span>
        </div> */}
      </div>

      {/* Compact content payload */}
      <div className="flex flex-col p-6 flex-1 font-sans-clean gap-3">
        <h3 className="font-serif-editorial text-[1.6rem] leading-tight font-normal text-primary">
          {course.name}
        </h3>

        {metaItems.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap text-[10px] font-bold uppercase tracking-wider text-primary/50">
            {metaItems.map((m, i) => (
              <span key={i} className="flex items-center gap-2">
                {i > 0 && (
                  <span className="w-1 h-1 rounded-full bg-primary/30" />
                )}
                {m}
              </span>
            ))}
          </div>
        )}

        {description && (
          <p className="text-sm leading-relaxed text-primary font-light line-clamp-2">
            {description}
          </p>
        )}

        <div className="flex-1" />

        <div className="w-full h-px bg-primary/10" />

        <div className="flex items-center justify-between gap-3 pt-1">
          <div className="flex items-baseline gap-2">
            {course.sale_price ? (
              <>
                <span className="font-serif-editorial text-xl text-primary">
                  ₹{course.sale_price}
                </span>
                <span className="text-[11px] text-primary/40 line-through font-medium">
                  ₹{course.price}
                </span>
              </>
            ) : course.price ? (
              <span className="font-serif-editorial text-xl text-primary">
                ₹{course.price}
              </span>
            ) : (
              <span className="font-serif-editorial text-lg italic text-primary/70">
                Enquire
              </span>
            )}
          </div>

          <button
            onClick={() => onContactClick(course.name)}
            className="px-5 py-3 rounded-full font-bold uppercase tracking-widest text-[9px] bg-primary text-secondary transition-all duration-300 shadow-sm group-hover:shadow-md hover:scale-[1.03] active:scale-95 whitespace-nowrap"
          >
            Secure Seat
          </button>
        </div>
      </div>
    </div>
  );
}
