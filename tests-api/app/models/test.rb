# frozen_string_literal: true

class Test < ApplicationRecord
  has_many :questions, dependent: :destroy

  validates :title, presence: true
end
