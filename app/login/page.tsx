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

  const handleDevLogin = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/dev-login", {
        method: "POST",
      });
      if (res.ok) {
        router.push(redirect);
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
            Click below to set a development session cookie and access protected pages.
          </p>
          <button
            onClick={handleDevLogin}
            disabled={loading}
            className="btn btn-primary w-full"
          >
            {loading ? "Logging in..." : "Dev Login"}
          </button>
          <p className="text-xs text-base-muted mt-4">
            Note: Production authentication with email/password will be implemented next.
          </p>
        </Card>
      </div>
    </Section>
  );
}