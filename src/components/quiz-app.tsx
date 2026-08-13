"use client";

import QuestionView from "@/components/question-view";
import QuizHeader from "@/components/quiz-header";
import SubjectMenu from "@/components/subject-menu";
import { quizzes } from "@/data";
import { useQuiz } from "@/hooks/use-quiz";

export default function QuizApp() {
  const { state, dispatch, start } = useQuiz();

  return (
    <>
      <QuizHeader quiz={state.screen === "menu" ? null : state.quiz} />
      <main className="v-container flex-1 pt-12 xl:pt-22">
        {state.screen === "menu" && (
          <SubjectMenu quizzes={quizzes} onPick={start} />
        )}
        {state.screen === "question" && (
          <QuestionView state={state} dispatch={dispatch} />
        )}
      </main>
    </>
  );
}
