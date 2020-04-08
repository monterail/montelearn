# frozen_string_literal: true

class Question < ApplicationRecord
  QUESTION_TYPES = %w(
    Binary
  ).freeze

  TYPES = QUESTION_TYPES.map { |qt| "#{qt}::Question" }.freeze

  belongs_to :test, optional: true

  validates :content, presence: true
  validates :options, presence: true
end
