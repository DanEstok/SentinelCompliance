import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generatePolicy } from "@/lib/ai";

export async function POST(request: Request) {
  const body = await request.json();
  const content = await generatePolicy(body.policyType, body.organizationName);

  const policy = await prisma.policy.create({
    data: {
      organizationId: body.organizationId,
      title: body.policyType,
      content,
      status: "draft"
    }
  });

  return NextResponse.json(policy, { status: 201 });
}
