"use client";
import React from "react";
import useQuizStore, { Answer, QuizState } from "@/lib/useQuizStore";
import questions from "@/lib/questions";

const calculateResult = (totalScore: number) => {
  if (totalScore >= 7) {
    return "You are bald.";
  } else if (totalScore >= 4) {
    return "You might be balding.";
  } else {
    return "You're likely not balding.";
  }
};

export default function Result() {
  const { answers } = useQuizStore() as QuizState;

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
