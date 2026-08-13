import SubjectTile from "@/components/subject-tile";
import ThemeToggle from "@/components/theme-toggle";
import type { Quiz } from "@/data";

export default function QuizHeader({ quiz }: { quiz: Quiz | null }) {
  return (
    <header className="v-container flex min-h-14 items-center justify-between pt-4 md:min-h-24 md:pt-10 xl:min-h-34 xl:pt-20">
      {quiz ? (
        <p className="flex items-center gap-4 text-label font-medium md:gap-6 md:text-label-lg">
          <SubjectTile quiz={quiz} />
          {quiz.title}
        </p>
      ) : (
        <span />
      )}
      <ThemeToggle />
    </header>
  );
}
