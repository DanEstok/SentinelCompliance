import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function generatePolicy(policyType: string, organizationName: string) {
  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are a compliance policy assistant specialized in SOC2, HIPAA, PCI-DSS, ISO27001, GDPR, and NIST." },
      { role: "user", content: `Generate a ${policyType} for ${organizationName} with structured sections and implementation guidance.` }
    ]
  });

  return completion.choices[0]?.message?.content ?? "";
}

export async function answerComplianceQuestion(question: string) {
  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are SentinelCompliance AI advisor. Give concise and actionable compliance guidance." },
      { role: "user", content: question }
    ]
  });

  return completion.choices[0]?.message?.content ?? "";
}

export async function analyzeAuditReadiness(summary: string) {
  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are an audit readiness analyzer for SOC2, HIPAA, and ISO27001. Return concise JSON-like findings and remediation guidance." },
      { role: "user", content: `Analyze this compliance posture summary and provide audit readiness analysis with gaps and remediation: ${summary}` }
    ]
  });

  return completion.choices[0]?.message?.content ?? "";
}

export async function reviewPolicyDocument(policyTitle: string, policyContent: string) {
  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are an expert policy reviewer. Identify missing sections, outdated language, and framework misalignment." },
      { role: "user", content: `Review policy '${policyTitle}' and provide improvement recommendations:\n${policyContent}` }
    ]
  });

  return completion.choices[0]?.message?.content ?? "";
}

export async function generateComplianceRoadmap(framework: string, organizationContext: string) {
  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are a compliance implementation planner. Provide practical phased roadmap with timeline, policies, controls, and evidence milestones." },
      { role: "user", content: `Create a step-by-step ${framework} roadmap for this organization context: ${organizationContext}` }
    ]
  });

  return completion.choices[0]?.message?.content ?? "";
}
