import { Card } from "./ui/card";

const frameworks = [
  { name: "SOC2", progress: 80 },
  { name: "HIPAA", progress: 65 },
  { name: "PCI DSS", progress: 52 },
  { name: "ISO 27001", progress: 58 },
  { name: "GDPR", progress: 73 },
  { name: "NIST", progress: 61 }
];

export function FrameworkProgress() {
  return (
    <Card>
      <h3 className="mb-4 text-lg font-semibold">Framework Progress</h3>
      <div className="space-y-4">
        {frameworks.map((framework) => (
          <div key={framework.name}>
            <div className="mb-1 flex justify-between text-sm">
              <span>{framework.name}</span>
              <span>{framework.progress}%</span>
            </div>
            <div className="h-2 rounded bg-slate-800">
              <div className="h-2 rounded bg-blue-500" style={{ width: `${framework.progress}%` }} />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
