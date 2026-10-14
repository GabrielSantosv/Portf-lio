import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { useLanguage } from "../../context/LanguageContext";

type CursorState = "default" | "interactive" | "ver";

export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [state, setState] = useState<CursorState>("default");
  const { lang } = useLanguage();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 500, damping: 40 });
  const springY = useSpring(y, { stiffness: 500, damping: 40 });

  useEffect(() => {
    const isFine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isFine || reduced) return;

    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    function handleMove(e: MouseEvent) {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target as HTMLElement;
      if (target.closest('[data-cursor="ver"]')) setState("ver");
      else if (target.closest('a, button')) setState("interactive");
      else setState("default");
    }

    window.addEventListener("mousemove", handleMove);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [x, y]);

  if (!enabled) return null;

  const size = state === "ver" ? 88 : state === "interactive" ? 40 : 8;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[70] flex items-center justify-center rounded-full"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
        width: size,
        height: size,
        backgroundColor: state === "ver" ? "var(--gold)" : "#ffffff",
        mixBlendMode: state === "ver" ? "normal" : "difference",
      }}
      transition={{ width: { duration: 0.2 }, height: { duration: 0.2 } }}
    >
      {state === "ver" && (
        <span className="font-mono text-[11px] font-medium uppercase tracking-widest text-black">{lang === "pt" ? "Ver" : "View"}</span>
      )}
    </motion.div>
  );
}
