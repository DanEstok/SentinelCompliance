import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

export async function POST(
  request: Request,
  { params }: { params: { integrationId: string } }
) {
  const body = await request.json();
  const { integrationId } = params;

  const integration = await prisma.integrationConnection.findUnique({
    where: { id: integrationId },
    include: { mappings: true }
  });

  if (!integration || integration.organizationId !== body.organizationId) {
    return NextResponse.json({ error: "Integration not found" }, { status: 404 });
  }

  const job = await prisma.evidenceSyncJob.create({
    data: {
      organizationId: integration.organizationId,
      integrationId,
      frequency: body.frequency ?? integration.syncFrequency,
      status: "running",
      details: "Starting scheduled evidence sync"
    }
  });

  const now = new Date();
  for (const mapping of integration.mappings) {
    await prisma.evidence.create({
      data: {
        organizationId: integration.organizationId,
        controlId: mapping.controlId,
        integrationConnectionId: integrationId,
        fileName: `${integration.provider}-${mapping.evidenceType}-${now.toISOString()}.json`,
        storageKey: `integrations/${integration.provider}/${integration.organizationId}/${mapping.controlId}/${now.toISOString()}.json`,
        contentType: "application/json",
        evidenceType: mapping.evidenceType,
        uploadedByUserId: body.userId,
        source: "integration_sync",
        expiresAt: addDays(now, 90)
      }
    });
  }

  await prisma.integrationConnection.update({
    where: { id: integrationId },
    data: { lastSyncedAt: now }
  });

  await prisma.evidenceSyncJob.update({
    where: { id: job.id },
    data: { status: "completed", completedAt: new Date(), details: `Collected ${integration.mappings.length} evidence items` }
  });

  await prisma.auditLog.create({
    data: {
      organizationId: integration.organizationId,
      userId: body.userId,
      action: "integration_evidence_sync",
      target: integration.provider,
      metadata: {
        integrationId,
        frequency: body.frequency ?? integration.syncFrequency,
        collectedItems: integration.mappings.length
      }
    }
  });

  return NextResponse.json({ jobId: job.id, collected: integration.mappings.length });
}
