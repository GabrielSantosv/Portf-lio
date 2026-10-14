import { useRef, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "./common/BrandIcons";
import ProjectShowcase from "./common/ProjectShowcase";
import MaskReveal from "./motion/MaskReveal";
import { PROJECTS, tx, type Project } from "../data/projects";
import { useLanguage } from "../context/LanguageContext";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const { lang, t } = useLanguage();

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const topOffset = 112 + index * 28;

  return (
    <div id={`projeto-${project.slug}`} ref={containerRef} className="sticky scroll-mt-28" style={{ top: topOffset }}>
      <motion.article
        style={{ scale }}
        className="dark-card group relative origin-top overflow-hidden rounded-[40px] border border-white/15 bg-black shadow-2xl shadow-black/60 transition-colors duration-300 hover:border-[#C9A45C]/40"
      >
        <Link
          to={`/projetos/${project.slug}`}
          viewTransition
          data-cursor="ver"
          aria-label={`${t("projects.verDetalhes")}: ${tx(project.name, lang)}`}
          className="absolute inset-0 z-0"
        />

        <div className="pointer-events-none">
          <ProjectShowcase
            slug={project.slug}
            coverLabel={project.coverLabel}
            variant="compact"
            coverStyle={{ viewTransitionName: `capa-${project.slug}` } as CSSProperties}
          />
        </div>

        <div className="relative z-10 p-8 sm:p-12">
          <span
            className="pointer-events-none font-mono text-xs text-[#8A8A85]"
            style={{ viewTransitionName: `numero-${project.slug}` } as CSSProperties}
          >
            {project.number}
          </span>
          <h3
            className="pointer-events-none mt-4 font-display text-[clamp(1.5rem,3.5vw,2.5rem)] font-bold tracking-tight text-[#F5F5F2]"
            style={{ viewTransitionName: `titulo-${project.slug}` } as CSSProperties}
          >
            {tx(project.name, lang)}
          </h3>
          <p className="pointer-events-none mt-4 max-w-xl text-[#8A8A85]">{tx(project.summary, lang)}</p>

          <div className="pointer-events-none mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag.pt}
                className="rounded-full border border-white/15 px-3 py-1 font-mono text-xs text-[#8A8A85]"
              >
                {tx(tag, lang)}
              </span>
            ))}
          </div>

          <div className="relative z-10 mt-8 flex flex-wrap gap-3">
            <Link
              to={`/projetos/${project.slug}`}
              viewTransition
              className="inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-black transition-opacity duration-200 hover:opacity-70"
            >
              {t("projects.verDetalhes")}
              <ArrowUpRight size={15} />
            </Link>
            {project.links.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-white transition-opacity duration-200 hover:opacity-70"
              >
                {t("projects.verDemo")}
                <ArrowUpRight size={15} />
              </a>
            )}
            {project.links.repo && (
              <a
                href={project.links.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-white transition-opacity duration-200 hover:opacity-70"
              >
                {t("projects.verCodigo")}
                <GithubIcon size={15} />
              </a>
            )}
          </div>
        </div>
      </motion.article>
    </div>
  );
}

export default function ProjectsSection() {
  const { t } = useLanguage();

  return (
    <section id="projetos" className="relative scroll-mt-24 px-6 pb-20 pt-24 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <MaskReveal
          as="h2"
          lines={[t("projects.eyebrow")]}
          className="font-display text-[clamp(1.75rem,4vw,3rem)] font-bold tracking-tight text-[#F5F5F2]"
        />

        <div className="mt-16 flex max-w-4xl flex-col gap-10">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
