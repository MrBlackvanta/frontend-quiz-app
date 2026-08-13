import SubjectTile from "@/components/subject-tile";
import type { Quiz } from "@/data";

type Props = {
  quizzes: Quiz[];
  onPick: (quiz: Quiz) => void;
};

export default function SubjectMenu({ quizzes, onPick }: Props) {
  return (
    <div className="xl:grid xl:grid-cols-[40fr_49fr] xl:gap-x-32">
      <div>
        <h1 className="v-heading">
          Welcome to the{" "}
          <span className="block font-medium">Frontend Quiz!</span>
        </h1>
        <p className="mt-4 text-caption text-muted italic md:text-caption-lg xl:mt-12">
          Pick a subject to get started.
        </p>
      </div>

      <ul className="mt-10 flex flex-col gap-3 md:mt-16 md:gap-6 xl:mt-0">
        {quizzes.map((quiz) => (
          <li key={quiz.title}>
            <button
              type="button"
              onClick={() => onPick(quiz)}
              className="flex w-full items-center gap-4 v-card p-3 text-label font-medium v-card-selectable md:gap-8 md:text-label-lg xl:p-5"
            >
              <SubjectTile quiz={quiz} />
              {quiz.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
