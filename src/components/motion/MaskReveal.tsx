import { motion, type Variants } from "framer-motion";
import type { CSSProperties } from "react";

interface MaskRevealProps {
  lines: string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
  as?: "h1" | "h2" | "h3" | "div";
  style?: CSSProperties;
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const container: Variants = {
  hidden: {},
  show: {},
};

const lineVariants: Variants = {
  hidden: { y: "110%", rotate: 2 },
  show: { y: "0%", rotate: 0, transition: { duration: 1, ease: EASE } },
};

const Tag = { h1: motion.h1, h2: motion.h2, h3: motion.h3, div: motion.div };

export default function MaskReveal({
  lines,
  className,
  lineClassName,
  delay = 0,
  stagger = 0.12,
  as = "div",
  style,
}: MaskRevealProps) {
  const Container = Tag[as];

  return (
    <Container
      className={className}
      style={style}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3, margin: "-15% 0px -15% 0px" }}
      variants={container}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      {lines.map((line, i) => (
        <span key={i} style={{ display: "block", overflow: "hidden" }}>
          <motion.span style={{ display: "block" }} className={lineClassName} variants={lineVariants}>
            {line}
          </motion.span>
        </span>
      ))}
    </Container>
  );
}
