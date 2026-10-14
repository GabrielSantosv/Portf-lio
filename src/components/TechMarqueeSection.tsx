import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import Knight from "./chess/Knight";

function wrap(min: number, max: number, v: number) {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
}

const TECH = ["Java", "Spring Boot", "Python", "C#", "TypeScript", "React", "PostgreSQL", "Docker", "Flyway"];

export default function TechMarqueeSection() {
  const items = [...TECH, ...TECH];
  const trackRef = useRef<HTMLDivElement>(null);
  const baseX = useMotionValue(0);

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [-2000, 0, 2000], [2.5, 0.6, -2.5], { clamp: true });

  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    const baseSpeed = -0.9;
    let moveBy = baseSpeed * (delta / 1000) * 10;
    moveBy += moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <section className="overflow-hidden border-y border-white/10 py-6">
      <motion.div ref={trackRef} className="flex w-max items-center gap-10" style={{ x }}>
        {items.map((tech, i) => (
          <span key={`${tech}-${i}`} className="flex items-center gap-10 whitespace-nowrap">
            <span className="font-display text-xl font-bold tracking-tight text-[#3A3A38] sm:text-2xl">
              {tech}
            </span>
            <Knight className="h-4 w-4 text-[#D4D4D0]" />
          </span>
        ))}
      </motion.div>
    </section>
  );
}
