import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const organizationId = new URL(request.url).searchParams.get("organizationId") ?? "";

  const [controlImplementations, controls, evidence, policies, risks] = await Promise.all([
    prisma.controlImplementation.findMany({ where: { organizationId } }),
    prisma.control.findMany({ select: { id: true, code: true, title: true } }),
    prisma.evidence.findMany({ where: { organizationId }, select: { controlId: true } }),
    prisma.policy.findMany({ where: { organizationId } }),
    prisma.risk.findMany({ where: { organizationId } })
  ]);

  const implementedControlIds = new Set(controlImplementations.filter((c) => c.status !== "not_started").map((c) => c.controlId));
  const evidenceControlIds = new Set(evidence.map((e) => e.controlId));
  const missingControls = controls.filter((c) => !implementedControlIds.has(c.id)).slice(0, 20);
  const missingEvidence = controls.filter((c) => implementedControlIds.has(c.id) && !evidenceControlIds.has(c.id)).slice(0, 20);
  const incompletePolicies = policies.filter((p) => p.status !== "approved");
  const highRiskFindings = risks.filter((r) => r.severity >= 12);

  const recommendations = [
    "Prioritize implementation of missing controls with owners and due dates.",
    "Collect fresh evidence for implemented controls lacking artifacts.",
    "Finalize and approve draft policies before audit fieldwork.",
    "Mitigate high-risk findings with tracked remediation and verification."
  ];

  return NextResponse.json({
    missingControls,
    missingEvidence,
    incompletePolicies,
    highRiskFindings,
    recommendations
  });
}
