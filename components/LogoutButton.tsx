"use client";

export default function LogoutButton() {
  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {}
    window.location.href = "/login";
  };

  return (
    <button
      onClick={handleLogout}
      className="text-xs rounded-xl px-2 py-1 border border-base-border hover:bg-base-border/40"
      aria-label="Log out"
    >
      Log out
    </button>
  );
}


