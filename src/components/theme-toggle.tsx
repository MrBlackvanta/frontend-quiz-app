"use client";

import { MoonIcon, SunIcon } from "@/components/icons";
import { setTheme, useTheme } from "@/hooks/use-theme";

export default function ThemeToggle() {
  const isDark = useTheme() === "dark";

  function toggle(event: React.MouseEvent<HTMLButtonElement>) {
    const next = isDark ? "light" : "dark";
    const { left, top, width, height } =
      event.currentTarget.getBoundingClientRect();
    const root = document.documentElement;

    root.style.setProperty(
      "--theme-origin-x",
      `${event.clientX || left + width / 2}px`,
    );
    root.style.setProperty(
      "--theme-origin-y",
      `${event.clientY || top + height / 2}px`,
    );

    if (!document.startViewTransition) return setTheme(next);
    document.startViewTransition(() => setTheme(next)).ready.catch(() => {});
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
