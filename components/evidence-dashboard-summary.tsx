import { Card } from "./ui/card";

const latestEvidence = [
  "Google Workspace user access list synced",
  "AWS backup configuration snapshot synced",
  "Okta MFA enforcement report synced"
];

const missingEvidence = [
  "SOC2 CC6.2 - admin privilege review",
  "ISO27001 A.9.2 - quarterly access recertification"
];

const expirations = [
  "GitHub repository access log expires in 9 days",
  "Azure security policy snapshot expires in 14 days"
];

export function EvidenceDashboardSummary() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <Card>
        <h3 className="mb-3 text-lg font-semibold">Latest Evidence</h3>
        <ul className="space-y-2 text-sm text-slate-300">
          {latestEvidence.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </Card>
      <Card>
        <h3 className="mb-3 text-lg font-semibold">Missing Evidence</h3>
        <ul className="space-y-2 text-sm text-amber-300">
          {missingEvidence.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </Card>
      <Card>
        <h3 className="mb-3 text-lg font-semibold">Evidence Expiration</h3>
        <ul className="space-y-2 text-sm text-slate-300">
          {expirations.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </Card>
    </div>
  );
}
