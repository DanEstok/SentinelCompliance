import { NextResponse } from "next/server";
import { answerComplianceQuestion } from "@/lib/ai";

export async function POST(request: Request) {
  const body = await request.json();
  const answer = await answerComplianceQuestion(body.question);
  return NextResponse.json({ answer });
}
