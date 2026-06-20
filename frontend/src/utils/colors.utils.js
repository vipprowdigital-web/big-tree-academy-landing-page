// Formats a phone number to "XXXXX XXXXX" (last 10 digits, space after 5th)
// and ensures the raw dial string starts with 91
export function formatPhone(raw = "") {
  const digits = String(raw).replace(/\D/g, "");
  const last10 = digits.slice(-10);
  if (last10.length === 10) return `${last10.slice(0, 5)} ${last10.slice(5)}`;
  return raw;
}

export function ensureCountryCode(raw = "") {
  const digits = String(raw).replace(/\D/g, "");
  if (!digits.startsWith("91")) return `91${digits}`;
  return digits;
}

//  ------------ TEXT COLORS -----------------
const textColor1 = "text-[#1f2937]";
const textColor2 = "text-[#826955]";
const textColor3 = "text-[#1f2937]";
const textColor4 = "text-[#1f2937]";

// ------------- BACKGROUND COLORS --------------
const bgColor1 = "bg-[#f7fee7]";
const bgColor2 = "bg-[#826955]";
const bgColor3 = "bg-[#1f2937]";
const bgColor4 = "bg-[#F7F7EE]";

// COLORS
const color1 = "#fef3c7";
const color2 = "#826955";
const color3 = "#1f2937";
const color4 = "#F7F7EE";
export {
  textColor1,
  textColor2,
  textColor3,
  textColor4,
  bgColor1,
  bgColor2,
  bgColor3,
  bgColor4,
  color1,
  color2,
  color3,
  color4,
};
