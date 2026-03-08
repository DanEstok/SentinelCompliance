import { InputHTMLAttributes } from "react";

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm" {...props} />;
}
