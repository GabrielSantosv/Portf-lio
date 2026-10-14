import { ArrowUpRight, Download } from "lucide-react";
import Reveal from "./motion/Reveal";
import MaskReveal from "./motion/MaskReveal";
import { useLanguage } from "../context/LanguageContext";

const RESUME_HREF = "/curriculo-gabriel-dos-santos.pdf";

export default function ResumeSection() {
  const { t } = useLanguage();

  return (
    <section id="curriculo" className="scroll-mt-24 px-6 py-28 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <MaskReveal
          as="h2"
          lines={[t("resume.eyebrow")]}
          className="font-display text-[clamp(1.75rem,4vw,3rem)] font-bold tracking-tight text-[#F5F5F2]"
        />
        <Reveal delay={0.15}>
          <p className="mt-6 max-w-xl text-[#8A8A85]">{t("resume.body")}</p>
        </Reveal>

        <Reveal delay={0.25}>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={RESUME_HREF}
              download="curriculo-gabriel-dos-santos.pdf"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-mono text-xs uppercase tracking-[0.15em] text-black transition-opacity duration-200 hover:opacity-70"
            >
              {t("resume.baixar")}
              <Download size={13} strokeWidth={2.5} />
            </a>
            <a
              href={RESUME_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[#F5F5F2]/20 px-6 py-3 font-mono text-xs uppercase tracking-[0.15em] text-[#F5F5F2] transition-opacity duration-200 hover:opacity-70"
            >
              {t("resume.abrir")}
              <ArrowUpRight size={13} strokeWidth={2.5} />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
