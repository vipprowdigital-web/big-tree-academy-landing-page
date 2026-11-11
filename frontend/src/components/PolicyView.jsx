"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PiArrowLeft } from "react-icons/pi";
import SiteShell from "@/components/SiteShell";
import useAppConfig from "@/utils/useAppConfig";
import { formatPhone } from "@/utils/colors.utils";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000";

// Policies are written by admins in a rich-text editor; drop anything executable.
const sanitize = (html = "") =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/\son\w+\s*=\s*("[^"]*"|'[^']*')/gi, "")
    .replace(/javascript:/gi, "");

/**
 * Policy text can use {{appName}}, {{email}}, {{phone}} and {{address}}.
 * They are filled from the app configuration, so contact details are
 * never retyped (or left stale) inside the policy itself.
 */
const fillTokens = (html, config) => {
  const values = {
    appName: config?.appName || "",
    email: config?.email || "",
    phone: config?.phoneNumber ? `+91 ${formatPhone(config.phoneNumber)}` : "",
    address: config?.companyAddress?.[0]?.address || "",
  };
  return html.replace(/\{\{\s*(\w+)\s*\}\}/g, (match, key) =>
    key in values ? values[key] : match,
  );
};

const formatDate = (value) =>
  value
    ? new Date(value).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

export default function PolicyView({ slug }) {
  const config = useAppConfig();
  const [policy, setPolicy] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let cancelled = false;
    fetch(`${baseUrl}/api/v1/policy/public/${slug}`, { cache: "no-store" })
      .then((r) => r.json())
      .then((result) => {
        if (cancelled) return;
        if (result?.data) {
          setPolicy(result.data);
          setStatus("ready");
        } else {
          setStatus("missing");
        }
      })
      .catch(() => !cancelled && setStatus("missing"));
    return () => {
      cancelled = true;
    };
  }, [slug]);

  return (
    <SiteShell>
      <article className="section">
        <div className="frame">
          <div className="mx-auto max-w-3xl flex flex-col gap-8">
            <Link href="/" className="btn btn-quiet self-start !px-0">
              <PiArrowLeft aria-hidden="true" /> Back to home
            </Link>

            {status === "loading" && <p className="text-muted">Loading…</p>}

            {status === "missing" && (
              <div className="flex flex-col gap-3">
                <h1 className="h2">We could not find that page</h1>
                <p className="text-muted">
                  It may have been unpublished or the link may be wrong.
                </p>
              </div>
            )}

            {status === "ready" && policy && (
              <>
                <header className="flex flex-col gap-3">
                  <h1 className="h1">{policy.title}</h1>
                  {policy.updatedAt && (
                    <p className="text-sm font-semibold text-muted">
                      Last updated {formatDate(policy.updatedAt)}
                    </p>
                  )}
                </header>
                <div
                  className="article-body"
                  dangerouslySetInnerHTML={{
                    __html: fillTokens(sanitize(policy.description), config),
                  }}
                />
              </>
            )}
          </div>
        </div>
      </article>
    </SiteShell>
  );
}
