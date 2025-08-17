import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { homeContent } from "@/content/home"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="pb-16">
      <Header />
      <main className="mx-auto max-w-3xl px-6 py-8">
        <p className="text-lg text-gray-700 dark:text-gray-300">{homeContent.brandEssence}</p>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {homeContent.pillars.map((p) => (
            <div key={p} className="rounded-lg border p-4 text-center">{p}</div>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          {homeContent.ctas.map((c) => (
            <Link key={c.href} href={c.href} className="rounded-md border px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-900">
              {c.label}
            </Link>
          ))}
        </div>
      </main>
      <BottomNav />
    </div>
  )
}


