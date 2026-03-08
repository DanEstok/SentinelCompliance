import { IntegrationCatalog } from "@/components/integration-catalog";
import { Card } from "@/components/ui/card";

export default function IntegrationsPage() {
  return (
    <div className="space-y-4">
      <Card>
        <h1 className="text-2xl font-semibold">Integrations</h1>
        <p className="mt-2 text-sm text-slate-300">Connect Google Workspace, Microsoft 365, AWS, Azure, GitHub, Slack, and Okta for automated evidence collection.</p>
        <p className="mt-2 text-sm text-slate-300">Each integration supports OAuth, credential management, scheduled sync (daily/weekly/monthly), and evidence mapping to SOC2, HIPAA, ISO27001, PCI-DSS, GDPR, and NIST controls.</p>
      </Card>
      <IntegrationCatalog />
    </div>
  );
}
