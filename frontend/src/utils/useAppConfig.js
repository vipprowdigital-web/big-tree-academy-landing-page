"use client";

import { useEffect, useState } from "react";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000";

/** The academy's public app config (name, phone, email, address, socials). */
export default function useAppConfig() {
  const [appConfig, setAppConfig] = useState(null);

  useEffect(() => {
    fetch(`${baseUrl}/api/v1/app-config/public`, { cache: "no-store" })
      .then((r) => r.json())
      .then((result) => {
        if (result.data) setAppConfig(result.data);
      })
      .catch(() => {});
  }, []);

  return appConfig;
}
