"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PiArrowLeft, PiClock } from "react-icons/pi";
import SiteShell from "@/components/SiteShell";
import { formatArticleDate } from "@/components/Articles";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000";

// Articles are written by admins in a rich-text editor; drop anything executable.
const sanitize = (html = "") =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/\son\w+\s*=\s*("[^"]*"|'[^']*')/gi, "")
    .replace(/javascript:/gi, "");

export default function ArticleView({ id }) {
  const [article, setArticle] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    fetch(`${baseUrl}/api/v1/blog/${id}`, { cache: "no-store" })
      .then((r) => r.json())
      .then((result) => {
        if (cancelled) return;
        if (result.success && result.data && result.data.isActive !== false) {
          setArticle(result.data);
          setStatus("ready");
        } else {
          setStatus("missing");
        }
      })
      .catch(() => !cancelled && setStatus("missing"));
    return () => {
      cancelled = true;
    };
  }, [id]);

  return (
    <SiteShell>
      <article className="section">
        <div className="frame">
          <div className="mx-auto max-w-3xl flex flex-col gap-8">
            <Link href="/articles" className="btn btn-quiet self-start !px-0">
              <PiArrowLeft aria-hidden="true" /> All articles
            </Link>

            {status === "loading" && <p className="text-muted">Loading…</p>}
            {status === "missing" && (
              <div className="flex flex-col items-start text-left gap-3">
                <h1 className="h2">We could not find that article</h1>
                <p className="text-muted">
                  It may have been unpublished or the link may be wrong.
                </p>
              </div>
            )}

            {status === "ready" && article && (
              <>
                <header className="flex flex-col items-start text-left gap-4">
                  {article.category?.name && (
                    <p className="text-xs font-bold px-3 py-1.5 rounded-full bg-secondary text-primary">
                      {article.category.name}
                    </p>
                  )}
                  <h1 className="h1">{article.title}</h1>
                  <p className="flex items-center gap-4 text-sm font-semibold text-muted">
                    <span>{formatArticleDate(article.createdAt)}</span>
                    {article.read_time && (
                      <span className="flex items-center gap-1">
                        <PiClock aria-hidden="true" /> {article.read_time}
                      </span>
                    )}
                  </p>
                </header>

                {article.thumbnail && (
                  <div className="crop relative aspect-16/9">
                    <Image
                      src={article.thumbnail}
                      alt={article.title}
                      fill
                      priority
                      sizes="(min-width: 768px) 48rem, 100vw"
                      className="object-cover"
                    />
                  </div>
                )}

                {article.short_description && (
                  <p className="lead !max-w-none text-ink">
                    {article.short_description}
                  </p>
                )}

                <div
                  className="article-body"
                  dangerouslySetInnerHTML={{
                    __html: sanitize(article.description),
                  }}
                />

                {Array.isArray(article.gallery_images) &&
                  article.gallery_images.length > 0 && (
                    <div className="grid grid-cols-2 gap-3">
                      {article.gallery_images.map((src) => (
                        <div key={src} className="crop relative aspect-4/3">
                          <Image
                            src={src}
                            alt=""
                            fill
                            sizes="(min-width: 768px) 24rem, 50vw"
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}
              </>
            )}
          </div>
        </div>
      </article>
    </SiteShell>
  );
}
