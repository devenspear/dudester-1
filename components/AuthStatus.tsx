"use client";
import { useEffect, useState } from "react";
import LogoutButton from "@/components/LogoutButton";
import { getEmailFromSession } from "@/src/lib/client-session";

export default function AuthStatus() {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    const update = async () => {
      const fromCookie = getEmailFromSession();
      if (active) setEmail(fromCookie);
      try {
        const r = await fetch("/api/auth/me", { cache: "no-store" });
        const d = await r.json();
        if (active && d?.email) setEmail(d.email);
      } catch {}
    };
    update();
    // Poll for a short period after mount to catch immediate login
    const id = setInterval(update, 500);
    setTimeout(() => clearInterval(id), 4000);
    return () => { active = false; clearInterval(id); };
  }, []);

  if (!email) return null;
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-base-muted">{email}</span>
      <LogoutButton />
    </div>
  );
}


