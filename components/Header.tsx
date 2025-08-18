import Link from "next/link";
import Brand from "@/components/Brand";
import ThemeToggle from "@/components/ThemeToggle";
import { site } from "@/lib/site";
import { headers } from "next/headers";

function NavItem({ href, label }: { href: string; label: string }) {
  const current = headers().get("x-pathname") || "";
  const active = current === href;
  return (
    <Link
      href={href}
      className={`text-sm rounded-xl px-3 py-1 transition ${
        active ? "bg-base-border/60" : "hover:bg-base-border/40"
      }`}
    >
      {label}
    </Link>
  );
}

export default function Header() {
  return (
    <header className="sticky top-0 z-40 glass">
      <div className="container-max flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Brand />
          <span className="hidden sm:inline text-sm text-base-muted">{site.tagline}</span>
        </Link>
        <nav className="hidden md:flex items-center gap-2">
          {site.nav.map((n) => (
            <NavItem key={n.href} href={n.href} label={n.label} />
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}


