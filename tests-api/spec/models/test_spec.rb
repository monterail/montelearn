# frozen_string_literal: true

require "rails_helper"

RSpec.describe Test, type: :model do
  subject { test }

  let(:test) { build(:test, trait) }

  shared_examples "validates #choices according to question type contract" do
    subject { test.attributes }

    let(:contract) { "#{trait.to_s.classify}Contract".constantize }

    it { is_expected.to be_valid_with_contract(contract) }
  end

  describe "multiple-choice question" do
    let(:trait) { :multiple_choice_question }

    it { is_expected.to be_valid }

    it_behaves_like "validates #choices according to question type contract"
  end

  describe "multiple-answer question" do
    let(:trait) { :multiple_answer_question }

    it { is_expected.to be_valid }

    it_behaves_like "validates #choices according to question type contract"
  end

  describe "binary question" do
    let(:trait) { :binary_question }

    it { is_expected.to be_valid }

    it_behaves_like "validates #choices according to question type contract"
  end
end
