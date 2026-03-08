import { EvidenceDashboardSummary } from "@/components/evidence-dashboard-summary";
import { Card } from "@/components/ui/card";

export default function EvidencePage() {
  return (
    <div className="space-y-4">
      <Card>
        <h1 className="text-2xl font-semibold">Evidence Collection System</h1>
        <p className="mt-2 text-sm text-slate-300">Securely upload and tag security training records, access documentation, vendor assessments, and incident reports.</p>
        <p className="mt-2 text-sm text-slate-300">Automated evidence collection captures user access lists, admin privileges, MFA enforcement, security settings, login activity, repository access logs, and backup configuration status.</p>
      </Card>
      <EvidenceDashboardSummary />
    </div>
  );
}
