"use client";
import React from "react";
import useQuiz, { Answer, QuizState } from "@/lib/useQuiz";
import questions from "@/lib/questions";
import { useRouter } from "next/navigation";

export default function Result() {
  const { answers, results } = useQuiz() as QuizState;
  const router = useRouter();

  const calculateResult = (totalScore: number) => {
    const totalPossibleScore = questions.reduce((total, question) => {
      const maxOptionScore = Math.max(
        ...question.options.map((option) => option.score)
      );
      return total + maxOptionScore;
    }, 0);

    const baldingThreshold = (totalPossibleScore * 1) / 3;
    const baldThreshold = (totalPossibleScore * 2) / 3;

    if (totalScore >= baldThreshold) {
      return results.bald;
    } else if (totalScore >= baldingThreshold) {
      return results.balding;
    } else {
      return results.notBalding;
    }
  };

  console.log(answers);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [result, setResult] = React.useState<string>("");

  const calculateTotalScore = React.useCallback(() => {
    const totalScore = answers.reduce((accumulator: number, answer: Answer) => {
      const question = questions[answer.id];
      const { answer: selectedAnswer } = answer;

      const selectedOption = question.options.find(
        (option) => option.text === selectedAnswer
      );

      if (selectedOption) {
        return accumulator + selectedOption.score;
      } else {
        console.error(
          `No matching option found for answer "${selectedAnswer}"`
        );
        return accumulator;
      }
    }, 0);

    return totalScore;
  }, [answers]);

  // MITUL – we likely don't need useEffect here, can avoid
  React.useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      const totalScore = calculateTotalScore();
      const finalResult = calculateResult(totalScore);
      setResult(finalResult);
      setLoading(false);
    }, 2000);
  }, [answers, calculateTotalScore]);

  // if (answers.length === 0) {
  //   router.push("/");
  // }

  return (
    <div className="flex justify-center items-center text-center h-full">
      <h2 className="text-[calc(16px+9vw)] tracking-tighter md:tracking-[-0.425rem] text-royal font-black leading-none">
        {result}...
      </h2>

      {/* {loading ? <p>Loading... Funky animation here!</p> : <p>{result}</p>} */}
    </div>
  );
}
