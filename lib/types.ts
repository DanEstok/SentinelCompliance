export type UserRole = "admin" | "compliance_manager" | "auditor" | "viewer";

export type FrameworkKey = "SOC2" | "HIPAA" | "PCI_DSS" | "ISO_27001" | "GDPR" | "NIST";

export type PlanKey = "starter" | "growth" | "enterprise";

export type ControlStatus = "not_started" | "in_progress" | "implemented" | "verified";

export type ControlType = "manual" | "automated" | "hybrid";

export type AutomationStatus = "not_automated" | "partially_automated" | "fully_automated";

export type IntegrationProvider = "google_workspace" | "microsoft_365" | "aws" | "azure" | "github" | "slack" | "okta";

export type SyncFrequency = "daily" | "weekly" | "monthly";

export type AuditReportType = "soc2_readiness" | "hipaa_compliance" | "iso27001_readiness";
