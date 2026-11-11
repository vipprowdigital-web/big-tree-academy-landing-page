"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import BrandLogo from "@/components/BrandLogo";
import { scrollTo } from "@/utils/scroll.utils";

const LINKS = [
  { label: "Courses", id: "courses" },
  { label: "Why Choose us", id: "about" },
  { label: "Gallery", id: "gallery" },
  { label: "Articles", id: "articles" },
  { label: "Admission", id: "admission" },
];

export default function Navbar({ appName }) {
  const router = useRouter();
  const pathname = usePathname();
  const onHome = pathname === "/";

  const go = (id) => {
    if (onHome) scrollTo(id);
    else router.push(`/#${id}`);
  };

  return (
    <header className="fixed top-0 inset-x-0 z-40 border-b border-line bg-white text-primary">
      <nav
        aria-label="Primary"
        className="frame h-16 sm:h-18 flex items-center justify-between gap-6"
      >
        <Link
          href="/"
          aria-label={appName ? `${appName} home` : "Home"}
          className="flex items-center shrink-0"
        >
          <BrandLogo
            alt={appName || "Logo"}
            priority
            className="h-11 sm:h-14"
          />
        </Link>

        <ul className="hidden lg:flex items-center gap-8 text-sm font-semibold">
          {LINKS.map((l) => (
            <li key={l.id}>
              <button
                type="button"
                onClick={() => go(l.id)}
                className="transition-colors text-primary/75 hover:text-primary"
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => go("contact")}
          className="btn btn-primary !py-2.5 !px-4 sm:!px-5"
        >
          Enquire now
        </button>
      </nav>
    </header>
  );
}
