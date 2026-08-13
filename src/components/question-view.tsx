import { IncorrectIcon } from "@/components/icons";
import OptionList from "@/components/option-list";
import ProgressBar from "@/components/progress-bar";
import type { QuestionState, QuizAction } from "@/lib";
import { useEffect, useId, useRef, type Dispatch } from "react";

type Props = {
  state: QuestionState;
  dispatch: Dispatch<QuizAction>;
};

export default function QuestionView({ state, dispatch }: Props) {
  const { quiz, index, selected, revealed, missingAnswer } = state;
  const { question, options, answer } = quiz.questions[index];
  const total = quiz.questions.length;

  const headingId = useId();
  const errorId = useId();
  const heading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    heading.current?.focus();
  }, [index]);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        dispatch({ type: revealed ? "next" : "submit" });
      }}
      className="xl:grid xl:grid-cols-[40fr_49fr] xl:grid-rows-[1fr_auto] xl:gap-x-32"
    >
      <div className="xl:col-start-1 xl:row-start-1 xl:flex xl:flex-col xl:justify-between">
        <div>
          <p className="text-caption text-muted italic md:text-caption-lg">
            Question {index + 1} of {total}
          </p>
          <h1
            id={headingId}
            ref={heading}
            tabIndex={-1}
            className="mt-3 text-question font-medium v-focus-ring md:mt-7 md:text-question-lg"
          >
            {question}
          </h1>
        </div>
        <ProgressBar
          value={index + (revealed ? 1 : 0)}
          total={total}
          className="mt-6 md:mt-10 xl:mt-0"
        />
      </div>

      <OptionList
        options={options}
        answer={answer}
        selected={selected}
        revealed={revealed}
        labelledBy={headingId}
        describedBy={missingAnswer ? errorId : undefined}
        onSelect={(option) => dispatch({ type: "select", option })}
        className="mt-10 md:mt-16 xl:col-start-2 xl:row-start-1 xl:mt-0"
      />

      <div className="mt-3 md:mt-8 xl:col-start-2 xl:row-start-2">
        <button type="submit" className="v-btn">
          {revealed ? "Next Question" : "Submit Answer"}
        </button>
        {missingAnswer && (
          <p
            id={errorId}
            role="alert"
            className="mt-3 flex items-center justify-center gap-2 text-note text-error md:mt-8 md:text-note-lg"
          >
            <IncorrectIcon className="size-8 shrink-0 md:size-10" />
            Please select an answer
          </p>
        )}
      </div>

      <p role="status" className="sr-only">
        {revealed &&
          (selected === answer
            ? "Correct."
            : `Incorrect. The correct answer is ${answer}.`)}
      </p>
    </form>
  );
}
