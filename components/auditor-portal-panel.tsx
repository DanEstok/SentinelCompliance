import { Card } from "./ui/card";

export function AuditorPortalPanel() {
  return (
    <Card>
      <h2 className="text-xl font-semibold">Auditor Access Portal</h2>
      <p className="mt-2 text-sm text-slate-300">Secure read-only portal for auditors to review compliance artifacts.</p>
      <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-300">
        <li>Policies</li>
        <li>Evidence documents</li>
        <li>Risk assessments</li>
        <li>Compliance reports</li>
      </ul>
    </Card>
  );
}
