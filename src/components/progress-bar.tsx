import { cn } from "@/lib";

type Props = {
  value: number;
  total: number;
  className?: string;
};

export default function ProgressBar({ value, total, className }: Props) {
  return (
    <div
      aria-hidden="true"
      className={cn("rounded-full bg-surface p-1", className)}
    >
      <div
        style={{ width: `${(value / total) * 100}%` }}
        className="h-2 rounded-full bg-accent transition-[width] duration-300 motion-reduce:transition-none"
      />
    </div>
  );
}
