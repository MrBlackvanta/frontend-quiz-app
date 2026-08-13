import type { Quiz } from "@/data";

export type QuizState =
  | { screen: "menu" }
  | {
      screen: "question";
      quiz: Quiz;
      index: number;
      selected: string | null;
      revealed: boolean;
      score: number;
      missingAnswer: boolean;
    }
  | { screen: "score"; quiz: Quiz; score: number };

export type QuestionState = Extract<QuizState, { screen: "question" }>;

export type QuizAction =
  | { type: "pick"; quiz: Quiz }
  | { type: "select"; option: string }
  | { type: "submit" }
  | { type: "next" }
  | { type: "exit" };

export const menuState: QuizState = { screen: "menu" };

export function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case "pick":
      return {
        screen: "question",
        quiz: action.quiz,
        index: 0,
        selected: null,
        revealed: false,
        score: 0,
        missingAnswer: false,
      };

    case "exit":
      return menuState;

    case "select":
      if (state.screen !== "question" || state.revealed) return state;
      return { ...state, selected: action.option, missingAnswer: false };

    case "submit": {
      if (state.screen !== "question" || state.revealed) return state;
      if (state.selected === null) return { ...state, missingAnswer: true };

      const { answer } = state.quiz.questions[state.index];
      return {
        ...state,
        revealed: true,
        score: state.score + (state.selected === answer ? 1 : 0),
      };
    }

    case "next": {
      if (state.screen !== "question" || !state.revealed) return state;
      if (state.index === state.quiz.questions.length - 1) {
        return { screen: "score", quiz: state.quiz, score: state.score };
      }
      return {
        ...state,
        index: state.index + 1,
        selected: null,
        revealed: false,
      };
    }
  }
}
