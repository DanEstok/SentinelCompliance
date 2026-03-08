import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const body = await request.json();
  const severity = body.impactScore * body.likelihoodScore;

  const risk = await prisma.risk.create({
    data: {
      organizationId: body.organizationId,
      title: body.title,
      description: body.description,
      impactScore: body.impactScore,
      likelihoodScore: body.likelihoodScore,
      severity,
      mitigation: body.mitigation
    }
  });

  return NextResponse.json(risk, { status: 201 });
}
