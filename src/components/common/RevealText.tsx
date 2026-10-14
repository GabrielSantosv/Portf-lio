import { motion, type Variants } from "framer-motion";

interface RevealTextProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const wordVariants: Variants = {
  hidden: { clipPath: "inset(0 0 100% 0)", y: "40%" },
  show: { clipPath: "inset(0 0 -20% 0)", y: "0%", transition: { duration: 0.7, ease: EASE } },
};

const MotionTag = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
  span: motion.span,
};

/**
 * Words rise into view from behind a mask, one after another. Uses a single
 * whileInView trigger on the container with staggerChildren — far more
 * reliable than giving every word its own IntersectionObserver.
 */
export default function RevealText({ text, className, delay = 0, stagger = 0.05, as = "span" }: RevealTextProps) {
  const words = text.split(" ");
  const Container = MotionTag[as];

  return (
    <Container
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      {words.map((word, i) => (
        <span key={i}>
          <span style={{ display: "inline-block", overflow: "hidden", paddingBottom: "0.12em", marginBottom: "-0.12em" }}>
            <motion.span style={{ display: "inline-block" }} variants={wordVariants}>
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Container>
  );
}
