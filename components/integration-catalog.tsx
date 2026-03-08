import { Card } from "./ui/card";

const integrations = [
  { provider: "Google Workspace", auth: "OAuth 2.0", schedule: "Daily", evidence: "Users, MFA, Login Logs" },
  { provider: "Microsoft 365", auth: "OAuth 2.0", schedule: "Weekly", evidence: "Users, Admin Roles, Security Policies" },
  { provider: "AWS", auth: "API Keys / Role", schedule: "Daily", evidence: "IAM Access, Encryption, Backup Status" },
  { provider: "Azure", auth: "OAuth 2.0 / Service Principal", schedule: "Daily", evidence: "Users, MFA, Policy Settings" },
  { provider: "GitHub", auth: "OAuth / PAT", schedule: "Weekly", evidence: "Repo Access, Team Permissions, Activity Logs" },
  { provider: "Slack", auth: "OAuth 2.0", schedule: "Weekly", evidence: "Workspace Users, Login Activity" },
  { provider: "Okta", auth: "OAuth / API Token", schedule: "Daily", evidence: "Users, Admin Privileges, MFA Enforcement" }
];

export function IntegrationCatalog() {
  return (
    <Card>
      <h2 className="mb-3 text-lg font-semibold">Integration Framework</h2>
      <p className="mb-4 text-sm text-slate-300">Each connector supports OAuth/API credentials, sync scheduling, and evidence mapping to controls.</p>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400">
              <th className="py-2">Provider</th>
              <th>Authentication</th>
              <th>Default Sync</th>
              <th>Evidence Collected</th>
            </tr>
          </thead>
          <tbody>
            {integrations.map((item) => (
              <tr key={item.provider} className="border-b border-slate-900">
                <td className="py-3">{item.provider}</td>
                <td>{item.auth}</td>
                <td>{item.schedule}</td>
                <td>{item.evidence}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
