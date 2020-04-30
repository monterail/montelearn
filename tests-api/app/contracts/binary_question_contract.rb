# frozen_string_literal: true

require_relative "choice_schema"

class BinaryQuestionContract < Dry::Validation::Contract
  params do
    required(:choices).filled(:array, size?: 2).each(ChoiceSchema)
  end

  rule(:choices) do
    correct = value.select { |h| h[:correct] }
    key.failure("must have only one correct choice") if correct.size > 1
  end
end
