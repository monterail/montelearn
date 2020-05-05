# frozen_string_literal: true

FactoryBot.define do
  factory :test do
    lesson_uuid { SecureRandom.uuid }
    title { Faker::Lorem.word }
    description { Faker::Lorem.sentence }

    trait :with_binary_questions do
      transient do
        questions_count { 1 }
      end

      after(:create) do |record, evaluator|
        create_list(:binary_question, evaluator.questions_count, test: record)
      end
    end
  end
end
