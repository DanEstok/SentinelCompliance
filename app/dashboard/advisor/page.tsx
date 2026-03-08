import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function AdvisorPage() {
  return (
    <Card>
      <h1 className="text-2xl font-semibold">AI Compliance Advisor</h1>
      <p className="mt-2 text-sm text-slate-300">Ask questions, get control recommendations, and receive remediation guidance.</p>
      <Input className="mt-4" placeholder="Ask a compliance question..." />
    </Card>
  );
}
