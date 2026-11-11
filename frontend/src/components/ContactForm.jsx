"use client";

import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { formatPhone } from "@/utils/colors.utils";
import {
  PiArrowRight,
  PiEnvelopeSimpleDuotone,
  PiMapPinDuotone,
  PiPhoneDuotone,
} from "react-icons/pi";
import Link from "next/link";
import { useReveal } from "@/utils/motion";
import usePolicies, { findPrivacyPolicy } from "@/utils/usePolicies";

const initialData = {
  name: "",
  email: "",
  phoneNumber: "",
  courseInterest: "",
  message: "",
};

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000";

export default function ContactForm({ selectedCourse = "", appConfig = null }) {
  const [formData, setFormData] = useState(initialData);
  const root = useRef(null);
  const privacyPolicy = findPrivacyPolicy(usePolicies());
  useReveal(root);
  const [courseOptions, setCourseOptions] = useState([]);

  useEffect(() => {
    fetch(`${baseUrl}/api/v1/course?limit=100`, {
      method: "GET",
      cache: "no-store",
    })
      .then((r) => r.json())
      .then((result) => {
        if (Array.isArray(result.data)) {
          setCourseOptions(result.data.map((c) => c.title).filter(Boolean));
        }
      })
      .catch(() => {});
  }, []);

  const [prevSelectedCourse, setPrevSelectedCourse] = useState(selectedCourse);
  if (selectedCourse !== prevSelectedCourse) {
    setPrevSelectedCourse(selectedCourse);
    if (selectedCourse) {
      setFormData((prev) => ({ ...prev, courseInterest: selectedCourse }));
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const phoneDigits = formData.phoneNumber.replace(/[\s()+-]/g, "");
    if (!/^[0-9]{10,15}$/.test(phoneDigits)) {
      toast.error("Please enter a valid phone number (10–15 digits).");
      return;
    }
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: phoneDigits,
        courseName: formData.courseInterest,
        message: formData.message,
      };

      const response = await fetch(`${baseUrl}/api/v1/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.status === 201 || response.ok) {
        toast.success("Message sent successfully!");
        setFormData(initialData);
      } else {
        toast.error(data.message || "Validation Failed.");
      }
    } catch (e) {
      console.error("Error while sending message: ", e);
      toast.error("Network error. Please try again.");
    }
  };

  const contactItems = [
    appConfig?.companyAddress?.[0]?.address && {
      icon: PiMapPinDuotone,
      label: "Visit us",
      value: appConfig.companyAddress[0].address,
      href: appConfig.companyAddress[0].googleMapLocation || undefined,
    },
    appConfig?.phoneNumber && {
      icon: PiPhoneDuotone,
      label: "Call us",
      value: `+91 ${formatPhone(appConfig.phoneNumber)}`,
      href: `tel:+91${String(appConfig.phoneNumber).replace(/\D/g, "").slice(-10)}`,
    },
    appConfig?.email && {
      icon: PiEnvelopeSimpleDuotone,
      label: "Email us",
      value: appConfig.email,
      href: `mailto:${appConfig.email}`,
    },
  ].filter(Boolean);

  return (
    <section ref={root} className="section bg-white" id="contact">
      <div className="frame grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
        <div
          data-reveal
          className="lg:col-span-5 on-plum bg-primary text-white rounded-2xl p-7 sm:p-10 flex flex-col gap-8"
        >
          <div className="flex flex-col gap-3">
            <h2 className="h2">Start your beauty career</h2>
            <p className="text-white/80 leading-relaxed max-w-md">
              Tell us which course interests you and an advisor will get back to
              you.
            </p>
          </div>

          {contactItems.length > 0 && (
            <ul className="flex flex-col gap-5">
              {contactItems.map(({ icon: Icon, label, value, href }) => (
                <li key={label} className="flex items-start gap-4 min-w-0">
                  <span className="grid place-items-center size-11 shrink-0 rounded-xl bg-white/10 text-gold">
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm font-semibold text-white/70">
                      {label}
                    </span>
                    {href ? (
                      <a
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel={
                          href.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className="font-semibold wrap-break-word hover:underline underline-offset-4"
                      >
                        {value}
                      </a>
                    ) : (
                      <span className="font-semibold wrap-break-word">
                        {value}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div data-reveal className="lg:col-span-7 panel p-6 sm:p-10">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <Field label="Full name" htmlFor="cf-name">
              <input
                id="cf-name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                autoComplete="name"
                className={inputClass}
              />
            </Field>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field label="Email address" htmlFor="cf-email">
                <input
                  id="cf-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                  className={inputClass}
                />
              </Field>

              <Field label="Mobile number" htmlFor="cf-phone">
                <input
                  id="cf-phone"
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                  autoComplete="tel"
                  className={inputClass}
                />
              </Field>
            </div>

            <Field label="Course" htmlFor="cf-course">
              <select
                id="cf-course"
                name="courseInterest"
                value={formData.courseInterest}
                onChange={handleChange}
                required
                className={`${inputClass} cursor-pointer`}
              >
                <option value="" disabled>
                  Select a course
                </option>
                {courseOptions.map((course) => (
                  <option key={course} value={course}>
                    {course}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Message (optional)" htmlFor="cf-message">
              <textarea
                id="cf-message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={3}
                className={`${inputClass} resize-none`}
              />
            </Field>

            <div className="pt-1">
              <button
                type="submit"
                className="btn btn-primary w-full sm:w-auto"
              >
                Send message <PiArrowRight aria-hidden="true" />
              </button>
              {privacyPolicy && (
                <p className="mt-3 text-sm text-muted">
                  We use these details only to contact you about your enquiry.
                  Read our{" "}
                  <Link
                    href={`/policies/${privacyPolicy.slug || privacyPolicy._id}`}
                    className="font-semibold text-primary underline underline-offset-4"
                  >
                    {privacyPolicy.title}
                  </Link>
                  .
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

const inputClass =
  "w-full bg-surface text-ink rounded-xl border border-line px-4 py-3 text-base outline-none transition-colors hover:border-[#dcc9be] focus:border-primary focus:bg-white";

function Field({ label, htmlFor, children }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className="text-sm font-bold">
        {label}
      </label>
      {children}
    </div>
  );
}
