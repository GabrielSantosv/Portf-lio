import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { PROJECT_SCREENS } from "./screens";

export type Screen = { label: string; url?: string; image?: string; render?: () => ReactNode };
export type ShowcaseFrame = "browser" | "panel" | "phones";

const GOLD = "#C9A45C";
const INTERVAL = 4000;

function BrowserChrome({ url }: { url?: string }) {
  return (
    <div className="flex h-9 shrink-0 items-center gap-1.5 border-b border-white/[0.06] bg-[#0D0D0D] px-4">
      <span className="h-2.5 w-2.5 rounded-full bg-[#3A3A38]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#3A3A38]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#3A3A38]" />
      {url && (
        <span className="ml-3 truncate rounded-md bg-white/[0.04] px-3 py-1 font-mono text-[10px] text-[#8A8A85]">
          {url}
        </span>
      )}
    </div>
  );
}

function ShowcaseFrameShell({ frame, url, children }: { frame: ShowcaseFrame; url?: string; children: ReactNode }) {
  if (frame === "browser") {
    return (
      <div
        className="flex h-full w-full flex-col overflow-hidden rounded-[14px] border shadow-2xl shadow-black/70"
        style={{ borderColor: "rgba(255,255,255,0.08)" }}
      >
        <BrowserChrome url={url} />
        <div className="relative flex-1 overflow-hidden bg-[#0A0A0A]">{children}</div>
      </div>
    );
  }

  if (frame === "phones") {
    return <div className="flex h-full w-full items-center justify-center">{children}</div>;
  }

  return (
    <div
      className="h-full w-full overflow-hidden rounded-[14px] border shadow-2xl shadow-black/70"
      style={{ borderColor: "rgba(255,255,255,0.08)" }}
    >
      <div className="relative h-full w-full bg-[#0A0A0A]">{children}</div>
    </div>
  );
}

interface ProjectShowcaseProps {
  slug: string;
  coverLabel: string;
  variant?: "full" | "compact";
  className?: string;
  coverStyle?: CSSProperties;
}

export default function ProjectShowcase({ slug, coverLabel, variant = "full", className, coverStyle }: ProjectShowcaseProps) {
  const entry = PROJECT_SCREENS[slug];
  const screens = entry?.screens ?? [];
  const frame = entry?.frame ?? "browser";
  const reducedMotion = useReducedMotion();
  const isCompact = variant === "compact";
  const autoplay = !isCompact && !reducedMotion && screens.length > 1;

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progressKey, setProgressKey] = useState(0);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!autoplay || paused) return;
    timerRef.current = window.setTimeout(() => {
      setActive((i) => (i + 1) % screens.length);
      setProgressKey((k) => k + 1);
    }, INTERVAL);
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [active, paused, autoplay, screens.length]);

  if (!entry || screens.length === 0) return null;

  const current = reducedMotion ? screens[0] : screens[active];

  function selectScreen(i: number) {
    setActive(i);
    setProgressKey((k) => k + 1);
  }

  return (
    <div
      className={`relative ${className ?? ""}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="relative overflow-hidden rounded-[24px] border"
        style={{
          borderColor: "rgba(255,255,255,0.08)",
          backgroundImage:
            `radial-gradient(60% 80% at 85% 15%, rgba(201,164,92,0.12) 0%, transparent 60%), linear-gradient(135deg, #141414 0%, #050505 100%)`,
          ...coverStyle,
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className={isCompact ? "p-3" : "p-5 sm:p-8"}>
          <div className={isCompact ? "aspect-[16/9]" : "aspect-[16/9]"}>
            <ShowcaseFrameShell frame={frame} url={current.url}>
              {reducedMotion || isCompact ? (
                <div className="h-full w-full">{current.image ? <img src={current.image} alt={current.label} className="h-full w-full object-cover object-top" /> : current.render?.()}</div>
              ) : (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full w-full"
                  >
                    {current.image ? (
                      <img src={current.image} alt={current.label} className="h-full w-full object-cover object-top" />
                    ) : (
                      current.render?.()
                    )}
                  </motion.div>
                </AnimatePresence>
              )}
            </ShowcaseFrameShell>
          </div>
        </div>

        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "linear-gradient(0deg, rgba(0,0,0,0.75) 0%, transparent 35%)" }}
        />
        <span
          className={`pointer-events-none absolute bottom-4 left-5 font-mono uppercase tracking-widest text-[#8A8A85] ${
            isCompact ? "text-xs" : "text-2xl sm:text-4xl"
          }`}
        >
          {coverLabel}
        </span>
      </div>

      {!isCompact && screens.length > 1 && (
        <div className="mt-4 flex items-center gap-1 overflow-x-auto">
          {screens.map((screen, i) => (
            <button
              key={screen.label}
              type="button"
              onClick={() => selectScreen(i)}
              className="relative shrink-0 px-3 py-2 font-mono text-[10px] uppercase tracking-widest transition-colors duration-200"
              style={{ color: i === active ? "#F5F5F2" : "#8A8A85" }}
            >
              {screen.label}
              <span className="absolute bottom-0 left-0 h-px w-full bg-white/10" />
              {i === active && (
                <motion.span
                  key={progressKey}
                  className="absolute bottom-0 left-0 h-px"
                  style={{ backgroundColor: GOLD }}
                  initial={{ width: "0%" }}
                  animate={{ width: autoplay && !paused ? "100%" : "100%" }}
                  transition={autoplay && !paused ? { duration: INTERVAL / 1000, ease: "linear" } : { duration: 0.2 }}
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
