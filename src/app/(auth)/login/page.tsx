"use client"
import { useState } from "react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await fetch("/api/auth/login", { method: "POST" })
      window.location.href = "/home"
    } finally {
      setSubmitting(false)
    }
  }
  return (
    <div>
      <Header />
      <main className="mx-auto max-w-sm px-6 py-10">
        <h1 className="text-2xl font-semibold">Login</h1>
        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          <input
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border px-3 py-2"
          />
          <input
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border px-3 py-2"
          />
          <Button disabled={submitting} className="w-full" type="submit">Sign in</Button>
        </form>
      </main>
    </div>
  )
}


