import { Card } from "./ui/card";

const metrics = [
  { label: "Compliance Score", value: "82%" },
  { label: "Controls Completed", value: "126" },
  { label: "Controls Remaining", value: "38" },
  { label: "Risk Score", value: "Medium" },
  { label: "Audit Readiness", value: "74%" },
  { label: "Automation Coverage", value: "49%" },
  { label: "Open Alerts", value: "6" }
];

export function DashboardMetrics() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric) => (
        <Card key={metric.label}>
          <p className="text-sm text-slate-400">{metric.label}</p>
          <p className="mt-2 text-2xl font-semibold">{metric.value}</p>
        </Card>
      ))}
    </div>
  );
}
