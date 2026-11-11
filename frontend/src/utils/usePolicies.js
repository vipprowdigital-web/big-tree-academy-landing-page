"use client";

import { useEffect, useState } from "react";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000";

let cache = null;

/** The active policies published from the console: [{ _id, title, slug }]. */
export default function usePolicies() {
  const [policies, setPolicies] = useState(cache || []);

  useEffect(() => {
    if (cache) return;
    let cancelled = false;
    fetch(`${baseUrl}/api/v1/policy/public`, { cache: "no-store" })
      .then((r) => r.json())
      .then((result) => {
        if (cancelled || !Array.isArray(result.data)) return;
        cache = result.data;
        setPolicies(result.data);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  return policies;
}

/** The privacy policy among the active policies, if one has been published. */
export const findPrivacyPolicy = (policies) =>
  policies.find((p) => /privacy/i.test(p.title || p.slug || ""));
