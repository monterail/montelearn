# frozen_string_literal: true

require_relative "choices_schema"

class MultipleAnswerQuestionContract < Dry::Validation::Contract
  params(ChoicesSchema) do
    required(:choices).value(min_size?: 3)
  end

  rule(:choices) do
    correct = value.select { |h| h[:correct] }
    key.failure("must have at least two correct choices") if correct.size < 2
  end
end
