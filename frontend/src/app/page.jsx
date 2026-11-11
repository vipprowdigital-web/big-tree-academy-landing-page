"use client";

import { useRef, useState } from "react";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsBand from "@/components/StatsBand";
import Courses from "@/components/Courses";
import LearnSteps from "@/components/LearnSteps";
import Services from "@/components/Services";
import StudentWorkGallery from "@/components/StudentWorkGallery";
import Testimonials from "@/components/Testimonials";
import Articles from "@/components/Articles";
import CtaBand from "@/components/CtaBand";
import AdminProcessTimeline from "@/components/AdminProcessTimeline";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import BottomNavbar from "@/components/BottomNavbar";
import { scrollTo } from "@/utils/scroll.utils";
import useAppConfig from "@/utils/useAppConfig";

const STATS = [
  { num: "1000+", label: "Students empowered" },
  { num: "30+", label: "Professional courses" },
  { num: "100%", label: "Practical learning" },
  { num: "95%", label: "Student success rate" },
];

export default function Home() {
  const contactRef = useRef(null);
  const exploreCourses = useRef(null);
  const [selectedCourse, setSelectedCourse] = useState("");
  const appConfig = useAppConfig();

  const scrollToContact = (courseName = "") => {
    if (typeof courseName === "string" && courseName) {
      setSelectedCourse(courseName);
    }
    scrollTo(contactRef);
  };
  const scrollToCourses = () => scrollTo(exploreCourses);

  return (
    <main className="bg-white">
      <Navbar appName={appConfig?.appName} />
      <HeroSection appName={appConfig?.appName} />
      <StatsBand stats={STATS} />
      <div ref={contactRef}>
        <ContactForm selectedCourse={selectedCourse} appConfig={appConfig} />
      </div>
      <div ref={exploreCourses}>
        <Courses onContactClick={scrollToContact} />
      </div>
      <LearnSteps />
      <Services appName={appConfig?.appName} />
      <StudentWorkGallery />
      <Testimonials />
      <CtaBand onContactClick={() => scrollToContact()} />
      <Articles />
      <AdminProcessTimeline />
      <Footer appConfig={appConfig} />
      <BottomNavbar
        onContactClick={() => scrollToContact()}
        onCourseClick={scrollToCourses}
        phoneNumber={appConfig?.phoneNumber}
        appName={appConfig?.appName}
      />
      <Toaster position="top-center" reverseOrder={false} />
    </main>
  );
}
