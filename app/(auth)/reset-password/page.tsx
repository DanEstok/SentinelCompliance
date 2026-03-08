import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ResetPasswordPage() {
  return (
    <form className="mx-auto max-w-md space-y-4 rounded-lg border border-slate-800 bg-slate-900 p-6">
      <h1 className="text-2xl font-semibold">Reset Password</h1>
      <Input type="email" placeholder="Email" />
      <Button type="submit">Send Reset Link</Button>
    </form>
  );
}
