import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function NotFoundPage() {
  const { t } = useLanguage();

  useEffect(() => {
    document.title = t("notfound.title");
  }, [t]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 pt-20 text-center">
      <p className="font-mono text-xs uppercase tracking-widest text-[#8A8A85]">{t("notfound.eyebrow")}</p>
      <h1 className="mt-4 font-display text-[clamp(2rem,6vw,4rem)] font-black tracking-tight text-[#F5F5F2]">
        {t("notfound.headline")}
      </h1>
      <p className="mt-4 max-w-md text-[#8A8A85]">{t("notfound.body")}</p>
      <Link
        to="/#projetos"
        className="group mt-10 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-[#8A8A85] transition-colors duration-200 hover:text-[#F5F5F2]"
      >
        <ArrowRight size={12} className="rotate-180 transition-transform duration-200 group-hover:-translate-x-1" />
        {t("notfound.voltar")}
      </Link>
    </div>
  );
}
