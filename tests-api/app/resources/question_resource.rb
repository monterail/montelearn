# frozen_string_literal: true

class QuestionResource < ApplicationResource
  self.polymorphic = Question::TYPES.map { |type| "#{type}Resource" }.freeze

  attribute :id, :uuid
  attribute :test_id, :uuid, only: [:filterable]
  attribute :content, :string
  attribute :options, :hash
  attribute :created_at, :datetime, writable: false
  attribute :updated_at, :datetime, writable: false

  belongs_to :test
end
