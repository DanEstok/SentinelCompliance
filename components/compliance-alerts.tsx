import { Card } from "./ui/card";

const alerts = [
  { title: "MFA disabled for privileged user", channel: "Dashboard / Email / Slack", severity: "High" },
  { title: "Password policy drift detected", channel: "Dashboard", severity: "Medium" },
  { title: "Backup verification pending", channel: "Dashboard / Slack", severity: "Medium" }
];

export function ComplianceAlerts() {
  return (
    <Card>
      <h3 className="mb-4 text-lg font-semibold">Compliance Alerts</h3>
      <ul className="space-y-3 text-sm">
        {alerts.map((alert) => (
          <li key={alert.title} className="rounded-md border border-slate-800 p-3">
            <p className="font-medium">{alert.title}</p>
            <p className="text-slate-400">Channel: {alert.channel}</p>
            <p className="text-amber-300">Severity: {alert.severity}</p>
          </li>
        ))}
      </ul>
    </Card>
  );
}
