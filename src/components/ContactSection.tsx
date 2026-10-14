import { useEffect, useState } from "react";
import { ArrowUpRight, Check, Copy, Mail } from "lucide-react";
import { GithubIcon, InstagramIcon, LinkedinIcon } from "./common/BrandIcons";
import Reveal from "./motion/Reveal";
import MaskReveal from "./motion/MaskReveal";

const EMAIL = "gabrielsantosdevti@gmail.com";

function useClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    function tick() {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const time = useClock();

  function handleCopy() {
    navigator.clipboard?.writeText(EMAIL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <footer id="contato" className="relative scroll-mt-10 overflow-hidden px-6 pb-10 pt-24 sm:px-10 sm:pt-32">
      <div className="mx-auto max-w-5xl">
        <MaskReveal
          as="h2"
          lines={["Oportunidades &", "Conexões."]}
          className="hero-heading font-display font-black leading-[0.95] tracking-[-0.04em]"
          lineClassName="text-[clamp(2.5rem,9vw,7rem)]"
        />

        <Reveal delay={0.2}>
          <div className="mt-14 border-t border-white/10">
            <div className="group flex items-center gap-4 border-b border-white/10 py-6 transition-colors duration-200 hover:border-white/25 sm:gap-6">
              <a
                href={`mailto:${EMAIL}`}
                className="flex min-w-0 flex-1 items-center gap-4 sm:gap-6"
              >
                <span className="w-20 shrink-0 font-mono text-[10px] uppercase tracking-widest text-[#8A8A85] sm:w-28 sm:text-[11px]">
                  E-mail
                </span>
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F5F5F2] text-black sm:h-14 sm:w-14">
                  <Mail size={22} />
                </span>
                <span className="truncate font-display text-lg font-bold text-white transition-colors duration-200 group-hover:text-[#D4D4D0] sm:text-2xl">
                  {EMAIL}
                </span>
              </a>
              <button
                type="button"
                onClick={handleCopy}
                aria-label="Copiar e-mail"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 text-[#8A8A85] transition-colors duration-200 hover:text-[#F5F5F2]"
              >
                {copied ? <Check size={15} /> : <Copy size={15} />}
              </button>
              <ArrowUpRight
                size={20}
                className="shrink-0 text-[#8A8A85] transition-colors duration-200 group-hover:text-white"
              />
            </div>

            <a
              href="https://www.linkedin.com/in/gabrielsantosv/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 border-b border-white/10 py-6 transition-colors duration-200 hover:border-white/25 sm:gap-6"
            >
              <span className="w-20 shrink-0 font-mono text-[10px] uppercase tracking-widest text-[#8A8A85] sm:w-28 sm:text-[11px]">
                LinkedIn
              </span>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F5F5F2] text-black sm:h-14 sm:w-14">
                <LinkedinIcon size={22} />
              </span>
              <span className="truncate font-display text-lg font-bold text-white transition-colors duration-200 group-hover:text-[#D4D4D0] sm:text-2xl">
                in/gabrielsantosv
              </span>
              <ArrowUpRight
                size={20}
                className="ml-auto shrink-0 text-[#8A8A85] transition-colors duration-200 group-hover:text-white"
              />
            </a>

            <a
              href="https://github.com/GabrielSantosv"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 border-b border-white/10 py-6 transition-colors duration-200 hover:border-white/25 sm:gap-6"
            >
              <span className="w-20 shrink-0 font-mono text-[10px] uppercase tracking-widest text-[#8A8A85] sm:w-28 sm:text-[11px]">
                GitHub
              </span>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F5F5F2] text-black sm:h-14 sm:w-14">
                <GithubIcon size={22} />
              </span>
              <span className="truncate font-display text-lg font-bold text-white transition-colors duration-200 group-hover:text-[#D4D4D0] sm:text-2xl">
                GabrielSantosv
              </span>
              <ArrowUpRight
                size={20}
                className="ml-auto shrink-0 text-[#8A8A85] transition-colors duration-200 group-hover:text-white"
              />
            </a>

            <a
              href="https://www.instagram.com/gabrielsantoszv/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 border-b border-white/10 py-6 transition-colors duration-200 hover:border-white/25 sm:gap-6"
            >
              <span className="w-20 shrink-0 font-mono text-[10px] uppercase tracking-widest text-[#8A8A85] sm:w-28 sm:text-[11px]">
                Instagram
              </span>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F5F5F2] text-black sm:h-14 sm:w-14">
                <InstagramIcon size={22} />
              </span>
              <span className="truncate font-display text-lg font-bold text-white transition-colors duration-200 group-hover:text-[#D4D4D0] sm:text-2xl">
                @gabrielsantoszv
              </span>
              <ArrowUpRight
                size={20}
                className="ml-auto shrink-0 text-[#8A8A85] transition-colors duration-200 group-hover:text-white"
              />
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-24 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 font-mono text-[11px] uppercase tracking-widest text-[#3A3A38] sm:flex-row sm:items-center">
            <span>© {new Date().getFullYear()} Gabriel dos Santos</span>
            <span>Limeira, SP — {time} GMT-3</span>
            <a href="#top" className="inline-flex items-center gap-1 transition-colors duration-200 hover:text-[#8A8A85]">
              Voltar ao topo
              <ArrowUpRight size={14} />
            </a>
          </div>
        </Reveal>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none -mb-8 mt-10 select-none overflow-hidden text-center font-display font-black leading-none tracking-[-0.04em] text-[#0D0D0D]"
        style={{ fontSize: "clamp(3rem, 14vw, 11rem)" }}
      >
        NO RISK NO HISTORY
      </div>
    </footer>
  );
}
