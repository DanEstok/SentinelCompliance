import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const organizationId = params.get("organizationId") ?? "";
  const role = params.get("role") ?? "viewer";

  if (role !== "auditor" && role !== "admin") {
    return NextResponse.json({ error: "Read-only auditor access required" }, { status: 403 });
  }

  const [policies, evidence, risks, reports] = await Promise.all([
    prisma.policy.findMany({ where: { organizationId }, orderBy: { updatedAt: "desc" } }),
    prisma.evidence.findMany({ where: { organizationId }, orderBy: { createdAt: "desc" }, take: 100 }),
    prisma.risk.findMany({ where: { organizationId }, orderBy: { severity: "desc" }, take: 100 }),
    prisma.auditReport.findMany({ where: { organizationId }, orderBy: { createdAt: "desc" } })
  ]);

  return NextResponse.json({
    access: "read_only",
    policies,
    evidence,
    riskAssessments: risks,
    complianceReports: reports
  });
}
