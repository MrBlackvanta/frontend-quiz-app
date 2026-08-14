import { flushSync } from "react-dom";

type Origin = { x: number; y: number };

const SWEEP_MS = 500;

function canAnimate() {
  return (
    typeof document.startViewTransition === "function" &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function withViewTransition(update: () => void) {
  if (!canAnimate()) {
    update();
    return null;
  }

  const transition = document.startViewTransition(() => flushSync(update));
  transition.ready.catch(noop);
  return transition;
}

export function withThemeSweep(
  update: () => void,
  origin: Origin,
  closing: boolean,
) {
  const root = document.documentElement;
  root.dataset.sweep = closing ? "out" : "in";

  const transition = withViewTransition(update);
  if (!transition) {
    clearSweep();
    return;
  }

  transition.ready.then(() => {
    const radius = Math.hypot(
      Math.max(origin.x, root.clientWidth - origin.x),
      Math.max(origin.y, root.clientHeight - origin.y),
    );
    const closed = `circle(0px at ${origin.x}px ${origin.y}px)`;
    const open = `circle(${radius}px at ${origin.x}px ${origin.y}px)`;

    root.animate(
      { clipPath: closing ? [open, closed] : [closed, open] },
      {
        duration: SWEEP_MS,
        easing: "ease-in-out",
        pseudoElement: closing
          ? "::view-transition-old(root)"
          : "::view-transition-new(root)",
      },
    );
  }, noop);

  transition.finished.then(clearSweep, clearSweep);
}

function clearSweep() {
  delete document.documentElement.dataset.sweep;
}

function noop() {}
