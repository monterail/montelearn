# frozen_string_literal: true

require "rails_helper"

RSpec.describe CalculateScore do
  let(:params) do
    {
      test: test,
      answers: answers,
    }
  end
  let(:test) { create(:test, :with_binary_questions, questions_count: questions_count) }
  let(:questions_count) { 1 }
  let(:answers) do
    test.questions.map do |q|
      {
        question_uuid: q.id,
        selected_choices: q.choices.select { |c| c[:correct] }.map { |c| c[:answer] },
      }
    end
  end

  describe "#errors" do
    subject(:errors) { described_class.call(params: params).errors }

    context "with empty params" do
      let(:params) do
        {}
      end

      it "validates answers and test keys" do
        expect(errors).to include(
          answers: ["is missing"],
          test: ["is missing"],
        )
      end
    end

    context "without test" do
      let(:params) do
        { test: nil }
      end

      it "validates answers elements have required keys" do
        expect(errors).to include(
          test: ["must be filled"],
        )
      end
    end

    context "with wrong type for test" do
      let(:params) do
        { test: "Test.new" }
      end

      it "validates answers elements have required keys" do
        expect(errors).to include(
          test: ["must be a test"],
        )
      end
    end

    context "without answers" do
      let(:answers) { nil }

      it "validates answers elements have required keys" do
        expect(errors).to include(
          answers: ["must be filled"],
        )
      end
    end

    context "with wrong type for answers" do
      let(:answers) { "[]" }

      it "validates answers elements have required keys" do
        expect(errors).to include(
          answers: ["must be an array"],
        )
      end
    end

    context "with empty answers" do
      let(:answers) { [{}] }

      it "validates answers elements have required keys" do
        expect(errors).to include(
          answers: { 0 => { question_uuid: ["is missing"], selected_choices: ["is missing"] } },
        )
      end
    end

    context "with answers with empty values" do
      let(:answers) { [{ question_uuid: nil, selected_choices: [] }] }

      it "validates answers elements have filled values" do
        expect(subject).to include(
          answers: { 0 => { question_uuid: ["must be filled"], selected_choices: ["must be filled"] } },
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
        expect(errors).to include(
          answers: ["are required for all test questions"],
        )
      end
    end
  end

  describe "#data" do
    subject(:data) { described_class.call(params: params).data }

    let(:expected_data) do
      {
        score: score,
        results: results,
      }
    end
    let(:score) { "#{answers.size}/#{answers.size}" }
    let(:results) do
      test.questions.map { |q| { question_uuid: q.id, correct_answers: expected_answers, correct: true } }
    end
    let(:expected_answers) { answers.map { |answer| answer[:selected_choices][0] } }

    it { is_expected.to eq(expected_data) }
  end
end
