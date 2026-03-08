export const providers = [
  "google_workspace",
  "microsoft_365",
  "aws",
  "azure",
  "github",
  "slack",
  "okta"
] as const;

export const evidenceCatalog: Record<string, string[]> = {
  google_workspace: ["user-access-list", "mfa-enforcement", "login-activity-log"],
  microsoft_365: ["user-access-list", "administrator-privileges", "security-policy-settings"],
  aws: ["administrator-privileges", "backup-configuration-status", "encryption-settings"],
  azure: ["user-access-list", "mfa-enforcement", "security-policy-settings"],
  github: ["repository-access-log", "administrator-privileges", "login-activity-log"],
  slack: ["user-access-list", "login-activity-log"],
  okta: ["user-access-list", "mfa-enforcement", "administrator-privileges"]
};
