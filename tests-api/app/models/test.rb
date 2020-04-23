# frozen_string_literal: true

class Test < ApplicationRecord
  QUESTION_TYPES = %w(binary multiple-answer multiple-choice).freeze

  serialize :choices, Array

  validates :subject, :question, :choices, presence: true
  validates :question_type, inclusion: { in: QUESTION_TYPES }
end
