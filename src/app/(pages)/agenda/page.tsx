import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { agendaContent } from "@/content/agenda"

export default function AgendaPage() {
  return (
    <div className="pb-16">
      <Header />
      <main className="mx-auto max-w-3xl px-6 py-8">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {agendaContent.hex.map((h) => (
            <div key={h} className="rounded-md border px-3 py-2 text-center text-sm">{h}</div>
          ))}
        </div>
        <div className="mt-8 space-y-6">
          {agendaContent.days.map((d) => (
            <div key={d.day}>
              <h2 className="text-xl font-semibold">{d.day}</h2>
              <ul className="ml-5 list-disc text-gray-700 dark:text-gray-300">
                {d.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </main>
      <BottomNav />
    </div>
  )
}


