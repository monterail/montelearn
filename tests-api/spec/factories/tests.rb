# frozen_string_literal: true

FactoryBot.define do
  factory :test do
    subject { Faker::Lorem.word }

    question { Faker::Lorem.question }

    trait :multiple_choice_question do
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

    trait :multiple_answer_question do
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

    trait :binary_question do
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
