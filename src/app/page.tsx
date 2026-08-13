import BackgroundPattern from "@/components/background-pattern";
import Footer from "@/components/footer";
import QuizApp from "@/components/quiz-app";

export default function Home() {
  return (
    <div className="relative isolate flex min-h-dvh flex-col overflow-clip">
      <BackgroundPattern />
      <QuizApp />
      <Footer />
    </div>
  );
}
