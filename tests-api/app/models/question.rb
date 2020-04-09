# frozen_string_literal: true

class Question < ApplicationRecord
  TYPES = %w(
    BinaryQuestion
  ).freeze

  belongs_to :test, optional: true

  validates :content, presence: true
  validates :options, presence: true
end
