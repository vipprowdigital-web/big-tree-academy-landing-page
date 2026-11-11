"use client";

import { PiBookOpenTextDuotone, PiEnvelopeSimpleDuotone } from "react-icons/pi";
import { FaWhatsapp } from "react-icons/fa";
import { ensureCountryCode } from "@/utils/colors.utils";

export default function BottomNavbar({
  onContactClick,
  onCourseClick,
  phoneNumber,
  appName,
}) {
  const handleWhatsAppClick = () => {
    const phone = ensureCountryCode(phoneNumber || "");
    if (!phone) return;
    const message = encodeURIComponent(
      `Hello! I would like to know more about ${appName || "your"} courses.`,
    );
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
  };

  return (
    <nav
      className="md:hidden fixed bottom-0 inset-x-0 z-50 h-16 bg-primary text-white on-plum grid grid-cols-3 items-center"
      aria-label="Quick actions"
    >
      <button
        type="button"
        onClick={onCourseClick}
        className="flex flex-col items-center gap-0.5 py-2 text-xs font-semibold active:scale-95 transition-transform"
        aria-label="View courses"
      >
        <PiBookOpenTextDuotone size={20} aria-hidden="true" />
        Courses
      </button>

      <button
        type="button"
        onClick={onContactClick}
        className="flex flex-col items-center gap-0.5 py-2 text-xs font-semibold active:scale-95 transition-transform"
        aria-label="Enquire now"
      >
        <span className="grid place-items-center size-10 -mt-5 rounded-full bg-secondary text-primary border-4 border-primary">
          <PiEnvelopeSimpleDuotone size={20} aria-hidden="true" />
        </span>
        Enquire
      </button>

      <button
        type="button"
        onClick={handleWhatsAppClick}
        className="flex flex-col items-center gap-0.5 py-2 text-xs font-semibold active:scale-95 transition-transform"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp size={20} aria-hidden="true" />
        WhatsApp
      </button>
    </nav>
  );
}
