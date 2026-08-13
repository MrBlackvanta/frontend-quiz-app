"use client";

import QuizHeader from "@/components/quiz-header";
import SubjectMenu from "@/components/subject-menu";
import { quizzes, type Quiz } from "@/data";
import { useState } from "react";

export default function QuizApp() {
  const [quiz, setQuiz] = useState<Quiz | null>(null);

  return (
    <>
      <QuizHeader quiz={quiz} />
      <main className="v-container flex-1 pt-12 xl:pt-22">
        {quiz === null && <SubjectMenu quizzes={quizzes} onPick={setQuiz} />}
      </main>
    </>
  );
}
