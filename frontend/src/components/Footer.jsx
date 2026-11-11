"use client";

import BrandLogo from "@/components/BrandLogo";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaGoogle,
  FaLinkedinIn,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io";
import { PiEnvelopeSimple, PiMapPin, PiPhone } from "react-icons/pi";
import { scrollTo } from "@/utils/scroll.utils";
import { formatPhone, ensureCountryCode } from "@/utils/colors.utils";
import usePolicies from "@/utils/usePolicies";

const QUICK_LINKS = [
  { label: "Courses", id: "courses" },
  { label: "Why Choose us", id: "about" },
  { label: "Gallery", id: "gallery" },
  { label: "Articles", id: "articles" },
  { label: "Admission", id: "admission" },
  { label: "Contact", id: "contact" },
];

export default function Footer({ appConfig: config }) {
  const router = useRouter();
  const onHome = usePathname() === "/";
  const policies = usePolicies();
  const appName = config?.appName || "";
  const phoneNumber = config?.phoneNumber
    ? `+91 ${formatPhone(config.phoneNumber)}`
    : "";
  const phoneRaw = config?.phoneNumber
    ? ensureCountryCode(config.phoneNumber)
    : "";
  const email = config?.email || "";
  const address = Array.isArray(config?.companyAddress)
    ? config.companyAddress[0]
    : null;

  const details = [
    {
      name: "Address",
      value: address?.address || "",
      link: address?.googleMapLocation || undefined,
      icon: <PiMapPin aria-hidden="true" />,
    },
    {
      name: "Phone",
      value: phoneNumber,
      link: `tel:+${phoneRaw}`,
      icon: <PiPhone aria-hidden="true" />,
    },
    {
      name: "Email",
      value: email,
      link: `mailto:${email}`,
      icon: <PiEnvelopeSimple aria-hidden="true" />,
    },
  ].filter((d) => d.value);

  const socials = [
    { name: "Facebook", link: config?.facebookLink, icon: <FaFacebookF /> },
    { name: "Instagram", link: config?.instagramLink, icon: <FaInstagram /> },
    { name: "Google", link: config?.googleFormLink, icon: <FaGoogle /> },
    { name: "Twitter", link: config?.twitterLink, icon: <FaXTwitter /> },
    { name: "YouTube", link: config?.youtubeLink, icon: <FaYoutube /> },
    { name: "WhatsApp", link: config?.whatsAppLink, icon: <IoLogoWhatsapp /> },
    { name: "LinkedIn", link: config?.linkedinLink, icon: <FaLinkedinIn /> },
  ].filter((s) => s.link);

  const go = (id) => {
    if (onHome) scrollTo(id);
    else router.push(`/#${id}`);
  };

  return (
    <footer className="bg-primary text-white on-plum">
      <div className="frame pt-14 sm:pt-18 pb-24 md:pb-8 flex flex-col gap-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          <div className="md:col-span-5 flex flex-col gap-5">
            <Link
              href="/"
              aria-label={appName ? `${appName} home` : "Home"}
              className="self-start"
            >
              <BrandLogo
                alt={appName ? `${appName} logo` : "Logo"}
                className="h-20"
              />
            </Link>
            {appName && (
              <p className="text-white/75 leading-relaxed max-w-sm">
                {appName} trains makeup, hair, beauty and nail professionals
                through hands-on practice and expert mentorship.
              </p>
            )}
            {socials.length > 0 && (
              <div className="flex flex-wrap gap-2.5">
                {socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="size-10 grid place-items-center rounded-full bg-white/10 transition-colors duration-300 hover:bg-secondary hover:text-primary"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            )}
          </div>

          <div className="md:col-span-3 flex flex-col gap-4">
            <h3 className="text-sm font-bold text-gold">Explore</h3>
            <ul className="grid grid-cols-2 md:grid-cols-1 gap-x-4 gap-y-2.5 text-sm">
              {QUICK_LINKS.map((link) => (
                <li key={link.id}>
                  <button
                    type="button"
                    onClick={() => go(link.id)}
                    className="text-white/75 hover:text-white transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {details.length > 0 && (
            <div className="md:col-span-4 flex flex-col gap-4">
              <h3 className="text-sm font-bold text-gold">Contact</h3>
              <ul className="flex flex-col gap-4 text-sm">
                {details.map((detail) => (
                  <li
                    key={detail.name}
                    className="flex items-start gap-3 min-w-0"
                  >
                    <span className="mt-0.5 text-gold">{detail.icon}</span>
                    {detail.link ? (
                      <a
                        href={detail.link}
                        target={
                          detail.link.startsWith("http") ? "_blank" : undefined
                        }
                        rel={
                          detail.link.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className="text-white/75 hover:text-white wrap-break-word min-w-0"
                      >
                        {detail.value}
                      </a>
                    ) : (
                      <span className="text-white/75 wrap-break-word min-w-0">
                        {detail.value}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="pt-6 border-t border-white/15 flex flex-col md:flex-row items-center justify-center md:justify-between gap-2 text-center md:text-left text-sm text-white/65">
          <p>
            &copy; {new Date().getFullYear()} {appName}. All rights reserved.
          </p>
          {policies.length > 0 && (
            <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1">
              {policies.map((policy) => (
                <li key={policy._id}>
                  <Link
                    href={`/policies/${policy.slug || policy._id}`}
                    className="hover:text-white transition-colors"
                  >
                    {policy.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
          <a
            href="https://vipprow.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            Developed by <span className="font-bold text-white">Vipprow</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
