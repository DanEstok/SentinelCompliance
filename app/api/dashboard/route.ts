import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const organizationId = new URL(request.url).searchParams.get("organizationId") ?? "";

  const [controlsTotal, controlsImplemented, risksOpen, evidenceCount] = await Promise.all([
    prisma.controlImplementation.count({ where: { organizationId } }),
    prisma.controlImplementation.count({ where: { organizationId, status: { in: ["implemented", "verified"] } } }),
    prisma.risk.count({ where: { organizationId } }),
    prisma.evidence.count({ where: { organizationId } })
  ]);

  const complianceScore = controlsTotal ? Math.round((controlsImplemented / controlsTotal) * 100) : 0;
  const auditReadinessScore = Math.max(0, complianceScore - Math.min(risksOpen * 2, 30));

  return NextResponse.json({
    complianceScore,
    controlsCompleted: controlsImplemented,
    controlsRemaining: Math.max(controlsTotal - controlsImplemented, 0),
    riskScore: risksOpen,
    auditReadinessScore,
    evidenceCount
  });
}
