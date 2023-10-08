"use client";
import Question from "@/components/question";
import questions from "@/lib/questions";
import useQuiz, { QuizState } from "@/lib/useQuiz";
import { cva } from "class-variance-authority";

const questionLayout = cva(["grid w-full"], {
  variants: {
    intent: {
      horizontal: ["text-center", "justify-center"],
      vertical: ["grid-cols-2"],
    },
  },
});

interface Layout {
  children: React.ReactNode;
  question: (typeof questions)[number];
  subtitle: string;
}

const HorizontalLayout = ({ children, question, subtitle }: Layout) => {
  return (
    <div className="grid grid-rows-2 text-center h-[calc(100vh-65px)] py-4 px-2 w-full">
      <div className="rounded-[10px] h-full px-6 flex flex-col max-w-3xl justify-center items-center mx-auto">
        <h1 className="text-royal text-5xl md:text-7xl font-black md:leading-[3.9rem] tracking-tight">
          {question.question}
        </h1>
        <p className="max-w-lg mt-2 text-lg md:mt-6 md:text-2xl text-royal/60">
          {subtitle}
        </p>
      </div>
      {children}
    </div>
  );
};

const VerticalLayout = ({ children, question, subtitle }: Layout) => {
  return (
    <div className="grid md:grid-cols-2 h-[calc(100vh-65px)] py-4 px-2 w-full">
      <div className="max-w-2xl rounded-[10px] h-full px-6 mt-4 -ml-4">
        <h1 className="text-royal text-5xl md:text-7xl font-black md:leading-[3.9rem] tracking-tight">
          {question.question}
        </h1>
        <p className="max-w-sm mt-2 text-lg md:mt-6 md:text-2xl text-royal/60">
          {subtitle}
        </p>
      </div>
      {children}
    </div>
  );
};

const QuestionPage = () => {
  const { currentQuestion } = useQuiz() as QuizState;
  const question = questions[currentQuestion];
  const Component =
    questions[currentQuestion].layout === "horizontal"
      ? HorizontalLayout
      : VerticalLayout;
  return (
    <Component
      question={question}
      subtitle={
        "Officia exercitation ea laborum ipsum mollit esse in ipsum enim."
      }
    >
      <Question />
    </Component>
  );
};

export default QuestionPage;
