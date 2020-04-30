# frozen_string_literal: true

require "rails_helper"

RSpec.describe Question, type: :model do
  subject { question }

  let(:question) { build(question_type) }

  shared_examples "validates #choices according to question_type contract" do
    subject { question.attributes }

    let(:contract) { "#{question_type.to_s.classify}Contract".constantize }

    it { is_expected.to be_valid_with_contract(contract) }
  end

  describe "multiple-choice question" do
    let(:question_type) { :multiple_choice_question }

    it { is_expected.to be_valid }

    it_behaves_like "validates #choices according to question_type contract"
  end

  describe "multiple-answer question" do
    let(:question_type) { :multiple_answer_question }

    it { is_expected.to be_valid }

    it_behaves_like "validates #choices according to question_type contract"
  end

  describe "binary question" do
    let(:question_type) { :binary_question }

    it { is_expected.to be_valid }

    it_behaves_like "validates #choices according to question_type contract"
  end
end
