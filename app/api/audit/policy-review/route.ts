import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { reviewPolicyDocument } from "@/lib/ai";

export async function POST(request: Request) {
  const body = await request.json();
  const policy = await prisma.policy.findUnique({ where: { id: body.policyId } });

  if (!policy || policy.organizationId !== body.organizationId) {
    return NextResponse.json({ error: "Policy not found" }, { status: 404 });
  }

  const review = await reviewPolicyDocument(policy.title, policy.content);

  return NextResponse.json({
    policyId: policy.id,
    title: policy.title,
    currentStatus: policy.status,
    review,
    suggestions: [
      "Add explicit incident communication timelines.",
      "Update policy references to include latest framework clauses.",
      "Strengthen access review frequency language."
    ]
  });
}
