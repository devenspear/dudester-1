"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Section from "@/components/Section";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/home";
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleDevLogin = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (res.ok) {
        setError(null);
        router.replace(redirect as any);
      } else {
        const data = await res.json().catch(() => ({} as any));
        setError(data?.error || "Invalid email or password");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[100dvh] flex items-center justify-center">
      <div className="w-full max-w-sm">
        <form onSubmit={(e)=>{e.preventDefault(); if(!loading) handleDevLogin();}} className="space-y-3">
          <input
            type="email"
            className="w-full rounded-2xl border border-base-border bg-base-bg p-3 text-sm"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="w-full rounded-2xl border border-base-border bg-base-bg p-3 text-sm"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            disabled={loading || !email || !password}
            className="btn btn-primary w-full"
          >
            {loading ? "Entering…" : "Enter"}
          </button>
          {error && <p className="text-xs text-red-600 mt-2">{error}</p>}
        </form>
      </div>
    </div>
  );
}