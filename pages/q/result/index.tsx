"use client";
import React from "react";
import useQuiz, { Answer, QuizState } from "@/lib/useQuiz";
import questions from "@/lib/questions";
import { useRouter } from "next/navigation";
import { ArrowDown } from "lucide-react";
import Link from "next/link";
import LoadingPage from "@/components/loading-page";
import { AnimatePresence } from "framer-motion";

const ProductCard = ({
  title,
  description = "Deserunt cupidatat qui nisi anim sint labore cillum laboris culpa reprehenderit irure pariatur nulla.",
  link,
}: {
  title: string;
  description?: string;
  link: string;
}) => {
  return (
    <div className="bg-[#f9f9f9] rounded-md text-black px-6 pt-6 pb-8 w-96 h-96">
      <h3 className="mb-2 text-4xl font-bold tracking-tight">{title}</h3>
      <p className="text-lg leading-tight">{description}</p>
      <div className="w-full mt-4 rounded h-36">An image</div>
      <a className="bg-lettuce rounded-[5px] font-bold py-4 w-full text-white block text-center hover:cursor-pointer hover:bg-lettuce/80 transition">
        Learn more
      </a>
    </div>
  );
};

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
    }, 6000);
  }, [answers, calculateTotalScore]);

  // if (answers.length === 0) {
  //   router.push("/");
  // }

  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : (
        <>
          <div className="relative flex flex-col items-center justify-center h-full scroll-smooth">
            <h2 className="px-4 text-[calc(16px+9vw)] tracking-tighter md:tracking-[-0.425rem] text-royal font-black leading-none text-center">
              {result}...
            </h2>

            <a
              href="#what-does-this-mean"
              className="absolute p-3 text-white transition -translate-x-1/2 rounded-full bottom-6 left-1/2 bg-ramen hover:bg-ramen/50"
            >
              <ArrowDown />
            </a>
          </div>
          <div
            id="what-does-this-mean"
            className="scroll-smooth bg-royal text-white -mx-3 px-4 py-32 rounded-b-[10px] text-center space-y-6"
          >
            <h2 className="text-6xl font-bold tracking-tighter">
              What does this mean for you?
            </h2>
            <p className="max-w-3xl mx-auto text-2xl">
              Commodo minim occaecat eu voluptate eiusmod aliqua voluptate qui
              eiusmod. Commodo minim occaecat eu voluptate eiusmod aliqua
              voluptate qui eiusmod.
            </p>
          </div>
          <div className="py-32 space-y-6 text-center">
            <h2 className="text-6xl font-bold tracking-tighter text-royal">
              What can you do to stop it?
            </h2>
            <p className="max-w-3xl mx-auto text-2xl text-royal">
              Commodo minim occaecat eu voluptate eiusmod aliqua voluptate qui
              eiusmod. Commodo minim occaecat eu voluptate eiusmod aliqua
              voluptate qui eiusmod.
            </p>
          </div>
          <div>
            <div className="bg-cream !text-royal p-4">
              <h3 className="text-6xl font-bold tracking-tighter ">
                It&apos;s not the end... yet.
              </h3>
              <p>Some text</p>
              <div className="grid grid-cols-2 grid-rows-3 gap-3">
                <div className="bg-white rounded-md border p-4 row-span-2 shadow-sm flex flex-col gap-y-4">
                  <h3 className="text-royal text-6xl font-bold">Minoxidil</h3>
                  <p className="text-2xl">
                    Laboris non in nisi tempor deserunt do enim. Nostrud quis
                    exercitation in veniam do exercitation ea exercitation qui.
                    Aliqua labore elit non cillum aliqua aliqua enim minim qui
                    veniam non ea aute eu magna. Enim et consequat consectetur
                    pariatur adipisicing labore aute culpa adipisicing nostrud
                    magna ullamco ea aliqua.
                  </p>
                </div>
                <div className="bg-cream rounded-md border p-4 row-span-1">
                  <h3 className="text-black text-3xl font-bold">Minoxidil</h3>
                </div>
                <div className="bg-cream rounded-md border p-4 row-span-2">
                  <h3 className="text-black text-3xl font-bold">Minoxidil</h3>
                </div>
                <div className="bg-cream rounded-md border p-4 row-span-1">
                  <h3 className="text-black text-3xl font-bold">Minoxidil</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center py-4 -mx-3 bg-black">
            <div className="flex items-center justify-between w-full px-4 text-xs text-white">
              <p>
                Built by{" "}
                <Link href="https://twitter.com/typicalmitul">Mitul Shah</Link>
              </p>
              <span>Disclaimer: I am not a doctor and none of this legit.</span>
            </div>
          </div>
        </>
      )}
    </>
  );
}
