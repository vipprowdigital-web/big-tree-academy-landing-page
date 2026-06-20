"use client";

import Image from "next/image";
import {
  FaPhoneAlt,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaGoogle,
  FaLinkedinIn,
} from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { FaLocationDot, FaXTwitter } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io";
import { scrollTo } from "@/utils/scroll.utils";
import { formatPhone, ensureCountryCode } from "@/utils/colors.utils";

const PRIMARY = "#28082e";
const SECONDARY = "#ffe9cb";

export default function Footer({ appConfig: config }) {
  const loading = false;

  const appName = config?.appName || "The Big Tree Beauty Academy";
  const phoneNumber = formatPhone(config?.phoneNumber) || "+91 70783 32794";
  const phoneRaw = ensureCountryCode(config?.phoneNumber || "7078332794");
  const email = config?.email || "thebigtreeacademy@gmail.com";

  const addresses =
    Array.isArray(config?.companyAddress) && config.companyAddress.length > 0
      ? config.companyAddress
      : [{ address: "Dehradun, Uttarakhand, India", googleMapLocation: "" }];

  const details = [
    {
      name: "Address",
      value: addresses[0]?.address || "",
      link: addresses[0]?.googleMapLocation || "#",
      icon: <FaLocationDot size={18} />,
    },
    {
      name: "Phone",
      value: phoneNumber,
      link: `tel:+${phoneRaw}`,
      icon: <FaPhoneAlt size={18} />,
    },
    {
      name: "Email",
      value: email,
      link: `mailto:${email}`,
      icon: <SiGmail size={18} />,
    },
  ];

  const socials = [
    { name: "Facebook", link: config?.facebookLink, icon: <FaFacebookF /> },
    { name: "Instagram", link: config?.instagramLink, icon: <FaInstagram /> },
    { name: "Google", link: config?.googleFormLink, icon: <FaGoogle /> },
    { name: "Twitter", link: config?.twitterLink, icon: <FaXTwitter /> },
    { name: "YouTube", link: config?.youtubeLink, icon: <FaYoutube /> },
    { name: "WhatsApp", link: config?.whatsAppLink, icon: <IoLogoWhatsapp /> },
    { name: "LinkedIn", link: config?.linkedinLink, icon: <FaLinkedinIn /> },
  ].filter((s) => s.link);

  return (
    <>
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap");
        .font-serif-editorial {
          font-family: "Cormorant Garamond", serif;
        }
        .font-sans-clean {
          font-family: "Plus Jakarta Sans", sans-serif;
        }
      `}</style>

      <footer
        className="w-full relative overflow-hidden"
        style={{ background: PRIMARY }}
      >
        {/* ── Watermark text ── */}
        {/* <span
          aria-hidden="true"
          className="font-serif-editorial pointer-events-none select-none absolute bottom-0 -right-2.5 leading-none opacity-[0.04]"
          style={{ fontSize: "180px", color: SECONDARY }}
        >
          BT
        </span> */}

        {/* ── Thin top accent line ── */}
        <div style={{ height: "1px", background: `${SECONDARY}18` }} />

        {/* ── Main content grid ── */}
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 py-14 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 relative z-10">
          {/* COL 1 — Brand */}
          <div className="flex flex-col gap-5">
            <Image
              src="/assets/images/logos/big-tree-logo2.png"
              alt={`${appName} Logo`}
              width={100}
              height={100}
              loading="eager"
              priority
              className="sm:w-40"
            />
            <p
              className="font-sans-clean text-[13px] leading-relaxed mt-1"
              style={{ color: `${SECONDARY}88` }}
            >
              {appName} is a premium beauty academy empowering aspiring artists
              through practical training, global curriculum, and expert
              mentorship.
            </p>

            {/* Divider */}
            <div
              style={{
                width: "32px",
                height: "1px",
                background: `${SECONDARY}30`,
              }}
            />

            {/* Social icons */}
            {socials.length > 0 && (
              <div className="flex flex-wrap gap-2.5">
                {socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="w-9 h-9 rounded-full flex items-center justify-center text-[15px] transition-all duration-300"
                    style={{
                      background: `${SECONDARY}12`,
                      border: `0.5px solid ${SECONDARY}25`,
                      color: `${SECONDARY}88`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = SECONDARY;
                      e.currentTarget.style.color = PRIMARY;
                      e.currentTarget.style.borderColor = SECONDARY;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = `${SECONDARY}12`;
                      e.currentTarget.style.color = `${SECONDARY}88`;
                      e.currentTarget.style.borderColor = `${SECONDARY}25`;
                    }}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* COL 2 — Quick links */}
          <div className="flex flex-col gap-4">
            <p
              className="font-sans-clean text-[10px] font-medium tracking-[0.18em] uppercase mb-2"
              style={{ color: `${SECONDARY}45` }}
            >
              Quick Links
            </p>
            {[
              { label: "Courses", href: "courses" },
              { label: "Gallery", href: "gallery" },
              { label: "Admission", href: "admission" },
              { label: "About Academy", href: "about" },
              { label: "Contact Us", href: "contact" },
            ].map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                // href={link.href}
                className="font-sans-clean text-[13px] font-medium flex items-center gap-2 group transition-all duration-200 w-fit"
                style={{ color: `${SECONDARY}66` }}
                onMouseEnter={(e) => (e.currentTarget.style.color = SECONDARY)}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = `${SECONDARY}66`)
                }
              >
                <span
                  className="inline-block transition-transform duration-200 group-hover:translate-x-1"
                  style={{ fontSize: "10px" }}
                >
                  ──
                </span>
                {link.label}
              </button>
            ))}
          </div>

          {/* COL 3 — Contact details */}
          <div className="flex flex-col gap-6">
            <p
              className="font-sans-clean text-[10px] font-medium tracking-[0.18em] uppercase mb-2"
              style={{ color: `${SECONDARY}45` }}
            >
              Get in Touch
            </p>
            {details.map((detail) => (
              <a
                key={detail.name}
                href={detail.link}
                target={detail.name === "Address" ? "_blank" : "_self"}
                rel={
                  detail.name === "Address" ? "noopener noreferrer" : undefined
                }
                className="flex items-start gap-3 group cursor-pointer"
              >
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: `${SECONDARY}10`,
                    border: `0.5px solid ${SECONDARY}25`,
                    color: `${SECONDARY}88`,
                  }}
                >
                  {detail.icon}
                </div>
                <div className="flex flex-col gap-0.5">
                  <span
                    className="font-sans-clean text-[10px] font-medium tracking-widest uppercase"
                    style={{ color: `${SECONDARY}45` }}
                  >
                    {detail.name}
                  </span>
                  <span
                    className="font-sans-clean text-[13px] leading-snug transition-colors duration-200 group-hover:text-(--bs-hover)"
                    style={{ color: `${SECONDARY}77` }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = SECONDARY)
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = `${SECONDARY}77`)
                    }
                  >
                    {detail.value}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* ── Copyright bar ── */}
        <div
          className="w-full max-w-6xl mx-auto px-6 md:px-12 py-5 flex flex-col md:flex-row justify-between items-center gap-3 relative z-10"
          style={{ borderTop: `0.5px solid ${SECONDARY}15` }}
        >
          <p
            className="font-sans-clean text-[12px] text-center"
            style={{ color: `${SECONDARY}44` }}
          >
            &copy; {new Date().getFullYear()}{" "}
            <span style={{ color: `${SECONDARY}88` }}>{appName}.</span> All
            Rights Reserved.
          </p>
          <a
            href="https://vipprow.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans-clean text-[12px] transition-colors duration-300 sm:mb-0 mb-20"
            style={{ color: `${SECONDARY}44` }}
            onMouseEnter={(e) => (e.currentTarget.style.color = SECONDARY)}
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = `${SECONDARY}44`)
            }
          >
            Developed by{" "}
            <span style={{ color: SECONDARY, fontWeight: 600 }}>Vipprow</span>
          </a>
        </div>
      </footer>
    </>
  );
}
