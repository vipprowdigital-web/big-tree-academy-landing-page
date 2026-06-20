"use client";

import { FaBookOpenReader } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import { CiMail } from "react-icons/ci";

const PRIMARY = "#28082e";
const SECONDARY = "#ffe9cb";
// Slightly brighter accent for the FAB so it pops on the dark bar
const ACCENT = "#f5c97a";

export default function BottomNavbar({ onContactClick, onCourseClick }) {
  const handleWhatsAppClick = () => {
    const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";
    const message = encodeURIComponent(
      "Hello! I would like to know more about The Big Tree Beauty Academy courses.",
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  return (
    <>
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap");
        .font-sans-clean {
          font-family: "Plus Jakarta Sans", sans-serif;
        }
      `}</style>

      {/*
        ── Visible on ALL screen sizes (removed sm:hidden) ──
        Fixed to bottom, sits above page content via z-50.
        On desktop it stays slim and unobtrusive; on mobile it's the primary nav.
      */}
      <nav
        className="w-full sm:hidden fixed bottom-0 left-0 right-0 z-50 h-14 flex items-center justify-around"
        aria-label="Bottom navigation"
        style={{
          background: PRIMARY,
          borderTop: `0.5px solid ${SECONDARY}22`,
          /* subtle lift shadow so it separates from content below */
          boxShadow: `0 -4px 32px rgba(0,0,0,0.55)`,
        }}
      >
        {/* ── Courses ── */}
        <button
          onClick={onCourseClick}
          className="flex flex-col items-center gap-0.75 cursor-pointer active:scale-95 transition-transform bg-transparent border-none p-2"
          aria-label="View Courses"
        >
          <FaBookOpenReader size={19} style={{ color: `${SECONDARY}99` }} />
          <span
            className="font-sans-clean"
            style={{
              fontSize: "9px",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: `${SECONDARY}77`,
            }}
          >
            Courses
          </span>
        </button>

        {/* ── Center FAB — Contact ── */}
        <button
          onClick={onContactClick}
          className="relative flex flex-col items-center cursor-pointer bg-transparent border-none"
          style={{ marginBottom: "24px" }}
          aria-label="Contact Us"
        >
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center active:scale-95 transition-transform"
            style={{
              background: SECONDARY,
              /* ring effect: inner page color gap, then a faint accent ring */
              boxShadow: `0 0 0 3px ${PRIMARY}, 0 0 0 4.5px ${SECONDARY}55, 0 6px 20px ${SECONDARY}44`,
            }}
          >
            <CiMail size={25} style={{ color: PRIMARY }} />
          </div>
        </button>

        {/* ── WhatsApp ── */}
        <button
          onClick={handleWhatsAppClick}
          className="flex flex-col items-center gap-[3px] cursor-pointer active:scale-95 transition-transform bg-transparent border-none p-2"
          aria-label="Chat on WhatsApp"
        >
          <FaWhatsapp size={19} style={{ color: `${SECONDARY}99` }} />
          <span
            className="font-sans-clean"
            style={{
              fontSize: "9px",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: `${SECONDARY}77`,
            }}
          >
            WhatsApp
          </span>
        </button>
      </nav>

      {/* ── Spacer so page content isn't hidden behind the fixed bar ── */}
      <div className="h-14" aria-hidden="true" />
    </>
  );
}
