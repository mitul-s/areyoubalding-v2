import { create } from "zustand";

export type Answer = {
  id: number;
  question: string;
  answer: string;
  score: number;
};

export type QuizState = {
  currentQuestion: number;
  answers: Answer[];
  results: {
    balding: string;
    bald: string;
    notBalding: string;
  };
  setCurrentQuestion: (questionNumber: number) => void;
  addAnswer: (answer: Answer) => void;
};

const useQuizStore = create((set) => ({
  currentQuestion: 0,
  answers: [],
  results: {
    balding: "You are balding",
    bald: "You are bald",
    notBalding: "You are likely not balding",
  },
  setCurrentQuestion: (questionNumber: number) =>
    set({ currentQuestion: questionNumber }),
  addAnswer: (answer: Answer) =>
    set((state: QuizState) => ({ answers: [...state.answers, answer] })),
}));

export default useQuizStore;
