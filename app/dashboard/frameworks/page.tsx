import { Card } from "@/components/ui/card";

const controls = [
  {
    id: "CC1.1",
    description: "Access provisioning follows least privilege",
    owner: "Security Lead",
    status: "implemented",
    type: "automated",
    automationStatus: "fully_automated",
    lastVerificationDate: "2026-03-07"
  },
  {
    id: "CC2.3",
    description: "Change management approvals",
    owner: "Engineering Manager",
    status: "in_progress",
    type: "hybrid",
    automationStatus: "partially_automated",
    lastVerificationDate: "2026-03-05"
  },
  {
    id: "CC7.2",
    description: "MFA for administrative accounts",
    owner: "IT Admin",
    status: "not_started",
    type: "manual",
    automationStatus: "not_automated",
    lastVerificationDate: "N/A"
  }
];

export default function FrameworkManagerPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Compliance Framework Manager</h1>
      <Card>
        <h2 className="mb-3 text-lg font-semibold">SOC2 Controls</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="py-2">Control</th>
                <th>Description</th>
                <th>Owner</th>
                <th>Status</th>
                <th>Type</th>
                <th>Automation</th>
                <th>Last Verification</th>
              </tr>
            </thead>
            <tbody>
              {controls.map((control) => (
                <tr key={control.id} className="border-b border-slate-900">
                  <td className="py-3">{control.id}</td>
                  <td>{control.description}</td>
                  <td>{control.owner}</td>
                  <td>{control.status}</td>
                  <td>{control.type}</td>
                  <td>{control.automationStatus}</td>
                  <td>{control.lastVerificationDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
