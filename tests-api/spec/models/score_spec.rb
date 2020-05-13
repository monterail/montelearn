# frozen_string_literal: true

require "rails_helper"

RSpec.describe Score, type: :model do
  subject(:score) { described_class.new(params) }

  let(:params) do
    {
      test: test,
      answers: answers,
    }
  end
  let!(:test) { create(:test, :with_binary_questions, questions_count: questions_count) }
  let(:questions_count) { 1 }
  let(:answers) do
    test.questions.map do |q|
      {
        question_uuid: q.id,
        selected_choices: q.choices.select { |c| c[:correct] }.map { |c| c[:answer] },
      }
    end
  end

  it { is_expected.to be_valid }

  describe "validations" do
    it { is_expected.to validate_presence_of(:test) }

    context "with empty answers" do
      let(:answers) { [{}] }

      it "validates answers elements have required keys" do
        score.validate
        expect(score.errors.messages).to include(
          "answers.0.question_uuid": ["is missing"],
          "answers.0.selected_choices": ["is missing"],
        )
      end
    end

    context "with answers with empty values" do
      let(:answers) { [{ question_uuid: nil, selected_choices: [] }] }

      it "validates answers elements have filled values" do
        score.validate
        expect(score.errors.messages).to include(
          "answers.0.question_uuid": ["must be filled"],
          "answers.0.selected_choices": ["must be filled"],
        )
      end
    end

    context "with missing answers for test questions" do
      let(:questions_count) { 2 }
      let(:answers) do
        [
          { question_uuid: test.questions.sample.id, selected_choices: ["answer"] },
          { question_uuid: "some_other_uuid", selected_choices: ["some_other_answer"] },
        ]
      end

      it "validates all questions included in answers" do
        score.validate
        expect(score.errors.messages).to include(
          "answers": ["are required for all Test Questions"],
        )
      end
    end
  end

  describe "#score" do
    subject { score.score }

    let(:expected_score) { "#{answers.size}/#{answers.size}" }

    it { is_expected.to eq(expected_score) }
  end

  describe "#results" do
    subject { score.results }

    let(:expected_results) do
      test.questions.map { |q| { question_uuid: q.id, correct: true } }
    end

    it { is_expected.to eq(expected_results) }
  end
end
