"use client";
import { getEmailFromSession } from "@/src/lib/client-session";
import { useEffect, useState } from "react";

export default function ClientIdent({ serverEmail }: { serverEmail: string | null }) {
  const [email, setEmail] = useState<string | null>(serverEmail);
  useEffect(() => {
    if (!serverEmail) {
      setEmail(getEmailFromSession());
    }
  }, [serverEmail]);
  if (!email) return null;
  return <span className="text-xs text-base-muted">{email}</span>;
}


