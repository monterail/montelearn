# frozen_string_literal: true

require "rails_helper"

RSpec.describe Question, type: :model do
  shared_context "with assigned choices" do
    before { question.assign_attributes(choices: choices) }

    let(:choices) { question.choices }
  end

  shared_examples "validates choices elements" do
    it "validates choices elements have required keys" do
      question.choices[0] = {}

      question.validate

      expect(question.errors.messages).to include(
        "choices.0.answer": ["is missing"],
        "choices.0.correct": ["is missing"],
      )
    end

    it "validates choices elements have filled values" do
      question.choices[0] = { correct: nil, answer: nil }

      question.validate

      expect(question.errors.messages).to include(
        "choices.0.answer": ["must be filled"],
        "choices.0.correct": ["must be filled"],
      )
    end
  end

  shared_examples "validates choices size" do
    include_context "with assigned choices"

    context "with less than minimum choices" do
      let(:choices) { question.choices.take(minimum_choices - 1) }

      it { is_expected.to be_invalid }
    end

    context "with more than minimum choices" do
      let(:choices) { question.choices + [{ answer: "answer", correct: false }] }

      it { expect(question.valid?).to eq(valid_with_more_than_minimum_choices) }
    end
  end

  shared_examples "validates correct choices" do
    include_context "with assigned choices"

    let(:correct_choices) { question.choices.select { |c| c[:correct] } }

    context "with less than minimum correct choices" do
      before { correct_choices.sample[:correct] = false }

      it { is_expected.to be_invalid }
    end

    context "with more than minimum correct choices" do
      before { (question.choices - correct_choices).sample[:correct] = true }

      it { expect(question.valid?).to eq(valid_with_more_than_minimum_correct_choices) }
    end
  end

  describe "associations" do
    it { is_expected.to belong_to(:test).required(true) }
  end

  describe "validations" do
    it { is_expected.to validate_presence_of(:content) }
  end

  # Cannot use Shoulda::Matchers::ActiveModel::validates_inclusion_of matcher
  # Issue: https://github.com/thoughtbot/shoulda-matchers/issues/1233
  describe "validates_inclusion_of question_type" do
    let(:values) { Question::QUESTION_TYPES }

    it "allows only valid values" do
      values.each { |v| expect(subject).to allow_value(v).for(:question_type) }
      expect(subject).not_to allow_value(:other).for(:question_type)
    end
  end

  describe "validates_with ChoicesForQuestionTypeValidator" do
    subject { question }

    context "when 'binary' question_type" do
      let(:question) { build(:binary_question) }

      it { is_expected.to be_valid }

      it_behaves_like "validates choices elements"
      it_behaves_like "validates choices size" do
        let(:minimum_choices) { 2 }
        let(:valid_with_more_than_minimum_choices) { false }
      end
      it_behaves_like "validates correct choices" do
        let(:minimum_correct_choices) { 1 }
        let(:valid_with_more_than_minimum_correct_choices) { false }
      end
    end

    context "when 'multiple-choice' question_type" do
      let(:question) { build(:multiple_choice_question) }

      it { is_expected.to be_valid }

      it_behaves_like "validates choices elements"
      it_behaves_like "validates choices size" do
        let(:minimum_choices) { 3 }
        let(:valid_with_more_than_minimum_choices) { true }
      end
      it_behaves_like "validates correct choices" do
        let(:minimum_correct_choices) { 1 }
        let(:valid_with_more_than_minimum_correct_choices) { false }
      end
    end

    context "when 'multiple-answer' question_type" do
      let(:question) { build(:multiple_answer_question) }

      it { is_expected.to be_valid }

      it_behaves_like "validates choices elements"
      it_behaves_like "validates choices size" do
        let(:minimum_choices) { 3 }
        let(:valid_with_more_than_minimum_choices) { true }
      end
      it_behaves_like "validates correct choices" do
        let(:minimum_correct_choices) { 2 }
        let(:valid_with_more_than_minimum_correct_choices) { true }
      end
    end
  end

  it { is_expected.to serialize(:choices) }
end
