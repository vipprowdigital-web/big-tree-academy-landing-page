"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  PiArrowRight,
  PiCaretLeft,
  PiCaretRight,
  PiClock,
} from "react-icons/pi";
import { useReveal } from "@/utils/motion";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000";

export const formatArticleDate = (value) =>
  value
    ? new Date(value).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "";

export function ArticleCard({ article }) {
  return (
    <article className="group panel overflow-hidden flex flex-col h-full">
      <Link
        href={`/articles/${article._id}`}
        className="relative block aspect-16/10 bg-surface overflow-hidden"
        tabIndex={-1}
        aria-hidden="true"
      >
        {article.thumbnail ? (
          <Image
            src={article.thumbnail}
            alt=""
            fill
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <Image
            src="/assets/images/logos/big-tree-logo2.png"
            alt=""
            fill
            sizes="30vw"
            className="object-contain p-10"
          />
        )}
        {article.category?.name && (
          <span className="absolute top-3 left-3 text-xs font-bold px-3 py-1.5 rounded-full bg-secondary text-primary">
            {article.category.name}
          </span>
        )}
      </Link>

      <div className="flex flex-col gap-2 p-5 flex-1">
        <h3 className="h3 line-clamp-2">
          <Link
            href={`/articles/${article._id}`}
            className="hover:underline underline-offset-4"
          >
            {article.title}
          </Link>
        </h3>
        {article.short_description && (
          <p className="text-sm text-muted leading-relaxed line-clamp-2">
            {article.short_description}
          </p>
        )}
        <div className="flex-1" />
        <p className="flex items-center gap-3 pt-2 text-xs font-semibold text-muted">
          <span>{formatArticleDate(article.createdAt)}</span>
          {article.read_time && (
            <span className="flex items-center gap-1">
              <PiClock aria-hidden="true" />
              {article.read_time}
            </span>
          )}
        </p>
      </div>
    </article>
  );
}

/** Carousel: 3 cards per view on desktop, 2 on tablet, 1 on phones. Arrows appear only when cards overflow. */
function ArticleCarousel({ articles }) {
  const trackRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [maxIdx, setMaxIdx] = useState(0);

  const measure = () => {
    const track = trackRef.current;
    const first = track?.children[0];
    if (!track || !first) return;
    const gap = parseFloat(getComputedStyle(track).columnGap || "24");
    const step = first.offsetWidth + gap;
    const overflow = track.scrollWidth - track.clientWidth;
    setMaxIdx(overflow > 8 ? Math.max(0, Math.ceil((overflow - 8) / step)) : 0);
  };

  useEffect(() => {
    const frame = requestAnimationFrame(measure);
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", measure);
    };
  }, [articles.length]);

  const goTo = (i) => {
    const track = trackRef.current;
    const card = track?.children[i];
    if (!card) return;
    track.scrollTo({
      left: card.offsetLeft - track.offsetLeft,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    const track = trackRef.current;
    const first = track?.children[0];
    if (!first) return;
    const gap = parseFloat(getComputedStyle(track).columnGap || "24");
    const i = Math.round(track.scrollLeft / (first.offsetWidth + gap));
    setIndex(Math.min(Math.max(i, 0), articles.length - 1));
  };

  return (
    <div className="flex flex-col gap-8">
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="flex gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth"
      >
        {articles.map((article) => (
          <div
            key={article._id}
            className="snap-start shrink-0 w-full sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]"
          >
            <ArticleCard article={article} />
          </div>
        ))}
      </div>

      {maxIdx > 0 && (
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => goTo(Math.max(index - 1, 0))}
            disabled={index === 0}
            aria-label="Previous articles"
            className="size-11 grid place-items-center rounded-full border border-line bg-white text-primary disabled:opacity-35 hover:bg-primary hover:text-white transition-colors"
          >
            <PiCaretLeft />
          </button>
          <button
            type="button"
            onClick={() => goTo(Math.min(index + 1, maxIdx))}
            disabled={index >= maxIdx}
            aria-label="Next articles"
            className="size-11 grid place-items-center rounded-full border border-line bg-white text-primary disabled:opacity-35 hover:bg-primary hover:text-white transition-colors"
          >
            <PiCaretRight />
          </button>
          <p className="ml-2 text-sm font-semibold text-muted tabular-nums">
            {Math.min(index + 1, articles.length)} of {articles.length}
          </p>
        </div>
      )}
    </div>
  );
}

export default function Articles() {
  const root = useRef(null);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${baseUrl}/api/v1/blog?limit=12`, { cache: "no-store" })
      .then((r) => r.json())
      .then((result) => {
        if (Array.isArray(result.data)) setArticles(result.data);
      })
      .catch((error) => console.error("Error fetching articles:", error))
      .finally(() => setLoading(false));
  }, []);

  useReveal(root, [loading]);

  // Keep the ref attached even when empty so the reveal hook always has a valid scope.
  if (!loading && articles.length === 0) return <div ref={root} hidden />;

  return (
    <section ref={root} id="articles" className="section bg-white">
      <div className="frame flex flex-col gap-10">
        <div
          data-reveal
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
        >
          <div className="flex flex-col gap-3 max-w-2xl">
            <h2 className="h2">Tips and stories from the academy</h2>
            <p className="lead">Short reads from our mentors and students.</p>
          </div>
          <Link
            href="/articles"
            className="btn btn-quiet self-start sm:self-auto"
          >
            All articles <PiArrowRight aria-hidden="true" />
          </Link>
        </div>

        {loading ? (
          <p className="text-muted">Loading articles…</p>
        ) : (
          <div data-reveal>
            <ArticleCarousel articles={articles} />
          </div>
        )}
      </div>
    </section>
  );
}
