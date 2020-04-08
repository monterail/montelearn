# frozen_string_literal: true

class TestResource < ApplicationResource
  attribute :id, :uuid
  attribute :title, :string
  attribute :created_at, :datetime, writable: false
  attribute :updated_at, :datetime, writable: false
end
