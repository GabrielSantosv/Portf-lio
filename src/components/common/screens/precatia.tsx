import { motion } from "framer-motion";
import type { Screen } from "../ProjectShowcase";
import { Panel, StatCard, Bar, Pill, FakeLines, GOLD } from "./_ui";

const DOCS = [
  { name: "processo_0231.pdf", status: "Concluído" },
  { name: "processo_0232.pdf", status: "Processando" },
  { name: "processo_0233.pdf", status: "Concluído" },
];

function UploadScreen() {
  return (
    <Panel>
      <div className="flex h-16 items-center justify-center rounded-lg border border-dashed border-white/20 font-mono text-[10px] text-[#8A8A85] sm:h-20">
        Arraste PDFs jurídicos aqui
      </div>
      <div className="mt-4 flex flex-col gap-2">
        {DOCS.map((doc) => (
          <div key={doc.name} className="flex items-center justify-between rounded-md border border-white/10 bg-white/[0.02] px-3 py-2">
            <span className="font-mono text-[9px] text-[#D7D7D4]">{doc.name}</span>
            <Pill active={doc.status === "Concluído"}>{doc.status}</Pill>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function AnaliseScreen() {
  return (
    <Panel className="flex gap-4">
      <div className="flex-1 rounded-md border border-white/10 bg-white/[0.02] p-3">
        <FakeLines count={9} />
      </div>
      <div className="w-32 shrink-0 sm:w-40">
        <div className="flex flex-col gap-2 font-mono text-[9px]">
          <div>
            <p className="text-[#8A8A85]">Credor</p>
            <p className="text-[#F5F5F2]">Maria A. Souza</p>
          </div>
          <div>
            <p className="text-[#8A8A85]">Nº Processo</p>
            <p className="text-[#F5F5F2]">0231-55.2023</p>
          </div>
          <div>
            <p className="text-[#8A8A85]">Tribunal</p>
            <p className="text-[#F5F5F2]">TJ-SP</p>
          </div>
        </div>
        <div className="mt-3 rounded-md border px-2 py-1.5" style={{ borderColor: `${GOLD}55` }}>
          <p className="font-mono text-[8px] uppercase tracking-widest" style={{ color: GOLD }}>Resumo IA</p>
          <p className="mt-1 font-mono text-[8px] leading-relaxed text-[#8A8A85]">
            Precatório deferido, aguardando pagamento.
          </p>
        </div>
      </div>
    </Panel>
  );
}

const EVENTS = [
  { date: "12/03/2021", text: "Protocolo inicial do precatório" },
  { date: "04/08/2022", text: "Homologação do valor pelo tribunal" },
  { date: "19/01/2024", text: "Inclusão na ordem cronológica de pagamento" },
];

function LinhaDoTempoScreen() {
  return (
    <Panel>
      <div className="relative flex flex-col gap-5 pl-4">
        <div className="absolute left-[3px] top-1 h-[85%] w-px bg-white/10" />
        {EVENTS.map((e, i) => (
          <motion.div
            key={e.date}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.2 }}
            className="relative"
          >
            <span className="absolute -left-4 top-1 h-1.5 w-1.5 rounded-full" style={{ backgroundColor: GOLD }} />
            <p className="font-mono text-[8px] text-[#8A8A85]">{e.date}</p>
            <p className="mt-0.5 text-[10px] text-[#F5F5F2]">{e.text}</p>
          </motion.div>
        ))}
      </div>
    </Panel>
  );
}

function DashboardScreen() {
  return (
    <Panel>
      <div className="grid grid-cols-3 gap-2">
        <StatCard label="Documentos" value="184" />
        <StatCard label="Processos" value="61" />
        <StatCard label="Concluídos" value="52" />
      </div>
      <div className="mt-4 flex flex-col gap-2">
        <Bar label="Concluído" value={85} highlight />
        <Bar label="Processando" value={25} />
        <Bar label="Erro" value={5} />
      </div>
    </Panel>
  );
}

export const precatiaScreens: Screen[] = [
  { label: "Upload", url: "precatia.app/upload", render: () => <UploadScreen /> },
  { label: "Análise", url: "precatia.app/doc/0231", render: () => <AnaliseScreen /> },
  { label: "Linha do tempo", url: "precatia.app/doc/0231/timeline", render: () => <LinhaDoTempoScreen /> },
  { label: "Dashboard", url: "precatia.app/dashboard", render: () => <DashboardScreen /> },
];
