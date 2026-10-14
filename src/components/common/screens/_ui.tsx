import type { ReactNode } from "react";

export const GOLD = "#C9A45C";

export function Panel({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={`h-full w-full bg-[#0A0A0A] p-4 text-[#F5F5F2] sm:p-6 ${className ?? ""}`}>{children}</div>;
}

export function StatCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.02] p-3">
      <p className="font-mono text-[9px] uppercase tracking-widest text-[#8A8A85]">{label}</p>
      <p className="mt-1 text-base font-bold text-[#F5F5F2] sm:text-lg">{value}</p>
      {sub && <p className="mt-0.5 font-mono text-[9px] text-[#8A8A85]">{sub}</p>}
    </div>
  );
}

export function Pill({ children, active }: { children: ReactNode; active?: boolean }) {
  return (
    <span
      className="rounded-full border px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest"
      style={{
        borderColor: active ? GOLD : "rgba(255,255,255,0.12)",
        color: active ? GOLD : "#8A8A85",
        backgroundColor: active ? "rgba(201,164,92,0.1)" : "transparent",
      }}
    >
      {children}
    </span>
  );
}

export function Bar({ value, label, highlight }: { value: number; label: string; highlight?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-14 shrink-0 font-mono text-[9px] text-[#8A8A85]">{label}</span>
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
        <div
          className="h-full rounded-full"
          style={{ width: `${value}%`, backgroundColor: highlight ? GOLD : "#4A4A46" }}
        />
      </div>
    </div>
  );
}

export function Dot({ tone = "gold" }: { tone?: "gold" | "grey" | "green" }) {
  const color = tone === "gold" ? GOLD : tone === "green" ? "#4ADE80" : "#5A5A56";
  return <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: color }} />;
}

export function FakeLines({ count = 6, className }: { count?: number; className?: string }) {
  return (
    <div className={`flex flex-col gap-1.5 ${className ?? ""}`}>
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="h-1.5 rounded-full bg-white/10"
          style={{ width: `${70 + ((i * 13) % 25)}%` }}
        />
      ))}
    </div>
  );
}
