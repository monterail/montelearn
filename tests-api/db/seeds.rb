# frozen_string_literal: true

questions_data = [
  {
    question_type: "binary",
    content: "Is math related to science?",
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
  },
].freeze

tests_data = [
  {
    lesson_uuid: "cf48df3b-ae86-464e-acd7-6cdca498fa8a",
    questions_attributes: questions_data,
  },
].freeze

Test.create(tests_data)
