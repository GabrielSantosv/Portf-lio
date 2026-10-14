import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";

interface CurtainRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function CurtainReveal({ children, className, delay = 0 }: CurtainRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <div ref={ref} className={className} style={{ overflow: "hidden" }}>
      <motion.div
        className="h-full w-full"
        initial={false}
        animate={inView ? { clipPath: "inset(0% 0 0 0)" } : { clipPath: "inset(100% 0 0 0)" }}
        transition={{ duration: 1.2, ease: EASE, delay }}
      >
        <motion.div
          className="h-full w-full"
          initial={false}
          animate={inView ? { scale: 1 } : { scale: 1.3 }}
          transition={{ duration: 1.2, ease: EASE, delay }}
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
}
