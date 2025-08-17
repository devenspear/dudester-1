import { Header } from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import { organizationContent } from "@/content/organization"

export default function OrganizationPage() {
  return (
    <div className="pb-16">
      <Header />
      <main className="mx-auto max-w-3xl px-6 py-8 space-y-6">
        <section>
          <h2 className="text-xl font-semibold">LLC</h2>
          <p className="text-gray-700 dark:text-gray-300">{organizationContent.llc}</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold">IP Assignment</h2>
          <p className="text-gray-700 dark:text-gray-300">{organizationContent.ip}</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold">Governance</h2>
          <p className="text-gray-700 dark:text-gray-300">{organizationContent.governance}</p>
        </section>
        <section>
          <h2 className="text-xl font-semibold">Privacy</h2>
          <p className="text-gray-700 dark:text-gray-300">{organizationContent.privacy}</p>
        </section>
      </main>
      <BottomNav />
    </div>
  )
}


