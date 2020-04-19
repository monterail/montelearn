# frozen_string_literal: true

10.times do
  Test.create!(
    subject: Faker::Lorem.word,
    question: Faker::Lorem.question,
    answer: Faker::Lorem.word,
  )
end
