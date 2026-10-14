import { motion } from "framer-motion";
import Reveal from "./motion/Reveal";
import MaskReveal from "./motion/MaskReveal";
import CurtainReveal from "./motion/CurtainReveal";

export default function AboutSection() {
  return (
    <section id="sobre" className="scroll-mt-24 px-6 py-28 sm:px-10">
      <div className="mx-auto max-w-6xl">
        <MaskReveal
          as="h2"
          lines={["Sobre mim"]}
          className="font-display text-[clamp(1.75rem,4vw,3rem)] font-bold tracking-tight text-[#F5F5F2]"
        />

        <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-5">
            <CurtainReveal className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0A0A0A]">
              <img
                src="/gabriel.jpg"
                alt="Gabriel dos Santos"
                className="h-full w-full object-cover object-top grayscale-[20%] contrast-[1.05]"
              />
              <div
                className="pointer-events-none absolute inset-0"
                style={{ background: "linear-gradient(180deg, rgba(0,0,0,0) 55%, rgba(0,0,0,0.65) 100%)" }}
              />
              <span className="absolute bottom-5 left-5 font-mono text-[10px] uppercase tracking-widest text-[#D4D4D0]">
                Limeira, SP
              </span>
            </CurtainReveal>
          </div>

          <div className="md:col-span-7">
            <MaskReveal
              as="h2"
              lines={["Toda grande jogada começa", "com um movimento ousado."]}
              className="font-display text-[clamp(1.75rem,4vw,3rem)] font-bold leading-[1.1] tracking-tight text-[#F5F5F2]"
            />

            <Reveal delay={0.1}>
              <p className="mt-8 max-w-2xl text-[17px] font-light leading-relaxed text-[#8A8A85]">
                Sou estudante de Sistemas de Informação na PUC-Campinas e desenvolvedor back-end. Gosto de
                entender o sistema inteiro: da modelagem do banco à arquitetura de serviços. Trabalho com
                Spring Boot, microsserviços e projetos de IA aplicada, e estou atrás da minha primeira
                oportunidade pra jogar em um time grande.
              </p>
            </Reveal>

            <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2">
              <Reveal delay={0.15}>
                <p className="font-mono text-xs uppercase tracking-widest text-[#8A8A85]">Formação</p>
                <div className="mt-4 flex gap-3">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#D4D4D0]" />
                  <div>
                    <p className="text-[#F5F5F2]">PUC-Campinas</p>
                    <p className="text-sm text-[#8A8A85]">Sistemas de Informação</p>
                    <p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-[#3A3A38]">
                      Previsão — dez / 2027
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <p className="font-mono text-xs uppercase tracking-widest text-[#8A8A85]">Foco</p>
                <p className="mt-4 text-[#F5F5F2]">Back-end · Sistemas distribuídos · IA aplicada</p>
              </Reveal>
            </div>

            <Reveal delay={0.25}>
              <div className="mt-10 inline-flex w-fit items-center gap-3 rounded-full border border-white/15 px-5 py-2.5">
                <span className="relative flex h-2.5 w-2.5">
                  <motion.span
                    className="absolute inline-flex h-2.5 w-2.5 rounded-full bg-[#4ADE80]"
                    animate={{ boxShadow: ["0 0 0 0 rgba(74,222,128,0.6)", "0 0 0 8px rgba(74,222,128,0)"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                  />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#4ADE80]" />
                </span>
                <span className="font-mono text-xs uppercase tracking-[0.15em] text-[#F5F5F2]">
                  Disponível para contratação Júnior / Estagiário
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
