import { useEffect, useLayoutEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLenis } from "lenis/react";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { getAdjacentProject, getProjectBySlug, tx } from "../data/projects";
import ProjectShowcase from "../components/common/ProjectShowcase";
import Reveal from "../components/motion/Reveal";
import MaskReveal from "../components/motion/MaskReveal";
import NotFoundPage from "./NotFoundPage";
import { useLanguage } from "../context/LanguageContext";

const GOLD = "#C9A45C";

function CoverParallax({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <div ref={ref}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = getProjectBySlug(slug);
  const lenis = useLenis();
  const { lang, t } = useLanguage();

  useLayoutEffect(() => {
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [slug, lenis]);

  useEffect(() => {
    if (project) document.title = `${tx(project.name, lang)} · Gabriel dos Santos`;
  }, [project, lang]);

  if (!project) return <NotFoundPage />;

  const next = getAdjacentProject(project.slug);
  const teamLabel = project.team === "solo" ? t("detail.teamSolo") : t("detail.teamEquipe");
  const statusLabel = project.status === "completed" ? t("detail.statusConcluido") : t("detail.statusAndamento");

  return (
    <article className="px-6 pb-24 pt-32 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <Link
            to={`/#projeto-${project.slug}`}
            viewTransition
            className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-[#8A8A85] transition-colors duration-200 hover:text-[#F5F5F2]"
          >
            <ArrowRight size={12} className="rotate-180 transition-transform duration-200 group-hover:-translate-x-1" />
            {t("detail.voltar")}
          </Link>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <span
              className="font-mono text-xs"
              style={{ color: GOLD, viewTransitionName: `numero-${project.slug}` } as CSSProperties}
            >
              {project.number} / 05
            </span>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag.pt} className="rounded-full border border-white/15 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-[#8A8A85]">
                  {tx(tag, lang)}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="mt-6">
          <MaskReveal
            as="h1"
            lines={[tx(project.name, lang)]}
            style={{ viewTransitionName: `titulo-${project.slug}` } as CSSProperties}
            className="font-display text-[clamp(3rem,7vw,6rem)] font-black leading-[0.95] tracking-[-0.05em] text-[#F5F5F2]"
          />
          <MaskReveal
            as="h2"
            lines={[tx(project.subtitle, lang)]}
            delay={0.08}
            className="mt-2 font-serif text-[clamp(1.5rem,3vw,2.5rem)] italic text-[#C9A45C]"
          />
        </div>

        <Reveal delay={0.15}>
          <p className="mt-6 max-w-[62ch] text-[1.125rem] font-light leading-relaxed text-[#8A8A85]">{tx(project.summary, lang)}</p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-12">
            <CoverParallax>
              <ProjectShowcase
                slug={project.slug}
                coverLabel={project.coverLabel}
                variant="full"
                coverStyle={{ viewTransitionName: `capa-${project.slug}` } as CSSProperties}
              />
            </CoverParallax>
          </div>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <div className="lg:sticky" style={{ top: "calc(80px + 2rem)" }}>
              <Reveal delay={0.1}>
                <dl className="flex flex-col gap-8">
                  <div>
                    <dt className="font-mono text-[11px] uppercase tracking-widest text-[#8A8A85]">{t("detail.area")}</dt>
                    <dd className="mt-2 text-[#F5F5F2]">{tx(project.area, lang)}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[11px] uppercase tracking-widest text-[#8A8A85]">{t("detail.time")}</dt>
                    <dd className="mt-2 text-[#F5F5F2]">{teamLabel}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[11px] uppercase tracking-widest text-[#8A8A85]">{t("detail.arsenal")}</dt>
                    <dd className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
                      {project.stack.map((tech) => (
                        <span key={tech} className="inline-flex items-center gap-2 text-sm text-[#D7D7D4]">
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: GOLD }} />
                          {tech}
                        </span>
                      ))}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[11px] uppercase tracking-widest text-[#8A8A85]">{t("detail.status")}</dt>
                    <dd className="mt-2 flex items-center gap-2 text-[#F5F5F2]">
                      <span
                        className="h-2 w-2 shrink-0 rounded-full"
                        style={{ backgroundColor: project.status === "completed" ? "#4ADE80" : GOLD }}
                      />
                      {statusLabel}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[11px] uppercase tracking-widest text-[#8A8A85]">{t("detail.acesso")}</dt>
                    <dd className="mt-3 flex flex-wrap items-center gap-3">
                      {project.links.repo || project.links.demo ? (
                        <>
                          {project.links.repo && (
                            <a
                              href={project.links.repo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-black transition-opacity duration-200 hover:opacity-70"
                            >
                              {t("detail.repositorio")}
                              <ArrowUpRight size={13} />
                            </a>
                          )}
                          {project.links.demo && (
                            <a
                              href={project.links.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 rounded-full border border-[#F5F5F2]/20 px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-[#F5F5F2] transition-opacity duration-200 hover:opacity-70"
                            >
                              {t("detail.verDemo")}
                              <ArrowUpRight size={13} />
                            </a>
                          )}
                        </>
                      ) : (
                        <p className="font-serif italic text-[#8A8A85]">{t("detail.linksEmBreve")}</p>
                      )}
                    </dd>
                  </div>
                </dl>
              </Reveal>
            </div>
          </div>

          <div className="lg:col-span-8">
            <Reveal>
              <h3 className="font-display text-[2rem] font-bold tracking-tight text-[#F5F5F2]">{t("detail.analise")}</h3>
            </Reveal>

            <div className="mt-10 flex flex-col gap-10">
              {[
                { label: t("detail.abertura"), num: "01", text: tx(project.opening, lang) },
                { label: t("detail.desafio"), num: "02", text: tx(project.challenge, lang) },
                { label: t("detail.jogada"), num: "03", text: tx(project.move, lang) },
              ].map((block, i) => (
                <Reveal key={block.label} delay={i * 0.08}>
                  <div className="grid grid-cols-1 gap-3 border-t border-white/10 pt-6 sm:grid-cols-[140px_1fr] sm:gap-8">
                    <p className="font-mono text-xs uppercase tracking-widest">
                      <span style={{ color: GOLD }}>{block.num}</span>{" "}
                      <span className="text-[#8A8A85]">── {block.label}</span>
                    </p>
                    <p className="text-[1.25rem] leading-[1.6] text-[#F5F5F2]">{block.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.1}>
              <h3 className="mt-16 font-display text-xl font-bold tracking-tight text-[#F5F5F2]">{t("detail.decisoes")}</h3>
            </Reveal>
            <div className="mt-6 flex flex-col">
              {project.decisions.map((decision, i) => (
                <Reveal key={decision.title.pt} delay={i * 0.08}>
                  <div className="flex gap-5 border-t border-white/10 py-5 first:border-t-0">
                    <span className="font-mono text-xs" style={{ color: GOLD }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="font-semibold text-[#F5F5F2]">{tx(decision.title, lang)}</p>
                      <p className="mt-1 font-light text-[#8A8A85]">{tx(decision.why, lang)}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.1}>
              <h3 className="mt-16 font-display text-xl font-bold tracking-tight text-[#F5F5F2]">{t("detail.lances")}</h3>
            </Reveal>
            <div className="mt-6 flex flex-col">
              {project.features.map((feature, i) => (
                <Reveal key={feature.pt} delay={i * 0.05}>
                  <div className="flex gap-5 border-t border-white/10 py-4 first:border-t-0">
                    <span className="font-mono text-xs" style={{ color: GOLD }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-[#F5F5F2]">{tx(feature, lang)}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.1}>
              <h3 className="mt-16 font-display text-xl font-bold tracking-tight text-[#F5F5F2]">{t("detail.papel")}</h3>
              <p className="mt-4 leading-relaxed text-[#D7D7D4]">{tx(project.role, lang)}</p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-16 flex items-start gap-5">
                <span className="mt-3 h-px w-12 shrink-0" style={{ backgroundColor: GOLD }} />
                <p className="font-serif text-[1.5rem] italic leading-snug text-[#D7D7D4]">{tx(project.lesson, lang)}</p>
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.1}>
          <Link
            to={`/projetos/${next.slug}`}
            viewTransition
            data-cursor="ver"
            className="dark-card group mt-24 flex items-center justify-between gap-6 rounded-[32px] border border-white/15 bg-black p-8 shadow-2xl shadow-black/60 transition-colors duration-300 hover:border-white/30 sm:p-10"
          >
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-[#8A8A85]">{t("detail.proximaPartida")}</p>
              <h3 className="mt-3 font-display text-[clamp(1.5rem,4vw,2.75rem)] font-black tracking-tight text-[#F5F5F2] transition-colors duration-300 group-hover:text-[#C9A45C]">
                {tx(next.name, lang)}
              </h3>
            </div>
            <div className="flex shrink-0 items-center gap-5">
              <ProjectShowcase
                slug={next.slug}
                coverLabel={next.coverLabel}
                variant="compact"
                className="hidden w-32 sm:block"
              />
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/20 text-white transition-transform duration-300 group-hover:translate-x-1">
                <ArrowRight size={18} />
              </span>
            </div>
          </Link>
        </Reveal>
      </div>
    </article>
  );
}
