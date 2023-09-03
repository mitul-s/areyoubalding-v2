"use client";
import React from "react";
import { useForm } from "react-hook-form";
import useQuizStore from "@/lib/useQuizStore";
import { Form } from "@/components/form";
import { FormRadio } from "./radio-group";
import questions from "@/lib/questions";
import { useRouter } from "next/navigation";

function Question() {
  const { currentQuestion, setCurrentQuestion, addAnswer } = useQuizStore();
  const { id, question, options } = questions[currentQuestion];
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      answer: "",
    },
  });

  function onSubmit(values: { answer: string }) {
    const findScore = options.find(
      (option) => option.text === values.answer
    )?.score;
    addAnswer({
      id: id,
      question: question,
      answer: values.answer,
      score: findScore,
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
        <button type="submit">Next</button>
      </form>
    </Form>
  );
}

export default Question;
