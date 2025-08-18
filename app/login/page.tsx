"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Section from "@/components/Section";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/home";
  const [loading, setLoading] = useState(false);
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
        router.push(redirect as any);
      }
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[100dvh] flex items-center justify-center">
      <div className="w-full max-w-sm">
        <div className="space-y-3">
          <input
            type="email"
            className="w-full rounded-2xl border border-base-border bg-base-bg p-3 text-sm"
            placeholder="email@dudester.xyz"
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
            onClick={handleDevLogin}
            disabled={loading}
            className="btn btn-primary w-full"
          >
            {loading ? "Entering…" : "Enter"}
          </button>
        </div>
      </div>
    </div>
  );
}