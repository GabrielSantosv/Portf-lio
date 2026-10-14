import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  className?: string;
  once?: boolean;
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const build = (y: number, duration: number, delay: number): Variants => ({
  hidden: { opacity: 0, y, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration, delay, ease: EASE },
  },
});

/** Fade + rise + blur-in. Replays every time it leaves and re-enters view. */
export default function Reveal({ children, delay = 0, duration = 0.8, y = 40, className, once = false }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.2 }}
      variants={build(y, duration, delay)}
    >
      {children}
    </motion.div>
  );
}
