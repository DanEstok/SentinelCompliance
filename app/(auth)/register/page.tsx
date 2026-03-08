import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function RegisterPage() {
  return (
    <form className="mx-auto max-w-md space-y-4 rounded-lg border border-slate-800 bg-slate-900 p-6">
      <h1 className="text-2xl font-semibold">Create Account</h1>
      <Input type="text" placeholder="Organization Name" />
      <Input type="email" placeholder="Work Email" />
      <Input type="password" placeholder="Password" />
      <Button type="submit">Create Organization</Button>
    </form>
  );
}
