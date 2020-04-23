# frozen_string_literal: true

class Test < ApplicationRecord
  validates :subject, :question, :answer, presence: true
end
