import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const organizationId = new URL(request.url).searchParams.get("organizationId") ?? "";

  const [controlsTotal, controlsImplemented, risksOpen, evidenceCount, alertsOpen, automatedControls] = await Promise.all([
    prisma.controlImplementation.count({ where: { organizationId } }),
    prisma.controlImplementation.count({ where: { organizationId, status: { in: ["implemented", "verified"] } } }),
    prisma.risk.count({ where: { organizationId } }),
    prisma.evidence.count({ where: { organizationId } }),
    prisma.notification.count({ where: { organizationId, status: "unread" } }),
    prisma.controlImplementation.count({ where: { organizationId, automationStatus: "fully_automated" } })
  ]);

  const complianceScore = controlsTotal ? Math.round((controlsImplemented / controlsTotal) * 100) : 0;
  const automationCoverage = controlsTotal ? Math.round((automatedControls / controlsTotal) * 100) : 0;
  const auditReadinessScore = Math.max(0, complianceScore - Math.min(risksOpen * 2, 30));

  return NextResponse.json({
    complianceScore,
    controlsCompleted: controlsImplemented,
    controlsRemaining: Math.max(controlsTotal - controlsImplemented, 0),
    riskScore: risksOpen,
    auditReadinessScore,
    evidenceCount,
    automationCoverage,
    alertsOpen
  });
}
