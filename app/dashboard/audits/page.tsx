import { AuditReadinessPanel } from "@/components/audit-readiness-panel";
import { AuditReportGenerator } from "@/components/audit-report-generator";
import { ComplianceRoadmapPanel } from "@/components/compliance-roadmap-panel";
import { GapAnalysisPanel } from "@/components/gap-analysis-panel";
import { PolicyReviewPanel } from "@/components/policy-review-panel";

export default function AuditsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">AI Audit Preparation & Reporting</h1>
      <div className="grid gap-4 lg:grid-cols-2">
        <AuditReadinessPanel />
        <GapAnalysisPanel />
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        <AuditReportGenerator />
        <PolicyReviewPanel />
        <ComplianceRoadmapPanel />
      </div>
    </div>
  );
}
