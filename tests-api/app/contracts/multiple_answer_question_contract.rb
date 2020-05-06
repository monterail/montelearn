# frozen_string_literal: true

require_relative "choice_schema"

class MultipleAnswerQuestionContract < Dry::Validation::Contract
  params do
    required(:choices).filled(:array, min_size?: 3).each(ChoiceSchema)
  end

  rule(:choices) do
    correct = value.select { |h| h[:correct] }
    key.failure("must have at least two correct choices") if correct.size < 2
  end
end
