"use client";
import React from "react";
import Question from "@/components/Question";
import useQuizStore from "@/lib/useQuizStore";
import { useRouter } from "next/navigation";

function QuestionPage({ questionText, options }) {
  const currentQuestion = useQuizStore((state) => state.currentQuestion);
  const router = useRouter();
  React.useEffect(() => {
    console.log("running");
    // If all questions are answered, navigate to the result page
    if (currentQuestion >= questions.length) {
      router.push("/q/result"); // Adjust the route as needed
    }
  }, [currentQuestion, questions.length, router]);

  return (
    <div>
      {currentQuestion < questions.length ? (
        <Question
          questionText={questions[currentQuestion]?.question} // Use optional chaining to avoid errors
          options={questions[currentQuestion]?.options || []} // Provide a default empty array if options are undefined
          questionNumber={currentQuestion + 1}
        />
      ) : null}
    </div>
  );
}

export default QuestionPage;

export const questions = [
  {
    id: 0,
    question: "How often do you use hair products?",
    options: [
      { text: "Never, my hair is low maintenance like that", score: 0 },
      { text: "Rarely, I'm more of a 'wash and go' person", score: 1 },
      { text: "Regularly, my hair deserves some pampering", score: 2 },
      { text: "Daily, my hair has its own skincare routine", score: 3 },
    ],
  },
  {
    id: 1,
    question: "Are you genetically predisposed to hair loss?",
    options: [
      {
        text: "Yes, it runs in the family - the baldness legacy lives on!",
        score: 3,
      },
      { text: "No, I have luscious locks in my genes", score: 0 },
    ],
  },
];
