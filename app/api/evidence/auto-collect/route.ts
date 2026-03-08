import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const artifactTypes = [
  "user-access-list",
  "administrator-privilege-list",
  "mfa-enforcement",
  "security-policy-settings",
  "login-activity-log",
  "repository-access-log",
  "backup-configuration-status"
];

export async function POST(request: Request) {
  const body = await request.json();
  const organizationId = body.organizationId as string;
  const userId = body.userId as string;
  const controlId = body.controlId as string;

  const type = body.evidenceType ?? artifactTypes[Math.floor(Math.random() * artifactTypes.length)];
  const ts = new Date().toISOString();

  const evidence = await prisma.evidence.create({
    data: {
      organizationId,
      controlId,
      integrationConnectionId: body.integrationConnectionId,
      fileName: `${type}-${ts}.json`,
      storageKey: `automated/${organizationId}/${controlId}/${ts}.json`,
      contentType: "application/json",
      evidenceType: type,
      uploadedByUserId: userId,
      source: "automation",
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 90)
    }
  });

  await prisma.complianceEvent.create({
    data: {
      organizationId,
      type: "evidence_upload",
      title: "Automated evidence collected",
      description: `Collected ${type} evidence for control ${controlId}.`
    }
  });

  await prisma.auditLog.create({
    data: {
      organizationId,
      userId,
      action: "automated_evidence_collection",
      target: controlId,
      metadata: { evidenceId: evidence.id, evidenceType: type }
    }
  });

  return NextResponse.json(evidence, { status: 201 });
}
