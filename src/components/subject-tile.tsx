import type { Quiz, Subject } from "@/data";
import { cn } from "@/lib";

const tints: Record<Subject, string> = {
  HTML: "bg-subject-html",
  CSS: "bg-subject-css",
  JavaScript: "bg-subject-js",
  Accessibility: "bg-subject-a11y",
};

export default function SubjectTile({ quiz }: { quiz: Quiz }) {
  const Icon = quiz.icon;

  return (
    <span className={cn("v-tile", tints[quiz.title])}>
      <Icon className="size-7 md:size-10" />
    </span>
  );
}
