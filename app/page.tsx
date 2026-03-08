import Link from "next/link";
import { Card } from "@/components/ui/card";

const frameworks = ["SOC2", "HIPAA", "PCI-DSS", "ISO27001", "GDPR", "NIST"];
const features = ["AI Policy Generation", "Risk Assessments", "Evidence Vault", "Vendor Risk", "Audit Readiness Dashboard", "AI Compliance Advisor"];

export default function LandingPage() {
  return (
    <div className="space-y-12">
      <section className="rounded-xl border border-slate-800 bg-gradient-to-r from-blue-900/30 to-slate-900 p-10">
        <h1 className="text-4xl font-bold">Automate Compliance with SentinelCompliance AI</h1>
        <p className="mt-4 max-w-2xl text-slate-300">A multi-tenant B2B SaaS platform for SOC2, HIPAA, PCI-DSS, ISO27001, GDPR, and NIST readiness.</p>
        <div className="mt-6 flex gap-3">
          <Link href="/(auth)/register" className="rounded-md bg-blue-600 px-5 py-2">Start Free</Link>
          <Link href="/dashboard" className="rounded-md border border-slate-700 px-5 py-2">View Demo Dashboard</Link>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold">Supported Frameworks</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {frameworks.map((framework) => <Card key={framework}>{framework}</Card>)}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold">Platform Features</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {features.map((feature) => <Card key={feature}>{feature}</Card>)}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold">Pricing</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <Card><h3 className="font-semibold">Starter</h3><p className="text-sm text-slate-300">Basic compliance tracking</p></Card>
          <Card><h3 className="font-semibold">Growth</h3><p className="text-sm text-slate-300">AI policy generation + risk assessments</p></Card>
          <Card><h3 className="font-semibold">Enterprise</h3><p className="text-sm text-slate-300">Vendor risk, advanced reporting, API access</p></Card>
        </div>
      </section>
    </div>
  );
}
