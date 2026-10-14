import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./common/BrandIcons";
import Knight from "./chess/Knight";
import Reveal from "./motion/Reveal";
import RevealText from "./common/RevealText";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";

const LINK_KEYS = [
  { href: "#sobre", key: "nav.sobre" },
  { href: "#projetos", key: "nav.projetos" },
  { href: "#stack", key: "nav.stack" },
  { href: "#curriculo", key: "nav.curriculo" },
  { href: "#contato", key: "nav.contato" },
] as const;

export default function Navbar() {
  const { scrollY } = useScroll();
  const lastY = useRef(0);
  const [hidden, setHidden] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { lang, toggleLang, t } = useLanguage();

  useMotionValueEvent(scrollY, "change", (y) => {
    const goingDown = y > lastY.current;
    setHidden(goingDown && y > 160);
    lastY.current = y;
  });

  return (
    <motion.header
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/40 backdrop-blur-md"
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Reveal delay={0} duration={0.6} y={0} once>
          <Link
            to="/#top"
            viewTransition
            className="flex items-center gap-2 font-serif text-lg italic tracking-tight text-[#F5F5F2] transition-opacity duration-200 hover:opacity-70"
          >
            <Knight className="h-5 w-5 text-[#F5F5F2]" />
            G.S.
          </Link>
        </Reveal>

        <ul className="hidden items-center gap-8 md:flex">
          {LINK_KEYS.map((link, i) => (
            <li key={link.href} className="group relative">
              <Link
                to={`/${link.href}`}
                viewTransition
                className="font-mono text-xs uppercase tracking-widest text-[#8A8A85] transition-colors duration-200 hover:text-[#F5F5F2]"
              >
                <RevealText text={t(link.key)} delay={0.15 + i * 0.07} stagger={0.04} />
              </Link>
              <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-[#C9A45C] transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <Reveal delay={0.4} duration={0.6} y={0} once>
            <button
              type="button"
              onClick={toggleLang}
              aria-label={t("toggle.lang")}
              className="font-mono text-xs uppercase tracking-widest text-[#8A8A85] transition-colors duration-200 hover:text-[#F5F5F2]"
            >
              {lang === "pt" ? "EN" : "PT"}
            </button>
          </Reveal>
          <Reveal delay={0.45} duration={0.6} y={0} once>
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={t("toggle.theme")}
              className="flex items-center text-[#8A8A85] transition-colors duration-200 hover:text-[#F5F5F2]"
            >
              {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
            </button>
          </Reveal>
          <Reveal delay={0.5} duration={0.6} y={0} once>
            <a
              href="https://github.com/GabrielSantosv"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-[#8A8A85] transition-colors duration-200 hover:text-[#F5F5F2]"
            >
              <GithubIcon size={18} />
            </a>
          </Reveal>
          <Reveal delay={0.56} duration={0.6} y={0} once>
            <a
              href="https://www.linkedin.com/in/gabrielsantosv/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-[#8A8A85] transition-colors duration-200 hover:text-[#F5F5F2]"
            >
              <LinkedinIcon size={18} />
            </a>
          </Reveal>
        </div>
      </nav>
    </motion.header>
  );
}
