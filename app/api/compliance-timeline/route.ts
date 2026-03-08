import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const organizationId = new URL(request.url).searchParams.get("organizationId") ?? "";
  const events = await prisma.complianceEvent.findMany({
    where: { organizationId },
    orderBy: { createdAt: "desc" },
    take: 50
  });

  return NextResponse.json(events);
}
