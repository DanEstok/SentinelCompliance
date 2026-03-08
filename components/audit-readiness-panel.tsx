import { Card } from "./ui/card";

export function AuditReadinessPanel() {
  return (
    <Card>
      <h2 className="text-xl font-semibold">AI Audit Readiness Analyzer</h2>
      <p className="mt-2 text-sm text-slate-300">Readiness Score: <span className="font-semibold text-emerald-400">78 / 100</span></p>
      <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-300">
        <li>Controls verified: 128 / 167</li>
        <li>Evidence completeness: 74%</li>
        <li>High-risk findings: 5</li>
        <li>Policy documentation coverage: 80%</li>
      </ul>
    </Card>
  );
}
