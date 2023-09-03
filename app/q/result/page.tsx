"use client";
import React, { useState, useEffect, useCallback } from "react";
import useQuizStore from "@/lib/useQuizStore";
import { questions } from "../page";

function Result() {
  const { answers } = useQuizStore();

  console.log(answers);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string>("");

  const calculateTotalScore = React.useCallback(() => {
    let totalScore = 0;
    for (let i = 0; i < answers.length; i++) {
      console.log(answers[i]);
      const question = questions[i];
      const selectedAnswer = answers[i].answer;

      const selectedOption = question.options.find(
        (option) => option.text === selectedAnswer
      );

      if (selectedOption) {
        totalScore += selectedOption.score;
      } else {
        // Handle the case where a matching option is not found
        console.error(
          `No matching option found for answer "${selectedAnswer}"`
        );
      }
    }
    return totalScore;
  }, [answers]);

  const calculateResult = (totalScore: number) => {
    if (totalScore >= 7) {
      return "You are bald.";
    } else if (totalScore >= 4) {
      return "You might be balding.";
    } else {
      return "You're likely not balding.";
    }
  };

  // Calculate the result based on answers (simplified logic)
  useEffect(() => {
    setLoading(true);
    // Simulate loading for 2 seconds (you can adjust the duration)
    setTimeout(() => {
      const totalScore = calculateTotalScore();
      const finalResult = calculateResult(totalScore); // Change variable name to result
      setResult(finalResult); // Set the result in state
      setLoading(false);
    }, 2000); // 2 seconds
  }, [answers, calculateTotalScore]);

  return (
    <div>
      <h2>Result:</h2>
      {loading ? <p>Loading... Funky animation here!</p> : <p>{result}</p>}
    </div>
  );
}

export default Result;
