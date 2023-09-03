import { create } from "zustand";

type Answer = {
  question: string;
  answer: string;
};

const useQuizStore = create((set) => ({
  currentQuestion: 0,
  answers: [],
  results: {
    balding: "You might be balding.",
    bald: "You are bald.",
    notBalding: "You're likely not balding.",
  },
  setCurrentQuestion: (questionNumber: number) =>
    set({ currentQuestion: questionNumber }),
  addAnswer: (answer: Answer) =>
    set((state) => ({ answers: [...state.answers, answer] })),
}));

export default useQuizStore;
