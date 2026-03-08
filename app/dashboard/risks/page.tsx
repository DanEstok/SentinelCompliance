import { RiskMatrix } from "@/components/risk-matrix";

export default function RisksPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Risk Assessment Module</h1>
      <p className="text-sm text-slate-300">Identify risks, score likelihood/impact, calculate severity, and track mitigation recommendations.</p>
      <RiskMatrix />
    </div>
  );
}
