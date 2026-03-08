import { Card } from "./ui/card";

export function PolicyReviewPanel() {
  return (
    <Card>
      <h2 className="text-xl font-semibold">AI Policy Review</h2>
      <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-300">
        <li>Detects missing security sections</li>
        <li>Flags outdated policy language</li>
        <li>Highlights framework misalignment</li>
        <li>Provides targeted improvement recommendations</li>
      </ul>
    </Card>
  );
}
