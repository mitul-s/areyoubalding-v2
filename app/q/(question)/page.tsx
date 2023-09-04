"use client";
import Question from "@/components/question";
import questions from "@/lib/questions";
import useQuiz, { QuizState } from "@/lib/useQuiz";
import { cva } from "class-variance-authority";

const questionLayout = cva(["grid w-full"], {
  variants: {
    intent: {
      horizontal: ["text-center justify-center"],
      vertical: ["grid-cols-2"],
    },
  },
});

const HorizontalLayout = ({ children, question, subtitle }) => {
  return (
    <div className="grid grid-rows-2 text-center h-[calc(100vh-125px)] py-4 px-2 w-full">
      <div className="rounded-[10px] h-full px-6 flex flex-col max-w-3xl justify-center items-center mx-auto">
        <h1 className="text-royal text-7xl font-black leading-[3.9rem] tracking-tight">
          {question.question}
        </h1>
        <p className="text-royal/60 text-2xl mt-6 max-w-lg">{subtitle}</p>
      </div>
      {children}
    </div>
  );
};

const VerticalLayout = ({ children, question, subtitle }) => {
  return (
    <div className="grid grid-cols-2 h-[calc(100vh-70px)] py-4 px-2 w-full">
      <div className="max-w-2xl rounded-[10px] h-full px-6">
        <h1 className="text-royal text-7xl font-black leading-[3.9rem] tracking-tight">
          {question.question}
        </h1>
        <p className="text-royal/60 text-2xl mt-6 max-w-sm ">{subtitle}</p>
      </div>
      {children}
    </div>
  );
};

const QuestionPage = () => {
  const { currentQuestion } = useQuiz() as QuizState;
  const question = questions[currentQuestion];
  const intent = questions[currentQuestion]?.intent ?? "horizontal";
  return (
    // <VerticalLayout
    //   question={question}
    //   subtitle={
    //     "Officia exercitation ea laborum ipsum mollit esse in ipsum enim."
    //   }
    // >
    //   <Question />
    // </VerticalLayout>
    <HorizontalLayout
      question={question}
      subtitle={
        "Officia exercitation ea laborum ipsum mollit esse in ipsum enim."
      }
    >
      <Question />
    </HorizontalLayout>
  );
};

export default QuestionPage;
