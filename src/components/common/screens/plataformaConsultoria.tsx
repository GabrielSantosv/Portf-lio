import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { Screen } from "../ProjectShowcase";
import { Panel, Pill, GOLD } from "./_ui";

const PROJECTS = [
  { name: "Reestruturação financeira", status: "Em andamento" },
  { name: "Plano de expansão regional", status: "Aberto" },
  { name: "Consultoria tributária", status: "Concluído" },
];

function ProjetosScreen() {
  return (
    <Panel className="flex flex-col gap-2">
      {PROJECTS.map((p) => (
        <div key={p.name} className="flex items-center justify-between rounded-md border border-white/10 bg-white/[0.02] px-3 py-2.5">
          <span className="text-[10px] text-[#F5F5F2] sm:text-xs">{p.name}</span>
          <Pill active={p.status === "Em andamento"}>{p.status}</Pill>
        </div>
      ))}
    </Panel>
  );
}

const MESSAGES = [
  { from: "cliente", text: "Oi! Já temos o levantamento inicial?" },
  { from: "consultor", text: "Sim, te envio o roadmap em instantes." },
];

function ChatScreen() {
  const [showTyping, setShowTyping] = useState(true);
  useEffect(() => {
    const id = window.setTimeout(() => setShowTyping(false), 1800);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <Panel className="flex flex-col gap-2.5">
      {MESSAGES.map((m, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.3 }}
          className={`max-w-[75%] rounded-xl px-3 py-2 text-[10px] ${m.from === "consultor" ? "self-end" : "self-start"}`}
          style={{
            backgroundColor: m.from === "consultor" ? "rgba(201,164,92,0.15)" : "rgba(255,255,255,0.06)",
            color: "#F5F5F2",
          }}
        >
          {m.text}
        </motion.div>
      ))}
      {showTyping && (
        <div className="flex items-center gap-1 self-end rounded-xl px-3 py-2" style={{ backgroundColor: "rgba(201,164,92,0.15)" }}>
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: GOLD }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
            />
          ))}
        </div>
      )}
    </Panel>
  );
}

const STEPS = ["Diagnóstico", "Plano de ação", "Execução", "Revisão final"];

function RoadmapScreen() {
  return (
    <Panel className="flex flex-col items-center justify-center gap-4">
      <div className="w-full max-w-xs rounded-lg border border-white/10 bg-white/[0.02] p-4">
        <p className="font-mono text-[9px] uppercase tracking-widest text-[#8A8A85]">Roadmap do projeto</p>
        <div className="mt-3 flex flex-col gap-2">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <span
                className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full font-mono text-[7px]"
                style={{ backgroundColor: i === 0 ? GOLD : "rgba(255,255,255,0.08)", color: i === 0 ? "#000" : "#8A8A85" }}
              >
                {i + 1}
              </span>
              <span className="text-[9px] text-[#D7D7D4]">{s}</span>
            </div>
          ))}
        </div>
        <button className="mt-4 w-full rounded-full py-1.5 font-mono text-[8px] uppercase tracking-widest text-black" style={{ backgroundColor: GOLD }}>
          Gerar PDF
        </button>
      </div>
    </Panel>
  );
}

export const plataformaConsultoriaScreens: Screen[] = [
  { label: "Projetos", url: "consultoria.app/projetos", render: () => <ProjetosScreen /> },
  { label: "Chat", url: "consultoria.app/chat/42", render: () => <ChatScreen /> },
  { label: "Roadmap", url: "consultoria.app/roadmap/42", render: () => <RoadmapScreen /> },
];
