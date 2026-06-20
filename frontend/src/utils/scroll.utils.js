/**
 * Smoothly scrolls to a target — either a React ref or a DOM element id.
 * @param {React.RefObject | string} target - A ref object or an element id string.
 */
export function scrollTo(target) {
  if (typeof target === "string") {
    document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
  } else {
    target?.current?.scrollIntoView({ behavior: "smooth" });
  }
}
