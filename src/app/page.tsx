export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(60%_50%_at_50%_30%,#C9712C1A,transparent)]">
      <section className="pt-24 pb-16 px-6 md:px-8 text-center">
        <h1 className="text-5xl md:text-7xl font-extralight tracking-wide" style={{fontFamily: 'var(--font-space-grotesk)'}}>
          Wisdom-coded. AI-fueled.
        </h1>
        <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
          Four RTP founders vibecoding useful software—and shipping it fast.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <a href="/login" className="inline-flex h-10 items-center rounded-md bg-gray-900 px-6 text-white hover:bg-gray-900/90">
            Login
          </a>
          <a href="/home" className="inline-flex h-10 items-center rounded-md border border-gray-300 px-6 hover:bg-gray-50">
            Explore
          </a>
        </div>
      </section>
    </main>
  )
}