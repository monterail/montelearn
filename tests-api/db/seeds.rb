# frozen_string_literal: true

Test.create!(
  subject: "Science",
  question_type: "binary",
  question: "Is math related to science?",
  choices: [
    {
      answer: "Yesn't",
      correct: false,
    },
    {
      answer: "Non't",
      correct: true,
    },
  ],
)
