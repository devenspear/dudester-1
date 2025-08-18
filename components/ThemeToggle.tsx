"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  const next = theme === "dark" ? "light" : "dark";
  return (
    <button aria-label="Toggle theme" onClick={() => setTheme(next)} className="btn" title="Toggle dark mode">
      <span className="text-xs mr-2">Theme</span>
      <span className="inline-flex items-center gap-1 rounded-full border border-base-border px-2 py-1 text-xs">
        <span className={`${theme === "light" ? "font-semibold" : "text-base-muted"}`}>Light</span>
        <span className="text-base-muted">/</span>
        <span className={`${theme === "dark" ? "font-semibold" : "text-base-muted"}`}>Dark</span>
      </span>
    </button>
  );
}


