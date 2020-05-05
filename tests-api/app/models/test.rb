# frozen_string_literal: true

class Test < ApplicationRecord
  has_many :questions, dependent: :destroy

  validates :lesson_uuid, presence: true, uniqueness: true

  accepts_nested_attributes_for :questions, allow_destroy: true, reject_if: :all_blank
end
