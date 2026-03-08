import { Card } from "@/components/ui/card";

export default function BillingPage() {
  return (
    <Card>
      <h1 className="text-2xl font-semibold">SaaS Billing & Plans</h1>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-300">
        <li>Starter: basic compliance tracking</li>
        <li>Growth: AI policy generation + risk assessment tools</li>
        <li>Enterprise: vendor risk, advanced reporting, API access</li>
      </ul>
    </Card>
  );
}
