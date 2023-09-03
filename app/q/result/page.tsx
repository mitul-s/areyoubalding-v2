"use client";
import React from "react";
import useQuizStore, { Answer, QuizState } from "@/lib/useQuizStore";
import questions from "@/lib/questions";

export default function Result() {
  const { answers, results } = useQuizStore() as QuizState;

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

  return (
    <div>
      <h2>Result:</h2>
      {loading ? <p>Loading... Funky animation here!</p> : <p>{result}</p>}
    </div>
  );
}
