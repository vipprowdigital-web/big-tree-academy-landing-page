import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "The Big Tree Beauty Academy",
  description:
    "Professional makeup, hair, beauty and nail training with live demonstrations, model work and expert mentors.",
  icons: {
    icon: "/assets/images/logos/the-big-tree-mark.png",
    apple: "/assets/images/logos/the-big-tree-mark.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${manrope.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
