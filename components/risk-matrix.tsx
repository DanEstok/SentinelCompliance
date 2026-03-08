import { Card } from "./ui/card";

const levels = ["Low", "Medium", "High", "Critical"];

export function RiskMatrix() {
  return (
    <Card>
      <h3 className="mb-4 text-lg font-semibold">Risk Matrix</h3>
      <div className="grid grid-cols-4 gap-2 text-center text-xs">
        {levels.map((impact) =>
          levels.map((likelihood) => (
            <div key={`${impact}-${likelihood}`} className="rounded bg-slate-800 p-3">
              {impact}/{likelihood}
            </div>
          ))
        )}
      </div>
    </Card>
  );
}
