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
