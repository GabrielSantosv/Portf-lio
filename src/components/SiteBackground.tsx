import { motion, useScroll, useTransform } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

/**
 * Fixed king image sitting behind the entire page. Sharp enough at the top
 * to read as a chess piece, then dissolves into a soft blurred ambient
 * texture as the user scrolls past the hero. Scaled up so the blur doesn't
 * fade out at the viewport edges. In light mode the photo is inverted, so
 * the same silhouette reads as a dark piece on a near-white backdrop.
 */
export default function SiteBackground() {
  const { theme } = useTheme();
  const { scrollY } = useScroll();
  const blur = useTransform(scrollY, [0, 600], [3, 40]);
  const blurFilter = useTransform(blur, (b) => `blur(${b}px)`);
  const invertedBlurFilter = useTransform(blur, (b) => `blur(${b}px) invert(1)`);
  const opacity = useTransform(scrollY, [0, 600], [0.65, 0.55]);

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{ backgroundColor: theme === "dark" ? "#000000" : "#ffffff" }}
    >
      <motion.img
        src="/rei-poster.jpg"
        alt=""
        aria-hidden="true"
        className="h-full w-full scale-110 object-cover"
        style={{
          objectPosition: "50% 45%",
          filter: theme === "dark" ? blurFilter : invertedBlurFilter,
          opacity,
        }}
      />
      <div
        className="absolute inset-0"
        style={{ backgroundColor: theme === "dark" ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.35)" }}
      />
    </div>
  );
}
