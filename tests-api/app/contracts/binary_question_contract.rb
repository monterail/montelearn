# frozen_string_literal: true

require_relative "choices_schema"

class BinaryQuestionContract < Dry::Validation::Contract
  params(ChoicesSchema) do
    required(:choices).value(size?: 2)
  end

  rule(:choices) do
    correct = value.select { |h| h[:correct] }
    key.failure("must have one correct choice only") if correct.size > 1
  end
end
