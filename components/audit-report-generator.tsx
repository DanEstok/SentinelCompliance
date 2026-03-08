import { Card } from "./ui/card";

export function AuditReportGenerator() {
  return (
    <Card>
      <h2 className="text-xl font-semibold">Audit Report Generator</h2>
      <p className="mt-2 text-sm text-slate-300">Generate SOC2 readiness, HIPAA compliance, and ISO27001 readiness reports with export options for PDF and Word.</p>
      <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-300">
        <li>Control summaries</li>
        <li>Evidence references</li>
        <li>Risk assessments</li>
        <li>Policy documentation</li>
      </ul>
    </Card>
  );
}
