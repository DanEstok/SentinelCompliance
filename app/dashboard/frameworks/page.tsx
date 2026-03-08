import { Card } from "@/components/ui/card";

const controls = [
  { id: "CC1.1", status: "implemented" },
  { id: "CC2.3", status: "in_progress" },
  { id: "CC7.2", status: "not_started" },
  { id: "CC8.1", status: "verified" }
];

export default function FrameworkManagerPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Compliance Framework Manager</h1>
      <Card>
        <h2 className="mb-3 text-lg font-semibold">SOC2 Controls</h2>
        <ul className="space-y-2 text-sm">
          {controls.map((control) => <li key={control.id}>{control.id} - {control.status}</li>)}
        </ul>
      </Card>
    </div>
  );
}
