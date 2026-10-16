import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { Screen } from "../ProjectShowcase";
import { Panel, StatCard, GOLD } from "./_ui";

function DashboardScreen() {
  return (
    <Panel>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <StatCard label="Faturamento" value="R$ 48.2k" sub="+12% vs ontem" />
        <StatCard label="Ticket médio" value="R$ 86,40" />
        <StatCard label="Pedidos hoje" value="312" />
        <StatCard label="Novos clientes" value="27" />
      </div>
      <div className="mt-4 flex h-20 items-end gap-2 sm:h-28">
        {[40, 65, 50, 80, 60, 95, 70].map((h, i) => (
          <div key={i} className="flex-1 rounded-t-sm" style={{ height: `${h}%`, backgroundColor: i === 5 ? GOLD : "#2A2A28" }} />
        ))}
      </div>
    </Panel>
  );
}

const TABLES = [1, 1, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0];

function PdvScreen() {
  return (
    <Panel className="flex gap-4">
      <div className="grid flex-1 grid-cols-4 gap-2">
        {TABLES.map((occupied, i) => (
          <div
            key={i}
            className="flex aspect-square items-center justify-center rounded-md border font-mono text-[9px]"
            style={{
              borderColor: occupied ? GOLD : "rgba(255,255,255,0.12)",
              backgroundColor: occupied ? "rgba(201,164,92,0.12)" : "rgba(255,255,255,0.02)",
              color: occupied ? GOLD : "#5A5A56",
            }}
          >
            M{i + 1}
          </div>
        ))}
      </div>
      <div className="w-28 shrink-0 rounded-lg border border-white/10 bg-white/[0.02] p-3 sm:w-36">
        <p className="font-mono text-[9px] uppercase tracking-widest text-[#8A8A85]">Mesa 04</p>
        <div className="mt-2 flex flex-col gap-1.5 font-mono text-[9px] text-[#D7D7D4]">
          <div className="flex justify-between"><span>2x Pizza</span><span>58,00</span></div>
          <div className="flex justify-between"><span>3x Suco</span><span>24,00</span></div>
        </div>
        <div className="mt-2 flex justify-between border-t border-white/10 pt-2 font-mono text-[10px] font-bold text-[#F5F5F2]">
          <span>Total</span><span>82,00</span>
        </div>
      </div>
    </Panel>
  );
}

function LojaScreen() {
  return (
    <Panel className="flex gap-4">
      <div className="grid flex-1 grid-cols-3 gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-1.5 rounded-md border border-white/10 bg-white/[0.02] p-2">
            <div className="aspect-square rounded bg-white/[0.06]" />
            <span className="font-mono text-[8px] text-[#8A8A85]">Produto {i + 1}</span>
            <span className="font-mono text-[9px] font-semibold text-[#F5F5F2]">R$ {(29 + i * 7).toFixed(2)}</span>
          </div>
        ))}
      </div>
      <div className="w-24 shrink-0 rounded-lg border border-white/10 bg-white/[0.02] p-3 sm:w-32">
        <p className="font-mono text-[9px] uppercase tracking-widest text-[#8A8A85]">Carrinho</p>
        <p className="mt-2 font-mono text-[9px] text-[#D7D7D4]">3 itens</p>
        <p className="mt-3 font-mono text-[11px] font-bold" style={{ color: GOLD }}>R$ 134,00</p>
      </div>
    </Panel>
  );
}

function ImportacaoScreen() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const target = 32418;
    const id = window.setInterval(() => {
      setCount((c) => (c >= target ? 0 : Math.min(c + Math.round(target / 30), target)));
    }, 90);
    return () => window.clearInterval(id);
  }, []);
  const pct = Math.min((count / 50000) * 100, 100);
  return (
    <Panel className="flex flex-col items-center justify-center gap-4">
      <p className="font-mono text-xs text-[#8A8A85]">Importando catálogo.csv</p>
      <div className="h-2 w-full max-w-xs overflow-hidden rounded-full bg-white/10">
        <motion.div className="h-full rounded-full" style={{ backgroundColor: GOLD, width: `${pct}%` }} />
      </div>
      <p className="font-mono text-sm text-[#F5F5F2]">{count.toLocaleString("pt-BR")} de 50.000 produtos</p>
    </Panel>
  );
}

export const saasComercioScreens: Screen[] = [
  { label: "Dashboard", url: "app.saas-comercio.dev/dashboard", render: () => <DashboardScreen /> },
  { label: "PDV", url: "app.saas-comercio.dev/pdv", render: () => <PdvScreen /> },
  { label: "Loja Virtual", url: "app.saas-comercio.dev/loja", render: () => <LojaScreen /> },
  { label: "Importação", url: "app.saas-comercio.dev/importar", render: () => <ImportacaoScreen /> },
];
