import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const body = await request.json();
  const hashed = await bcrypt.hash(body.password, 12);

  const organization = await prisma.organization.create({
    data: {
      name: body.organizationName,
      plan: "starter",
      users: {
        create: {
          email: body.email,
          passwordHash: hashed,
          role: "admin"
        }
      }
    }
  });

  return NextResponse.json({ organizationId: organization.id }, { status: 201 });
}
