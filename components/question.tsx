"use client";
import React from "react";
import { useForm } from "react-hook-form";
import useQuiz, { QuizState } from "@/lib/useQuiz";
import { Form } from "@/components/form";
import { FormRadio } from "@/components/radio-group";
import questions from "@/lib/questions";
import { useRouter } from "next/navigation";

function Question() {
  const { currentQuestion, setCurrentQuestion, addAnswer, answers } =
    useQuiz() as QuizState;
  const { id, question, options } = questions[currentQuestion];
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      answer: "",
    },
  });

  function onSubmit(values: { answer: string }) {
    // Instead of filter, I'm using find here to make sure it's never undefined
    // Although, eh.. would never be undefined anyways but satisfies TS

    const currentQuestionObject = questions[currentQuestion];
    const score = currentQuestionObject.options.filter(
      (option) => option.text === values.answer
    )[0].score;

    addAnswer({
      id: id,
      question: question,
      answer: values.answer,
      score: score,
    });

    if (currentQuestion >= questions.length - 1) {
      router.push("/q/result");
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormRadio
          form={form}
          label={question}
          name={"answer"}
          options={options}
        />
        {/* <button
          className="text-white p-4 font-semibold uppercase mt-2 rounded-[10px] w-full bg-ramen"
          type="submit"
        >
          Next
        </button> */}
      </form>
    </Form>
  );
}

export default Question;
