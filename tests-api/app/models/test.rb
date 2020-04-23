# frozen_string_literal: true

class Test < ApplicationRecord
  QUESTION_TYPES = %w(binary multiple-answer multiple-choice).freeze

  serialize :choices, Array

  validates :subject, :question, presence: true
  validates :question_type, inclusion: { in: QUESTION_TYPES }

  validates_with ChoicesValidator, unless: -> (record) { record.errors[:question_type].any? }
end
