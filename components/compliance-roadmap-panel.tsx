import { Card } from "./ui/card";

export function ComplianceRoadmapPanel() {
  return (
    <Card>
      <h2 className="text-xl font-semibold">Compliance Roadmap Generator</h2>
      <p className="mt-2 text-sm text-slate-300">AI-generated phased roadmap for teams beginning framework implementation.</p>
      <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-300">
        <li>Required policies</li>
        <li>Control implementation milestones</li>
        <li>Evidence requirements</li>
        <li>Estimated timeline by phase</li>
      </ul>
    </Card>
  );
}
