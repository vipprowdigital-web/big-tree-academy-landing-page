"use client";

import Courses from "@/components/Courses";
import HeroSection from "@/components/HeroSection";
import Services from "@/components/Services";
import CareerTransformation from "@/components/CareerTransformation";
import StudentWorkGallery from "@/components/StudentWorkGallery";
import AdminProcessTimeline from "@/components/AdminProcessTimeline";
import ContactForm from "@/components/ContactForm";
import { useRef, useState, useEffect } from "react";
import { scrollTo } from "@/utils/scroll.utils";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import BottomNavbar from "@/components/BottomNavbar";
import { Toaster } from "react-hot-toast";
import AboutAcademy from "@/components/About";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000";

const STATS = [
  { num: "1000+", label: "Students Empowered" },
  { num: "15+", label: "Professional Programs" },
  { num: "100%", label: "Practical Learning" },
  { num: "95%", label: "Student Success Rate" },
];

export default function Home() {
  const contactRef = useRef(null);
  const exploreCourses = useRef(null);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [appConfig, setAppConfig] = useState(null);

  useEffect(() => {
    fetch(`${baseUrl}/api/v1/app-config/public`, { cache: "no-store" })
      .then((r) => r.json())
      .then((result) => {
        if (result.data) setAppConfig(result.data);
      })
      .catch(() => {});
  }, []);

  const scrollToContact = (courseName = "") => {
    if (courseName) setSelectedCourse(courseName);
    scrollTo(contactRef);
  };
  const scrollToCourses = () => scrollTo(exploreCourses);

  return (
    <main className="bg-secondary">
      <HeroSection
        onContactClick={scrollToContact}
        onCourseClick={scrollToCourses}
      />
      <AboutAcademy onCourseClick={scrollToCourses} />
      <div className="bg-primary w-full">
        <div className="bg-primary w-full sm:max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 justify-center sm:gap-x-12 gap-y-6 px-4 pt-10 pb-8">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-serif-editorial text-4xl sm:text-[2.75rem] font-normal leading-none text-secondary pb-3">
                {s.num}
              </p>
              <p className="font-sans-clean text-[8px] sm:text-[10px] font-medium tracking-[0.14em] uppercase  text-secondary mt-1">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div ref={exploreCourses}>
        <Courses onContactClick={scrollToContact} />
      </div>
      <Services />
      <CareerTransformation />
      <StudentWorkGallery />
      <Testimonials />
      <AdminProcessTimeline />
      <div ref={contactRef}>
        <ContactForm selectedCourse={selectedCourse} appConfig={appConfig} />
      </div>
      <BottomNavbar
        onContactClick={scrollToContact}
        onCourseClick={scrollToCourses}
      />
      <Footer appConfig={appConfig} />
      <Toaster position="top-center" reverseOrder={false} />
    </main>
  );
}
