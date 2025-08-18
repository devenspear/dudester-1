"use client";
import { useEffect, useState } from "react";
import LogoutButton from "@/components/LogoutButton";
import { getEmailFromSession } from "@/src/lib/client-session";

export default function AuthStatus() {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    const fromCookie = getEmailFromSession();
    if (fromCookie) setEmail(fromCookie);
    // Also confirm via server in case cookie parsing fails
    fetch("/api/auth/me").then(r => r.json()).then(d => { if (active && d?.email) setEmail(d.email); });
    return () => { active = false; };
  }, []);

  if (!email) return null;
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-base-muted">{email}</span>
      <LogoutButton />
    </div>
  );
}


