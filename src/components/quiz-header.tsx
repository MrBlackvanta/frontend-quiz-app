import SubjectLabel from "@/components/subject-label";
import ThemeToggle from "@/components/theme-toggle";
import type { Quiz } from "@/data";

export default function QuizHeader({ quiz }: { quiz: Quiz | null }) {
  return (
    <header className="v-container flex min-h-14 items-center justify-between pt-4 md:min-h-24 md:pt-10 xl:min-h-34 xl:pt-20">
      {quiz ? <SubjectLabel quiz={quiz} /> : <span />}
      <ThemeToggle />
    </header>
  );
}
