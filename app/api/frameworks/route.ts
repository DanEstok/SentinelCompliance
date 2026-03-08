import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const organizationId = new URL(request.url).searchParams.get("organizationId");
  const frameworks = await prisma.frameworkSelection.findMany({ where: { organizationId: organizationId ?? "" }, include: { framework: true } });
  return NextResponse.json(frameworks);
}
