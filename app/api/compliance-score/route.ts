import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const organizationId = new URL(request.url).searchParams.get("organizationId") ?? "";

  const [controlsTotal, controlsDone, riskItems, evidenceCount, automatedControls] = await Promise.all([
    prisma.controlImplementation.count({ where: { organizationId } }),
    prisma.controlImplementation.count({ where: { organizationId, status: { in: ["implemented", "verified"] } } }),
    prisma.risk.findMany({ where: { organizationId }, select: { severity: true } }),
    prisma.evidence.count({ where: { organizationId } }),
    prisma.controlImplementation.count({ where: { organizationId, automationStatus: "fully_automated" } })
  ]);

  const controlCompletionRate = controlsTotal ? controlsDone / controlsTotal : 0;
  const avgRiskSeverity = riskItems.length ? riskItems.reduce((sum, r) => sum + r.severity, 0) / riskItems.length : 0;
  const riskPenalty = Math.min(avgRiskSeverity / 25, 1);
  const evidenceAvailability = controlsTotal ? Math.min(evidenceCount / controlsTotal, 1) : 0;
  const automationCoverage = controlsTotal ? automatedControls / controlsTotal : 0;

  const score = Math.round(
    (controlCompletionRate * 0.4 +
      (1 - riskPenalty) * 0.25 +
      evidenceAvailability * 0.2 +
      automationCoverage * 0.15) *
      100
  );

  return NextResponse.json({
    score,
    factors: {
      controlCompletionRate,
      avgRiskSeverity,
      evidenceAvailability,
      automationCoverage
    }
  });
}
