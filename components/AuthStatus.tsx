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
      if (active && fromCookie) setEmail(fromCookie);
      try {
        const r = await fetch("/api/auth/me", { cache: "no-store" });
        const d = await r.json();
        if (active) setEmail(d?.email ?? null);
      } catch {}
    };
    update();
    // Listen for cookie changes after login/logout via storage signal
    const onStorage = (e: StorageEvent) => {
      if (e.key === "auth:changed") update();
    };
    window.addEventListener("storage", onStorage);
    return () => { active = false; window.removeEventListener("storage", onStorage); };
  }, []);

  if (!email) return null;
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-base-muted">{email}</span>
      <LogoutButton />
    </div>
  );
}


