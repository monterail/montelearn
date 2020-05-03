# frozen_string_literal: true

require "rails_helper"

RSpec.describe Test, type: :model do
  describe "associations" do
    it { is_expected.to have_many(:questions).dependent(:destroy) }
  end

  describe "validations" do
    it { is_expected.to validate_presence_of(:lesson_uuid) }
    it { is_expected.to validate_presence_of(:title) }
  end

  it { is_expected.to accept_nested_attributes_for(:questions).allow_destroy(true) }

  it "has a valid Factory" do
    build(:test).should be_valid
  end
end
