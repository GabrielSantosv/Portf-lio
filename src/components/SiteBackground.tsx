import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Fixed king image sitting behind the entire page. Sharp enough at the top
 * to read as a chess piece, then dissolves into a soft blurred ambient
 * texture as the user scrolls past the hero. Scaled up so the blur doesn't
 * fade out at the viewport edges.
 */
export default function SiteBackground() {
  const { scrollY } = useScroll();
  const blur = useTransform(scrollY, [0, 600], [3, 40]);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);
  const opacity = useTransform(scrollY, [0, 600], [0.65, 0.55]);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-black">
      <motion.img
        src="/rei-poster.jpg"
        alt=""
        aria-hidden="true"
        className="h-full w-full scale-110 object-cover"
        style={{ objectPosition: "50% 45%", filter, opacity }}
      />
      <div className="absolute inset-0 bg-black/20" />
    </div>
  );
}
