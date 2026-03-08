import { Card } from "./ui/card";

const timeline = [
  { date: "Today", event: "Automated control verification completed" },
  { date: "Today", event: "Access log evidence auto-collected" },
  { date: "Yesterday", event: "Incident response policy updated" },
  { date: "2 days ago", event: "Quarterly risk assessment recorded" }
];

export function ComplianceTimeline() {
  return (
    <Card>
      <h3 className="mb-4 text-lg font-semibold">Compliance Timeline</h3>
      <ol className="space-y-3 border-l border-slate-700 pl-4 text-sm">
        {timeline.map((item) => (
          <li key={item.event}>
            <p className="text-slate-400">{item.date}</p>
            <p>{item.event}</p>
          </li>
        ))}
      </ol>
    </Card>
  );
}
