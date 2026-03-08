# SentinelCompliance AI

Multi-tenant compliance automation SaaS built with Next.js, TypeScript, TailwindCSS, NextAuth, Prisma, and PostgreSQL.

## Included capabilities
- Organization-level tenancy and role-based access control (admin, compliance manager, auditor, viewer)
- Compliance frameworks and control implementation tracking (SOC2, HIPAA, PCI-DSS, ISO27001, GDPR, NIST)
- AI policy generation and AI compliance advisor endpoints
- Risk assessments with severity scoring and matrix UI
- Evidence collection metadata and secure storage integration point
- Vendor risk management
- Compliance dashboards and audit readiness metrics
- SaaS plan segmentation: Starter, Growth, Enterprise
- Integration points for Google Workspace, Microsoft 365, Slack, Jira, and GitHub

## Quick start
1. Install dependencies: `npm install`
2. Create `.env` with `DATABASE_URL`, `NEXTAUTH_SECRET`, OAuth keys, and `OPENAI_API_KEY`
3. Generate Prisma client: `npm run prisma:generate`
4. Run migrations: `npm run prisma:migrate`
5. Start app: `npm run dev`

## Security notes
- Store evidence files in encrypted object storage and persist only storage keys in the DB.
- Enforce organization-scoped query filters on every request.
- Use audit logs for privileged actions.
