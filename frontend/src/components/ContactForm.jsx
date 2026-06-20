"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";

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
  const [focused, setFocused] = useState("");
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
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phoneNumber,
        courseName: formData.courseInterest,
        preferredLocation: "Dehradun",
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

  return (
    <section
      className="w-full bg-secondary text-primary py-24 px-4 sm:px-8 lg:px-16 overflow-hidden relative selection:bg-primary selection:text-secondary"
      id="contact"
    >
      {/* Font & Custom Selection Overrides */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300&family=Montserrat:wght@300;400;500;600;700&display=swap");
        .font-serif-editorial {
          font-family: "Cormorant Garamond", Georgia, serif;
        }
        .font-sans-clean {
          font-family: "Montserrat", sans-serif;
        }
        select option {
          background: #000000;
          color: #ffffff;
        }
        textarea {
          resize: none;
        }
      `}</style>

      {/* Floating Background Accent Blur */}
      <div className="absolute right-[-10%] top-[20%] w-125 h-125 bg-primary/4 rounded-full blur-[120px] pointer-events-none select-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 relative z-10 items-center">
        {/* ── LEFT SIDE: ASYMMETRIC EDITORIAL HEADER & METADATA ── */}
        <div className="lg:col-span-5 flex flex-col items-start gap-8">
          <div className="flex items-center gap-3 text-[10px] font-sans-clean uppercase font-bold tracking-[0.28em] text-primary/80">
            <span className="w-8 h-px bg-primary/50" />
            Get in Touch
          </div>

          <h2 className="font-serif-editorial text-[clamp(1.8rem,4vw,3rem)] font-light leading-[1.1] tracking-tight text-primary">
            Start Your Beauty Journey{" "}
            <span className="italic font-normal text-primary">
              With The Big Tree Beauty Academy
            </span>
          </h2>

          <p className="text-xs md:text-sm font-sans-clean font-light leading-[1.8] text-primary max-w-sm">
            Whether you&apos;re exploring career opportunities in beauty or
            ready to enroll in a course, our team is here to guide you every
            step of the way.
          </p>

          {/* Luxury Studio Metadata Details block */}
          <div className="flex flex-col gap-5 pt-8 border-t border-primary/10 w-full font-sans-clean">
            <div>
              <h6 className="text-xs font-bold tracking-widest text-primary uppercase mb-1">
                Academy Location
              </h6>
              <p className="text-sm text-primary/80 font-normal leading-relaxed max-w-xs">
                {Array.isArray(appConfig?.companyAddress) &&
                appConfig.companyAddress[0]?.address
                  ? appConfig.companyAddress[0].address
                  : "32/6, Laxmi Road, Near Doon International School, Dalanwala, Dehradun, 248001"}
              </p>
            </div>
            <div className="flex flex-wrap gap-8">
              <div>
                <h6 className="text-xs font-bold tracking-widest text-primary uppercase mb-1">
                  Direct Line
                </h6>
                <p className="text-sm text-primary font-normal">
                  {appConfig?.phoneNumber || "+91 70783 32794"}
                </p>
              </div>
              <div>
                <h6 className="text-xs font-bold tracking-widest text-primary uppercase mb-1">
                  Inquiries
                </h6>
                <p className="text-sm text-primary/80 font-normal">
                  {appConfig?.email || "bigtreeacademy@gmail.com"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT SIDE: MINIMAL STREAMLINE CONTACT FORM LAYER ── */}
        <div className="lg:col-span-7 w-full">
          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col gap-8 font-sans-clean"
          >
            {/* Input Row: Name */}
            <div className="relative w-full group">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                onFocus={() => setFocused("name")}
                onBlur={() => setFocused("")}
                className="w-full bg-transparent border-b border-primary/20 py-3 text-sm text-primary font-light focus:border-primary outline-none transition-all duration-300 placeholder-transparent"
                placeholder="Name"
              />
              <label
                className={`absolute left-0 transition-all duration-300 pointer-events-none text-xs tracking-wider uppercase font-medium ${
                  focused === "name" || formData.name
                    ? "-top-4 text-[10px] text-primary"
                    : "top-3 text-primary"
                }`}
              >
                Full Name *
              </label>
            </div>

            {/* Grid Splitter for Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {/* Input: Email */}
              <div className="relative w-full group">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused("")}
                  className="w-full bg-transparent border-b border-primary/20 py-3 text-sm text-primary font-light focus:border-primary outline-none transition-all duration-300 placeholder-transparent"
                  placeholder="Email"
                />
                <label
                  className={`absolute left-0 transition-all duration-300 pointer-events-none text-xs tracking-wider uppercase font-medium ${
                    focused === "email" || formData.email
                      ? "-top-4 text-[10px] text-primary"
                      : "top-3 text-primary"
                  }`}
                >
                  Email Address *
                </label>
              </div>

              {/* Input: Phone Number */}
              <div className="relative w-full group">
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                  onFocus={() => setFocused("phoneNumber")}
                  onBlur={() => setFocused("")}
                  className="w-full bg-transparent border-b border-primary/20 py-3 text-sm text-primary font-light focus:border-primary outline-none transition-all duration-300 placeholder-transparent"
                  placeholder="Phone"
                />
                <label
                  className={`absolute left-0 transition-all duration-300 pointer-events-none text-xs tracking-wider uppercase font-medium ${
                    focused === "phoneNumber" || formData.phoneNumber
                      ? "-top-4 text-[10px] text-primary"
                      : "top-3 text-primary"
                  }`}
                >
                  Mobile Number *
                </label>
              </div>
            </div>

            {/* Selection Dropdown Custom Input */}
            <div className="relative w-full group pt-2">
              <select
                name="courseInterest"
                value={formData.courseInterest}
                onChange={handleChange}
                required
                onFocus={() => setFocused("courseInterest")}
                onBlur={() => setFocused("")}
                className="w-full bg-transparent border-b border-primary/20 py-3 text-sm text-primary font-light focus:border-primary outline-none transition-all duration-300 appearance-none cursor-pointer"
              >
                <option value="" disabled hidden />
                {courseOptions.map((course) => (
                  <option key={course} value={course}>
                    {course}
                  </option>
                ))}
              </select>
              <label
                className={`absolute left-0 transition-all duration-300 pointer-events-none text-xs tracking-wider uppercase font-medium ${
                  focused === "courseInterest" || formData.courseInterest
                    ? "-top-4 text-[10px] text-primary"
                    : "top-3 text-primary"
                }`}
              >
                Select Course *
              </label>
              {/* Custom Down Arrow Icon */}
              <div className="absolute right-2 top-4 pointer-events-none text-primary/50">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
            </div>

            {/* Input Box: Message */}
            <div className="relative w-full group pt-2">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                onFocus={() => setFocused("message")}
                onBlur={() => setFocused("")}
                className="w-full bg-transparent border-b border-primary/20 py-3 text-sm text-primary font-light focus:border-primary outline-none transition-all duration-300 placeholder-transparent"
                placeholder="Message"
              />
              <label
                className={`absolute left-0 transition-all duration-300 pointer-events-none text-xs tracking-wider uppercase font-medium ${
                  focused === "message" || formData.message
                    ? "-top-4 text-[10px] text-primary"
                    : "top-3 text-primary"
                }`}
              >
                Tell us about your aspirations
              </label>
            </div>

            {/* Custom Modernist Action Submission Button */}
            <div className="flex justify-start w-full pt-4">
              <button
                type="submit"
                className="relative group overflow-hidden px-10 py-4 bg-primary text-secondary font-bold text-xs tracking-[0.2em] uppercase rounded-full transition-all duration-300 transform active:scale-95 shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Message / Query <span className="text-[10px]">✦</span>
                </span>
                <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
