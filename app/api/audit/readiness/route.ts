import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { analyzeAuditReadiness } from "@/lib/ai";

export async function GET(request: Request) {
  const organizationId = new URL(request.url).searchParams.get("organizationId") ?? "";

  const [controlsTotal, controlsVerified, risks, evidenceCount, policies] = await Promise.all([
    prisma.controlImplementation.count({ where: { organizationId } }),
    prisma.controlImplementation.count({ where: { organizationId, status: "verified" } }),
    prisma.risk.findMany({ where: { organizationId }, select: { severity: true, title: true } }),
    prisma.evidence.count({ where: { organizationId } }),
    prisma.policy.findMany({ where: { organizationId }, select: { id: true, title: true, status: true } })
  ]);

  const highRiskFindings = risks.filter((r) => r.severity >= 12).length;
  const readinessScore = Math.max(
    0,
    Math.round(
      ((controlsTotal ? controlsVerified / controlsTotal : 0) * 0.45 +
        Math.min(evidenceCount / Math.max(controlsTotal, 1), 1) * 0.25 +
        Math.min(policies.length / 5, 1) * 0.2 +
        (1 - Math.min(highRiskFindings / 10, 1)) * 0.1) *
        100
    )
  );

  const summary = `controlsVerified=${controlsVerified}/${controlsTotal}; evidenceCount=${evidenceCount}; policies=${policies.length}; highRiskFindings=${highRiskFindings}`;
  const aiInsights = await analyzeAuditReadiness(summary);

  return NextResponse.json({
    readinessScore,
    highRiskFindings,
    coverage: {
      controlsVerified,
      controlsTotal,
      evidenceCount,
      policiesCount: policies.length
    },
    aiInsights
  });
}
