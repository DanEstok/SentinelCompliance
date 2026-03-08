import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const body = await request.json();

  const evidence = await prisma.evidence.create({
    data: {
      organizationId: body.organizationId,
      controlId: body.controlId,
      fileName: body.fileName,
      storageKey: body.storageKey,
      contentType: body.contentType,
      uploadedByUserId: body.userId
    }
  });

  return NextResponse.json(evidence, { status: 201 });
}
