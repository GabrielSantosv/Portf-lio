import type { ReactNode } from "react";
import type { Screen } from "../ProjectShowcase";
import { GOLD, Bar } from "./_ui";

function PhoneFrame({ rotate, active, children }: { rotate: number; active: boolean; children: ReactNode }) {
  return (
    <div
      className="h-full w-[150px] shrink-0 overflow-hidden rounded-[28px] border bg-[#0A0A0A] shadow-2xl shadow-black/70 transition-opacity duration-300 sm:w-[180px] sm:rounded-[36px]"
      style={{
        transform: `rotate(${rotate}deg)`,
        borderColor: active ? `${GOLD}55` : "rgba(255,255,255,0.1)",
        opacity: active ? 1 : 0.45,
      }}
    >
      <div className="flex h-full flex-col p-3">{children}</div>
    </div>
  );
}

function RegistroApp() {
  return (
    <div className="flex h-full flex-col gap-2.5">
      <p className="font-mono text-[8px] uppercase tracking-widest text-[#8A8A85]">Novo risco</p>
      <div className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-1.5 font-mono text-[8px] text-[#8A8A85]">
        Tipo: Elétrico
      </div>
      <div className="h-14 rounded-md bg-white/[0.06]" />
      <div className="flex-1 rounded-md border border-dashed border-white/15 p-2 font-mono text-[7px] leading-relaxed text-[#8A8A85]">
        Fiação exposta próxima ao almoxarifado, risco de choque.
      </div>
      <div className="flex items-center gap-1.5 rounded-md border border-white/10 px-2 py-1.5">
        <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: GOLD }} />
        <span className="font-mono text-[7px] text-[#8A8A85]">Localização capturada</span>
      </div>
      <button className="mt-auto w-full rounded-full py-1.5 font-mono text-[7px] uppercase tracking-widest text-black" style={{ backgroundColor: GOLD }}>
        Enviar
      </button>
    </div>
  );
}

function DashboardApp() {
  return (
    <div className="flex h-full flex-col gap-3">
      <p className="font-mono text-[8px] uppercase tracking-widest text-[#8A8A85]">Visão geral</p>
      <div className="flex items-center justify-center py-2">
        <div
          className="h-16 w-16 rounded-full"
          style={{ background: `conic-gradient(${GOLD} 0% 40%, #5A5A56 40% 70%, #2A2A28 70% 100%)` }}
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <Bar label="Elétrico" value={65} highlight />
        <Bar label="Estrutural" value={40} />
        <Bar label="Químico" value={25} />
      </div>
      <p className="mt-auto font-mono text-[9px] text-[#F5F5F2]">18 riscos ativos</p>
    </div>
  );
}

function MapaApp() {
  return (
    <div className="relative flex h-full flex-col gap-2">
      <p className="font-mono text-[8px] uppercase tracking-widest text-[#8A8A85]">Mapa de riscos</p>
      <div className="relative flex-1 rounded-md border border-white/10 bg-white/[0.03]">
        {[[30, 35], [55, 20], [70, 60], [40, 70]].map(([x, y], i) => (
          <span
            key={i}
            className="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ left: `${x}%`, top: `${y}%`, backgroundColor: GOLD, boxShadow: `0 0 6px ${GOLD}` }}
          />
        ))}
      </div>
    </div>
  );
}

function makeScreen(active: "registro" | "dashboard" | "mapa") {
  return (
    <div className="flex h-full items-center justify-center gap-4">
      <PhoneFrame rotate={-4} active={active === "registro"}>
        <RegistroApp />
      </PhoneFrame>
      <PhoneFrame rotate={4} active={active !== "registro"}>
        {active === "mapa" ? <MapaApp /> : <DashboardApp />}
      </PhoneFrame>
    </div>
  );
}

export const controleDeRiscosScreens: Screen[] = [
  { label: "Registro", render: () => makeScreen("registro") },
  { label: "Dashboard", render: () => makeScreen("dashboard") },
  { label: "Mapa", render: () => makeScreen("mapa") },
];
