import { DashboardMetrics } from "@/components/dashboard-metrics";
import { FrameworkProgress } from "@/components/framework-progress";
import { RiskMatrix } from "@/components/risk-matrix";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Organization Dashboard</h1>
      <DashboardMetrics />
      <div className="grid gap-6 lg:grid-cols-2">
        <FrameworkProgress />
        <RiskMatrix />
      </div>
    </div>
  );
}
