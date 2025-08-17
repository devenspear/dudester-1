"use client"
import Link from "next/link"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function Header() {
  const { theme, setTheme } = useTheme()
  const nextTheme = theme === "dark" ? "light" : "dark"
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-black/50">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="text-sm tracking-wider">
          Dudester
        </Link>
        <nav className="flex items-center gap-3">
          <Link href="/home" className="text-sm hover:underline">Home</Link>
          <Link href="/agenda" className="text-sm hover:underline">Agenda</Link>
          <Link href="/about" className="text-sm hover:underline">About</Link>
          <Link href="/organization" className="text-sm hover:underline">Org</Link>
          <Link href="/discuss" className="text-sm hover:underline">Discuss</Link>
          <Button variant="outline" size="sm" onClick={() => setTheme(nextTheme)}>
            {theme === "dark" ? "Light" : "Dark"}
          </Button>
        </nav>
      </div>
    </header>
  )
}


