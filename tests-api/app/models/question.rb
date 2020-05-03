# frozen_string_literal: true

class Question < ApplicationRecord
  QUESTION_TYPES = %w(binary multiple-answer multiple-choice).freeze

  belongs_to :test

  serialize :choices, Array

  validates :content, presence: true
  validates :question_type, inclusion: {
    in: QUESTION_TYPES,
    message: "is not included in the list: #{QUESTION_TYPES.join(", ")}.",
  }
  validates_with ChoicesForQuestionTypeValidator,
                 unless: -> (record) { record.errors[:question_type].any? }
end
