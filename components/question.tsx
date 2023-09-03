import React from "react";
import { useForm } from "react-hook-form";
import useQuizStore from "@/lib/useQuizStore";
import { Form } from "@/components/form";
import { FormRadio } from "./radio-group";

function Question({ questionText, options, questionNumber }) {
  const { handleSubmit, register, reset } = useForm();
  const { currentQuestion, setCurrentQuestion, addAnswer, answers } =
    useQuizStore();
  const [selectedOption, setSelectedOption] = React.useState(null); // State to track selected option

  const form = useForm({
    defaultValues: {
      answer: "",
    },
  });

  function onSubmit(values) {
    console.log(values);
    const findScore = options.find(
      (option) => option.text === values.answer
    ).score;
    addAnswer({
      question: questionText,
      answer: values.answer,
      score: findScore,
    });

    console.log(answers);

    setCurrentQuestion(currentQuestion + 1);
  }

  // const onSubmit = (data) => {
  //   console.log(data);
  //   addAnswer({
  //     question: questionText,
  //     answer: data[`answer_${questionNumber}`],
  //     score: data[`answer_${questionNumber}`].score,
  //   });
  //   setSelectedOption(null); // Clear the selected option
  //   reset(); // Reset the form using useForm reset

  //   setCurrentQuestion(currentQuestion + 1);
  // };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* <h2>{questionText}</h2> */}
        <FormRadio
          form={form}
          label={questionText}
          name={"answer"}
          options={options}
        />
        {/* {options.map((option, index) => (
        <div key={index}>
          <input
            type="radio"
            value={option.text}
            {...register("answer")} // Unique identifier
            checked={selectedOption === option} // Check if this option is selected
            onChange={() => setSelectedOption(option)} // Update selected option
          />
          <label htmlFor={`option_${questionNumber}_${index}`}>
            {option.text}
          </label>
        </div>
      ))} */}
        <button type="submit">Next</button>
      </form>
    </Form>
  );
}

export default Question;
