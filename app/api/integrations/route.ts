import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { evidenceCatalog, providers } from "@/lib/integrations";

export async function GET(request: Request) {
  const organizationId = new URL(request.url).searchParams.get("organizationId") ?? "";
  const integrations = await prisma.integrationConnection.findMany({
    where: { organizationId },
    include: { mappings: true },
    orderBy: { createdAt: "desc" }
  });

  return NextResponse.json(integrations);
}

export async function POST(request: Request) {
  const body = await request.json();
  const providerInput = body.provider as string;

  if (!providers.includes(providerInput as (typeof providers)[number])) {
    return NextResponse.json({ error: "Unsupported integration provider" }, { status: 400 });
  }

  const provider = providerInput as (typeof providers)[number];

  const integration = await prisma.integrationConnection.upsert({
    where: {
      organizationId_provider: {
        organizationId: body.organizationId,
        provider
      }
    },
    update: {
      displayName: body.displayName ?? provider,
      syncFrequency: body.syncFrequency ?? "weekly",
      status: "connected"
    },
    create: {
      organizationId: body.organizationId,
      provider,
      displayName: body.displayName ?? provider,
      syncFrequency: body.syncFrequency ?? "weekly",
      status: "connected"
    }
  });

  if (body.oauthAccessToken) {
    await prisma.integrationCredential.upsert({
      where: { integrationId_key: { integrationId: integration.id, key: "oauth_access_token" } },
      update: { valueEncrypted: body.oauthAccessToken },
      create: { integrationId: integration.id, key: "oauth_access_token", valueEncrypted: body.oauthAccessToken }
    });
  }

  if (body.apiKey) {
    await prisma.integrationCredential.upsert({
      where: { integrationId_key: { integrationId: integration.id, key: "api_key" } },
      update: { valueEncrypted: body.apiKey },
      create: { integrationId: integration.id, key: "api_key", valueEncrypted: body.apiKey }
    });
  }

  const existingMappings = await prisma.evidenceControlMapping.count({ where: { integrationId: integration.id } });
  if (!existingMappings) {
    const controls = await prisma.control.findMany({ take: 3, orderBy: { code: "asc" } });
    const types = evidenceCatalog[provider] ?? [];
    const mappingRows = controls.flatMap((control, index) => {
      const evidenceType = types[index % Math.max(types.length, 1)] ?? "user-access-list";
      return {
        organizationId: body.organizationId,
        integrationId: integration.id,
        controlId: control.id,
        evidenceType
      };
    });

    if (mappingRows.length) {
      await prisma.evidenceControlMapping.createMany({ data: mappingRows, skipDuplicates: true });
    }
  }

  return NextResponse.json(integration, { status: 201 });
}
