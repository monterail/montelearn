# frozen_string_literal: true

TESTS_DATA = [
  { title: "This is a test" },
].freeze

TESTS = Test.create(TESTS_DATA)

QUESTIONS_DATA = [
  {
    question_type: "true-false",
    value: "Is math related to science?",
    test: TESTS[0],
  },
  {
    question_type: "multiple-choice",
    value: "Is science related to math?",
    test: TESTS[0],
  },
].freeze

QUESTIONS = Question.create(QUESTIONS_DATA)

ANSWERS_DATA = [
  {
    value: "yes",
    correct: false,
    question: QUESTIONS[0],
  },
  {
    value: "yes",
    correct: true,
    question: QUESTIONS[0],
  },
  {
    value: "It very well could be",
    correct: false,
    question: QUESTIONS[1],
  },
  {
    value: "No way, Jose",
    correct: true,
    question: QUESTIONS[1],
  },
  {
    value: "For sure",
    correct: false,
    question: QUESTIONS[1],
  },
].freeze

ANSWERS = Answer.create(ANSWERS_DATA)
