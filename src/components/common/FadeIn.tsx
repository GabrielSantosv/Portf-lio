import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  className?: string;
  once?: boolean;
}

const container = (y: number, duration: number, delay: number): Variants => ({
  hidden: { opacity: 0, y },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration,
      delay,
      ease: [0.22, 1, 0.36, 1],
    },
  },
});

export default function FadeIn({
  children,
  delay = 0,
  duration = 0.7,
  y = 20,
  className,
  once = false,
}: FadeInProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.2 }}
      variants={container(y, duration, delay)}
    >
      {children}
    </motion.div>
  );
}
