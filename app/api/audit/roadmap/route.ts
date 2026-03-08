import { NextResponse } from "next/server";
import { generateComplianceRoadmap } from "@/lib/ai";

export async function POST(request: Request) {
  const body = await request.json();
  const framework = (body.framework as string) ?? "SOC2";
  const context = (body.organizationContext as string) ?? "Growing B2B SaaS";

  const roadmap = await generateComplianceRoadmap(framework, context);

  return NextResponse.json({
    framework,
    roadmap,
    phases: [
      {
        phase: "Foundation",
        estimatedTimeline: "0-30 days",
        requiredPolicies: ["Information Security Policy", "Access Control Policy"],
        controls: ["User provisioning", "MFA enforcement"],
        evidenceRequirements: ["User access list", "MFA configuration export"]
      },
      {
        phase: "Implementation",
        estimatedTimeline: "30-90 days",
        requiredPolicies: ["Incident Response Policy", "Data Retention Policy"],
        controls: ["Logging and monitoring", "Vulnerability management"],
        evidenceRequirements: ["SIEM reports", "Patch management logs"]
      },
      {
        phase: "Audit Readiness",
        estimatedTimeline: "90-120 days",
        requiredPolicies: ["Vendor Risk Policy", "Business Continuity Policy"],
        controls: ["Control testing", "Evidence recertification"],
        evidenceRequirements: ["Control test records", "Management review notes"]
      }
    ]
  });
}
