export type Icon = React.ComponentType<React.SVGProps<SVGSVGElement>>;

export type Subject = "HTML" | "CSS" | "JavaScript" | "Accessibility";

export type Question = {
  question: string;
  options: [string, string, string, string];
  answer: string;
};

export type Quiz = {
  title: Subject;
  icon: Icon;
  questions: Question[];
};
