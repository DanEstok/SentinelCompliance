import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function PoliciesPage() {
  return (
    <Card>
      <h1 className="text-2xl font-semibold">AI Policy Generator</h1>
      <p className="mt-2 text-sm text-slate-300">Generate, edit, and export acceptable use, access control, incident response, data retention, and information security policies.</p>
      <Button className="mt-4">Generate Policy with AI</Button>
    </Card>
  );
}
