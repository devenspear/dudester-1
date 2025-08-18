import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import dynamic from "next/dynamic";
const AuthStatus = dynamic(() => import("@/components/AuthStatus"), { ssr: false });
import { useState } from "react";
import { site } from "@/lib/site";
import { headers } from "next/headers";

function NavItem({ href, label }: { href: string; label: string }) {
  const current = headers().get("x-pathname") || "";
  const active = current === href;
  return (
    <Link
      href={href as any}
      className={`text-sm rounded-xl px-3 py-1 transition ${
        active ? "bg-base-border/60" : "hover:bg-base-border/40"
      }`}
    >
      {label}
    </Link>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 glass">
      <div className="container-max flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="sr-only">Home</span>
          <AuthStatus />
        </Link>
        <nav className="hidden md:flex items-center gap-2">
          {site.nav.map((n) => (
            <NavItem key={n.href} href={n.href} label={n.label} />
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button className="md:hidden btn" aria-label="Open navigation" onClick={() => setOpen(v=>!v)}>
            ☰
          </button>
          <ThemeToggle />
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-base-border bg-base-card">
          <div className="container-max py-2 flex flex-wrap gap-2">
            {site.nav.map((n) => (
              <Link key={n.href} href={n.href as any} className="text-sm rounded-xl px-3 py-1 hover:bg-base-border/40">
                {n.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}


