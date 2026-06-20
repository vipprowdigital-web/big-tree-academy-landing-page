import { textColor1, textColor2 } from "@/utils/colors.utils";
import {
  FaCrown,
  FaChalkboardTeacher,
  FaHandsHelping,
  FaGlobe,
  FaChartLine,
  FaGraduationCap,
  FaSpa,
} from "react-icons/fa";
import { MdSchool } from "react-icons/md";

export const services = [
  {
    title: "Industry-Focused Training",
    description:
      "Learn the latest makeup, hair, beauty, nail, and cosmetology techniques through a curriculum designed to match current industry standards and trends.",
    icon: <FaGraduationCap className={`${textColor2}`} size={30} />,
  },
  {
    title: "Expert Mentors & Professional Guidance",
    description:
      "Train under experienced beauty professionals who provide personalized support, practical knowledge, and career-focused mentorship.",
    icon: <FaChalkboardTeacher className={`${textColor2}`} size={30} />,
  },
  {
    title: "Practical Learning Experience",
    description:
      "Gain confidence through hands-on practice, live demonstrations, model work, and real-world beauty training sessions.",
    icon: <FaHandsHelping className={`${textColor2}`} size={30} />,
  },
  {
    title: "Career & Freelancing Support",
    description:
      "Get guidance for freelancing, salon careers, portfolio building, client handling, and professional growth opportunities.",
    icon: <FaChartLine className={`${textColor2}`} size={30} />,
  },
  {
    title: "Premium Learning Environment",
    description:
      "Experience training in a professional academy setting designed to encourage creativity, confidence, and skill development.",
    icon: <FaSpa className={`${textColor2}`} size={30} />,
  },
];
