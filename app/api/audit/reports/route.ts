import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const reportTitleMap = {
  soc2_readiness: "SOC2 Readiness Report",
  hipaa_compliance: "HIPAA Compliance Report",
  iso27001_readiness: "ISO27001 Readiness Report"
} as const;

export async function POST(request: Request) {
  const body = await request.json();
  const organizationId = body.organizationId as string;
  const generatedById = body.userId as string;
  const type = body.type as keyof typeof reportTitleMap;
  const format = (body.format as string) ?? "pdf";

  const [controlsImplemented, risks, evidenceCount, policies] = await Promise.all([
    prisma.controlImplementation.count({ where: { organizationId, status: { in: ["implemented", "verified"] } } }),
    prisma.risk.findMany({ where: { organizationId }, orderBy: { severity: "desc" }, take: 10 }),
    prisma.evidence.count({ where: { organizationId } }),
    prisma.policy.findMany({ where: { organizationId }, select: { title: true, status: true } })
  ]);

  const content = [
    `Report: ${reportTitleMap[type] ?? "Compliance Report"}`,
    `Generated: ${new Date().toISOString()}`,
    `Controls Implemented: ${controlsImplemented}`,
    `Evidence References Count: ${evidenceCount}`,
    `Top Risks: ${risks.map((r) => `${r.title} (severity ${r.severity})`).join("; ") || "None"}`,
    `Policy Documentation: ${policies.map((p) => `${p.title}:${p.status}`).join("; ") || "None"}`
  ].join("\n");

  const report = await prisma.auditReport.create({
    data: {
      organizationId,
      generatedById,
      type,
      title: reportTitleMap[type] ?? "Compliance Report",
      format,
      content
    }
  });

  await prisma.complianceEvent.create({
    data: {
      organizationId,
      type: "policy_update",
      title: `Audit report generated: ${report.title}`,
      description: `Generated in ${format.toUpperCase()} format.`
    }
  });

  const mimeType = format.toLowerCase() === "docx"
    ? "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    : "application/pdf";

  return new NextResponse(content, {
    status: 201,
    headers: {
      "content-type": mimeType,
      "content-disposition": `attachment; filename=\"${report.title.replace(/\s+/g, "-").toLowerCase()}.${format.toLowerCase()}\"`
    }
  });
}

export async function GET(request: Request) {
  const organizationId = new URL(request.url).searchParams.get("organizationId") ?? "";
  const reports = await prisma.auditReport.findMany({ where: { organizationId }, orderBy: { createdAt: "desc" } });
  return NextResponse.json(reports);
}
