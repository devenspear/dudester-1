"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";

export default function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 border-t border-base-border bg-base-card/90 backdrop-blur safe">
      <ul className="mx-auto grid max-w-md grid-cols-4 gap-1 p-2">
        {site.nav.filter(n => ["/home","/agenda","/about","/discuss"].includes(n.href)).map(n => (
          <li key={n.href}>
            <Link
              href={n.href}
              className={`block rounded-xl px-2 py-2 text-center text-xs ${pathname===n.href ? "bg-base-border/50" : "hover:bg-base-border/40"}`}
            >
              {n.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}


