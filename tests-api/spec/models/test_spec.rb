# frozen_string_literal: true

require "rails_helper"

RSpec.describe Test, type: :model do
  subject { build(:test) }

  it { is_expected.to be_valid }

  describe "associations" do
    it { is_expected.to have_many(:questions).dependent(:destroy) }
  end

  describe "validations" do
    it { is_expected.to validate_presence_of(:lesson_uuid) }
    it { is_expected.to validate_uniqueness_of(:lesson_uuid).case_insensitive }
  end

  it { is_expected.to accept_nested_attributes_for(:questions).allow_destroy(true) }
end
