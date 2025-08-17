import { Header } from "@/components/header"

export default function DiscussPage() {
  return (
    <div>
      <Header />
      <main className="mx-auto max-w-2xl px-6 py-10">
        <h1 className="text-2xl font-semibold">Private Discussion</h1>
        <p className="mt-2 text-gray-700 dark:text-gray-300">Auth required. Discussion UI to be implemented with Prisma + Lucia.</p>
      </main>
    </div>
  )
}


