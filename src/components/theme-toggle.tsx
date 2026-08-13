"use client";

import { MoonIcon, SunIcon } from "@/components/icons";
import { setTheme, useTheme } from "@/hooks/use-theme";

export default function ThemeToggle() {
  const isDark = useTheme() === "dark";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label="Dark mode"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="text-toggle-icon flex items-center gap-2 py-1.5 md:gap-4"
    >
      <SunIcon className="size-4 md:size-6" />
      <span className="bg-accent flex h-5 w-8 items-center rounded-full p-1 md:h-7 md:w-12">
        <span className="dark:translate-x-3 dark:md:translate-x-5 size-3 rounded-full bg-white transition-transform md:size-5 motion-reduce:transition-none" />
      </span>
      <MoonIcon className="size-4 md:size-6" />
    </button>
  );
}
