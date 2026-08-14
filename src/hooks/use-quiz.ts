"use client";

import type { Quiz } from "@/data";
import { menuState, quizReducer, type QuizAction } from "@/lib";
import { withViewTransition } from "@/lib/view-transition";
import { useEffect, useReducer } from "react";

const staysOnScreen = new Set<QuizAction["type"]>(["select", "submit"]);

export function useQuiz() {
  const [state, dispatch] = useReducer(quizReducer, menuState);

  useEffect(() => {
    const returnToMenu = () =>
      withViewTransition(() => dispatch({ type: "exit" }));
    window.addEventListener("popstate", returnToMenu);
    return () => window.removeEventListener("popstate", returnToMenu);
  }, []);

  function run(action: QuizAction) {
    if (staysOnScreen.has(action.type)) return dispatch(action);
    withViewTransition(() => dispatch(action));
  }

  function start(quiz: Quiz) {
    window.history.pushState(null, "");
    run({ type: "pick", quiz });
  }

  function leave() {
    window.history.back();
  }

  return { state, dispatch: run, start, leave };
}
