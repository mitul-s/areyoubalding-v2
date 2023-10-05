"use client";
import React from "react";
import useQuiz, { Answer, QuizState } from "@/lib/useQuiz";
import questions from "@/lib/questions";
import { useRouter } from "next/navigation";
import { ArrowDown } from "lucide-react";
import Link from "next/link";

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
    <>
      <div className="relative flex flex-col justify-center items-center text-center h-full">
        <h2 className="text-[calc(16px+9vw)] tracking-tighter md:tracking-[-0.425rem] text-royal font-black leading-none">
          {result}...
        </h2>

        <button className="absolute bottom-6 left-1/2 bg-ramen rounded-full p-3 text-white hover:bg-ramen/50 transition -translate-x-1/2">
          <ArrowDown />
        </button>
        {/* {loading ? <p>Loading... Funky animation here!</p> : <p>{result}</p>} */}
      </div>
      <div className="bg-royal text-white -mx-3 px-4 py-32 rounded-b-[10px] text-center space-y-6">
        <h2 className="text-6xl font-bold tracking-tighter">
          What does this mean for you?
        </h2>
        <p className="text-2xl max-w-3xl mx-auto">
          Commodo minim occaecat eu voluptate eiusmod aliqua voluptate qui
          eiusmod. Commodo minim occaecat eu voluptate eiusmod aliqua voluptate
          qui eiusmod.
        </p>
      </div>
      <div>
        <h2 className="text-6xl font-bold tracking-tighter text-royal">
          What can you do to stop it?
        </h2>
      </div>
      <div className="flex items-start justify-center flex-col">
        <h2 className="text-7xl font-black text-lettuce tracking-tighter">
          Products
        </h2>
        <p className="text-2xl max-w-3xl text-lettuce">
          Commodo minim occaecat eu voluptate eiusmod aliqua voluptate qui
          eiusmod.
        </p>
        <div className="flex flex-wrap gap-x-12 py-12">
          <div className="bg-[#f9f9f9] rounded-md text-black px-6 pt-6 pb-8 w-96 h-96">
            <h3 className="text-4xl tracking-tight font-bold mb-2">
              Finastride
            </h3>
            <p className="text-lg  leading-tight">
              Deserunt cupidatat qui nisi anim sint labore cillum laboris culpa
              reprehenderit irure pariatur nulla.
            </p>
            <div className="h-36 w-full rounded mt-4">An image</div>
            <button className="bg-lettuce rounded-[5px] font-bold py-4 w-full text-white">
              Learn more
            </button>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center -mx-3 bg-cherry py-8">
        <div className="w-full px-4 text-xs text-white">
          <p>
            Built by <Link href="">Mitul Shah</Link>
          </p>
          <span>Disclaimer: I am not a doctor and none of this legit.</span>
        </div>
      </div>
    </>
  );
}
