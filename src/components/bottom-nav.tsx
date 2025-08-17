"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

const items = [
  { href: "/home", label: "Home" },
  { href: "/agenda", label: "Agenda" },
  { href: "/about", label: "About" },
  { href: "/discuss", label: "Discuss" },
]

export function BottomNav() {
  const pathname = usePathname()
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t bg-white/90 backdrop-blur dark:bg-black/50 md:hidden">
      <div className="mx-auto grid max-w-md grid-cols-4">
        {items.map((item) => {
          const active = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-3 text-center text-xs ${active ? "font-semibold" : "text-gray-600"}`}
            >
              {item.label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}


