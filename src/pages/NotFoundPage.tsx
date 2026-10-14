import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function NotFoundPage() {
  useEffect(() => {
    document.title = "Partida não encontrada · Gabriel dos Santos";
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 pt-20 text-center">
      <p className="font-mono text-xs uppercase tracking-widest text-[#8A8A85]">404 ──── Xeque-mate</p>
      <h1 className="mt-4 font-display text-[clamp(2rem,6vw,4rem)] font-black tracking-tight text-[#F5F5F2]">
        Essa partida não existe.
      </h1>
      <p className="mt-4 max-w-md text-[#8A8A85]">O projeto que você procura não está no tabuleiro.</p>
      <Link
        to="/#projetos"
        className="group mt-10 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-[#8A8A85] transition-colors duration-200 hover:text-[#F5F5F2]"
      >
        <ArrowRight size={12} className="rotate-180 transition-transform duration-200 group-hover:-translate-x-1" />
        Voltar às partidas
      </Link>
    </div>
  );
}
