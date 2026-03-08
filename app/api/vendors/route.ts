import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const body = await request.json();

  const vendor = await prisma.vendor.create({
    data: {
      organizationId: body.organizationId,
      name: body.name,
      serviceType: body.serviceType,
      riskLevel: body.riskLevel,
      questionnaireStatus: body.questionnaireStatus,
      complianceStatus: body.complianceStatus,
      riskScore: body.riskScore
    }
  });

  return NextResponse.json(vendor, { status: 201 });
}
