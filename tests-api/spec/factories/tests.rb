# frozen_string_literal: true

FactoryBot.define do
  factory :test do
    subject { Faker::Lorem.word }

    question { Faker::Lorem.question }
    answer { Faker::Lorem.word }
  end
end
