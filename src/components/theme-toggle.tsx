"use client";

import { MoonIcon, SunIcon } from "@/components/icons";
import { setTheme, useTheme } from "@/hooks/use-theme";
import { withThemeSweep } from "@/lib/view-transition";

export default function ThemeToggle() {
  const isDark = useTheme() === "dark";

  function toggle(event: React.MouseEvent<HTMLButtonElement>) {
    const { left, top, width, height } =
      event.currentTarget.getBoundingClientRect();
    const origin = { x: left + width / 2, y: top + height / 2 };

    withThemeSweep(() => setTheme(isDark ? "light" : "dark"), origin, !isDark);
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label="Dark mode"
      onClick={toggle}
      className="flex items-center gap-2 py-1.5 text-toggle-icon md:gap-4"
    >
      <SunIcon className="size-4 md:size-6" />
      <span className="flex h-5 w-8 items-center rounded-full bg-accent p-1 md:h-7 md:w-12">
        <span className="size-3 rounded-full bg-white transition-transform motion-reduce:transition-none md:size-5 dark:translate-x-3 dark:md:translate-x-5" />
      </span>
      <MoonIcon className="size-4 md:size-6" />
    </button>
  );
}
