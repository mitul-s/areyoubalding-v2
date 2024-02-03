"use client";
import React from "react";
import useQuiz, { Answer, QuizState } from "@/lib/useQuiz";
import questions from "@/lib/questions";
import { useRouter } from "next/navigation";
import { ArrowDown } from "lucide-react";
import Link from "next/link";
import LoadingPage from "@/components/loading-page";

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
            <div className="w-full h-1 rounded-md bg-royal" />
            <div className="flex py-12 gap-x-6">
              <div className="w-1/3 rounded-sm h-96 bg-cream">
                <h2 className="font-black tracking-tighter text-7xl text-cherry">
                  Hair loss products can help in a few ways
                </h2>
              </div>
              <div className="grid w-2/3 min-h-full grid-cols-2 gap-1 text-left">
                <div className="h-full bg-cherry text-cream rounded-[10px] px-6 py-4">
                  <h3 className="max-w-sm text-6xl font-bold tracking-tighter uppercase">
                    Loss prevention
                  </h3>
                  <p className="text-2xl font-medium">
                    Minim anim tempor exercitation dolore officia nulla enim
                    consequat culpa qui dolor officia esse ad in. Minim anim
                    tempor exercitation dolore officia nulla enim consequat
                    culpa qui dolor officia esse ad in. Minim anim tempor
                    exercitation dolore officia nulla enim consequat culpa qui
                    dolor officia esse ad in. Minim anim tempor exercitation
                    dolore officia nulla enim consequat culpa qui dolor officia
                    esse ad in.
                  </p>
                </div>
                <div className="h-full bg-cherry text-cream rounded-[10px] px-6 py-4">
                  <h3 className="text-6xl font-bold tracking-tighter uppercase">
                    Loss prevention
                  </h3>
                  <p className="text-2xl font-medium">
                    Minim anim tempor exercitation dolore officia nulla enim
                    consequat culpa qui dolor officia esse ad in.
                  </p>
                </div>
                <div className="h-full bg-cherry text-cream rounded-[10px] px-6 py-4">
                  <h3 className="text-6xl font-bold tracking-tighter uppercase">
                    Loss prevention
                  </h3>
                  <p className="text-2xl font-medium">
                    Minim anim tempor exercitation dolore officia nulla enim
                    consequat culpa qui dolor officia esse ad in.
                  </p>
                </div>
                <div className="h-full bg-cherry text-cream rounded-[10px] px-6 py-4">
                  <h3 className="text-6xl font-bold tracking-tighter uppercase">
                    Loss prevention
                  </h3>
                  <p className="text-2xl font-medium">
                    Minim anim tempor exercitation dolore officia nulla enim
                    consequat culpa qui dolor officia esse ad in.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start justify-center">
            <h2 className="font-black tracking-tighter text-7xl text-lettuce">
              Products
            </h2>
            <p className="max-w-3xl text-2xl text-lettuce">
              Commodo minim occaecat eu voluptate eiusmod aliqua voluptate qui
              eiusmod.
            </p>
            <div className="grid grid-cols-1 gap-12 py-12 mx-auto md:grid-cols-3">
              <ProductCard title="Finastride" link="" />
              <ProductCard title="Finastride" link="" />
              <ProductCard title="Finastride" link="" />
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
