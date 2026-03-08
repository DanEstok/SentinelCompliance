# SentinelCompliance AI

Multi-tenant compliance automation SaaS built with Next.js, TypeScript, TailwindCSS, NextAuth, Prisma, and PostgreSQL.

## Included capabilities
- Organization-level tenancy and role-based access control (admin, compliance manager, auditor, viewer)
- Compliance frameworks and control implementation tracking (SOC2, HIPAA, PCI-DSS, ISO27001, GDPR, NIST)
- Continuous compliance monitoring engine with scheduled daily/weekly checks
- Manual, automated, and hybrid control types with automation status and last verification date
- AI policy generation and AI compliance advisor endpoints
- Risk assessments with severity scoring and matrix UI
- Automated evidence collection via integrations (Google Workspace, Microsoft 365, AWS, Azure, GitHub, Slack, Okta)
- Evidence mapping to controls and sync scheduling (daily/weekly/monthly)
- Compliance alerts with dashboard/email/Slack channels
- Compliance event timeline for control verifications, policy updates, risks, and evidence history
- Compliance score engine using completion rate, risk severity, evidence availability, and automation coverage
- AI Audit Preparation suite: readiness analyzer, gap analysis, policy review, roadmap generation, and auditor report exports
- Auditor read-only portal for evidence, policy, risk, and compliance report review
- Vendor risk management
- SaaS plan segmentation: Starter, Growth, Enterprise

## Quick start
1. Install dependencies: `npm install`
2. Create `.env` with `DATABASE_URL`, `NEXTAUTH_SECRET`, OAuth keys, and `OPENAI_API_KEY`
3. Generate Prisma client: `npm run prisma:generate`
4. Run migrations: `npm run prisma:migrate`
5. Start app: `npm run dev`

## New API endpoints
- `POST /api/monitoring/run` — execute a scheduled compliance check run
- `GET /api/compliance-score` — calculate organization compliance readiness score
- `GET /api/compliance-timeline` — fetch timeline events
- `GET /api/notifications` — fetch dashboard/email/Slack alerts
- `POST /api/evidence/auto-collect` — auto-collect evidence linked to controls
- `GET /api/integrations` — list integration connections and mappings
- `POST /api/integrations` — connect/update integration with OAuth/API credentials
- `POST /api/integrations/:integrationId/sync` — run evidence sync job and create audit log
- `GET /api/evidence/dashboard` — evidence dashboard summary (latest, missing, expiration, controls needing refresh)
- `GET /api/audit/readiness` — AI audit readiness analysis and score
- `GET /api/audit/gap-analysis` — structured gap report and remediation suggestions
- `POST /api/audit/reports` — generate auditor reports (PDF/Word export response)
- `GET /api/audit/reports` — list generated compliance reports
- `POST /api/audit/policy-review` — AI review of policy weaknesses and improvements
- `POST /api/audit/roadmap` — AI-generated compliance implementation roadmap
- `GET /api/auditor/portal` — read-only auditor access dataset

## Security notes
- Store evidence files in encrypted object storage and persist only storage keys in the DB.
- Enforce organization-scoped query filters on every request.
- Use audit logs for privileged actions including integration sync jobs.
