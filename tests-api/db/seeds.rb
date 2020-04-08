# frozen_string_literal: true

TESTS_DATA = [
  { title: "This is a test" },
].freeze

TESTS = Test.create(TESTS_DATA)

QUESTIONS_DATA = [
  {
    type: "Binary::Question",
    content: "Is math related to science?",
    options: {
      choices: [
        {
          "correct": true,
          "content": "Yesn't",
        },
        {
          "correct": false,
          "content": "Maybe",
        },
      ],
    },
  },
].freeze

QUESTIONS = Question.create(QUESTIONS_DATA)
