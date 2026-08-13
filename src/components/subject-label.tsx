import SubjectTile from "@/components/subject-tile";
import type { Quiz } from "@/data";
import { cn } from "@/lib";

type Props = {
  quiz: Quiz;
  className?: string;
};

export default function SubjectLabel({ quiz, className }: Props) {
  return (
    <p
      className={cn(
        "flex items-center gap-4 text-label font-medium md:gap-6 md:text-label-lg",
        className,
      )}
    >
      <SubjectTile quiz={quiz} />
      {quiz.title}
    </p>
  );
}
