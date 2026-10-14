import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section id="top" className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
      {/* Edge vignette */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: "radial-gradient(60% 60% at 50% 50%, transparent 40%, rgba(0,0,0,0.75) 100%)",
        }}
      />

      {/* Giant title */}
      <div className="relative z-10 flex justify-center overflow-hidden px-4">
        <motion.h1
          initial={{ y: "100%" }}
          animate={{ y: "0%" }}
          transition={{ duration: 1, delay: 0.15, ease: EASE }}
          className="hero-title-metal whitespace-nowrap font-display text-[9vw] font-black uppercase leading-none tracking-tight sm:text-[9.5vw] lg:text-[10vw]"
        >
          {t("hero.greeting")}
        </motion.h1>
      </div>
    </section>
  );
}
