import { Card } from "./ui/card";

export function GapAnalysisPanel() {
  return (
    <Card>
      <h2 className="text-xl font-semibold">Gap Analysis</h2>
      <ul className="mt-3 space-y-3 text-sm">
        <li>
          <p className="font-medium">Missing Controls</p>
          <p className="text-slate-300">SOC2 CC6.1, ISO27001 A.12.4</p>
        </li>
        <li>
          <p className="font-medium">Missing Evidence</p>
          <p className="text-slate-300">Access review export, backup verification log</p>
        </li>
        <li>
          <p className="font-medium">Incomplete Policies</p>
          <p className="text-slate-300">Vendor Risk Policy (draft), Incident Response Policy (pending approval)</p>
        </li>
        <li>
          <p className="font-medium">Remediation Recommendations</p>
          <p className="text-slate-300">Assign owners, collect artifacts, approve draft policies, and close high-risk findings.</p>
        </li>
      </ul>
    </Card>
  );
}
