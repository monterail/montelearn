# frozen_string_literal: true

class CalculateScoreContract < Dry::Validation::Contract
  params do
    required(:test).filled
    required(:answers).filled(:array).each do
      schema do
        required(:question_uuid).filled(:str?)
        required(:selected_choices).filled(:array?).each(:str?)
      end
    end
  end

  rule(:test) do
    key.failure("must be a test") unless value.is_a?(Test)
  end

  rule(:answers) do
    next if all_questions_answered?(
      values.data[:test],
      values.data[:answers],
    )

    key.failure("are required for all test questions")
  end

  private

  def all_questions_answered?(test, answers)
    test_questions_uuids    = test.question_ids
    answers_questions_uuids = answers.map { |a| a[:question_uuid] }
    (test_questions_uuids - answers_questions_uuids).empty?
  end
end
