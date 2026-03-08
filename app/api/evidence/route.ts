import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const body = await request.json();

  const evidence = await prisma.evidence.create({
    data: {
      organizationId: body.organizationId,
      controlId: body.controlId,
      integrationConnectionId: body.integrationConnectionId,
      fileName: body.fileName,
      storageKey: body.storageKey,
      contentType: body.contentType,
      evidenceType: body.evidenceType ?? "general",
      uploadedByUserId: body.userId,
      source: "manual",
      expiresAt: body.expiresAt ? new Date(body.expiresAt) : undefined
    }
  });

  await prisma.complianceEvent.create({
    data: {
      organizationId: body.organizationId,
      type: "evidence_upload",
      title: `Evidence uploaded: ${body.fileName}`,
      description: `Evidence attached to control ${body.controlId}.`
    }
  });

  return NextResponse.json(evidence, { status: 201 });
}
