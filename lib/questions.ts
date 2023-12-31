export const questions = [
  {
    id: 0,
    question: "How often do you use hair products?",
    layout: "horizontal",
    options: [
      {
        text: "Never",
        subtitle: "My hair is low maintenance like that",
        score: 0,
      },
      {
        text: "Rarely",
        subtitle: "I'm more of a 'wash and go' person",
        score: 1,
      },
      {
        text: "Regularly",
        subtitle: "My hair deserves some pampering",
        score: 2,
      },
      {
        text: "Daily",
        subtitle: "My hair has its own skincare routine",
        score: 3,
      },
    ],
  },
  {
    id: 1,
    question: "Are you genetically predisposed to hair loss?",
    layout: "horizontal",
    options: [
      {
        text: "Yes",
        subtitle: "My hair is a little sensitive to the elements",
        score: 3,
      },
      {
        text: "No",
        subtitle: "I have luscious locks in my genes",
        score: 0,
      },
    ],
  },
  {
    id: 2,
    question: "Do you experience hair thinning?",
    layout: "vertical",
    options: [
      {
        text: "Yes, my hair has been practicing the art of vanishing",
        score: 2,
      },
      { text: "No, my hair is as thick as my morning coffee", score: 0 },
    ],
  },
  {
    id: 3,
    question: "How old are you?",
    options: [
      { text: "Under 30, I'm in the prime of my hair days", score: 0 },
      {
        text: "30-40, I'm like a fine wine, getting better with age",
        score: 1,
      },
      { text: "41-50, I've reached the 'distinguished' stage", score: 2 },
      {
        text: "Over 50, my hair is my most loyal companion on this journey",
        score: 3,
      },
    ],
  },
  {
    id: 4,
    question: "Do you have a family history of baldness?",
    options: [
      { text: "Yes, we have a balding family tree with deep roots", score: 2 },
      { text: "No, our family trees are full of luscious foliage", score: 0 },
    ],
  },
];

export default questions;
