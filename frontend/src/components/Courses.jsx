"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  PiArrowRight,
  PiCaretLeft,
  PiCaretRight,
  PiClock,
  PiStack,
  PiBookOpenText,
} from "react-icons/pi";
import { useReveal } from "@/utils/motion";

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
  const root = useRef(null);
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
              image: course.thumbnail || "",
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

  useReveal(root, [loading, active, activeSubCategory]);

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
    <section ref={root} id="courses" className="section bg-white">
      <div className="frame flex flex-col gap-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div data-reveal className="flex flex-col gap-3 max-w-2xl">
            <h2 className="h2">Courses built for working artists</h2>
            <p className="lead">
              Pick a course, see the duration and fee, and reserve your seat.
            </p>
          </div>

          <div
            data-reveal
            role="tablist"
            aria-label="Class format"
            className="inline-flex self-start md:self-auto p-1 rounded-xl bg-surface border border-line"
          >
            {[
              { key: "offline", label: "At the academy" },
              { key: "online", label: "Online" },
            ].map((t) => (
              <button
                key={t.key}
                type="button"
                role="tab"
                aria-selected={active === t.key}
                onClick={() => setActive(t.key)}
                className={`px-5 py-2 rounded-lg text-sm font-bold transition-colors ${
                  active === t.key
                    ? "bg-primary text-white"
                    : "text-primary hover:bg-white"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {active === "offline" && dynamicCategories.length > 2 && (
          <div
            data-reveal
            className="flex gap-2 overflow-x-auto no-scrollbar flex-nowrap"
          >
            {dynamicCategories.map((cat) => {
              const isActive = activeSubCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveSubCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${
                    isActive
                      ? "bg-secondary text-primary"
                      : "bg-surface text-muted hover:text-primary"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        )}

        <div>
          {active === "offline" ? (
            loading ? (
              <p className="py-16 text-muted">Loading courses…</p>
            ) : filteredCourses.length > 0 ? (
              <CoursePager
                key={`${activeSubCategory}-${filteredCourses.length}`}
                courses={filteredCourses}
                onContactClick={onContactClick}
              />
            ) : (
              <p className="py-16 text-muted">
                No courses are open in this category right now.
              </p>
            )
          ) : (
            <div
              data-reveal
              className="panel p-8 sm:p-10 flex flex-col gap-2 max-w-2xl"
            >
              <p className="h3">Online classes are coming soon.</p>
              <p className="text-muted">
                Learn from anywhere with the same mentors. Enquire and we will
                tell you when the first batch opens.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ── Pages of cards: 3 columns x 2 rows on desktop, 2 x 2 on tablet, 1 on phones ── */
const PER_PAGE = { lg: 6, sm: 4, base: 1 };

function usePerPage() {
  const [perPage, setPerPage] = useState(PER_PAGE.lg);

  useEffect(() => {
    const lg = window.matchMedia("(min-width: 1024px)");
    const sm = window.matchMedia("(min-width: 640px)");
    const update = () =>
      setPerPage(
        lg.matches ? PER_PAGE.lg : sm.matches ? PER_PAGE.sm : PER_PAGE.base,
      );
    update();
    lg.addEventListener("change", update);
    sm.addEventListener("change", update);
    return () => {
      lg.removeEventListener("change", update);
      sm.removeEventListener("change", update);
    };
  }, []);

  return perPage;
}

function CoursePager({ courses, onContactClick }) {
  const perPage = usePerPage();
  const trackRef = useRef(null);
  const [page, setPage] = useState(0);

  const pages = [];
  for (let i = 0; i < courses.length; i += perPage) {
    pages.push(courses.slice(i, i + perPage));
  }

  const goTo = (i) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({ left: i * track.clientWidth, behavior: "smooth" });
  };

  const handleScroll = () => {
    const track = trackRef.current;
    if (!track || !track.clientWidth) return;
    setPage(
      Math.min(
        Math.max(Math.round(track.scrollLeft / track.clientWidth), 0),
        pages.length - 1,
      ),
    );
  };

  const gridClass = (count) =>
    perPage === 1
      ? "grid-cols-1"
      : count === 1
        ? "grid-cols-1 max-w-sm mx-auto"
        : count === 2 && perPage === 6
          ? "grid-cols-2 max-w-3xl mx-auto"
          : perPage === 6
            ? "grid-cols-3"
            : "grid-cols-2";

  return (
    <div className="flex flex-col gap-8">
      <div
        ref={trackRef}
        onScroll={handleScroll}
        data-reveal
        className="flex overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth"
      >
        {pages.map((items, i) => (
          <div key={i} className="w-full shrink-0 snap-start">
            <div className={`grid gap-6 ${gridClass(items.length)}`}>
              {items.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onContactClick={onContactClick}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {pages.length > 1 && (
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => goTo(Math.max(page - 1, 0))}
            disabled={page === 0}
            aria-label="Previous courses"
            className="size-11 grid place-items-center rounded-full border border-line bg-white text-primary disabled:opacity-35 hover:bg-primary hover:text-white transition-colors"
          >
            <PiCaretLeft />
          </button>
          <button
            type="button"
            onClick={() => goTo(Math.min(page + 1, pages.length - 1))}
            disabled={page === pages.length - 1}
            aria-label="Next courses"
            className="size-11 grid place-items-center rounded-full border border-line bg-white text-primary disabled:opacity-35 hover:bg-primary hover:text-white transition-colors"
          >
            <PiCaretRight />
          </button>
          <div className="flex items-center gap-1.5 ml-2">
            {pages.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to page ${i + 1}`}
                aria-current={i === page}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === page ? "w-6 bg-primary" : "w-2 bg-line"
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Course card ── */
function CourseCard({ course, onContactClick }) {
  const [imageFailed, setImageFailed] = useState(false);
  const showLogo = !course.image || imageFailed;
  const meta = [
    course.duration && { icon: PiClock, text: course.duration },
    course.level && { icon: PiStack, text: course.level },
    course.lessons_count && {
      icon: PiBookOpenText,
      text: `${course.lessons_count} lessons`,
    },
  ].filter(Boolean);

  const description = course.shortDesc || course.desc || "";
  const hasFee = Boolean(course.sale_price || course.price);

  return (
    <article className="group panel overflow-hidden flex flex-col h-full min-w-0 transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-rose">
      <div className="relative overflow-hidden bg-surface aspect-4/3">
        {showLogo ? (
          // No thumbnail, or it failed to load: show the academy logo instead.
          <Image
            src="/assets/images/logos/the-big-tree-logo-sm.png"
            alt={course.name}
            width={900}
            height={815}
            className="absolute inset-0 w-full h-full object-contain p-10"
          />
        ) : (
          <Image
            src={course.image}
            alt={course.name}
            width={800}
            height={600}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            onError={() => setImageFailed(true)}
          />
        )}
        <span className="absolute top-3 left-3 max-w-[calc(100%-1.5rem)] truncate text-xs font-bold px-3 py-1.5 rounded-full bg-secondary text-primary">
          {course.categoryLabel}
        </span>
      </div>

      <div className="flex flex-col flex-1 gap-3 p-5">
        <h3 className="h3 wrap-break-word">{course.name}</h3>

        {meta.length > 0 && (
          <ul className="flex flex-wrap gap-x-4 gap-y-1 text-sm font-semibold text-muted">
            {meta.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-1.5">
                <Icon aria-hidden="true" className="text-primary" />
                {text}
              </li>
            ))}
          </ul>
        )}

        {description && (
          <p className="text-sm leading-relaxed text-muted line-clamp-2">
            {description}
          </p>
        )}

        <div className="flex-1" />

        <div className="flex flex-col gap-3 pt-3">
          {hasFee && (
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-primary">
                ₹{course.sale_price || course.price}
              </span>
              {course.sale_price && course.price ? (
                <span className="text-sm line-through text-muted">
                  ₹{course.price}
                </span>
              ) : null}
            </div>
          )}

          <button
            type="button"
            onClick={() => onContactClick(course.name)}
            className="btn btn-primary w-full"
          >
            Reserve seat <PiArrowRight aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
}
