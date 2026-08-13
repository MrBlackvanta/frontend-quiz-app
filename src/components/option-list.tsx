import { CorrectIcon, IncorrectIcon } from "@/components/icons";
import { cn } from "@/lib";
import { useId } from "react";

const letters = ["A", "B", "C", "D"];

type OptionState = "idle" | "selected" | "correct" | "incorrect" | "answer";

const ringClass: Record<OptionState, string> = {
  idle: "ring-transparent",
  answer: "ring-transparent",
  selected: "ring-accent",
  correct: "ring-correct",
  incorrect: "ring-incorrect",
};

const tileClass: Record<OptionState, string> = {
  idle: "bg-tile text-tile-ink",
  answer: "bg-tile text-tile-ink",
  selected: "bg-accent text-accent-ink",
  correct: "bg-correct text-correct-ink",
  incorrect: "bg-incorrect text-incorrect-ink",
};

type Props = {
  options: readonly string[];
  answer: string;
  selected: string | null;
  revealed: boolean;
  labelledBy: string;
  describedBy?: string;
  onSelect: (option: string) => void;
  className?: string;
};

export default function OptionList({
  options,
  answer,
  selected,
  revealed,
  labelledBy,
  describedBy,
  onSelect,
  className,
}: Props) {
  const name = useId();

  return (
    <div
      role="radiogroup"
      aria-labelledby={labelledBy}
      aria-describedby={describedBy}
      aria-invalid={describedBy !== undefined || undefined}
      className={cn("flex flex-col gap-3 md:gap-6", className)}
    >
      {options.map((option, position) => {
        const state = optionState({ option, answer, selected, revealed });

        return (
          <label
            key={option}
            className={cn(
              "group flex items-center gap-4 v-card p-3 text-label font-medium ring-3 v-focus-ring-within ring-inset md:gap-8 md:text-label-lg xl:px-5 xl:py-4.5",
              ringClass[state],
              revealed ? "cursor-default" : "cursor-pointer",
            )}
          >
            <input
              type="radio"
              name={name}
              value={option}
              checked={option === selected}
              disabled={revealed}
              onChange={() => onSelect(option)}
              className="sr-only"
            />
            <span
              className={cn(
                "v-tile transition-colors motion-reduce:transition-none",
                tileClass[state],
                state === "idle" &&
                  !revealed &&
                  "group-hover:bg-accent-tint group-hover:text-accent",
              )}
            >
              {letters[position]}
            </span>
            <span className="min-w-0 flex-1 wrap-break-word">{option}</span>
            {(state === "correct" || state === "answer") && (
              <CorrectIcon className="size-8 shrink-0 text-correct md:size-10" />
            )}
            {state === "incorrect" && (
              <IncorrectIcon className="size-8 shrink-0 text-incorrect md:size-10" />
            )}
          </label>
        );
      })}
    </div>
  );
}

function optionState({
  option,
  answer,
  selected,
  revealed,
}: Pick<Props, "answer" | "selected" | "revealed"> & {
  option: string;
}): OptionState {
  if (!revealed) return option === selected ? "selected" : "idle";
  if (option === answer) return option === selected ? "correct" : "answer";
  return option === selected ? "incorrect" : "idle";
}
