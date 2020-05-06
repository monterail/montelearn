# frozen_string_literal: true

FactoryBot.define do
  factory :question do
    association :test
    content { Faker::Lorem.question }

    factory :multiple_choice_question, parent: :question do
      question_type { "multiple-choice" }
      choices do
        [
          {
            answer: Faker::Lorem.word,
            correct: true,
          },
          {
            answer: Faker::Lorem.word,
            correct: false,
          },
          {
            answer: Faker::Lorem.word,
            correct: false,
          },
        ]
      end
    end

    factory :multiple_answer_question, parent: :question do
      question_type { "multiple-answer" }
      choices do
        [
          {
            answer: Faker::Lorem.word,
            correct: true,
          },
          {
            answer: Faker::Lorem.word,
            correct: true,
          },
          {
            answer: Faker::Lorem.word,
            correct: false,
          },
          {
            answer: Faker::Lorem.word,
            correct: false,
          },
        ]
      end
    end

    factory :binary_question, parent: :question do
      question_type { "binary" }
      choices do
        [
          {
            answer: Faker::Lorem.word,
            correct: true,
          },
          {
            answer: Faker::Lorem.word,
            correct: false,
          },
        ]
      end
    end
  end
end
