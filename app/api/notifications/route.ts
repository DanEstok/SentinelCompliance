import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const organizationId = new URL(request.url).searchParams.get("organizationId") ?? "";
  const notifications = await prisma.notification.findMany({
    where: { organizationId },
    orderBy: { createdAt: "desc" },
    take: 25
  });

  return NextResponse.json(notifications);
}
