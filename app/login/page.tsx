"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Section from "@/components/Section";
import { Card } from "@/components/Card";

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
      const res = await fetch("/api/dev-login", {
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
    <Section title="Login" kicker="Members Only">
      <div className="max-w-md mx-auto">
        <Card title="Development Access">
          <p className="text-sm text-base-muted mb-4">
            Use the shared dev password to sign in with one of the four founder emails.
          </p>
          <div className="space-y-2 mb-3">
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
          </div>
          <button
            onClick={handleDevLogin}
            disabled={loading}
            className="btn btn-primary w-full"
          >
            {loading ? "Logging in..." : "Dev Login"}
          </button>
          <p className="text-xs text-base-muted mt-4">
            Note: Real auth (Lucia + Prisma) ships next. This route is dev-only.
          </p>
        </Card>
      </div>
    </Section>
  );
}