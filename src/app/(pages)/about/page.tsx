import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { founders } from "@/content/about"

export default function AboutPage() {
  return (
    <div className="pb-16">
      <Header />
      <main className="mx-auto max-w-3xl px-6 py-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {founders.map((f) => (
            <div key={f.name} className="rounded-lg border p-4">
              <h3 className="text-lg font-semibold">{f.name}</h3>
              <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">{f.blurb}</p>
            </div>
          ))}
        </div>
      </main>
      <BottomNav />
    </div>
  )
}


