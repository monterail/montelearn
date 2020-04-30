# frozen_string_literal: true

QUESTIONS_DATA = [
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

TESTS_DATA = [
  {
    lesson_uuid: "cf48df3b-ae86-464e-acd7-6cdca498fa8a",
    title: "Test #1",
    questions_attributes: QUESTIONS_DATA,
  },
].freeze

TESTS = Test.create(TESTS_DATA)
