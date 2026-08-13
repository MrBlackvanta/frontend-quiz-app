"use client";

import type { Quiz } from "@/data";
import { menuState, quizReducer } from "@/lib";
import { useEffect, useReducer } from "react";

export function useQuiz() {
  const [state, dispatch] = useReducer(quizReducer, menuState);

  useEffect(() => {
    const returnToMenu = () => dispatch({ type: "exit" });
    window.addEventListener("popstate", returnToMenu);
    return () => window.removeEventListener("popstate", returnToMenu);
  }, []);

  function start(quiz: Quiz) {
    window.history.pushState(null, "");
    dispatch({ type: "pick", quiz });
  }

  function leave() {
    window.history.back();
  }

  return { state, dispatch, start, leave };
}
