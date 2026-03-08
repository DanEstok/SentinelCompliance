import "./globals.css";
import Link from "next/link";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="border-b border-slate-800 bg-slate-900/80">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <Link href="/" className="text-lg font-semibold">SentinelCompliance AI</Link>
            <nav className="flex gap-4 text-sm text-slate-300">
              <Link href="/dashboard">Dashboard</Link>
              <Link href="/dashboard/audits">Audit Prep</Link>
              <Link href="/dashboard/auditor-portal">Auditor Portal</Link>
              <Link href="/(auth)/login">Login</Link>
              <Link href="/(auth)/register">Get Started</Link>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-7xl px-6 py-8">{children}</main>
      </body>
    </html>
  );
}
