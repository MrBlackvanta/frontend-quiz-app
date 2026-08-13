import SubjectLabel from "@/components/subject-label";
import type { ScoreState } from "@/lib";
import { useEffect, useRef } from "react";

type Props = {
  state: ScoreState;
  onRestart: () => void;
};

export default function ScoreView({ state, onRestart }: Props) {
  const { quiz, score } = state;
  const heading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    heading.current?.focus();
  }, []);

  return (
    <div className="xl:grid xl:grid-cols-[40fr_49fr] xl:gap-x-32">
      <h1
        ref={heading}
        tabIndex={-1}
        className="v-heading v-focus-ring xl:self-start"
      >
        Quiz completed <span className="block font-medium">You scored...</span>
      </h1>

      <div>
        <div className="mt-10 v-card p-8 text-center md:mt-16 md:p-12 xl:mt-0">
          <SubjectLabel quiz={quiz} className="justify-center" />
          <p className="mt-4 text-note text-muted md:mt-10 md:text-note-lg">
            <span className="mb-4 block text-score font-medium text-ink md:text-score-lg">
              {score}
            </span>{" "}
            out of {quiz.questions.length}
          </p>
        </div>

        <button
          type="button"
          onClick={onRestart}
          className="mt-3 v-btn md:mt-8"
        >
          Play Again
        </button>
      </div>
    </div>
  );
}
