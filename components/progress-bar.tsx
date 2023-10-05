"use client";
import useQuiz, { QuizState } from "@/lib/useQuiz";
import questions from "@/lib/questions";
import * as Progress from "@radix-ui/react-progress";

const ProgressBar = () => {
  const { currentQuestion } = useQuiz() as QuizState;
  const totalQuestions = questions.length;

  const progress = Math.round(((currentQuestion + 1) / totalQuestions) * 100);

  return (
    <Progress.Root
      className="relative overflow-hidden rounded-[10px] w-full h-10 border-ramen border-2"
      style={{
        // Fix overflow clipping in Safari
        // https://gist.github.com/domske/b66047671c780a238b51c51ffde8d3a0
        transform: "translateZ(0)",
      }}
      value={progress}
    >
      <Progress.Indicator
        className="bg-ramen w-full h-full transition-transform duration-[660ms] ease-[cubic-bezier(0.65, 0, 0.35, 1)]"
        style={{ transform: `translateX(-${100 - progress}%)` }}
      />
    </Progress.Root>
  );
};

export default ProgressBar;
