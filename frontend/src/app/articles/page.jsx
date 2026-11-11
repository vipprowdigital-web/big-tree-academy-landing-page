"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PiArrowLeft } from "react-icons/pi";
import SiteShell from "@/components/SiteShell";
import { ArticleCard } from "@/components/Articles";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000";
const PAGE_SIZE = 9;

export default function ArticlesPage() {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    fetch(`${baseUrl}/api/v1/blog?limit=${PAGE_SIZE}&page=${page}`, {
      cache: "no-store",
    })
      .then((r) => r.json())
      .then((result) => {
        if (cancelled) return;
        if (Array.isArray(result.data)) {
          setArticles((prev) =>
            page === 1 ? result.data : [...prev, ...result.data],
          );
          setTotalPages(result.pagination?.totalPages || 1);
        } else {
          setError("Could not load articles.");
        }
      })
      .catch(() => !cancelled && setError("Could not load articles."))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [page]);

  return (
    <SiteShell>
      <section className="section">
        <div className="frame flex flex-col gap-10">
          <div className="flex flex-col gap-3 max-w-2xl">
            <Link href="/" className="btn btn-quiet self-start !px-0">
              <PiArrowLeft aria-hidden="true" /> Back to home
            </Link>
            <h1 className="h1">Articles</h1>
            <p className="lead">
              Tips, trends and stories from our mentors and students.
            </p>
          </div>

          {loading && articles.length === 0 ? (
            <p className="text-muted">Loading articles…</p>
          ) : error ? (
            <p className="text-muted">{error}</p>
          ) : articles.length === 0 ? (
            <p className="text-muted">No articles have been published yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <ArticleCard key={article._id} article={article} />
              ))}
            </div>
          )}

          {page < totalPages && (
            <div>
              <button
                type="button"
                onClick={() => setPage((p) => p + 1)}
                className="btn btn-primary"
              >
                Load more articles
              </button>
            </div>
          )}
        </div>
      </section>
    </SiteShell>
  );
}
