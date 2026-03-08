import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const organizationId = new URL(request.url).searchParams.get("organizationId") ?? "";

  const [latestEvidence, latestControls, expiringEvidence, totalControls] = await Promise.all([
    prisma.evidence.findMany({
      where: { organizationId },
      orderBy: { createdAt: "desc" },
      take: 10,
      include: { control: true, integrationConnection: true }
    }),
    prisma.evidence.groupBy({
      by: ["controlId"],
      where: { organizationId },
      _max: { createdAt: true }
    }),
    prisma.evidence.findMany({
      where: {
        organizationId,
        expiresAt: {
          lte: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
        }
      },
      take: 20,
      orderBy: { expiresAt: "asc" }
    }),
    prisma.controlImplementation.count({ where: { organizationId } })
  ]);

  const controlsWithEvidence = new Set(latestControls.map((item) => item.controlId)).size;
  const missingEvidenceControls = Math.max(totalControls - controlsWithEvidence, 0);

  return NextResponse.json({
    latestEvidence,
    expiringEvidence,
    controlsWithEvidence,
    missingEvidenceControls,
    controlsRequiringNewEvidence: expiringEvidence.length + missingEvidenceControls
  });
}
