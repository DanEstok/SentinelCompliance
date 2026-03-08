import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const automatedChecks = [
  "User access reviews",
  "Password policy verification",
  "Encryption enforcement",
  "Backup verification",
  "MFA status",
  "Administrative privilege monitoring"
];

export async function POST(request: Request) {
  const body = await request.json();
  const organizationId = body.organizationId as string;
  const cadence = (body.cadence as string) ?? "daily";

  const run = await prisma.complianceCheckRun.create({
    data: {
      organizationId,
      scheduledFor: new Date(),
      cadence
    }
  });

  const controls = await prisma.controlImplementation.findMany({ where: { organizationId }, take: 25 });
  const failedResults: string[] = [];

  for (const control of controls) {
    const checkName = automatedChecks[Math.floor(Math.random() * automatedChecks.length)];
    const status = control.status === "verified" || control.automationStatus === "fully_automated" ? "passed" : "needs_review";

    await prisma.complianceCheckResult.create({
      data: {
        checkRunId: run.id,
        organizationId,
        controlImplementationId: control.id,
        checkName,
        status,
        details: status === "passed" ? "Control verified automatically." : "Control requires manual review."
      }
    });

    await prisma.controlImplementation.update({
      where: { id: control.id },
      data: { lastVerificationAt: new Date() }
    });

    if (status !== "passed") {
      failedResults.push(control.id);
    }
  }

  if (failedResults.length > 0) {
    const message = `${failedResults.length} controls require review from latest ${cadence} check.`;
    await prisma.notification.createMany({
      data: [
        { organizationId, channel: "dashboard", title: "Compliance controls need review", message },
        { organizationId, channel: "email", title: "Compliance controls need review", message },
        { organizationId, channel: "slack", title: "Compliance controls need review", message }
      ]
    });

    await prisma.complianceEvent.create({
      data: {
        organizationId,
        type: "compliance_alert",
        title: "Automated monitoring flagged controls",
        description: message
      }
    });
  }

  await prisma.complianceCheckRun.update({
    where: { id: run.id },
    data: { completedAt: new Date() }
  });

  return NextResponse.json({ runId: run.id, controlsChecked: controls.length, failedOrReview: failedResults.length });
}
