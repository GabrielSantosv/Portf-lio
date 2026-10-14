import { motion } from "framer-motion";
import type { Screen } from "../ProjectShowcase";
import { Panel, GOLD, Dot } from "./_ui";

function ServiceBox({ name, sub }: { name: string; sub?: string }) {
  return (
    <div className="flex h-14 w-24 flex-col items-center justify-center rounded-lg border border-white/15 bg-white/[0.03] text-center sm:h-16 sm:w-28">
      <span className="font-mono text-[9px] font-semibold uppercase tracking-wide text-[#F5F5F2] sm:text-[10px]">{name}</span>
      {sub && <span className="mt-0.5 font-mono text-[7px] text-[#8A8A85] sm:text-[8px]">{sub}</span>}
    </div>
  );
}

function PulseDot({ delay }: { delay: number }) {
  return (
    <motion.span
      className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full"
      style={{ backgroundColor: GOLD, boxShadow: `0 0 8px ${GOLD}` }}
      animate={{ left: ["4%", "96%"], opacity: [0, 1, 1, 0] }}
      transition={{ duration: 1.6, delay, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
    />
  );
}

function ArquiteturaScreen() {
  return (
    <Panel className="flex flex-col items-center justify-center gap-6">
      <div className="flex w-full items-center justify-between">
        <ServiceBox name="Pedido" />
        <div className="relative mx-2 h-px flex-1 bg-white/10">
          <PulseDot delay={0} />
        </div>
        <div className="flex flex-col gap-3">
          <ServiceBox name="Estoque" />
          <ServiceBox name="Fiscal" />
          <ServiceBox name="Notificação" />
        </div>
        <div className="relative mx-2 h-px w-10 bg-white/10 sm:w-16">
          <PulseDot delay={0.9} />
        </div>
        <ServiceBox name="Expedição" />
      </div>
      <div className="flex gap-3">
        <ServiceBox name="Funcionário" sub="login" />
        <ServiceBox name="Supplier" sub="catálogo" />
      </div>
    </Panel>
  );
}

const LOG_LINES = [
  { tag: "pedido-service", text: "PedidoCriado sagaId=7f3a... publicado", color: "#8A8A85" },
  { tag: "estoque-service", text: "reserva confirmada (3 itens)", color: "#4ADE80" },
  { tag: "fiscal-service", text: "NotaEmitida nf=000123", color: "#4ADE80" },
  { tag: "notificacao-service", text: "e-mail de confirmação enviado", color: "#8A8A85" },
  { tag: "expedicao-service", text: "SeparacaoPedidoIniciado", color: GOLD },
];

function EventosScreen() {
  return (
    <Panel className="font-mono text-[11px]">
      <div className="flex flex-col gap-2">
        {LOG_LINES.map((line, i) => (
          <motion.div
            key={line.tag + i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.3, duration: 0.4 }}
          >
            <span className="text-[#5A5A56]">[{line.tag}]</span>{" "}
            <span style={{ color: line.color }}>{line.text}</span>
          </motion.div>
        ))}
      </div>
    </Panel>
  );
}

const SERVICES = ["pedido", "estoque", "fiscal", "notificacao", "expedicao", "funcionario", "supplier"];

function TestesScreen() {
  return (
    <Panel className="font-mono text-[11px]">
      <p className="text-[#F5F5F2]">Tests run: 40, Failures: 0, Errors: 0</p>
      <div className="mt-4 flex flex-col gap-2">
        {SERVICES.map((s, i) => (
          <motion.div
            key={s}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 * i }}
            className="flex items-center gap-2"
          >
            <Dot tone="green" />
            <span className="text-[#8A8A85]">{s}-service</span>
          </motion.div>
        ))}
      </div>
    </Panel>
  );
}

export const marketflowSagaScreens: Screen[] = [
  { label: "Arquitetura", render: () => <ArquiteturaScreen /> },
  { label: "Eventos", render: () => <EventosScreen /> },
  { label: "Testes", render: () => <TestesScreen /> },
];
