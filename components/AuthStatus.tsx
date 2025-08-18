"use client";
import { useEffect, useState } from "react";
import LogoutButton from "@/components/LogoutButton";
import { getEmailFromSession } from "@/src/lib/client-session";

export default function AuthStatus() {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    setEmail(getEmailFromSession());
    const id = setInterval(() => setEmail(getEmailFromSession()), 500);
    return () => clearInterval(id);
  }, []);

  if (!email) return null;
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-base-muted">{email}</span>
      <LogoutButton />
    </div>
  );
}


