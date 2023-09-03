export const questions = [
  {
    id: 0,
    question: "How often do you use hair products?",
    options: [
      { text: "Never, my hair is low maintenance like that", score: 0 },
      { text: "Rarely, I'm more of a 'wash and go' person", score: 1 },
      { text: "Regularly, my hair deserves some pampering", score: 2 },
      { text: "Daily, my hair has its own skincare routine", score: 3 },
    ],
  },
  {
    id: 1,
    question: "Are you genetically predisposed to hair loss?",
    options: [
      {
        text: "Yes, it runs in the family - the baldness legacy lives on!",
        score: 3,
      },
      { text: "No, I have luscious locks in my genes", score: 0 },
    ],
  },
];

export default questions;
