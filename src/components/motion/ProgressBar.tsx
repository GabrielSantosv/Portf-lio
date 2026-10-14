import { motion, useScroll, useSpring } from "framer-motion";

export default function ProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40, mass: 0.2 });

  return (
    <motion.div
      className="fixed left-0 top-0 z-[55] h-[2px] w-full origin-left"
      style={{ scaleX, backgroundColor: "var(--gold)" }}
    />
  );
}
