import { Card } from "./ui/card";

const factors = [
  { label: "Control completion", weight: "40%" },
  { label: "Risk severity", weight: "25%" },
  { label: "Evidence availability", weight: "20%" },
  { label: "Automation coverage", weight: "15%" }
];

export function ComplianceScoreBreakdown() {
  return (
    <Card>
      <h3 className="mb-3 text-lg font-semibold">Compliance Score Engine</h3>
      <p className="mb-3 text-sm text-slate-300">Overall Readiness Score: <span className="font-semibold text-emerald-400">81 / 100</span></p>
      <ul className="space-y-2 text-sm">
        {factors.map((factor) => (
          <li key={factor.label} className="flex justify-between rounded bg-slate-800 px-3 py-2">
            <span>{factor.label}</span>
            <span>{factor.weight}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
