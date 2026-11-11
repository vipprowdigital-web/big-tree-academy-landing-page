"use client";

import { useRouter } from "next/navigation";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BottomNavbar from "@/components/BottomNavbar";
import useAppConfig from "@/utils/useAppConfig";

/** Navbar, footer and mobile actions around inner pages (articles). */
export default function SiteShell({ children }) {
  const router = useRouter();
  const appConfig = useAppConfig();

  return (
    <>
      <Navbar appName={appConfig?.appName} />
      <main className="bg-white pt-5 flex-1">{children}</main>
      <Footer appConfig={appConfig} />
      <BottomNavbar
        onContactClick={() => router.push("/#contact")}
        onCourseClick={() => router.push("/#courses")}
        phoneNumber={appConfig?.phoneNumber}
        appName={appConfig?.appName}
      />
      <Toaster position="top-center" />
    </>
  );
}
