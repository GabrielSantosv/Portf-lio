import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Reveal from "./motion/Reveal";
import MaskReveal from "./motion/MaskReveal";
import King from "./chess/King";
import Queen from "./chess/Queen";
import Rook from "./chess/Rook";
import Bishop from "./chess/Bishop";
import Knight from "./chess/Knight";

const STACK_GROUPS = [
  {
    label: "Back-end",
    icon: King,
    items: ["Java", "Spring Boot", "C#", "Node.js", "APIs REST", "WebSocket", "JWT", "Microsserviços"],
  },
  {
    label: "Concorrência & Performance",
    icon: Queen,
    items: ["Multithreading", "Paralelismo", "Programação assíncrona", "Sincronização de threads", "Processamento concorrente"],
  },
  {
    label: "Cloud & Arquitetura",
    icon: Rook,
    items: [
      "AWS (EC2, S3, Lambda, RDS, API Gateway)",
      "Arquitetura de microsserviços",
      "SAGA Pattern",
      "Arquitetura orientada a eventos",
      "Docker",
    ],
  },
  {
    label: "Bancos de dados",
    icon: Rook,
    items: ["PostgreSQL", "MySQL", "Oracle", "MongoDB Atlas", "Supabase", "Firebase", "Flyway"],
  },
  {
    label: "IA & Dados",
    icon: Bishop,
    items: ["Python", "LLMs", "OCR (Tesseract, Donut)", "Power BI", "Excel avançado"],
  },
  {
    label: "Front-end",
    icon: Bishop,
    items: ["React", "Next.js", "TypeScript", "JavaScript", "HTML", "CSS", "Tailwind CSS"],
  },
  {
    label: "Mobile",
    icon: Knight,
    items: ["React Native (Expo)", "Kotlin"],
  },
  {
    label: "Metodologias & Ferramentas",
    icon: Knight,
    items: ["Scrum", "Scrum Master", "Kanban", "Metodologias ágeis", "Git", "GitHub", "C"],
  },
];

export default function ExperienceSection() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ["start 0.8", "end 0.3"] });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="relative px-6 py-28 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <MaskReveal
          as="h2"
          lines={["Experiência"]}
          className="font-display text-[clamp(1.75rem,4vw,3rem)] font-bold tracking-tight text-[#F5F5F2]"
        />

        <div ref={timelineRef} id="experiencia" className="relative mt-16 scroll-mt-28 pl-8">
          <div className="absolute left-0 top-1 h-full w-px bg-white/10">
            <motion.div className="w-px bg-[#D4D4D0]" style={{ scaleY: lineScale, transformOrigin: "top", height: "100%" }} />
          </div>
          <span className="absolute -left-[5px] top-0 h-[11px] w-[11px] rounded-full bg-[#D4D4D0]" />

          <Reveal>
            <div className="flex flex-col gap-2 border-b border-white/10 pb-8 sm:flex-row sm:items-baseline sm:justify-between">
              <h3 className="text-xl font-semibold tracking-tight text-[#F5F5F2]">
                Desenvolvedor Freelancer — Scale LTDA
              </h3>
              <span className="font-mono text-xs tracking-widest text-[#8A8A85]">2024 — atual</span>
            </div>
            <p className="max-w-3xl pt-8 leading-relaxed text-[#8A8A85]">
              Manutenção e evolução full-stack de sistemas web em produção, com integração front + back via
              REST API, correção de bugs estruturais e gerenciamento de bancos de dados MySQL e PostgreSQL.
            </p>
          </Reveal>
        </div>

        <div id="stack" className="mt-24 scroll-mt-28">
          <MaskReveal
            as="h2"
            lines={["Stack"]}
            className="font-display text-[clamp(1.75rem,4vw,3rem)] font-bold tracking-tight text-[#F5F5F2]"
          />

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {STACK_GROUPS.map((group, gi) => (
              <Reveal key={group.label} delay={gi * 0.05}>
                <div className="group h-full rounded-[32px] border border-white/15 bg-black p-7 shadow-2xl shadow-black/60 transition-colors duration-300 hover:border-[#C7CCD2]/40 sm:p-8">
                  <div className="flex items-center gap-3">
                    <group.icon className="h-8 w-8 shrink-0 text-[#C7CCD2]" />
                    <span className="font-mono text-xs text-[#C7CCD2]">0{gi + 1}</span>
                  </div>
                  <p className="mt-4 font-display text-lg font-bold tracking-tight text-[#F5F5F2]">{group.label}</p>
                  <div className="mt-5 flex flex-wrap gap-x-4 gap-y-3">
                    {group.items.map((tech) => (
                      <span key={tech} className="inline-flex items-center gap-2 text-sm text-[#8A8A85]">
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#C7CCD2]" />
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
