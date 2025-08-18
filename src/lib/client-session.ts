"use client";

export function getSessionTokenFromCookie(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/(?:^|; )session=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : null;
}

export function getEmailFromSession(): string | null {
  try {
    const token = getSessionTokenFromCookie();
    if (!token) return null;
    const parts = token.split(".");
    if (parts.length < 2) return null;
    const json = typeof atob !== "undefined" ? atob(parts[1]) : Buffer.from(parts[1], "base64").toString();
    const payload = JSON.parse(json) as { email?: string };
    return payload.email ?? null;
  } catch {
    return null;
  }
}


