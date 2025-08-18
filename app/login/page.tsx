"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import Section from "@/components/Section";

export default function LoginPage() {
  const router = useRouter();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
        try { localStorage.setItem("auth:changed", String(Date.now())); } catch {}
        router.replace("/home" as any);
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
    <div className="min-h-[100dvh] flex items-center justify-center bg-white">
      <div className="w-full max-w-sm">
        <div className="rounded-2xl p-[2px] shadow-xl"
          style={{ background: "linear-gradient(90deg,#ff7e3f 0%,#c9712c 40%,#36e2a0 100%)" }}>
          <div className="rounded-2xl p-6 bg-white border border-base-border">
            <h2 className="h2 mb-4 text-center">Sign in</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!loading) handleDevLogin();
              }}
              className="space-y-3"
            >
              <input
                type="email"
                className="w-full rounded-2xl border border-base-border bg-white p-3 text-sm focus:outline-none focus:ring-2 focus:ring-base-accent text-black placeholder:text-neutral-500"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full rounded-2xl border border-base-border bg-white p-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-base-accent text-black placeholder:text-neutral-500"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-base-muted hover:text-base-fg"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <button
                type="submit"
                disabled={loading || !email || !password}
                className="btn btn-accent w-full"
              >
                {loading ? "Entering…" : "Enter"}
              </button>
              {error && <p className="text-xs text-red-600 mt-2">{error}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}