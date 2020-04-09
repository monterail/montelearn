# frozen_string_literal: true

FactoryBot.define do
  factory :question do
    content { Faker::Lorem.question }

    factory :binary_question, parent: :question, class: "BinaryQuestion" do
      options do
        {
          choices: [
            {
              content: Faker::Lorem.word,
              correct: true,
            },
            {
              content: Faker::Lorem.word,
              correct: false,
            },
          ],
        }
      end
    end
  end
end
